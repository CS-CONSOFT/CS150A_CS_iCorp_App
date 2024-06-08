
import api from "../../../axios_config";
import { IReqGetDelivery } from "../../../interfaces/notas/CS_IReqGetDelivery";
import { IReqSetDelivery } from "../../../interfaces/notas/CS_IReqSetDelivery";
import { IResDadosNota } from "../../../interfaces/notas/CS_IResNoteData";




export async function getEtrgNota(entregaGet: IReqGetDelivery): Promise<IResDadosNota> {
    try {
        const params = {
            prm_chave: entregaGet.note,
            prm_Tenant_ID: entregaGet.tenant
        }

        const response = await api.get('Csws_Apps/rest/CS_WS_Entrega_Balcao/Get_Etrg_Nota', { params });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function setEtrgEfetuada(setEntrega: IReqSetDelivery): Promise<Boolean> {
    try {
        const url = `Csws_Apps/rest/CS_WS_Entrega_Balcao/Set_Etrg_Efetuada?prm_dd040_id=${setEntrega.dd40id}&prm_Tenant_ID=${setEntrega.tenant}&prm_usuario_id=${setEntrega.userIdentifier}`;
        const response = await api.post(url);
        return response.data;
    } catch (err) {
        throw err;
    }
}

