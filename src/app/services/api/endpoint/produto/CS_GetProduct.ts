import api from "../../axios_config";

export async function searchProduto(IGetProdutoSearch: IGetProductSearch): Promise<IResCompleteProdutoSearch> {
    try {

        const headerParams = {
            cs_tenant_id: IGetProdutoSearch.cs_tenant_id,
            cs_empresa_id: IGetProdutoSearch.cs_empresa_id
        }

        const urlParams = {
            cs_codigo_produto: IGetProdutoSearch.cs_codigo_produto,
            cs_descricao_marca: IGetProdutoSearch.cs_descricao_marca,
            cs_descricao_artigo: IGetProdutoSearch.cs_descricao_artigo,
            cs_descricao_grupo: IGetProdutoSearch.cs_descricao_grupo,
            cs_descricao_reduzida: IGetProdutoSearch.cs_descricao_reduzida,
            cs_descricao_sub_grupo: IGetProdutoSearch.cs_descricao_sub_grupo,
            cs_complemento: IGetProdutoSearch.cs_complemento,
            cs_descricao_classe: IGetProdutoSearch.cs_descricao_classe,
            cs_referencia: IGetProdutoSearch.cs_referencia,
            cs_is_com_saldo: IGetProdutoSearch.cs_is_com_saldo,
            cs_page_size: IGetProdutoSearch.cs_page_size,
            cs_page: IGetProdutoSearch.cs_page
        }

        const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/PesquisaProdutos3`;
        const response = await api.get(url, { headers: headerParams, params: urlParams })
        let res = response.data as IResCompleteProdutoSearch

        return res

    } catch (error) {
        console.log(error);
        throw error;
    }
}