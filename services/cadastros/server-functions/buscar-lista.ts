/** @format */

import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { IListaSql, IRespostaBI } from '@/types/bi';

export async function buscarLista(
    listaSql: string[]
): Promise<IRespostaBI> {
    // const session = await auth();
    // if (!session) redirect('/login');
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    
    try {
        const cadastros = await fetch(
            `${baseURL}cadastros/buscar-lista`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${session?.access_token}`,
                },
                body: JSON.stringify({ listaSql })
            },
        );
        const data = await cadastros.json();
        if (cadastros.status === 200)
            return {
                ok: true,
                error: null,
                data: data as IListaSql[],
                status: 200,
            };
        return {
            ok: false,
            error: data.message,
            data: null,
            status: data.statusCode,
        };
    } catch (error) {
        return {
            ok: false,
            error: 'Não foi possível buscar a lista de sqls:' + error,
            data: null,
            status: 400,
        };
    }
}
