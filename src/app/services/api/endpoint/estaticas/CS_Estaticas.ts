import api from "../../axios_config";
import { CS_IResEstaticasBB012 } from "../../interfaces/estaticas/CS_IResEstaticasBB012";

export async function getEstaticasBB012(): Promise<CS_IResEstaticasBB012> {
    try {
        const response = await api.get('/CSR_BB100_ClienteFor_IS/rest/CS_Contas/bb012_Estaticas');

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}
