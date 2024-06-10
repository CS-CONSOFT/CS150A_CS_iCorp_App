
import api from "../../../axios_config";
import { IReqGetDelivery } from "../../../interfaces/notas/CS_IReqGetDelivery";
import { IReqSetCorSerie } from "../../../interfaces/notas/CS_IReqSetCorSerie";
import { IResDadosNota } from "../../../interfaces/notas/CS_IResNoteData";



export async function getNoteSerie(entregaGet: IReqGetDelivery): Promise<IResDadosNota> {
    try {
        const params = {
            prm_chave: entregaGet.note,
            prm_Tenant_ID: entregaGet.tenant
        }

        const response = await api.get('Csws_Apps/rest/CS_WS_NOTA_Cor_Sr/Get_Etrg_Nota', { params });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function setNewCorSerie(iSetCorSerie: IReqSetCorSerie) {
    try {
        const url = `/Csws_Apps/rest/CS_WS_NOTA_Cor_Sr/Set_Etrg_Prod_Cor_serie?prm_Tenant_ID=${iSetCorSerie.tenant}&prm_produto_ID=${iSetCorSerie.productId}&prm_cor_serie=${iSetCorSerie.newCorSerie}`;
        await api.post(url);
    } catch (err) {
        throw err;
    }
}
