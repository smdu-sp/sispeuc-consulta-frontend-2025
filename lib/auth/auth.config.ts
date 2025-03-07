import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { jwtDecode } from 'jwt-decode';

export default {
	providers: [
		Credentials({
            name: "credentials",
            credentials: {
                login: { label: "Login", type: "text" },
                senha: { label: "Senha", type: "password" }
            },
            type: "credentials",
            async authorize(credentials) {
                if (credentials?.login && credentials?.senha){
                    const { login, senha } = credentials;
                    const response = await fetch(`${process.env.API_URL}login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ login, senha })
                    });
                    const usuario = await response.json();
                    if (usuario && response.ok) return usuario;
                }
                return null;
            }
        })
	],
	callbacks: {
		async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            session = token.user as any;
            if (session.access_token) session.usuario = jwtDecode(session.access_token);
            const now = new Date();
            if (session.usuario.exp*1000 < now.getTime()) {
                const response = await fetch(`${process.env.API_URL}refresh`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ refresh_token: session.refresh_token })
                });
                const { access_token, refresh_token } = await response.json();
                session.access_token = access_token;
                session.refresh_token = refresh_token;
                if (access_token) session.usuario = jwtDecode(access_token);
            }
            return session;
        }
	},
	pages: {
		signIn: '/login',
        error: '/login'
	},
 
} satisfies NextAuthConfig;
