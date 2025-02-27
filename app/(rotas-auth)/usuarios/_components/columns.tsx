/** @format */

'use client';

import { IUsuario } from '@/types/usuario';
import { ColumnDef } from '@tanstack/react-table';
import ModalDelete from './modal-delete';
import ModalUpdateCreate from './modal-update-create';

export const columns: ColumnDef<IUsuario>[] = [
	{
		accessorKey: 'nome',
		header: 'Nome',
	},
	{
		accessorKey: 'login',
		header: 'Usuário',
	},
	{
		accessorKey: 'email',
		header: 'E-mail',
	},
	{
		accessorKey: 'permissao',
		header: 'Permissão',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			return <p key={row.id}>{row.original.status ? 'Ativo' : 'Inativo'}</p>;
		},
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-center'>Ações</p>,
		cell: ({ row }) => {
			return (
				<div
					className='flex gap-2 items-center justify-center'
					key={row.id}>
					<ModalUpdateCreate
						user={row.original}
						isUpdating={true}
					/>
					<ModalDelete id={row.id} />
				</div>
			);
		},
	},
];
