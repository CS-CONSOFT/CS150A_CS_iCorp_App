import { getProducts } from "../../services/api/endpoint/produto/CS_GetProduct";
import { IReqGetProductSearch } from "../../services/api/interfaces/produto/CS_IReqGetProdutoSearch";
import { IResProdutoSearch } from "../../services/api/interfaces/produto/CS_IResGetProdutoSearch";
import { getUserProperties } from "../SharedViewController";


interface IArrayWithPagesAndProductResponse {
    isOk: boolean,
    error?: string,
    pagesArray: number[],
    productResponse?: IResProdutoSearch
}


export async function handleSearchProduct(iGetProductSearch: IReqGetProductSearch): Promise<IArrayWithPagesAndProductResponse> {

    const tenant = (await getUserProperties()).tenantId;
    const estabId = (await getUserProperties()).estabId;
    iGetProductSearch.cs_empresa_id = estabId
    iGetProductSearch.cs_tenant_id = tenant!
    iGetProductSearch.cs_page_size = 4


    const productRes = await getProducts(iGetProductSearch)
    let response: IArrayWithPagesAndProductResponse;
    if (productRes.cs_is_ok) {
        let pagesArray: number[] = []
        for (let i = 1; i <= productRes.c_pages_number; i++) {
            pagesArray.push(i)
        }
        response = {
            isOk: productRes.cs_is_ok,
            pagesArray: pagesArray,
            productResponse: productRes
        }
    } else {
        response = {
            isOk: productRes.cs_is_ok,
            error: productRes.cs_msg,
            pagesArray: []
        }
    }
    return response
}

