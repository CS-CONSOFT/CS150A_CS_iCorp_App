import { getEtrgNota, setEtrgEfetuada } from "../../services/api/endpoint/notas/entrega/CS_EntregNota";
import { IReqGetDelivery } from "../../services/api/interfaces/notas/CS_IReqGetDelivery";
import { IReqSetDelivery } from "../../services/api/interfaces/notas/CS_IReqSetDelivery";

export async function getEntrgNotaVc(iEntregaGet: IReqGetDelivery) {
    try {
        const result = await getEtrgNota(iEntregaGet);
        return result;
    } catch (err) {
        throw err;
    }
}


export async function setEntrNotaVc(ISetEntrega: IReqSetDelivery) {
    try {
        const result = await setEtrgEfetuada(ISetEntrega);
        return result;
    } catch (err) {
        throw err;
    }
}
