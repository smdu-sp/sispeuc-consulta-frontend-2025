/** @format */

import DataTable from '@/components/data-table';
import { Filtros } from '@/components/filtros';
import Pagination from '@/components/pagination';
import { auth } from '@/lib/auth/auth';
import * as cadastros from '@/services/cadastros';
import { Suspense } from 'react';
import { columns } from './_components/columns';
import { ICadastro, IPaginadoCadastro } from '@/types/bi';
import { Skeleton } from '@/components/ui/skeleton';
import ModalConsultaLista from './_components/modal-consulta-lista';

export default async function UsuariosSuspense({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    return (
        <div className=' w-full px-0 md:px-8 relative pb-20 md:pb-14 h-full md:container mx-auto'>
            <h1 className='text-xl md:text-4xl font-bold mt-4'>Consulta ao BI</h1>
            <div className='flex flex-col max-w-sm mx-auto md:max-w-full gap-6 mt-12 w-full mb-6'>
                <Suspense fallback={<TableSkeleton />}>
                    <Cadastros searchParams={searchParams} />
                </Suspense>
            </div>
            <div className='absolute bottom-10 md:bottom-5 right-2 md:right-8 hover:scale-110'>
                <ModalConsultaLista />
            </div>
        </div>
    );
}

export function TableSkeleton() {
	return <>
		<Skeleton className='h-14 w-full rounded-xl mb-1' />
		<Skeleton className='h-160 w-full rounded-xl' />
	</>
}

async function Cadastros({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let { pagina = 1, limite = 10, total = 0 } = await searchParams;
    let ok = false;
    const { busca = '', tipo = '', sistema = '' } = await searchParams;
    let dados: ICadastro[] = [];
    let sistemas: { Sistema: string }[] = [];
    const session = await auth();
    if (session && session.access_token) {
        const responseSistemas = await cadastros.buscarSistemas(session.access_token);
        if (responseSistemas.ok) {
            if (responseSistemas.data) {
                sistemas = responseSistemas.data as { Sistema: string }[];
            }
        }
        const response = await cadastros.buscarTudo(
            session.access_token || '',
            +pagina,
            +limite,
            busca as string,
            tipo as string,
            sistema as string
        );
        const { data } = response;
        ok = response.ok;
        if (ok) {
            if (data) {
                const paginado = data as IPaginadoCadastro;
                pagina = paginado.pagina || 1;
                limite = paginado.limite || 10;
                total = paginado.total || 0;
                dados = paginado.data || [];
            }
            const paginado = data as IPaginadoCadastro;
            dados = paginado.data || [];
        }
    }
	const tipoSelect = [
		{
			label: 'SQL',
			value: 'SQL',
		},
		{
			label: 'INCRA',
			value: 'INCRA',
		},
	];
    const sistemasSelect = sistemas.map((sistema) => {
        return { label: sistema.Sistema, value: sistema.Sistema };
    })
    return (
        <>
            <Filtros
                camposFiltraveis={[
                    {
                        nome: 'Busca',
                        tag: 'busca',
                        tipo: 0,
                        placeholder: 'Digite o SQL a pesquisar',
                    },
                    {
                        nome: 'Tipo',
                        tag: 'tipo',
                        tipo: 2,
                        valores: tipoSelect,
                        default: 'all'
                    },
                    {
                        nome: 'Sistema',
                        tag: 'sistema',
                        tipo: 2,
                        valores: sistemasSelect,
                        default: 'all'
                    },
                ]}
            />
            <DataTable
                columns={columns}
                data={dados || []}
            />
            {dados && dados.length > 0 && (
                <Pagination
                    total={+total}
                    pagina={+pagina}
                    limite={+limite}
                />
            )}
        </>
    );
}
