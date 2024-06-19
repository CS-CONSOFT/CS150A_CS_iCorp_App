export interface IReqInsertPaymentForm {
    FormaPagamentoId?: string
    CondicaoPagamentoId?: string
    FormaPagamentoEntradaId?: string
    Valor?: number
    ValorEntrada?: number
    DadosChequePDV?: DadosChequePDV
}

export interface DadosChequePDV {
    Banco: number
    Agencia: number
    DVAgencia: string
    Conta: number
    DVConta: string
    Cheque: number
    RG: number
    Telefone: string
}