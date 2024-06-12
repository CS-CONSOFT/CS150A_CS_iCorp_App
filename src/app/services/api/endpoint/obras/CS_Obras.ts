import api from "../../axios_config";
import { IReqGetListObras } from "../../interfaces/obras/CS_IReqGetListObras";
import { IResGetListObras } from "../../interfaces/obras/CS_IResGetListObras";

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