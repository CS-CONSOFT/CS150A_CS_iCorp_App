import { DataKey } from "../../../../enum/DataKeys";
import { storeSimpleData } from "../../../storage/AsyncStorageConfig";
import api from "../../axios_config";
import { DD075_Obs, IResGetPv } from "../../interfaces/prevenda/CS_Common_IPreVenda";
import { IReqInsertPvWhitoutService } from "../../interfaces/prevenda/CS_IReqInserirNovaPv";
import { IReqGetPreVendaList } from "../../interfaces/prevenda/CS_IReqPreVendaLista";
import { IReqUpdateDD071 } from "../../interfaces/prevenda/CS_IReqUpdateDD071";
import { IResGetListAlmox } from "../../interfaces/prevenda/CS_IResGetListAlmox";
import { IResInsertPv } from "../../interfaces/prevenda/CS_IResInserirNovaPv";
import { IResPreVenda } from "../../interfaces/prevenda/CS_IResPreVendaLista";
import { IListaPrecoTabela } from "../../interfaces/prevenda/CS_ListaPrecoTabela";
import { getEstaticasPV } from "../estaticas/CS_Estaticas";

/**
 * Lista todas as PVS
 * @param iGetPreVendaList 
 * @returns lista de pvs
 */
export async function fetchPVs(iGetPreVendaList: IReqGetPreVendaList): Promise<IResPreVenda> {
    try {
        let params = {
            In_Tenant_Id: iGetPreVendaList.cs_tenant_id,
            In_IsCount: 0,
            in_currentPage: iGetPreVendaList.cs_current_page,
            in_pageSize: iGetPreVendaList.cs_page_size,
            In_DataInicio: iGetPreVendaList.cs_data_inicial,
            In_DataFinal: iGetPreVendaList.cs_data_final,
            In_ClauseInt_List_csicp_dd070_Sit: '',
            In_ClauseInt_List_csicp_dd070_TpAte: '',
            In_UsuarioID: iGetPreVendaList.cs_usuario_id,
            In_DD012_ACESSATODASPV: iGetPreVendaList.cs_acessa_todas_pv
        }

        try {
            const resSit = await _handleGetEstaticaSit();
            /**
             * construindo string para mandar na clausula IN
             * index 0 = CONSULTA
             * index 1 = FATURADO
             * index 2 = APROVADO
             */
            let strToSit = ''
            if (iGetPreVendaList.cs_consulta) {
                strToSit = (resSit.at(0) || 0).toString()
            } else if (iGetPreVendaList.cs_faturado) {
                strToSit = `${(resSit.at(1) || 0).toString()}`
            } else if (iGetPreVendaList.cs_aprovado) {
                strToSit = `${(resSit.at(2) || 0).toString()}`
            }
            else {
                strToSit = (resSit.at(1) || 0).toString()
            }
            const resTpAtd = await _handleGetEstaticaTpAt();
            params.In_ClauseInt_List_csicp_dd070_Sit = strToSit
            params.In_ClauseInt_List_csicp_dd070_TpAte = resTpAtd;
        } catch (error: any) {
            throw new Error(`Falha ao buscar dados estáticos: ${error.message}`);
        }

        const url = `/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/Get_PreVendas_List`;
        const response = await api.get(url, { headers: params });
        if (response.data != undefined) {
            return response.data as IResPreVenda;
        } else {
            throw new Error(`Falha ao buscar lista de PV`);
        }

    } catch (error) {
        throw new Error(`Falha ao buscar lista de PV: ${error}`);;
    }
}

enum ES_TYPE {
    BPM = "BPM",
    APROVADO = "Aprovado",
    CONSULTA = "Consulta",
    PV = "PreVenda",
    FATURADO = "Faturado"
}


/** recupera uma lista de ids da situacao para filtro da PV */
async function _handleGetEstaticaSit(): Promise<string[]> {
    try {
        // Faz uma requisição para salvar os dados de endereço
        const response = await getEstaticasPV();

        const idConsulta = response.csicp_dd070_Sit.find((item) => item.Label == ES_TYPE.CONSULTA)?.Id
        const idFaturado = response.csicp_dd070_Sit.find((item) => item.Label == ES_TYPE.FATURADO)?.Id
        const idAprovado = response.csicp_dd070_Sit.find((item) => item.Label == ES_TYPE.APROVADO)?.Id

        const arrayStr: string[] = []
        arrayStr.push((idConsulta || 0).toString())
        arrayStr.push((idFaturado || 0).toString())
        arrayStr.push((idAprovado || 0).toString())

        return arrayStr;
    } catch (error) {
        throw error;
    }
}

