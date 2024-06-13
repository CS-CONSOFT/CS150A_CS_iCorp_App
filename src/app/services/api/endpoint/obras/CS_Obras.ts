import api from "../../axios_config";
import { IReqGetListObras } from "../../interfaces/obras/CS_IReqGetListObras";
import { Dd190_Obras, IResGetListObras } from "../../interfaces/obras/CS_IResGetListObras";

export async function getListObras(IReqGetListObras: IReqGetListObras): Promise<IResGetListObras> {
    const url = `CSR_DD100_Obra/rest/CS_DD100_Obra/Get_Obra_List`;

    let response;
    try {
        response = await api.get(url, {
            headers: {
                In_Tenant_Id: IReqGetListObras.cs_tenant_id,
                In_IsCount: IReqGetListObras.cs_isCount ? 1 : 0,
                in_currentPage: IReqGetListObras.cs_currentPage,
                in_pageSize: IReqGetListObras.cs_pageSize,
                In_DataInicio: IReqGetListObras.cs_DataInicio,
                In_DataFinal: IReqGetListObras.cs_DataFinal
            }
        })

    } catch (error: any) {
        if (error.response) {
            console.error("Erro na resposta:", error.response.status);
            console.error("Dados do erro:", error.response.data);
        }
    }
    return response?.data as IResGetListObras;
}


export async function getObraById({ cs_tenant_id, cs_obra_id }: { cs_tenant_id: number, cs_obra_id: string }): Promise<Dd190_Obras> {
    const url = `CSR_DD100_Obra/rest/CS_DD100_Obra/Get_Obra_ID`;

    let response;
    try {
        response = await api.get(url, {
            headers: {
                In_Tenant_Id: cs_tenant_id,
                In_dd190_ID: cs_obra_id
            }
        })

    } catch (error: any) {
        if (error.response) {
            console.error("Erro na resposta:", error.response.status);
            console.error("Dados do erro:", error.response.data);
        }
        throw error.response
    }
    return response?.data as Dd190_Obras;
}