import { DataKey } from "../../enum/DataKeys"
import { ILoginResponse } from "../../screens/001login/ILoginResponse"
import { IComandaDataInsert, deleteComanda, getComandaById, getListaComanda, insereProdutoComanda, removerProdutoComanda, updateQtdProdutoComanda } from "../../services/api/endpoint/comanda/CS_Comanda"
import { IReqUpdateQtdComanda } from "../../services/api/interfaces/comanda/CS_IReqUpdateQtdComandaProd"
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


export async function handleGetComanda({ comandaId }: { comandaId: number }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await getComandaById({ cs_tenant_id: currentUser.TenantId, comanda_id: comandaId })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleInsertProdutoComanda({ insertProdutoComanda }: { insertProdutoComanda: IComandaDataInsert }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

        insertProdutoComanda.in_estab_id = currentUser.EstabelecimentoId
        insertProdutoComanda.in_sy001_id = currentUser.UsuarioId

        const response = await insereProdutoComanda({ cs_tenant_id: currentUser.TenantId, dataInsertComanda: insertProdutoComanda })
        return response
    } catch (error) {
        throw error
    }
}


export async function handleDeleteProdutoComanda({ tt011id }: { tt011id: number }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await removerProdutoComanda({ cs_tenant_id: currentUser.TenantId, comanda_produto_id: tt011id })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleUpdateQuantidadeProdutoComanda({ cs_update_qtd }: { cs_update_qtd: IReqUpdateQtdComanda }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

        cs_update_qtd.in_tenant = currentUser.TenantId
        cs_update_qtd.tt011_sy001_id = currentUser.UsuarioId

        const response = await updateQtdProdutoComanda({ cs_update_qtd: cs_update_qtd })
        return response
    } catch (error) {
        throw error
    }
}

export async function handleDeleteComanda({ comandaId }: { comandaId: number }) {
    try {
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
        const response = await deleteComanda({ cs_tenant_id: currentUser.TenantId, comanda_id: comandaId })
        return response
    } catch (error) {
        throw error
    }
}
