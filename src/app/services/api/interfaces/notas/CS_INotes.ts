export interface IGetDelivery {
    note: string,
    tenant: number
}

export interface ISetEntrega {
    dd40id?: string,
    tenant: number,
    userIdentifier: string
}

export interface ISetCorSerie {
    productId?: string,
    tenant: number,
    newCorSerie: string
}