import { ICommonResponse } from './../CS_ICommonResponse';
export interface IResPaymentTerm {
    commonResponse: ICommonResponse
    List: TermItem[]
}

export interface TermItem {
    Id: string
    Value: string
    PermiteEntrada: boolean
    IsCondicaoFixa: boolean
}