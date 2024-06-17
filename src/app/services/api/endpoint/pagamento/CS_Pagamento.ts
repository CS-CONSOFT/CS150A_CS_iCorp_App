import { IResPaymentTerm, TermItem } from './../../interfaces/pagamento/IResPaymentTerm';
import api from "../../axios_config";
import { PaymentType } from "../../interfaces/pagamento/CS_IReqListFormPayment";
import { IResPaymentResponse } from "../../interfaces/pagamento/CS_IResListFormPayment";

export async function getListOfPaymentForm({ tenantId, paymentForm }: { tenantId: number, paymentForm: PaymentType }): Promise<IResPaymentResponse> {
    const base = `/cs_At_40_LogicoService/rest/CS_Basico_API/${tenantId}/`
    let url = ''

    if (paymentForm === PaymentType.DINHEIRO) {
        url = base + 'ListFormasPagamentoDinheiro'
    } else if (paymentForm === PaymentType.VALE_CREDITO) {
        url = base + 'ListFormasPagamentoValeCredito'
    } else if (paymentForm === PaymentType.VALE_PRESENTE) {
        url = base + 'ListFormasPagamentoValePresente'
    } else {
        url = base + 'ListFormasPagamentoAReceberAVista'
    }

    const response = await api.get(url)
    try {
        console.log(response.data.List);

        return response.data as IResPaymentResponse
    } catch (error) {
        throw error
    }
}

/** lista condicao de pagamento */
export async function getPaymentTerms({ tenantId, paymentFormKey }: { tenantId: number, paymentFormKey: string }): Promise<IResPaymentTerm> {
    const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/${tenantId}/${paymentFormKey}/ListCondicaoPagamento`

    const response = await api.get(url)
    try {
        return response.data as IResPaymentTerm
    } catch (error) {
        throw error
    }
}

/** unica condicao de pagamento */
export async function getPaymentTerm({ tenantId, termId, paymentFormKey }: { tenantId: number, termId: string, paymentFormKey: string }): Promise<TermItem> {
    const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/${tenantId}/${termId}//${paymentFormKey}/GetCondicaoPagamento`

    const response = await api.get(url)
    try {
        return response.data as TermItem
    } catch (error) {
        throw error
    }
}