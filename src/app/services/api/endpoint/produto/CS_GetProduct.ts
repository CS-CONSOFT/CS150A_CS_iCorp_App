import api from "../../axios_config";

export async function searchProduto(IGetProdutoSearch: IGetProductSearch): Promise<IResProductSearch[]> {
    try {
 
        const params = {
            TenantId: IGetProdutoSearch.cs_tenant_id,
            EmpresaID: IGetProdutoSearch.cs_estab_id,
            CodProd: IGetProdutoSearch.cs_codigo_produto,
            DescMarca: IGetProdutoSearch.cs_codigo_marca,
            DescArtigo: IGetProdutoSearch.cs_codigo_artigo,
            Referencia: IGetProdutoSearch.cs_codigo_referencia,
            IsComSaldo: IGetProdutoSearch.cs_is_saldo
        }

        console.log(params);
        

        const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/PesquisaProdutos2`;
        const response = await api.get(url, {params})

        console.log(response.data.List);

        let res = response.data.List as IResProductSearch[]
        return res

    } catch (error) {
        console.log(error);
        throw error;
    }
}