import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { getListOfPaymentForm, getListOfPaymentForm002, getPaymentTerm, getPaymentTerms } from "../../services/api/endpoint/pagamento/CS_Pagamento";
import { PaymentType } from "../../services/api/interfaces/pagamento/CS_IReqListFormPayment";
import { IResPaymentResponse } from "../../services/api/interfaces/pagamento/CS_IResListFormPayment";
import { IResFormPaymentComplete } from "../../services/api/interfaces/pagamento/CS_IResListFormPaymentComplete";
import { IResPaymentTerm, TermItem } from "../../services/api/interfaces/pagamento/IResPaymentTerm";
import { getObject } from "../../services/storage/AsyncStorageConfig";

export async function handleGetListOfPaymentForm({ paymentForm }: { paymentForm: PaymentType }): Promise<IResPaymentResponse> {
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    try {
        const response = getListOfPaymentForm({ tenantId: currentUser.TenantId, paymentForm: paymentForm })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleGetPaymentTermList({ paymentFormKey }: { paymentFormKey: string }): Promise<IResPaymentTerm> {
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    try {
        const response = getPaymentTerms({ tenantId: currentUser.TenantId, paymentFormKey: paymentFormKey })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetPaymentTerm({ termId, paymentFormKey }: { termId: string, paymentFormKey: string }): Promise<TermItem> {
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    try {
        const response = getPaymentTerm({ tenantId: currentUser.TenantId, termId: termId, paymentFormKey: paymentFormKey })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetListOfPaymentForm002(): Promise<IResFormPaymentComplete> {
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    try {
        const response = getListOfPaymentForm002({ tenantId: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
} 