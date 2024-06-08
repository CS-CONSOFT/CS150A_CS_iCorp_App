import { IPVTenant } from "../prevenda/CS_Common_IPreVenda"
import { IReqUpdateProdutItens } from "./CS_IReqUpdateProdutoItens"

export interface IReqUpdateAmount {
    productAmount: IReqUpdateProdutItens
    pvTenant: IPVTenant,
    AtendimentoProdutoId: string
}