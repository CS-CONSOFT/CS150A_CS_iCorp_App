import { IPVTenant } from "../prevenda/CS_Common_IPreVenda"


/**
 * Interface para atualizar o preço unitario
 */
export interface IReqUpdatePrice {
    AtendimentoProdutoId: string,
    Valor: number
}

/**
 * Interface para atualizar preço unitario e tabela
 */
export interface IReqUpdateTablePrice {
    pvTenant: IPVTenant,
    updatePrice: IReqUpdatePrice
}
