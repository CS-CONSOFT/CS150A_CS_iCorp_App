
/**
 * INTERFACE PADRAO DE PV, TENANT E PRODUTO PV ID
 */
export interface IPVTenant {
    TenantId: number,
    AtendimentoId: string
}

/**
 * INTERFACE RELACIONADA AOS DESCONTOS DE PRODUTOS DA PV
 */
export interface IPVProductDiscount {
    AtendimentoProdutoId: string,
    Valor: number
}
