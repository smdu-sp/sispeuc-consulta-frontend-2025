/** @format */

import { IRespostaBI } from '@/types/bi';

export async function buscarSistemas(
    access_token: string,
): Promise<IRespostaBI> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const cadastros = await fetch(
            `${baseURL}cadastros/buscar-sistemas`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
                next: { tags: ['sistemas'], revalidate:120 },
            },
        );
        const data = await cadastros.json();
        if (cadastros.status === 200)
            return {
                ok: true,
                error: null,
                data: data as { Sistema: string }[],
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
            error: 'Não foi possível buscar a lista de sistemas:' + error,
            data: null,
            status: 400,
        };
    }
}
