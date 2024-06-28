import { DataKey } from "../../enum/DataKeys"
import { ILoginResponse } from "../../screens/001login/ILoginResponse"
import { getListaComanda } from "../../services/api/endpoint/comanda/CS_Comanda"
import { getObject } from "../../services/storage/AsyncStorageConfig"

export async function handleGetListComanda() {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await getListaComanda({ cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}