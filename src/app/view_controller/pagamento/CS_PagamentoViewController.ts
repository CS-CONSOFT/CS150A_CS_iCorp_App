import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { getListOfPaymentForm } from "../../services/api/endpoint/pagamento/CS_Pagamento";
import { PaymentForm } from "../../services/api/interfaces/pagamento/CS_IReqListFormPayment";
import { IResPaymentResponse } from "../../services/api/interfaces/pagamento/CS_IResListFormPayment";
import { getObject } from "../../services/storage/AsyncStorageConfig";

export async function handleGetListOfPaymentForm({ paymentForm }: { paymentForm: PaymentForm }): Promise<IResPaymentResponse> {
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    try {
        const response = getListOfPaymentForm({ tenantId: currentUser.TenantId, paymentForm: paymentForm })
        return response
    } catch (error) {
        throw error
    }
} 