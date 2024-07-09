import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { getCep, getListOfCity, getListOfUf } from "../../services/api/endpoint/endereco/CS_Enderecamento";
import { getObject } from "../../services/storage/AsyncStorageConfig";

export async function handleGetCep(cep: string) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await getCep(cep, currentUser.TenantId)
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetUfList() {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await getListOfUf({ tenantId: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetCityList(ufId: string, search?: string) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await getListOfCity({ tenantId: currentUser.TenantId, ufId: ufId, search: search })
        return response
    } catch (error) {
        throw error
    }
}