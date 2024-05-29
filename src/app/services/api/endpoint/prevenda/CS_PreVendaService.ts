import api from "../../axios_config";
import { IResPreVenda, IGetPreVendaList } from "../../interfaces/prevenda/IPreVenda";

export async function fetchPV(IGetPreVendaList: IGetPreVendaList): Promise<IResPreVenda> {
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
        let res = response.data as IResPreVenda
        return res
    } catch (error) {
        throw error;
    }
}