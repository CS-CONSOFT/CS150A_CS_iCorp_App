import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { getListObras } from "../../services/api/endpoint/obras/CS_Obras";
import { IResGetListObras } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { getObject } from "../../services/storage/AsyncStorageConfig";
import { testFormatDate } from "../../util/FormatText";

export async function handleGetListObras({ currentPage, dataInicio, dataFim }: {
    currentPage?: number,
    /** ENVIAR NO FORMATO YYYY-MM-DD */
    dataInicio: string,
    /** ENVIAR NO FORMATO YYYY-MM-DD */
    dataFim: string
}): Promise<IResGetListObras> {
    const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse

    const dateInitValid = testFormatDate(dataInicio, /^\d{4}-\d{2}-\d{2}$/)
    const dateFinalValid = testFormatDate(dataFim, /^\d{4}-\d{2}-\d{2}$/)

    if (!dateInitValid || !dateFinalValid) {
        throw new Error("O formato da data está inválido!");
    }

    const response = getListObras({
        cs_tenant_id: currentUser.TenantId,
        cs_isCount: false,
        cs_pageSize: 2,
        cs_currentPage: currentPage || 1,
        cs_DataInicio: dataInicio || getCurrentDate(),
        cs_DataFinal: dataFim || getCurrentDate()
    })
    return response
}

function getCurrentDate() {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDay()
    return year + "-" + month + "-" + day
}

export async function handleGetPagesArray(totalItens: number): Promise<number[]> {
    let pageArray: number[] = []
    for (let index = 1; index <= totalItens; index++) {
        pageArray.push(index)
    }
    return pageArray
}