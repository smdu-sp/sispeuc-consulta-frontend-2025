export interface ICadastro {
    id_sql_incra: number;
    id_assunto: number;
    SQL_Incra: string;
    Sistema?: string;
    Processo?: string;
    Protocolo?: string;
    CodigoPedido?: string;
    TipoSQL_Incra?: string;

    sqlFilhos?: any[]
    sqlPais?: any[]
    Assunto?: IAssunto
    sqlsCondominio?: any[]
}

export interface IPaginadoCadastro {
	data: ICadastro[];
	total: number;
	pagina: number;
	limite: number;
}

export interface IRespostaBI {
    ok: boolean;
    error: string | null;
    data: IPaginadoCadastro | IListaSql[] | { Sistema: string }[] | null;
    status: number;
}

export interface IAssunto {
    id_assunto: number
    Sistema?: string      
    Processo?: string
    CodigoPedido: string
    DtPedidoProtocolo?: Date
    AssuntoCod?: string
    Assunto?: string
    Aditivo?: string
    TipoRequerimento?: string
    GrupoSituacaoAssunto?: string
    SituacaoAssunto?: string
    NumDocumento?: string
    NumDocIrregularidade?: string
    DtEmissaoDocumento?: Date
    GrupoStatusDocumento?: string
    StatusDocumento?: string
    Subprefeitura?: string
    Distrito?: string

    Processo_relacao?: any
    Despachos?: any[]
    ComuniqueSes?: any[]
    Cadastros?: ICadastro[]
    Categorias?: any[]
    Interessados?: any[]
    Zonas_Usos?: any[]
    Amparos_Notas_Ressalvas: any[]
    Enderecos?: any[]
}

export interface IListaSql {
    sql: string;
    processos?: {
        processo?: string;
        sistema?: string;
        assunto?: string;
        situacao?: string;
        dataInclusao?: string;
        dataEncerramento?: string;
    }[]
}