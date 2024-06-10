/**
 * Interface para atualizar quantiade, is montar, is entrega, is requisitar e is saldo negativo
 */
export interface IReqUpdateProdutItens {
    Quantidade?: number,
    IsMontar?: boolean,
    IsSaldoNegativo?: boolean,
    IsRequisitar?: boolean,
    IsEntregar?: boolean
}




export interface IReqScreenUpdateProductItens {
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

