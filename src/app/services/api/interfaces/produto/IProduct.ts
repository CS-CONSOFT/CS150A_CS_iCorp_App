import { IPVProductDiscount, IPVTenant } from "../prevenda/IPreVenda";

export interface IGetProductSearch {
    cs_tenant_id?: number,
    cs_empresa_id?: string,
    cs_page_size?: number,
    cs_page?: number,

    cs_codigo_produto: string,
    cs_descricao_reduzida: string,
}


/**
 * Lida somente com a lista de produto
 */
export interface IResProductSearch {
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
export interface IResCompleteProdutoSearch {
    cs_is_ok: boolean,
    cs_total_count: number,
    c_pages_number: number,
    cs_msg?: string
    List: IResProductSearch[]
}


/**
 * Interface para atualizar o preço unitario
 */
export interface IUpdatePrice {
    AtendimentoProdutoId: string,
    Valor: number
}

/**
 * Interface para atualizar preço unitario e tabela
 */
export interface IUpdateTablePrice {
    pvTenant: IPVTenant,
    updatePrice: IUpdatePrice
}

/**
 * Interface para atualizar quantiade, is montar, is entrega, is requisitar e is saldo negativo
 */
export interface IUpdateProdutAmount {
    Quantidade: number,
    IsMontar: true,
    IsSaldoNegativo: false,
    IsRequisitar: false,
    IsEntregar: false
}

export interface IUpdatePercentageDiscount {
    pvTenant: IPVTenant,
    productDiscount: IPVProductDiscount
}

export interface IUpdateValueDiscount {
    pvTenant: IPVTenant,
    productDiscount: IPVProductDiscount
}

export interface IUpdateAmount {
    updateQuantidade: IUpdateProdutAmount
    pvTenant: IPVTenant,
    AtendimentoProdutoId: string
}

export interface IScreenUpdateProductItens {
    productId: string,
    isEntregar: boolean,
    isSaldoNegativo: boolean,
    isRequisitar: boolean,
    isMontar: boolean,
    tablePrice: number,
    unityPrice: number,
    percentDiscount: number,
    valueDiscount: number,
}