/** recupera uma lista de ids da tipo de atendimento para filtro da PV */
async function _handleGetEstaticaTpAt(): Promise<string> {
    try {
        // Faz uma requisição para salvar os dados de endereço
        const response = await getEstaticasPV();

        const idPv = response.csicp_dd070_TpAte.find((item) => item.Label == ES_TYPE.PV)?.Id

        const stringReturn = `${idPv}`

        return stringReturn;
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
            TipoAtendimento: insertPv.cs_tipo_atendimento,
            NS_GG520_ID: insertPv.cs_saldo_id
        }

        let url = ''
        if (insertPv.cs_atendimento === undefined) {
            url = `/cs_At_40_LogicoService/rest/CS_PV_API/${insertPv.cs_tenant_id}/${insertPv.cs_empresa_id}/InserirProdutos`
        } else {
            url = `/cs_At_40_LogicoService/rest/CS_PV_API/${insertPv.cs_tenant_id}/${insertPv.cs_empresa_id}/${insertPv.cs_atendimento}/InserirProdutos`
        }

        const response = await api.post(url, data)
        const res = response.data as IResInsertPv

        if (!insertPv.cs_atendimento) {
            await storeSimpleData(DataKey.CurrentPV, res.Model.AtendimentoId)
        }

        return res
    } catch (error) {
        throw error;
    }
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
            In1_gg001_ID_AlmoxSaida: In1_gg001_ID_AlmoxSaida,
            In_SY001_id_Usuario: cs_cliente_id
        }

        const response = await api.post(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/RI_Gerar_RI`, null, { headers: header });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function RI_Gerar_OBS_RI({ cs_tenant_id, In_GG071_ID, In_Observacao }:
    { cs_tenant_id: number, In_GG071_ID: number, In_Observacao: string }) {
    try {
        const header = {
            In_Tenant_Id: cs_tenant_id,
            In_GG071_ID: In_GG071_ID
        }

        const response = await api.patch(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/RI_GravaObs`, In_Observacao, { headers: header });
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
            In_Comprometer: cs_isComprometer
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

/** gera PDF */
export async function GenerateReport({ cs_tenant_id, cs_pv_id, cs_nome_cot }:
    { cs_tenant_id: number, cs_pv_id: string, cs_nome_cot: string }): Promise<string> {
    try {
        const response = await api.get(`/CsExecReport/rest/PVMobile/RESTAPI_Report_html?DD070_ID=${cs_pv_id}&Prm_Tenant_Id=${cs_tenant_id}&NomeCotacao=${cs_nome_cot}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


/** LISTA PREÇO PRODUTOS TABELA */
export async function getListPrecoTabela({ cs_tenant_id, cs_pdt_dkx }:
    { cs_tenant_id: number, cs_pdt_dkx: string }): Promise<IListaPrecoTabela> {

    const url = {
        TenantId: cs_tenant_id,
        Prm_ProdutoKdxId: cs_pdt_dkx
    }
    try {
        const response = await api.get(`/cs_At_40_LogicoService/rest/CS_Basico_API/GetTabelaPreco`, {
            params: url
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

/** POST PREÇO PRODUTOS TABELA 
 * Esta ACTION atualiza o preço tabela e o numero preço tabela, qdo usado via tabela de preço.
*/
export async function postPrecoTabelaNovoLista({ cs_tenant_id, cs_valor, cs_num_preco, cs_atendimento_id, cs_atendimento_prod_id, cs_usuario_id }:
    { cs_tenant_id: number, cs_valor: number, cs_num_preco: number, cs_atendimento_id: string, cs_atendimento_prod_id: string, cs_usuario_id: string }): Promise<{ IsOk: boolean }> {

    const url = {
        TenantId: cs_tenant_id,
        AtendimentoId: cs_atendimento_id,
        AtendimentoProdutoId: cs_atendimento_prod_id,
        IN_UsuarioID: cs_usuario_id
    }

    const body = {
        prm_valor: cs_valor,
        Prm_NroPreco: cs_num_preco
    }

    try {
        const response = await api.post(`/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoTab_PorTabelaPreco`,
            body,
            {
                params: url
            });
        return response.data;
    } catch (err) {
        throw err;
    }
}

/** POST SAVE PV
 * Esta ACTION atualiza o preço  tabela e o numero preço tabela, qdo usado via tabela de preço.
*/
export async function patchAtualizaObservaçãoPV({ cs_tenant_id, In_Obs, cs_atendimento_id }:
    { cs_tenant_id: number, In_Obs: string, cs_atendimento_id: string }): Promise<{ Out_IsUpdated: boolean, Msg: string }> {

    const url = {
        In_Tenant_Id: cs_tenant_id,
        In_DD070_ID: cs_atendimento_id,
    }

    try {
        const response = await api.patch(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/csicp_dd070_SaveObs_PV`,
            In_Obs,
            {
                headers: url
            });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function patchAtualizaObservaçãoContribuintePV({ cs_tenant_id, DD075_Id, DD075_Obs, cs_atendimento_id }:
    { cs_tenant_id: number, DD075_Id: string, DD075_Obs: string, cs_atendimento_id: string }): Promise<{ Out_IsUpdated: boolean, Msg: string }> {

    const url = {
        In_Tenant_Id: cs_tenant_id
    }

    const DD075 = {
        DD075_Id: DD075_Id,
        DD070_ID: cs_atendimento_id,
        DD075_TipoRegistro: 2,
        DD075_NomeCampo: "",
        DD075_Descricao_Compl: DD075_Obs
    }

    try {
        const response = await api.patch(`/CSR_DD100_PreVenda/rest/CS_DD100_PreVenda/csicp_dd075_SaveObs_IntContrib`,
            DD075,
            {
                headers: url
            });
        return response.data;
    } catch (err) {
        throw err;
    }
}