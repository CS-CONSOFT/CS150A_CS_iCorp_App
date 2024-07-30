import { DataKey } from "../../../../enum/DataKeys";
import { getSimpleData, storeSimpleData } from "../../../storage/AsyncStorageConfig";
import api from "../../axios_config";
import { ICommonResponse } from "../../interfaces/CS_ICommonResponse";
import { IResGetPv } from "../../interfaces/prevenda/CS_Common_IPreVenda";
import { IReqInsertPvWhitoutService } from "../../interfaces/prevenda/CS_IReqInserirNovaPv";
import { IReqGetPreVendaList } from "../../interfaces/prevenda/CS_IReqPreVendaLista";
import { IReqUpdateDD071 } from "../../interfaces/prevenda/CS_IReqUpdateDD071";
import { IResGetListAlmox } from "../../interfaces/prevenda/CS_IResGetListAlmox";
import { IResInsertPv } from "../../interfaces/prevenda/CS_IResInserirNovaPv";
import { IResPreVenda } from "../../interfaces/prevenda/CS_IResPreVendaLista";
import { IResProductsListPvModel } from "../../interfaces/prevenda/CS_IResProdutosPreVenda";

/**
 * Lista todas as PVS
 * @param IGetPreVendaList 
 * @returns lista de pvs
 */
export async function fetchPVs(IGetPreVendaList: IReqGetPreVendaList): Promise<IResPreVenda> {
    try {
        const params = {
            In_Tenant_Id: IGetPreVendaList.cs_tenant_id,
            In_IsCount: 0,
            in_currentPage: IGetPreVendaList.cs_current_page,
            in_pageSize: IGetPreVendaList.cs_page_size,
            In_DataInicio: IGetPreVendaList.cs_data_inicial,
            In_DataFinal: IGetPreVendaList.cs_data_final
        }
        const url = `/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/Get_PreVendas_List`
        const response = await api.get(url, { headers: params })
        return response.data as IResPreVenda
    } catch (error) {
        throw error;
    }
}


/**
 * Caso o atendimento id seja undefined, irá inserir produto e gerar uma nova pv,
 * com o atendimento id definido, irá inserir o produto no atendimento especificado.
 */
export async function insertProductToPv(insertPv: IReqInsertPvWhitoutService): Promise<IResInsertPv> {
    console.log("Essa é a que foi enviada na req: " + insertPv.cs_atendimento);

    try {
        const data = {
            UsuarioId: insertPv.cs_usuario_id,
            ContaId: insertPv.cs_conta_id,
            Quantidade: insertPv.cs_quantidade,
            Codigo: insertPv.cs_codigo_produto,
            IsDelivery: insertPv.cs_entrega,
            TipoAtendimento: insertPv.cs_tipo_atendimento
        }

        let url = ''
        if (insertPv.cs_atendimento === undefined) {
            url = `/cs_At_40_LogicoService/rest/CS_PV_API/${insertPv.cs_tenant_id}/${insertPv.cs_empresa_id}/InserirProdutos`
        } else {
            url = `/cs_At_40_LogicoService/rest/CS_PV_API/${insertPv.cs_tenant_id}/${insertPv.cs_empresa_id}/${insertPv.cs_atendimento}/InserirProdutos`
        }

        const response = await api.post(url, data)
        const res = response.data as IResInsertPv

        console.log("A que veio como resposta da API" + res.Model.AtendimentoId);

        if (!insertPv.cs_atendimento) {
            console.log("Nao tem atendimento");
            await storeSimpleData(DataKey.CurrentPV, res.Model.AtendimentoId)
        }

        return res
    } catch (error) {
        throw error;
    }
}

/**
 * Busca os produtos da pv
 */
