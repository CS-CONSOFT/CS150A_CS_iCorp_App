export interface IResPaymentResponse {
    IsOk: boolean
    Msg: string
    List: PaymentResponseListItem[]
}

export interface PaymentResponseListItem {
    Id: string
    Value: string
    URLIcon?: string
}