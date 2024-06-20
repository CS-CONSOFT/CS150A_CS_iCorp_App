export interface IResListPaymentFormSaved {
  IsOk: boolean
  Msg: string
  List: ItemListPaymentForm[]
}

export interface ItemListPaymentForm {
  Id: string
  FormaPagamentoId: string
  FormaPagamentoDesc: string
  CondicaoPagamentoId: string
  CondicaoPagamentoDesc: string
  FormaPagamentoEntradaId: string
  ValorPagamento: number
  ValorEntrada: number
  ValorPago: number
  ValorTroco: number
  IsEdit: boolean
  StatusTef: string
}