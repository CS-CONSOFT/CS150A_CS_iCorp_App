import { api_cep } from "../../api_cep.config";
import api from "../../axios_config";
import { IResGetCep } from "../../interfaces/endereco/CS_IResGetCep";
import { IResCityList } from "../../interfaces/endereco/CS_IResListCity";
import { IResUfList } from "../../interfaces/endereco/CS_IResUFList";

export async function getCep(cep: string): Promise<IResGetCep> {
    try {
        const response = await api_cep.get(`${cep}/json/`)
        return response.data as IResGetCep
    } catch (error) {
        throw error
    }
}


export async function getListOfUf({ tenantId }: { tenantId: number }): Promise<IResUfList> {
    try {
        const headers = {
            tenant_id: tenantId,
            In_IsCount: 0,
            In_PaisID: 'a7c1b7fb-1780-4a39-b827-556c63d55856',
            in_currentPage: 1,
            in_pageSize: 27,
            In_IsActive: true
        }
        const response = await api.get(`/CSR_BB100_ClienteFor_IS/rest/CS_Enderecamento/csicp_aa027_Get_Lista_UFs`, { headers: headers })
        return response.data as IResUfList
    } catch (error) {
        throw error
    }
}


export async function getListOfCity({ tenantId, ufId, search }: { tenantId: number, ufId: string, search?: string }): Promise<IResCityList> {
    try {
        const headers = {
            tenant_id: tenantId,
            In_IsCount: 0,
            In_UF_ID: ufId,
            in_currentPage: 1,
            in_pageSize: 9999,
            In_IsActive: true,
            in_search: search || undefined
        }
        const response = await api.get(`/CSR_BB100_ClienteFor_IS/rest/CS_Enderecamento/csicp_aa028_Get_Lista_Cidades`, { headers: headers })
        return response.data as IResCityList
    } catch (error) {
        throw error
    }
}