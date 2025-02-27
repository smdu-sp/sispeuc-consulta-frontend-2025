/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function DesativarUsuario(id: string) {
	const session = await auth();
	if (!session) redirect('/login');

	// const baseURL = process.env.API_URL;

	const desativado = await fetch(
		`http://localhost:3000/usuarios/desativar/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.access_token}`,
			},
		},
	);

	const dataResponse = await desativado.json();

	if (desativado.status === 200) {
		revalidateTag('usuarios');
		return {
			ok: true,
			error: null,
			data: dataResponse,
			status: 200,
		};
	}
	if (!dataResponse)
		return {
			ok: false,
			error: 'Erro ao desativar usuário.',
			data: null,
			status: 500,
		};
	return {
		ok: false,
		error: dataResponse.message,
		data: null,
		status: dataResponse.statusCode,
	};
}
