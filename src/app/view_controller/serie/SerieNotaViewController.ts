import { getNoteSerie, setNewCorSerie } from "../../services/api/endpoint/notas/serie/CS_GetSerieNota";
import { IGetDelivery, ISetCorSerie } from "../../services/api/interfaces/notas/CS_INotes";
import { getUserProperties } from "../SharedViewController";



export async function getNoteSeriesVc(note: string) {
    try {
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            const iEntregaGet: IGetDelivery = { note, tenant }
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
            const iSetNewCorSerie: ISetCorSerie = { productId, tenant, newCorSerie }
            const result = await setNewCorSerie(iSetNewCorSerie);
            return result;
        }
    } catch (err) {
        throw err;
    }
}
