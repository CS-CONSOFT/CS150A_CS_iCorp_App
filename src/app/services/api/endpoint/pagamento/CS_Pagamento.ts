import api from "../../axios_config";
import { ICommonResponse } from "../../interfaces/CS_ICommonResponse";
import { IReqInsertPaymentForm } from "../../interfaces/pagamento/CS_IReqInsertPaymentForm";
import { PaymentType } from "../../interfaces/pagamento/CS_IReqListFormPayment";
import { CS_IResBB026_Estatica } from "../../interfaces/pagamento/CS_IResBB026_Estatica";
import { IResPaymentResponse } from "../../interfaces/pagamento/CS_IResListFormPayment";
import { IResFormPayment } from '../../interfaces/pagamento/CS_IResListFormPaymentComplete';
import { IResPaymentFormByIdComplete } from '../../interfaces/pagamento/CS_IResPaymentFormByIdComplete';
import { TermItem } from './../../interfaces/pagamento/IResPaymentTerm';

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


    try {
        const response = await api.get(url)

        return response.data as IResPaymentResponse
    } catch (error) {
        throw error
    }
}

/** lista forma completa + condicao de pagamento */
export async function getPaymentFormByIdWithConditions({ tenantId, paymentFormKey }: { tenantId: number, paymentFormKey: string }):
    Promise<IResPaymentFormByIdComplete> {
    const url = `/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb026_Get_FormaPagto`

    const headerParams = {
        tenant_id: tenantId
    }

    const searchParams = {
        in_bb026_id: paymentFormKey
    }
    try {
        const response = await api.get(url, { headers: headerParams, params: searchParams })
        //id da condicao fixa
        const condFixId = response.data.csicp_bb026.csicp_bb026.BB026_CondPagtoFixoID

        let iResPaymentFormComplete: IResPaymentFormByIdComplete = {
            formByIdWithConditions: undefined,
            formByIdWithFixedConditions: undefined
        }
        //se houver condicao fixa
        if (condFixId !== undefined) {
            iResPaymentFormComplete = {
                formByIdWithFixedConditions: response.data
            }
            //caso nao
        } else {
            iResPaymentFormComplete = {
                formByIdWithConditions: response.data
            }
        }
        return iResPaymentFormComplete
    } catch (error) {
        throw error
    }
}

/** unica condicao de pagamento */
export async function getPaymentTerm({ tenantId, termId, paymentFormKey }: { tenantId: number, termId: string, paymentFormKey: string }): Promise<TermItem> {
    const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/${tenantId}/${termId}//${paymentFormKey}/GetCondicaoPagamento`


    try {
        const response = await api.get(url)
        return response.data as TermItem
    } catch (error) {
        throw error
    }
}

/** A NOVA API APONTA PRA ESSA FUNCAO */
export async function getListOfPaymentForm002({ tenantId, onlyAVista }: { tenantId: number, onlyAVista: boolean }): Promise<IResFormPayment> {

    let url = ''
    //se nao for a vista apenas
    if (!onlyAVista) {
        url = `/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb026_Get_List_FormaPagto`
    } else {
        //se for apenas a vista
        url = `/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb026_Get_List_FormaPagto_AVista`
    }

    const headerParams = {
        tenant_id: tenantId,
        In_IsCount: 0,
        In_IsActive: true,
        in_currentPage: 1,
        in_pageSize: 9999
    }


    try {
        const response = await api.get(url, { headers: headerParams })
        return response.data as IResFormPayment
    } catch (error) {
        throw error
    }
}



/** A NOVA API APONTA PRA ESSA FUNCAO */
export async function insertPaymentForm({ tenantId, pvId, insertPaymentBody }: { tenantId: number, pvId: string, insertPaymentBody: IReqInsertPaymentForm }):
    Promise<ICommonResponse> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${tenantId}/${pvId}/Pagamento_InserirForma`

    const body = {
        FormaPagamentoId: insertPaymentBody.FormaPagamentoId,
        CondicaoPagamentoId: insertPaymentBody.CondicaoPagamentoId,
        FormaPagamentoEntradaId: insertPaymentBody.FormaPagamentoEntradaId,
        Valor: insertPaymentBody.Valor,
        ValorEntrada: insertPaymentBody.ValorEntrada,
        DadosChequePDV: insertPaymentBody.DadosChequePDV
    }

    try {
        const response = await api.post(url, body)
        return response.data as ICommonResponse
    } catch (error) {
        throw error
    }
}


/** A NOVA API APONTA PRA ESSA FUNCAO */
export async function deletePaymentForm({ tenantId, pvId, formaPgtoAtendimentoId }: { tenantId: number, pvId: string, formaPgtoAtendimentoId: string }):
    Promise<ICommonResponse> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${tenantId}/${pvId}/Pagamento_LimparForma?FormaPagamentoAtendimentoId=${formaPgtoAtendimentoId}`
    try {
        const response = await api.post(url)
        return response.data as ICommonResponse
    } catch (error) {
        throw error
    }
}