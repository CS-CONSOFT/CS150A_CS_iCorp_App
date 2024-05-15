
import { getEtrgNota, setEtrgEfetuada } from "../../../services/api/endpoint/notas/entrega/CS_EntregNota";
import { IGetDelivery, ISetEntrega } from "../../../services/api/interfaces/notas/CS_INotes";


export async function getEntrgNotaVc(iEntregaGet: IGetDelivery) {
    try {
        const result = await getEtrgNota(iEntregaGet);
        return result;
    } catch (err) {
        throw err;
    }
}


export async function setEntrNotaVc(ISetEntrega: ISetEntrega) {
    try {
        const result = await setEtrgEfetuada(ISetEntrega);
        return result;
    } catch (err) {
        throw err;
    }
}
