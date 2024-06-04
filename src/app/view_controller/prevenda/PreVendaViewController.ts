import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/login/ILoginResponse";
import { deleteProductFromPv, fetchPVs, getPreSaleProducts, insertProductToPv } from "../../services/api/endpoint/prevenda/CS_PreVendaService";
import { IGetPreVendaList, IInsertPvResponse, IInsertPvWhitoutService, IProductsPvModel, IResPreVenda } from "../../services/api/interfaces/prevenda/IPreVenda";
import { getObject, getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { getUserProperties } from "../SharedViewController";



export async function handleFetchPv(cs_data_inicial: string, cs_data_final: string, cs_pesquisa?: string): Promise<IResPreVenda> {
    const userProp = (await getUserProperties())
    const IGetPreVendaList: IGetPreVendaList = {
        cs_tenant_id: userProp.tenantId!,
        cs_empresa_id: userProp.estabId,
        cs_usuario_id: userProp.userId.toString(),
        cs_data_inicial: cs_data_inicial,
        cs_data_final: cs_data_final,
        cs_pesquisa: cs_pesquisa
    }
    const result = fetchPVs(IGetPreVendaList)
    return result
}


/**
 * Caso o atendimento id seja undefined, 
 * irá inserir produto e gerar uma nova pv, com o atendimento id definido, irá inserir o produto no atendimento especificado.
 * @param cs_codigo_produto 
 * @param cs_conta_id 
 * @param cs_entrega 
 * @param cs_quantidade 
 * @param cs_tipo_atendimento 
 * @param cs_atendimento pode ser indefinido
 * @returns 
 */
export async function handleInsertProductPv(
    cs_codigo_produto: string, cs_entrega: boolean,
    cs_quantidade: number, cs_tipo_atendimento: number,
    cs_atendimento?: string, cs_conta_id?: string
): Promise<IInsertPvResponse> {

    const userProp = (await getUserProperties())
    const insert: IInsertPvWhitoutService = {
        cs_tenant_id: userProp.tenantId!,
        cs_empresa_id: userProp.estabId,
        cs_usuario_id: userProp.usuarioId!,
        cs_codigo_produto: cs_codigo_produto,
        cs_atendimento: cs_atendimento,
        cs_conta_id: cs_conta_id,
        cs_entrega: cs_entrega,
        cs_quantidade: cs_quantidade,
        cs_tipo_atendimento: cs_tipo_atendimento
    }

    const result = insertProductToPv(insert)
    return result
}


export async function handleGetProductsPv(): Promise<IProductsPvModel> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const result = getPreSaleProducts({
        cs_tenant_id: currentUser.TenantId,
        cs_empresa_id: currentUser.EstabelecimentoId,
        cs_atendimento_id: currentPvId
    })
    return result
}

export async function handleDeleteProductFromPv(productId: string): Promise<boolean> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const result = deleteProductFromPv({
        cs_tenant_id: currentUser.TenantId,
        cs_empresa_id: currentUser.EstabelecimentoId,
        cs_atendimento_id: currentPvId,
        cs_product_pv_id: productId
    })
    return result
}