import { getNoteSerie, setNewCorSerie } from "../../services/api/endpoint/notas/serie/CS_GetSerieNota";
import { IGetDelivery, ISetCorSerie } from "../../services/api/interfaces/notas/CS_INotes";



export async function getNoteSeriesVc(iEntregaGet: IGetDelivery) {
    try {
        const result = await getNoteSerie(iEntregaGet);
        return result;
    } catch (err) {
        throw err;
    }
}


export async function setNewCorSerieVc(iSetCorSerie: ISetCorSerie) {
    try {
        const result = await setNewCorSerie(iSetCorSerie);
        return result;
    } catch (err) {
        throw err;
    }
}
