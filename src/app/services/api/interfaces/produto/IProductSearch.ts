interface IGetProductSearch {
    cs_tenant_id: number,
    cs_estab_id: string
    cs_codigo_produto?: string,
    cs_codigo_marca?: string,
    cs_codigo_artigo?: string,
    cs_codigo_referencia?: string,
    cs_is_saldo?: boolean,
    cs_is_promotion?:boolean
}

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
