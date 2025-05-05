/** @format */

import DataTable from '@/components/data-table';
import { Filtros } from '@/components/filtros';
import Pagination from '@/components/pagination';
import { auth } from '@/lib/auth/auth';
import * as usuario from '@/services/usuarios';
import { IPaginadoUsuario, IUsuario } from '@/types/usuario';
import { Suspense } from 'react';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';
import { Skeleton } from '@/components/ui/skeleton';

export default async function UsuariosSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

	const statusSelect = [
		{
			label: 'Ativo',
			value: 'ATIVO',
		},
		{
			label: 'Inativo',
			value: 'INATIVO',
		},
	];

	const permissaoSelect = [
		{
			label: 'Desenvolvedor',
			value: 'DEV',
		},
		{
			label: 'Administrador',
			value: 'ADM',
		},
		{
			label: 'Técnico',
			value: 'TEC',
		},
		{
			label: 'Usuário',
			value: 'USR',
		},
	];

	return (
		<div className=' w-full px-0 md:px-8 relative pb-20 md:pb-14 h-full md:container mx-auto'>
			<h1 className='text-xl md:text-4xl font-bold mt-4'>Usuários</h1>
			<div className='flex flex-col max-w-sm mx-auto md:max-w-full gap-6 mt-12 w-full mb-6'>
				<Filtros
					camposFiltraveis={[
						{
							nome: 'Busca',
							tag: 'busca',
							tipo: 0,
							placeholder: 'Digite o nome, email ou login',
						},
						{
							nome: 'Status',
							tag: 'status',
							tipo: 2,
							valores: statusSelect,
							default: 'ATIVO',
						},
						{
							nome: 'Permissão',
							tag: 'permissao',
							tipo: 2,
							valores: permissaoSelect,
							default: 'all'
						},
					]}
				/>
				<Suspense fallback={<TableSkeleton />}>
					<Usuarios searchParams={searchParams} />
				</Suspense>
			</div>
			<div className='absolute bottom-10 md:bottom-5 right-2 md:right-8 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</div>
	);
}

export function TableSkeleton() {
	return <Skeleton className='h-160 w-full rounded-xl' />
}

async function Usuarios({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '', status = '', permissao = '' } = await searchParams;
	let dados: IUsuario[] = [];
	const session = await auth();
	if (session && session.access_token) {
		const response = await usuario.buscarTudo(
			session.access_token || '',
			+pagina,
			+limite,
			busca as string,
			status as string,
			permissao as string,
		);
		const { data } = response;
		ok = response.ok;
		if (ok) {
			if (data) {
				const paginado = data as IPaginadoUsuario;
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
			const paginado = data as IPaginadoUsuario;
			dados = paginado.data || [];
		}
	}

	return (
		<>
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
