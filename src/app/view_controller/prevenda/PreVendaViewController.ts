import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { deleteProductFromPv, fetchPVs, getPreSaleProducts, getPv, insertProductToPv } from "../../services/api/endpoint/prevenda/CS_PreVendaService";
import { updatePercentDiscount, updateProductAmount, updateProductSwitchItens, updateTablePrice, updateUnityPrice, updateValueDiscount } from "../../services/api/endpoint/produto/CS_GetProduct";
import { ICommonResponse } from "../../services/api/interfaces/CS_ICommonResponse";
import { IPVProductDiscount, IPVTenant, IResGetPv } from "../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { IReqInsertPvWhitoutService } from "../../services/api/interfaces/prevenda/CS_IReqInserirNovaPv";
import { IReqGetPreVendaList } from "../../services/api/interfaces/prevenda/CS_IReqPreVendaLista";
import { IResInsertPv } from "../../services/api/interfaces/prevenda/CS_IResInserirNovaPv";
import { IResPreVenda } from "../../services/api/interfaces/prevenda/CS_IResPreVendaLista";
import { IResProductsListPvModel } from "../../services/api/interfaces/prevenda/CS_IResProdutosPreVenda";
import { IReqUpdateProdutItens } from "../../services/api/interfaces/produto/CS_IReqUpdateProdutoItens";
import { IReqUpdatePrice } from "../../services/api/interfaces/produto/CS_IReqUpdateProdutoPreco";
import { getObject, getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { getUserProperties } from "../SharedViewController";



export async function handleFetchPv(cs_data_inicial: string, cs_data_final: string, cs_pesquisa?: string): Promise<IResPreVenda> {
    const userProp = (await getUserProperties())
    const IGetPreVendaList: IReqGetPreVendaList = {
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
): Promise<IResInsertPv> {

    const userProp = (await getUserProperties())
    const insert: IReqInsertPvWhitoutService = {
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


export async function handleGetProductsPv(): Promise<IResProductsListPvModel> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const result = getPreSaleProducts({
        cs_tenant_id: currentUser.TenantId,
        cs_atendimento_id: currentPvId
    })
    return result
}

export async function handleGetPv(): Promise<IResGetPv> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const result = getPv({
        cs_tenant_id: currentUser.TenantId,
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

/**
 * Atualiza o percentual de desconto de um produto na pv
 */
export async function handleUpdatePercentDiscount(productDiscount: IPVProductDiscount): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

    const pvTenant: IPVTenant = {
        TenantId: currentUser.TenantId,
        AtendimentoId: currentPvId
    }

    return updatePercentDiscount({ pvTenant, productDiscount })
}

export async function handleUpdateValueDiscount(productDiscount: IPVProductDiscount): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

    const pvTenant: IPVTenant = {
        TenantId: currentUser.TenantId,
        AtendimentoId: currentPvId
    }
    return updateValueDiscount({ pvTenant, productDiscount })
}

export async function handleUpdateTablePrice(updatePrice: IReqUpdatePrice): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

    const pvTenant: IPVTenant = {
        TenantId: currentUser.TenantId,
        AtendimentoId: currentPvId
    }

    return updateTablePrice({ pvTenant, updatePrice })
}

export async function handleUpdateUnityPrice(updatePrice: IReqUpdatePrice): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

    const pvTenant: IPVTenant = {
        TenantId: currentUser.TenantId,
        AtendimentoId: currentPvId
    }

    return updateUnityPrice({ pvTenant, updatePrice })
}

export async function handleUpdateProductAmount(productId: string, productAmount: IReqUpdateProdutItens): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })

    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const pvTenant: IPVTenant = {
        TenantId: currentUser.TenantId,
        AtendimentoId: currentPvId
    }

    const result = await updateProductAmount({ pvTenant: pvTenant, AtendimentoProdutoId: productId, productAmount: productAmount })
    return result
}

export async function handleUpdateProductSwtichs(productId: string, productAmount: IReqUpdateProdutItens): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })

    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const pvTenant: IPVTenant = {
        TenantId: currentUser.TenantId,
        AtendimentoId: currentPvId
    }

    const result = await updateProductSwitchItens({ pvTenant: pvTenant, AtendimentoProdutoId: productId, productAmount: productAmount })
    return result
}

