/** @format */

export interface IUsuario {
	id: string;
	nome: string;
	login: string;
	email: string;
	permissao: 'USR' | 'DEV' | 'ADM' | 'SUP';
	status: boolean;
	ultimologin: Date;
	criadoEm: Date;
	atualizadoEm?: Date;
}

export interface ICreateUsuario {
	nome: string;
	email: string;
	login: string;
	permissao: Permissao;
}

export interface IUpdateUsuario {
	id?: string;
	permissao?: Permissao;
	status?: boolean;
}

export interface IPaginadoUsuario {
	data: IUsuario[];
	total: number;
	pagina: number;
	limite: number;
}

export interface IRespostaUsuario {
	ok: boolean;
	error: string | null;
	data: IUsuario | IPaginadoUsuario | null;
	status: number;
}

export type Permissao = 'USR' | 'DEV' | 'ADM' | 'SUP';