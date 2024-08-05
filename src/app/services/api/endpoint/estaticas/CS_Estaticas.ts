import api from "../../axios_config";
import { CS_IResEstaticasBB012 } from "../../interfaces/estaticas/CS_IResEstaticasBB012";
import { CS_IResEstaticasPV } from "../../interfaces/estaticas/CS_IResEstaticasPV";

export async function getEstaticasBB012(): Promise<CS_IResEstaticasBB012> {
    try {
        const response = await api.get('/CSR_BB100_ClienteFor_IS/rest/CS_Contas/bb012_Estaticas');

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}

export async function getEstaticasPV(): Promise<CS_IResEstaticasPV> {
    try {
        const response = await api.get('/CSR_DD100_PreVenda/rest/CS_Get_All_EstaticasPV/Get_All_EstaticasPV');

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}
