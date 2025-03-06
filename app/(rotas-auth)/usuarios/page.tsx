/** @format */

import DataTable, { TableSkeleton } from '@/components/data-table';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth/auth';
import { FetchBuscarTudo } from '@/services/usuario/query-functions/buscar-tudo';
import { IUsuario } from '@/types/usuario';
import { Suspense } from 'react';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';

export default async function UsuariosSuspense() {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Usuarios />
		</Suspense>
	);
}

export async function Usuarios() {
	let data: IUsuario[] = [];
	const session = await auth();
	if (session && session.access_token) {
		const response = await FetchBuscarTudo(session?.access_token || '');
		if (response && response.data && response.data.data)
			data = response.data.data;
	}

	return (
		<div className='max-w-7xl w-full relative h-full'>
			<Card>
				<CardHeader>
					<CardTitle className='text-3xl font-bold'>Usuários</CardTitle>
					<CardDescription>
						Gerenciamento e consulta de usuários
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable
						columns={columns}
						data={data || []}
					/>
				</CardContent>
			</Card>
			<div className='absolute bottom-5 right-5 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</div>
	);
}
