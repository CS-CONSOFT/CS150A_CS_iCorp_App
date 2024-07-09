import { DataKey } from "../../../../enum/DataKeys";
import { storeSimpleData } from "../../../storage/AsyncStorageConfig";
import api from "../../axios_config";
import { IResGetPv } from "../../interfaces/prevenda/CS_Common_IPreVenda";
import { IReqInsertPvWhitoutService } from "../../interfaces/prevenda/CS_IReqInserirNovaPv";
import { IReqGetPreVendaList } from "../../interfaces/prevenda/CS_IReqPreVendaLista";
import { IReqUpdateDD071 } from "../../interfaces/prevenda/CS_IReqUpdateDD071";
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
        return response.data as IResInsertPv

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