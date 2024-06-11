
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

export interface IResGetPv {
    Id: string
    Estab_ID: string
    ProtocolNumber: string
    Data_Emissao: string
    DataValidade: string
    Codigo: string
    Nome_Cliente: string
    Codigo_ContaReal: string
    Nome_Cliente_ContaReal: string
    Situacao: string
    Estoque: string
    NomeUsuario: string
    TotalLiquido: number
    TotalBruto: number
    TotalDesconto: number
    TotalAcrescimo: number
    TotalOutros: number
    Volume: number
    ClienteId: string
    Pagamento_ValorPago: number
    Pagamento_ValorAPagar: number
    Pagamento_ValorTroco: number
    Pagamento_TotalApagar: number
    Pagamento_SUM_Troco: number
}