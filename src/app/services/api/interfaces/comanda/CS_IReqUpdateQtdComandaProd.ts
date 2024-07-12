export interface IReqUpdateQtdComanda {
    in_qtd: number
    tt011_id: number
    tt010_id: number
    tt011_saldo_id: string
    tt011qVendida: number
    tt011_p_venda: number
    tt011_sy001_id?: string
    in_tenant?: number
}