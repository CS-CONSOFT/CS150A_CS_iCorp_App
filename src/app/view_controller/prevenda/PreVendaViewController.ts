import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { GenerateReport, LiberarPV, RI_CancelaRI, RI_ExcluirRI, RI_Gerar_RI, RI_RequisitarRI, RetornarPV, csicp_gg001_Get_List_Almox, deleteProductFromPv, fetchPVs, getListPrecoTabela, getPv, insertProductToPv, patchAtualizaObservaçãoContribuintePV, patchAtualizaObservaçãoPV, postPrecoTabelaNovoLista, savedd071, setClienteToPv } from "../../services/api/endpoint/prevenda/CS_PreVendaService";
import { updatePercentDiscount, updateProductAmount, updateProductSwitchItens, updateTablePrice, updateUnityPrice, updateValueDiscount } from "../../services/api/endpoint/produto/CS_GetProduct";
import { ICommonResponse } from "../../services/api/interfaces/CS_ICommonResponse";
import { DD071_Enderecos, IPVProductDiscount, IPVTenant, IResGetPv } from "../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { IReqInsertPvWhitoutService } from "../../services/api/interfaces/prevenda/CS_IReqInserirNovaPv";
import { IReqGetPreVendaList } from "../../services/api/interfaces/prevenda/CS_IReqPreVendaLista";
import { IReqUpdateDD071 } from "../../services/api/interfaces/prevenda/CS_IReqUpdateDD071";
import { IResInsertPv } from "../../services/api/interfaces/prevenda/CS_IResInserirNovaPv";
import { IResPreVenda } from "../../services/api/interfaces/prevenda/CS_IResPreVendaLista";
import { IResProductsListPvModel } from "../../services/api/interfaces/prevenda/CS_IResProdutosPreVenda";
import { IReqUpdateProdutItens } from "../../services/api/interfaces/produto/CS_IReqUpdateProdutoItens";
import { IReqUpdatePrice } from "../../services/api/interfaces/produto/CS_IReqUpdateProdutoPreco";
import { getObject, getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { checkIfRuleDD012_ACESSATODASPV_Exists } from "../login/LoginViewController";
import { getUserProperties } from "../SharedViewController";



export async function handleFetchPv(cs_data_inicial: string, cs_data_final: string, cs_current_page: number, cs_page_size: number, cs_contulta: boolean, cs_faturado: boolean, cs_aprovado: boolean): Promise<IResPreVenda> {
    const userProp = (await getUserProperties())
    try {
        //checar se o usuario tem acesso a PV
        const hasRule = await checkIfRuleDD012_ACESSATODASPV_Exists()
        const IGetPreVendaList: IReqGetPreVendaList = {
            cs_tenant_id: userProp.tenantId!,
            cs_is_count: false,
            cs_current_page: cs_current_page,
            cs_page_size: cs_page_size,
            cs_data_inicial: cs_data_inicial,
            cs_data_final: cs_data_final,
            cs_consulta: cs_contulta,
            cs_faturado: cs_faturado,
            cs_usuario_id: userProp.usuarioId || '',
            cs_acessa_todas_pv: hasRule ? 1 : 0,
            cs_aprovado: cs_aprovado
        }
        try {
            const result = fetchPVs(IGetPreVendaList)
            return result
        } catch (error) {
            throw error
        }

    } catch (error) {
        throw error
    }
}

/**
 * funcao que recupera qual a data final que deve ser utilizada para filtrar a pre venda
 * @param dateFilterId o id do filtro de data, sendo eles 0 - hoje, 1 - ontem, 2 - 5 dias atras, 3 - 15 dias atras, 4 - 30 dias
 * @returns 
 */
export function getFinalDateToFilter(dateFilterId?: number): Date {
    if (dateFilterId === undefined || dateFilterId == 0 || dateFilterId == -1) {
        return new Date()
    } else {
        const currentDate: Date = new Date()
        switch (dateFilterId) {
            case 1:
                currentDate.setDate(currentDate.getDate() - 1)
                return currentDate
            case 2:
                currentDate.setDate(currentDate.getDate() - 5)
                return currentDate
            case 3:
                currentDate.setDate(currentDate.getDate() - 15)
                return currentDate
            case 4:
                currentDate.setDate(currentDate.getDate() - 30)
                return currentDate
            default:
                return new Date()
        }
    }
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
 * @param saldoId 
 * @returns 
 */
export async function handleInsertProductPv(
    cs_codigo_produto: string, cs_entrega: boolean,
    cs_quantidade: number, cs_tipo_atendimento: number,
    cs_atendimento?: string, cs_conta_id?: string, saldoId?: string
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
        cs_tipo_atendimento: cs_tipo_atendimento,
        cs_saldo_id: saldoId ? saldoId : ""
    }

    const result = insertProductToPv(insert)
    return result
}


export async function handleSetClienteToPv(cs_cliente_id: string): Promise<ICommonResponse> {
    let currentPvId: any = ''
    getSimpleData(DataKey.CurrentPV).then((res) => {
        currentPvId = res
    })
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
    const result = setClienteToPv({
        cs_tenant_id: currentUser.TenantId,
        cs_pv_id: currentPvId,
        cs_cliente_id: cs_cliente_id
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

    return updatePercentDiscount({ pvTenant, usuarioId: currentUser.UsuarioId, productDiscount })
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
    return updateValueDiscount({ pvTenant, usuarioId: currentUser.UsuarioId, productDiscount })
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

    return updateTablePrice({ pvTenant, usuarioId: currentUser.UsuarioId, updatePrice })
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

    return updateUnityPrice({ pvTenant, usuarioId: currentUser.UsuarioId, updatePrice })
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


export interface INotaPagamentosValores {
    valorPago: number
    valorAPagar: number
}
export function handleCalculateValuesPayedAndToPay(item: IResGetPv): INotaPagamentosValores {
    const totalLiquido = item.DD070_Nota.csicp_dd070.DD070_Total_Liquido
    let valorSomaTotalPagoFormaPagamentos: number = 0

    if (item.DD072_FormaPagtos) {
        item.DD072_FormaPagtos.forEach((item) => {
            valorSomaTotalPagoFormaPagamentos = item.csicp_dd072.DD072_Valor_Pago + valorSomaTotalPagoFormaPagamentos
        })
    }

    return {
        valorPago: valorSomaTotalPagoFormaPagamentos,
        valorAPagar: totalLiquido - valorSomaTotalPagoFormaPagamentos
    }
}

export async function handleSaveDD071({ cs_req_save }: { cs_req_save: IReqUpdateDD071 }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await savedd071({ cs_req_save: cs_req_save, cs_tenant_id: currentUser.TenantId });
        return response;
    } catch (error) {
        throw error;
    }
}

export function mapToUpdateEndereco(currentEndereco: DD071_Enderecos, attributesMap: any): IReqUpdateDD071 {
    const iSaveEndereco: IReqUpdateDD071 = {
        DD071_CEP: Number(attributesMap.CEP),
        DD071_Logradouro: attributesMap.Logradouro,
        DD071_NomeBairro: attributesMap.Bairro,
        DD071_Numero: attributesMap.Numero,
        DD071_Complemento: attributesMap.Complemento,
        DD071_Perimetro: attributesMap.Perimetro,
        DD071_UF_ID: attributesMap.UF,
        DD071_Cidade_ID: attributesMap.Cidade,
        DD070_ID: currentEndereco?.csicp_dd071.DD070_ID,
        DD071_Id: currentEndereco?.csicp_dd071.DD071_Id,
        DD071_Conta_ID: currentEndereco?.csicp_bb012.ID,
        DD071_Tipo: currentEndereco?.csicp_dd071.DD071_Tipo,
        DD071_TipoDocto: currentEndereco?.csicp_dd071.DD071_TipoDocto,
        DD071_CNPJ_CPF: currentEndereco?.csicp_dd071.DD071_CNPJ_CPF,
        DD071_IE_RG: currentEndereco?.csicp_dd071.DD071_IE_RG,
        DD071_Nome: currentEndereco?.csicp_dd071.DD071_Nome,
        DD071_Pais_ID: currentEndereco?.csicp_dd071.DD071_Pais_ID,
        DD071_Telefone: currentEndereco?.csicp_dd071.DD071_Telefone,
        DD071_Email: currentEndereco?.csicp_dd071.DD071_Email,
        DD071_SUFRAMA: currentEndereco?.csicp_dd071.DD071_SUFRAMA,
        DD071_ModalidadeFrete: currentEndereco?.csicp_dd071.DD071_ModalidadeFrete,
        DD071_PlacaVeiculo: currentEndereco?.csicp_dd071.DD071_PlacaVeiculo,
        DD071_UFVeiculo: currentEndereco?.csicp_dd071.DD071_UFVeiculo,
        DD071_MarcaVeiculo: currentEndereco?.csicp_dd071.DD071_MarcaVeiculo,
        DD071_NumTransp: currentEndereco?.csicp_dd071.DD071_NumTransp,
        DD071_PlacaReboque: currentEndereco?.csicp_dd071.DD071_PlacaReboque,
        DD071_UFReboque_ID: currentEndereco?.csicp_dd071.DD071_UFReboque_ID,
        DD071_NumTranspReboq: currentEndereco?.csicp_dd071.DD071_NumTranspReboq,
        DD071_Vagao: currentEndereco?.csicp_dd071.DD071_Vagao,
        DD071_Balsa: currentEndereco?.csicp_dd071.DD071_Balsa,
        DD071_Endereco_ID: currentEndereco?.csicp_dd071.DD071_Endereco_ID,
        DD070_Send_Email: currentEndereco?.csicp_dd071.DD070_Send_Email,
        DD070_Send_SMS: currentEndereco?.csicp_dd071.DD070_Send_SMS,
        DD070_User_Operador_ID: currentEndereco?.csicp_dd071.DD070_User_Operador_ID,
        DD071_Data_Caixa: currentEndereco?.csicp_dd071.DD071_Data_Caixa,
        DD071_SMS: currentEndereco?.csicp_dd071.DD071_SMS,
        DD071_indFinal: currentEndereco?.csicp_dd071.DD071_indFinal,
        dd071_Ident_Estrangeiro: currentEndereco?.csicp_dd071.dd071_Ident_Estrangeiro
    };

    return iSaveEndereco;
}

export async function handleRI_CancelaRI({ In_GG071_ID }: { In_GG071_ID: number }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await RI_CancelaRI({ In_GG071_ID: In_GG071_ID, cs_tenant_id: currentUser.TenantId });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function handleRI_RequisitarRI({ In_GG071_ID }: { In_GG071_ID: number }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await RI_RequisitarRI({ In_GG071_ID: In_GG071_ID, cs_tenant_id: currentUser.TenantId });
        return response;
    } catch (error) {
        throw error;
    }
}


export async function handleRI_Gerar_RI({ cs_pv_id, In1_gg001_ID_AlmoxSaida }:
    { cs_pv_id: string, In1_gg001_ID_AlmoxSaida: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await RI_Gerar_RI({ cs_cliente_id: currentUser.UsuarioId, cs_pv_id: cs_pv_id, cs_tenant_id: currentUser.TenantId, In1_gg001_ID_AlmoxSaida: In1_gg001_ID_AlmoxSaida });
        return response;
    } catch (error) {
        throw error;
    }
}


export async function handleRI_ExcluirRI({ In_GG071_ID, In_GG071_STA_ID }: { In_GG071_ID: number, In_GG071_STA_ID: number }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await RI_ExcluirRI({ In_GG071_ID: In_GG071_ID, In_GG071_STA_ID: In_GG071_STA_ID, cs_tenant_id: currentUser.TenantId });
        return response;
    } catch (error) {
        throw error;
    }
}


export async function handleCsicp_gg001_Get_List_Almox(): Promise<{ key: string, value: string }[]> {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await csicp_gg001_Get_List_Almox({ cs_tenant_id: currentUser.TenantId });
        const listFilterdByEstab = response.Almoxarifados.filter((item) => item.csicp_bb001.ID == currentUser.EstabelecimentoId)

        const listFilteredByTipo = listFilterdByEstab.filter((item) => {
            return item.csicp_gg001_TAlmox.Label === "Loja" ||
                item.csicp_gg001_TAlmox.Label === "Depósito" ||
                item.csicp_gg001_TAlmox.Label === "WWS";
        });

        const listMapped = listFilteredByTipo.map(item => ({
            key: item.csicp_gg001.Id,
            value: item.csicp_gg001.GG001_DescAlmox
        }))
        return listMapped;
    } catch (error) {
        throw error;
    }
}


export async function handleLiberarPV({ cs_bb012_id, cs_pv_id }: { cs_bb012_id: string, cs_pv_id: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await LiberarPV({ cs_tenant_id: currentUser.TenantId, cs_bb012_id: cs_bb012_id, cs_sy001_id: currentUser.UsuarioId, cs_pv_id: cs_pv_id, cs_isComprometer: true });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function handleRetornarPV({ cs_pv_id }: { cs_pv_id: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para salvar os dados de endereço
        const response = await RetornarPV({ cs_tenant_id: currentUser.TenantId, cs_sy001_id: currentUser.UsuarioId, cs_pv_id: cs_pv_id });
        return response;
    } catch (error) {
        throw error;
    }
}



export async function handleGenerateReport({ cs_pv_id }: { cs_pv_id: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        let nomeCot: any = ''
        const res = await getSimpleData(DataKey.NomeCotacao)
        // Faz uma requisição para salvar os dados de endereço
        //@ts-ignore
        const response = await GenerateReport({ cs_tenant_id: currentUser.TenantId, cs_nome_cot: res, cs_pv_id: cs_pv_id });
        return response;
    } catch (error) {
        throw error;
    }
}


export async function handleListaPrecoTabela({ cs_pdt_kdx }: { cs_pdt_kdx: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;
        // Faz uma requisição para salvar os dados de endereço
        const response = await getListPrecoTabela({ cs_tenant_id: currentUser.TenantId, cs_pdt_dkx: cs_pdt_kdx });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function handlePostPrecoTabelaNovoLista({ cs_atendimento_prod_id, cs_num_preco, cs_valor }:
    { cs_atendimento_prod_id: string, cs_num_preco: number, cs_valor: number }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;


        const currentPvId = await getSimpleData(DataKey.CurrentPV)
        // Faz uma requisição para salvar os dados de endereço
        const response = await postPrecoTabelaNovoLista({
            cs_tenant_id: currentUser.TenantId,
            //@ts-ignore
            cs_atendimento_id: currentPvId,
            cs_atendimento_prod_id: cs_atendimento_prod_id,
            cs_num_preco: cs_num_preco,
            cs_valor: cs_valor,
            cs_usuario_id: currentUser.UsuarioId
        });
        return response;
    } catch (error) {
        throw error;
    }
}



export async function handlePatchAtualizaObservacaoPV({ cs_new_obs }:
    { cs_new_obs: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        const currentPvId = await getSimpleData(DataKey.CurrentPV)

        // Faz uma requisição para salvar os dados de endereço
        const response = await patchAtualizaObservaçãoPV({
            cs_tenant_id: currentUser.TenantId,
            cs_atendimento_id: currentPvId as string,
            In_Obs: cs_new_obs
        });
        return response;
    } catch (error) {
        throw error;
    }
}


export async function handlePatchAtualizaObservacaoContribuintePV({ DD075_ID, DD075_OBS }:
    { DD075_ID: string, DD075_OBS: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        const currentPvId = await getSimpleData(DataKey.CurrentPV)

        // Faz uma requisição para salvar os dados de endereço
        const response = await patchAtualizaObservaçãoContribuintePV({
            cs_tenant_id: currentUser.TenantId,
            cs_atendimento_id: currentPvId as string,
            DD075_Id: DD075_ID,
            DD075_Obs: DD075_OBS
        });
        return response;
    } catch (error) {
        throw error;
    }
}






