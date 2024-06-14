import api from "../../axios_config";
import { PaymentForm } from "../../interfaces/pagamento/CS_IReqListFormPayment";
import { IResPaymentResponse } from "../../interfaces/pagamento/CS_IResListFormPayment";

export async function getListOfPaymentForm({ tenantId, paymentForm }: { tenantId: number, paymentForm: PaymentForm }): Promise<IResPaymentResponse> {
    const base = `/cs_At_40_LogicoService/rest/CS_Basico_API/${tenantId}/`
    let url = ''

    if (paymentForm === PaymentForm.DINHEIRO) {
        url = base + 'ListFormasPagamentoDinheiro'
    } else if (paymentForm === PaymentForm.VALE_CREDITO) {
        url = base + 'ListFormasPagamentoValeCredito'
    } else if (paymentForm === PaymentForm.VALE_PRESENTE) {
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