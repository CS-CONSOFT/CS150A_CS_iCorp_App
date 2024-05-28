import { fetchPV } from "../../services/api/endpoint/prevenda/CS_PreVendaService";
import { IGetPreVendaList, IResPreVenda } from "../../services/api/interfaces/prevenda/IPreVenda";
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
    const result = fetchPV(IGetPreVendaList)
    return result
}