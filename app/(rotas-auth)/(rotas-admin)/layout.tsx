/** @format */

import { auth } from '@/lib/auth/auth';
import { validaUsuario } from '@/services/usuarios';
import { IUsuario } from '@/types/usuario';
import { redirect } from 'next/navigation';

export default async function RotasAuth({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session) redirect('/login');
	const permissoes = ['DEV', 'ADM'];
	const { ok, data, error, status } = await validaUsuario();
	if (ok && !error && status === 200){
		const usuario = data as IUsuario;
		if (permissoes.includes(usuario.permissao.toString()))
			return children;
	}
	redirect('/');
}
