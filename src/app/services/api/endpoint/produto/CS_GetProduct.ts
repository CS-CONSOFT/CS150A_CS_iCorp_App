import api from "../../axios_config";
import { IPVProductDiscount, IPVTenant } from "../../interfaces/prevenda/IPreVenda";
import { IGetProductSearch, IResCompleteProdutoSearch, IUpdateAmount, IUpdatePercentageDiscount, IUpdatePrice, IUpdateProdutAmount, IUpdateTablePrice, IUpdateValueDiscount } from "../../interfaces/produto/IProduct";

/** ROTAS DE GET */

/**
 * Rota para buscar todos os produtos baseado nos paramentros de busca
 * @param IGetProdutoSearch parametro de busca
 */
export async function getProducts(IGetProdutoSearch: IGetProductSearch): Promise<IResCompleteProdutoSearch> {
    try {
        const headerParams = {
            cs_tenant_id: IGetProdutoSearch.cs_tenant_id,
            cs_empresa_id: IGetProdutoSearch.cs_empresa_id
        }

        const urlParams = {
            cs_codigo_produto: IGetProdutoSearch.cs_codigo_produto,
            cs_page_size: IGetProdutoSearch.cs_page_size,
            cs_page: IGetProdutoSearch.cs_page
        }

        const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/PesquisaProdutos3`;
        const response = await api.get(url, { headers: headerParams, params: urlParams })
        let res = response.data as IResCompleteProdutoSearch

        return res

    } catch (error) {
        throw error;
    }
}


/** ROTA DE UPDATES */

/**
 * Rota para atualizar o percentual de desconto de um produto na 
 * pre venda.
 */
export async function updatePercentDiscount({ pvTenant, productDiscount: percentDiscount }: IUpdatePercentageDiscount) {
    try {

        const bodyData = {
            AtendimentoProdutoId: percentDiscount.AtendimentoProdutoId,
            Valor: percentDiscount.Valor
        }

        console.log(percentDiscount.Valor);

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${pvTenant.TenantId}/${pvTenant.AtendimentoId}/SalvarDescontoPercentual`

        api.post(url, bodyData)
    } catch (error) {
        throw error
    }
}


/**
 * Rota para atualizar o valor de desconto de um produto na 
 * pre venda.
 */
export async function updateValueDiscount({ pvTenant, productDiscount }: IUpdateValueDiscount) {
    try {
        console.log(productDiscount.Valor);

        const params = {
            AtendimentoProdutoId: productDiscount.AtendimentoProdutoId,
            Valor: productDiscount.Valor
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${pvTenant.TenantId}/${pvTenant.AtendimentoId}/SalvarDescontoValor`

        api.post(url, params)
    } catch (error) {
        throw error
    }
}



/**
 * Rota para setar o preço unitário de um produto na 
 * pre venda.
 */
export async function updateUnityPrice({ pvTenant, updatePrice }: IUpdateTablePrice) {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: updatePrice.AtendimentoProdutoId,
            PrecoUnitario: updatePrice.Valor
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoUnitario`

        api.post(url, null, { params: urlParams })
    } catch (error) {
        throw error
    }
}

/**
 * Rota para setar o preço unitário de um produto na 
 * pre venda.
 */
export async function updateTablePrice({ pvTenant, updatePrice }: IUpdateTablePrice) {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: updatePrice.AtendimentoProdutoId,
            PrecoTabela: updatePrice.Valor
        }
        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoTabelaItem`

        api.post(url, null, { params: urlParams }).then((res) => {
            console.log(res.data.Msg);
        })

    } catch (error) {
        console.log(error);

        throw error
    }
}


/**
 * Rota para atualizar a quantidade de um protudo na pre venda
 */
export async function updateProductAmount({ pvTenant, AtendimentoProdutoId, updateQuantidade }: IUpdateAmount) {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: AtendimentoProdutoId
        }

        const bodyParams = {
            Quantidade: updateQuantidade.Quantidade,
            IsMontar: updateQuantidade.IsMontar,
            IsSaldoNegativo: updateQuantidade.IsSaldoNegativo,
            IsRequisitar: updateQuantidade.IsRequisitar,
            IsEntregar: updateQuantidade.IsEntregar
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoTabelaItem`

        api.post(url, bodyParams, { params: { urlParams } })
    } catch (error) {
        throw error
    }
}




