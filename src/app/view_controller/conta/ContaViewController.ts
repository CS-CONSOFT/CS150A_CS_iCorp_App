import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { deleteConta, getContaById, getListConta, saveConta } from "../../services/api/endpoint/conta/CS_Contas";
import { ICommonReq } from "../../services/api/interfaces/CS_ICommonResponse";
import { IReqSaveConta } from "../../services/api/interfaces/contas/CS_IReqSaveConta";
import { getObject, getSimpleData } from "../../services/storage/AsyncStorageConfig";

export async function handleGetContaById() {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        let currentContaId: any = ''
        await getSimpleData(DataKey.CurrentContaId).then((res) => {
            currentContaId = res
        })
        const response = await getContaById({ cs_conta_id: currentContaId, cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleGetListConta({ currentPage, pageSize, cs_search, modRelacaoID }: { currentPage: number, pageSize: number, modRelacaoID: number, cs_search?: string }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const commonReq: ICommonReq = {
            Tenant_id: currentUser.TenantId,
            In_IsActive: true,
            In_IsCount: false ? 0 : 1,
            in_currentPage: currentPage,
            in_pageSize: pageSize,
            in_search: cs_search
        }
        const response = await getListConta({ commonReq: commonReq, cs_mod_relacao_id: modRelacaoID })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleSaveConta(cs_save_conta: IReqSaveConta) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await saveConta({ cs_save_conta: cs_save_conta, cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleDeleteConta() {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        let currentContaId: any = ''
        await getSimpleData(DataKey.CurrentContaId).then((res) => {
            currentContaId = res
        })
        const response = await deleteConta({ cs_conta_id: currentContaId, cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}