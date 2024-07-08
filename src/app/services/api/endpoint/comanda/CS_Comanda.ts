import api from "../../axios_config";
import { IResComandaItem } from "../../interfaces/comanda/CS_IResListaComanda";

export async function getListaComanda({ cs_tenant_id }: { cs_tenant_id: number }): Promise<IResComandaItem[]> {
    try {
        const data = {
            Tenant_id: cs_tenant_id,
            In_CurrentPage: 1,
            In_PageSize: 9999
        }

        const response = await api.get('/CSR_BB100_Tabelas_LIB/rest/CS_Comandas/tt010_get_list', { params: data });

        return response.data;
    } catch (err) {
        throw err;
    }
}

