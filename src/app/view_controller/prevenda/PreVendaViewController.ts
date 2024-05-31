import { fetchPVs, insertProductToPv } from "../../services/api/endpoint/prevenda/CS_PreVendaService";
import { IGetPreVendaList, IInsertPvResponse, IInsertPvWhitoutService, IResPreVenda } from "../../services/api/interfaces/prevenda/IPreVenda";
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
    cs_codigo_produto: string, cs_conta_id: string, cs_entrega: boolean,
    cs_quantidade: number, cs_tipo_atendimento: number,
    cs_atendimento?: string
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