import api from "../../axios_config";
import { IReqUpdateQtdComanda } from "../../interfaces/comanda/CS_IReqUpdateQtdComandaProd";
import { CS_IResComandaById } from "../../interfaces/comanda/CS_IResComandaById";
import { IResComandaList, Lista_TT010 } from "../../interfaces/comanda/CS_IResListaComanda";

export async function getListaComanda({ cs_tenant_id }: { cs_tenant_id: number }): Promise<IResComandaList> {
    try {
        const data = {
            Tenant_id: cs_tenant_id,
            In_CurrentPage: 1,
            In_PageSize: 9999
        }

        const response = await api.get('/CSR_DD100_PreVenda/rest/CS_Comandas/comanda_get_list', { params: data });

        return response.data;
    } catch (err) {
        throw err;
    }
}


export interface IComandaDataInsert {
    in_comanda_id?: number,
    in_produto_id: string,
    in_estab_id?: string,
    in_sy001_id?: string
}
export async function insereProdutoComanda({ dataInsertComanda, cs_tenant_id }: { dataInsertComanda: IComandaDataInsert, cs_tenant_id: number }) {
    try {
        const data = {
            Tenant_id: cs_tenant_id
        }

        const response = await api.post('/CSR_DD100_PreVenda/rest/CS_Comandas/comanda_insere_produto', dataInsertComanda, { params: data });

        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function removerProdutoComanda({ cs_tenant_id, comanda_produto_id }: { cs_tenant_id: number, comanda_produto_id: number }) {
    try {
        const data = {
            Tenant_id: cs_tenant_id,
            in_tt011_id: comanda_produto_id
        }

        const response = await api.put('/CSR_DD100_PreVenda/rest/CS_Comandas/comanda_update_qtd_produto', { params: data });

        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getComandaById({ cs_tenant_id, comanda_id }: { cs_tenant_id: number, comanda_id: number }): Promise<CS_IResComandaById> {
    try {
        const data = {
            Tenant_id: cs_tenant_id
        }

        const header = {
            id_tt010_id: comanda_id
        }

        const response = await api.get('/CSR_DD100_PreVenda/rest/CS_Comandas/comanda_get', { params: data, headers: header });

        return response.data;
    } catch (err) {
        throw err;
    }
}





export async function updateQtdProdutoComanda({ cs_update_qtd }: { cs_update_qtd: IReqUpdateQtdComanda }): Promise<CS_IResComandaById> {
    try {
        const response = await api.put('/CSR_DD100_PreVenda/rest/CS_Comandas/comanda_update_qtd_produto', cs_update_qtd);

        return response.data;
    } catch (err) {
        throw err;
    }
}