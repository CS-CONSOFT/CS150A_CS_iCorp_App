interface IGetProductSearch {
    cs_tenant_id?: number,
    cs_empresa_id?: string,
    cs_page_size?: number,
    cs_page?: number,

    cs_codigo_produto: string,
    cs_descricao_marca: string,
    cs_descricao_grupo: string,
    cs_descricao_classe: string,
    cs_descricao_artigo: string,
    cs_referencia: string,
    cs_descricao_reduzida: string,
    cs_complemento: string,
    cs_descricao_sub_grupo: string,
    cs_is_com_saldo: boolean
}


/**
 * Lida somente com a lista de produto
 */
interface IResProductSearch {
    Id?: string;
    CodgProduto?: number;
    DescArtigo?: string;
    DescMarca?: string;
    Referencia?: string;
    Complemento?: string;
    DescReduzida?: string;
    DescGrupo?: string;
    DescClasse?: string;
    SubGrupo?: string;
    Preco?: number;
    PrcPromocional?: number;
    isArredondaUnSec?: boolean;
    isUnSec?: boolean;
    isUnSecFracionado?: boolean;
    isUnFracionado?: boolean;
    UnidadeSecundaria?: string;
    Unidade?: string;
    Saldo?: number
    Imagens?: {
        SeqOrdem: number;
        URL_Path: string;
        IsPadrao?: boolean;
    }[];
}

/**
 * Lida com toda a estrutura de retorno, as mensagens +  a lista
 */
interface IResCompleteProdutoSearch {
    cs_is_ok: boolean,
    cs_total_count: number,
    c_pages_number: number,
    cs_msg?: string
    List: IResProductSearch[]
}
