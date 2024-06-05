import api from "../../axios_config";
import { IResPreVenda, IGetPreVendaList, IInsertPvWhitoutService as IInsertPv, IInsertPvResponse, IProductsPvModel } from "../../interfaces/prevenda/IPreVenda";

/**
 * Lista todas as PVS
 * @param IGetPreVendaList 
 * @returns lista de pvs
 */
export async function fetchPVs(IGetPreVendaList: IGetPreVendaList): Promise<IResPreVenda> {
    try {
        const urlParams = {
            UsuarioId: IGetPreVendaList.cs_usuario_id,
            SituacaoId: IGetPreVendaList.cs_situacao_id,
            DataInicial: IGetPreVendaList.cs_data_inicial,
            DataFinal: IGetPreVendaList.cs_data_final,
            Pesquisa: IGetPreVendaList.cs_pesquisa
        }
        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${IGetPreVendaList.cs_tenant_id}/${IGetPreVendaList.cs_empresa_id}/ListPV`;
        const response = await api.get(url, { params: urlParams })
        return response.data as IResPreVenda
    } catch (error) {
        throw error;
    }
}


/**
 * Caso o atendimento id seja undefined, irá inserir produto e gerar uma nova pv,
 * com o atendimento id definido, irá inserir o produto no atendimento especificado.
 */
export async function insertProductToPv(insertPv: IInsertPv): Promise<IInsertPvResponse> {
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
        return response.data as IInsertPvResponse

    } catch (error) {
        throw error;
    }
}

/**
 * Busca os produtos da pv
 */
export async function getPreSaleProducts({ cs_tenant_id, cs_empresa_id, cs_atendimento_id }:
    { cs_tenant_id: number, cs_empresa_id: string, cs_atendimento_id: string }): Promise<IProductsPvModel> {

    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_empresa_id}/${cs_atendimento_id}/ListarProdutos`

    /** RESPONSE DE PRODUTOS */
    const response = await api.get(url)
    return response.data as IProductsPvModel
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