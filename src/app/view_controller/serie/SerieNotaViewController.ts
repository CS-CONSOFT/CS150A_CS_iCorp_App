import { getNoteSerie, setNewCorSerie } from "../../services/api/endpoint/notas/serie/CS_GetSerieNota";
import { IReqGetDelivery } from "../../services/api/interfaces/notas/CS_IReqGetDelivery";
import { IReqSetCorSerie } from "../../services/api/interfaces/notas/CS_IReqSetCorSerie";
import { getUserProperties } from "../SharedViewController";



export async function getNoteSeriesVc(note: string) {
    try {
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            const iEntregaGet: IReqGetDelivery = { note, tenant }
            const result = await getNoteSerie(iEntregaGet);
            return result;
        }
    } catch (err) {
        throw err;
    }
}


export async function setNewCorSerieVc(productId: string, newCorSerie: string) {
    try {
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            const iSetNewCorSerie: IReqSetCorSerie = { productId, tenant, newCorSerie }
            const result = await setNewCorSerie(iSetNewCorSerie);
            return result;
        }
    } catch (err) {
        throw err;
    }
}