export async function getPreSaleProducts({ cs_tenant_id, cs_atendimento_id }:
    { cs_tenant_id: number, cs_atendimento_id: string }): Promise<IResProductsListPvModel> {

    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_atendimento_id}/ListarProdutos`


    /** RESPONSE DE PRODUTOS */
    const response = await api.get(url)

    return response.data as IResProductsListPvModel
}

export async function getPv({ cs_tenant_id, cs_atendimento_id }: { cs_tenant_id: number, cs_atendimento_id: string }): Promise<IResGetPv> {
    const headerParams = {
        In_Tenant_Id: cs_tenant_id,
        In_DD070_id: cs_atendimento_id
    }

    const url = `/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/Get_PreVenda_PorID`
    const response = (await api.get(url, { headers: headerParams })).data as IResGetPv
    await storeSimpleData(DataKey.CurrentContaId, response.DD070_Nota.csicp_bb012.ID)
    return response
}

/**
 * DELETA UM PRODUTO DA PV
 */
export async function deleteProductFromPv({ cs_tenant_id, cs_empresa_id, cs_atendimento_id, cs_product_pv_id }:
    { cs_tenant_id: number, cs_empresa_id: string, cs_atendimento_id: string, cs_product_pv_id: string }): Promise<boolean> {

    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_empresa_id}/${cs_atendimento_id}/${cs_product_pv_id}/RemoverProduto`
    const response = await api.delete(url)
    return response.data.IsOk
}

export async function savedd071({ cs_tenant_id, cs_req_save }: { cs_tenant_id: number, cs_req_save: IReqUpdateDD071 }) {
    try {
        const data = {
            In_Tenant_Id: cs_tenant_id
        }
        const response = await api.post('/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/csicp_dd071_Save_Endereco', cs_req_save, { headers: data });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function setClienteToPv({ cs_tenant_id, cs_pv_id, cs_cliente_id }: { cs_tenant_id: number, cs_pv_id: string, cs_cliente_id: string }) {
    try {
        const response = await api.post(`/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_pv_id}/SetCliente/${cs_cliente_id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


//REQUISICAO

export async function RI_RequisitarRI({ cs_tenant_id, In_GG071_ID }: {
    cs_tenant_id: number, In_GG071_ID: number
}) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_GG071_ID: In_GG071_ID
        }
        const response = await api.patch(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/RI_RequisitarRI`, null, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function RI_Gerar_RI({ cs_tenant_id, cs_pv_id, cs_cliente_id, In1_gg001_ID_AlmoxSaida }:
    { cs_tenant_id: number, cs_pv_id: string, cs_cliente_id: string, In1_gg001_ID_AlmoxSaida: string }) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_DD070_ID: cs_pv_id,
            In1_gg001_ID_AlmoxSaida: In1_gg001_ID_AlmoxSaida
        }

        const url = {
            In_SY001_id_Usuario: cs_cliente_id
        }
        const response = await api.post(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/RI_Gerar_RI`, null, { headers: header, params: url });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function RI_ExcluirRI({ cs_tenant_id, In_GG071_ID, In_GG071_STA_ID }: { cs_tenant_id: number, In_GG071_STA_ID: number, In_GG071_ID: number }) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_GG071_ID: In_GG071_ID,
            In_GG071_STA_ID: In_GG071_STA_ID
        }
        const response = await api.delete(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/RI_ExcluirRI`, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function RI_CancelaRI({ cs_tenant_id, In_GG071_ID }:
    { cs_tenant_id: number, In_GG071_ID: number }) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_GG071_ID: In_GG071_ID
        }
        const response = await api.patch(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/RI_CancelaRI`, null, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function csicp_gg001_Get_List_Almox({ cs_tenant_id }:
    { cs_tenant_id: number }): Promise<IResGetListAlmox> {
    try {
        const header = {
            tenant_id: cs_tenant_id,
            In_IsActive: true,
            In_IsCount: 0,
            in_currentPage: 1,
            in_pageSize: 9999
        }
        const response = await api.get(`/CSR_GG100_Materiais_API_IS/rest/CS_Materiais/csicp_gg001_Get_List_Almox`, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function LiberarPV({ cs_tenant_id, cs_pv_id, cs_bb012_id, cs_sy001_id, cs_isComprometer }:
    { cs_tenant_id: number, cs_pv_id: string, cs_bb012_id: string, cs_sy001_id: string, cs_isComprometer: boolean }) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_DD070_Id: cs_pv_id,
            In_BB012_Id: cs_bb012_id,
            In_SY001_Id: cs_sy001_id,
            In_Comprometer: cs_isComprometer ? 1 : 0
        }
        const response = await api.get(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/Get_LiberarPV`, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function RetornarPV({ cs_tenant_id, cs_pv_id, cs_sy001_id }:
    { cs_tenant_id: number, cs_pv_id: string, cs_sy001_id: string }) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_DD070_Id: cs_pv_id,
            In_SY001_Id: cs_sy001_id
        }
        const response = await api.get(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/Get_RetornarPV`, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}