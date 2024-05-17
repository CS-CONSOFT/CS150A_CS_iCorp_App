import api from "../../axios_config";

export async function searchProduto(IGetProdutoSearch: IGetProductSearch): Promise<IResProductSearch[]> {
    try {
        const headerParams = {
            cs_tenant_id: IGetProdutoSearch.cs_tenant_id,
            cs_estab_id: IGetProdutoSearch.cs_estab_id
        }

        const urlParams = {
            cs_codigo_produto: IGetProdutoSearch.cs_codigo_produto,
            cs_codigo_marca: IGetProdutoSearch.cs_codigo_marca,
            cs_codigo_artigo: IGetProdutoSearch.cs_codigo_artigo,
            cs_codigo_referencia: IGetProdutoSearch.cs_codigo_referencia,
            cs_is_saldo: IGetProdutoSearch.cs_is_saldo,
            cs_is_promotion: IGetProdutoSearch.cs_is_promotion
        }

        const url = `/CsMob2Atendimento/rest/CS_Produto/Consulta`;
        const response = await api.get(url, {
            headers: headerParams,
            params: urlParams
        })
        let res = response.data as IResProductSearch[]
        return res

    } catch (error) {
        console.log(error);
        throw error;
    }
}