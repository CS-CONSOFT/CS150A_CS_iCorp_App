import { searchProduto } from "../../services/api/endpoint/produto/CS_GetProduct";


interface SearchResult {
    IsOk: Boolean,
    products?: IResProductSearch[]
}

export async function searchProductVc(IProdutoSearch: IGetProductSearch) {
    let result: SearchResult = {
        IsOk: false
    };
    if (IProdutoSearch.cs_tenant_id !== null
        || IProdutoSearch.cs_tenant_id !== undefined
        || IProdutoSearch.cs_tenant_id !== -1
    ) {
        let response = await searchProduto(IProdutoSearch)
        result.products = response as IResProductSearch[]
        result.IsOk = true
    } else {
        result.IsOk = false
    }
    return result
}