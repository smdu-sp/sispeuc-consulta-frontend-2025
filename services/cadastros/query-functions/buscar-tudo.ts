/** @format */

import { IPaginadoCadastro, IRespostaBI } from '@/types/bi';

export async function buscarTudo(
    access_token: string,
    pagina: number = 1,
    limite: number = 10,
    busca: string = '',
    tipo: string = '',
    sistema: string = ''
): Promise<IRespostaBI> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const cadastros = await fetch(
            `${baseURL}cadastros/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}&tipo=${tipo}&sistema=${sistema}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
                next: { tags: ['cadastros'], revalidate:120 },
            },
        );
        const data = await cadastros.json();
        if (cadastros.status === 200)
            return {
                ok: true,
                error: null,
                data: data as IPaginadoCadastro,
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
