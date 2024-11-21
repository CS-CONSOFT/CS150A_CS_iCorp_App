import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { getEstaticasBB } from "../../services/api/endpoint/estaticas/CS_Estaticas";
import { deletePaymentForm, getListOfPaymentForm002, getListOfPaymentFormCombo, getListOfPaymentFormCreditoLoja, getPaymentFormByIdWithConditions, getPaymentTerm, insertPaymentForm, paymentSelectForm, paymentSelectTerm } from "../../services/api/endpoint/pagamento/CS_Pagamento";
import { saveGlobalDiscount } from "../../services/api/endpoint/produto/CS_GetProduct";
import { ICommonResponse } from "../../services/api/interfaces/CS_ICommonResponse";
import { IReqInsertPaymentForm } from "../../services/api/interfaces/pagamento/CS_IReqInsertPaymentForm";
import { IResFormPayment, ResComboBB026 } from "../../services/api/interfaces/pagamento/CS_IResListFormPaymentComplete";
import { IResPaymentFormByIdComplete } from "../../services/api/interfaces/pagamento/CS_IResPaymentFormByIdComplete";
import { TermItem } from "../../services/api/interfaces/pagamento/IResPaymentTerm";
import { getObject, getSimpleData } from "../../services/storage/AsyncStorageConfig";



export async function handleGetPaymentTermList({ paymentFormKey }: { paymentFormKey: string }): Promise<IResPaymentFormByIdComplete> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = getPaymentFormByIdWithConditions({ tenantId: currentUser.TenantId, paymentFormKey: paymentFormKey })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetPaymentTerm({ termId, paymentFormKey }: { termId: string, paymentFormKey: string }): Promise<TermItem> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = getPaymentTerm({ tenantId: currentUser.TenantId, termId: termId, paymentFormKey: paymentFormKey })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetListOfPaymentForm002(onlyAVista: boolean): Promise<IResFormPayment> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = getListOfPaymentForm002({ tenantId: currentUser.TenantId, onlyAVista: onlyAVista })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetListOfPaymentFormCombo(bb026Tipo?: string, bb026Class?: string, isEntrada?: boolean): Promise<ResComboBB026> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

        var tipo = 0;
        var classe = 0;
        var ff003Id = 0;

        const lista = (await getEstaticasBB()).csicp_ff003_TpEsp
        ff003Id = lista.find((item) => item.Label == "A Receber")!.Id

        if (isEntrada) {
            const fullTipo = (await getEstaticasBB()).csicp_bb026_Tipo.find((item) => item.Label == "A Vista")
            tipo = fullTipo!.Id
        }


        switch (bb026Class) {
            case "CreditoLoja":
                const fullClasse = (await getEstaticasBB()).csicp_bb026_Classe.find((item) => item.Label == "Crédito Loja")
                classe = fullClasse!.Id
                break;
            default:
                break;
        }

        const response = getListOfPaymentFormCombo({ tenantId: currentUser.TenantId, bb026classeId: classe, bb026tipoId: tipo, ff003_TpEspId: ff003Id, isEntrada: isEntrada })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleGetListOfPaymentFormCreditoLoja(): Promise<IResFormPayment> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = getListOfPaymentFormCreditoLoja({ tenantId: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleInsertPaymentForm({ insertPaymentBody }: { insertPaymentBody: IReqInsertPaymentForm }): Promise<ICommonResponse> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        let currentPvId: any = ''
        const res = await getSimpleData(DataKey.CurrentPV)
        currentPvId = res

        const response = await insertPaymentForm({ tenantId: currentUser.TenantId, pvId: currentPvId, insertPaymentBody: insertPaymentBody })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleSaveGlobalDiscount({ cs_valor_percentual }: { cs_valor_percentual: number }): Promise<ICommonResponse> {
    try {

        console.log("ViewModel: " + cs_valor_percentual);


        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        let currentPvId: any = ''
        const res = await getSimpleData(DataKey.CurrentPV)
        currentPvId = res

        const response = saveGlobalDiscount({ cs_tenant_id: currentUser.TenantId, cs_atendimento_id: currentPvId, cs_valor_percentual: cs_valor_percentual })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleDeletePaymentForm({ formaPgtoAtendimentoId }: { formaPgtoAtendimentoId: string }): Promise<ICommonResponse> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

        let currentPvId: any = ''
        const res = await getSimpleData(DataKey.CurrentPV)
        currentPvId = res

        const response = deletePaymentForm({ tenantId: currentUser.TenantId, pvId: currentPvId, formaPgtoAtendimentoId: formaPgtoAtendimentoId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handlePaymentSelectForm({ formId }: { formId: string }): Promise<ICommonResponse> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

        let currentPvId: any = ''
        const res = await getSimpleData(DataKey.CurrentPV)
        currentPvId = res

        const response = paymentSelectForm({ tenantId: currentUser.TenantId, pvId: currentPvId, formId: formId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handlePaymentSelectTerm({ formId, termId }: { formId: string, termId: string }): Promise<ICommonResponse> {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

        let currentPvId: any = ''
        const res = await getSimpleData(DataKey.CurrentPV)
        currentPvId = res

        const response = paymentSelectTerm({ tenantId: currentUser.TenantId, pvId: currentPvId, formId: formId, termId: termId })
        return response
    } catch (error) {
        throw error
    }
} 