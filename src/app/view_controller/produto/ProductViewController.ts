import { searchProduto } from "../../services/api/endpoint/produto/CS_GetProduct";
import { getUserProperties } from "../SharedViewController";


interface IArrayWithPagesAndProductResponse {
    pagesArray: number[],
    productResponse: IResCompleteProdutoSearch
}


export async function searchProductVc(iGetProductSearch: IGetProductSearch): Promise<IArrayWithPagesAndProductResponse> {

    const tenant = (await getUserProperties()).tenantId;
    const estabId = (await getUserProperties()).estabId;

    iGetProductSearch.cs_empresa_id = estabId
    iGetProductSearch.cs_tenant_id = tenant!
    iGetProductSearch.cs_page_size = 4

    let productRes = await searchProduto(iGetProductSearch)

    let pagesArray: number[] = []
    for (let i = 1; i <= productRes.c_pages_number; i++) {
        pagesArray.push(i)
    }

    const response: IArrayWithPagesAndProductResponse = {
        pagesArray: pagesArray,
        productResponse: productRes
    }

    return response
}