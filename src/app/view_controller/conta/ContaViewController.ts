import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { deleteConta, getContaById, getListConta, save1201, save1202, save1206, saveConta } from "../../services/api/endpoint/conta/CS_Contas";
import { ICommonReq } from "../../services/api/interfaces/CS_ICommonResponse";
import { IReqSave1201 } from "../../services/api/interfaces/contas/CS_IReqSave1201";
import { CS_IReqSave1202 } from "../../services/api/interfaces/contas/CS_IReqSave1202";
import { IReqSaveConta } from "../../services/api/interfaces/contas/CS_IReqSaveConta";
import { CS_IReqSaveEndereco } from "../../services/api/interfaces/contas/CS_IReqSaveEndereco";
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


export async function handleSave1202({ cs_req_save }: { cs_req_save: CS_IReqSave1202 }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await save1202({ cs_req_save: cs_req_save, cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleSave1201({ cs_req_save }: { cs_req_save: IReqSave1201 }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await save1201({ cs_req_save: cs_req_save, cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleSave1206({ cs_req_save }: { cs_req_save: CS_IReqSaveEndereco }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await save1206({ cs_req_save: cs_req_save, cs_tenant_id: currentUser.TenantId })
        return response
    } catch (error) {
        throw error
    }
}