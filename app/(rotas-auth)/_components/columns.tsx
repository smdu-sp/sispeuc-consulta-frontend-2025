/** @format */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ICadastro } from '@/types/bi';
import ModalDados from './modal-dados';

export const columns: ColumnDef<ICadastro>[] = [
	{
		accessorKey: 'SQL_Incra',
		header: 'SQL/INCRA',
	},
	{
		accessorKey: 'TipoSQL_Incra',
		header: 'Tipo',
	},
	{
		accessorKey: 'Sistema',
	},
	{
		accessorKey: 'Processo',
	},
	{
		accessorKey: 'Protocolo',
	},
	{
		accessorKey: 'AssuntoAssunto',
		header: 'Assunto',
		cell: ({ row }) => {
			return <p>{row.original.Assunto?.Assunto}</p>
		},
	},
	{
		accessorKey: 'DtPedidoProtocolo',
		header: 'Data Pedido',
		cell: ({ row }) => {
			const DtPedidoProtocolo = row.original.Assunto?.DtPedidoProtocolo;
			return <p>{ DtPedidoProtocolo ? new Date(DtPedidoProtocolo).toLocaleDateString() : ''}</p>
		},
	},
	{
		accessorKey: 'Detalhes',
		header: () => <p className='text-center'></p>,
		cell: ({ row }) => {
			return <p className='text-right'><ModalDados cadastro={row.original} /></p>
		},
	}
];
