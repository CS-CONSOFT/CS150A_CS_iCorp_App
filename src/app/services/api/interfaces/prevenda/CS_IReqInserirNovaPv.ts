/** INSERT PV WITHOUT SERVICE */
export interface IReqInsertPvWhitoutService {
    cs_tenant_id: number,
    cs_empresa_id: string,
    cs_usuario_id: string,
    cs_atendimento?: string
    cs_conta_id?: string,
    cs_quantidade: number,
    cs_codigo_produto: string,
    cs_entrega: boolean,
    cs_saldo_id?: string

    /**
     * Tipos possiveis:
        1 - PreVenda
        2 - Cotacao
        3 - PV
        4 - DAV
        5 - Pedido
        6 - Contrato
        7 - Especial
        8 - Voucher
        9 - PDV Web
        10- Venda On-line
     */
    cs_tipo_atendimento: number
}