import api from "../../axios_config";
import { ICommonResponse } from "../../interfaces/CS_ICommonResponse";

import { IReqGetProductSearch } from "../../interfaces/produto/CS_IReqGetProdutoSearch";
import { IReqUpdatePercentageDiscount } from "../../interfaces/produto/CS_IReqUpdatePercentualDesconto";
import { IReqUpdateTablePrice } from "../../interfaces/produto/CS_IReqUpdateProdutoPreco";
import { IReqUpdateAmount } from "../../interfaces/produto/CS_IReqUpdateQuantidadeProduto";
import { IReqUpdateValueDiscount } from "../../interfaces/produto/CS_IReqUpdateValorDesconto";
import { IResProdutoSearch } from "../../interfaces/produto/CS_IResGetProdutoSearch";
import { IResUltimasVendaProduto } from "../../interfaces/produto/CS_IResGetUltimasVendasProduto";

/** ROTAS DE GET */

/**
 * Rota para buscar todos os produtos baseado nos paramentros de busca
 * @param IGetProdutoSearch parametro de busca
 */
export async function getProducts(IGetProdutoSearch: IReqGetProductSearch): Promise<IResProdutoSearch> {
    try {
        const headerParams = {
            cs_tenant_id: IGetProdutoSearch.cs_tenant_id,
            cs_empresa_id: IGetProdutoSearch.cs_empresa_id
        }

        const urlParams = {
            cs_codigo_produto: IGetProdutoSearch.cs_codigo_produto,
            cs_page_size: IGetProdutoSearch.cs_page_size,
            cs_page: IGetProdutoSearch.cs_page,
            cs_itens_per_page: 5
        }

        const url = `/cs_At_40_LogicoService/rest/CS_Basico_API/PesquisaProdutos3`;
        const response = await api.get(url, { headers: headerParams, params: urlParams })
        let res = response.data as IResProdutoSearch

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
export async function updatePercentDiscount({ pvTenant, productDiscount: percentDiscount }: IReqUpdatePercentageDiscount): Promise<ICommonResponse> {
    try {

        const bodyData = {
            AtendimentoProdutoId: percentDiscount.AtendimentoProdutoId,
            Valor: percentDiscount.Valor
        }
        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${pvTenant.TenantId}/${pvTenant.AtendimentoId}/SalvarDescontoPercentual`

        const result = await api.post(url, bodyData)
        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        return commonResponse
    } catch (error) {
        throw error
    }
}


/**
 * Rota para atualizar o valor de desconto de um produto na 
 * pre venda.
 */
export async function updateValueDiscount({ pvTenant, productDiscount }: IReqUpdateValueDiscount): Promise<ICommonResponse> {
    try {

        const params = {
            AtendimentoProdutoId: productDiscount.AtendimentoProdutoId,
            Valor: productDiscount.Valor
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${pvTenant.TenantId}/${pvTenant.AtendimentoId}/SalvarDescontoValor`

        const result = await api.post(url, params)
        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        console.log(commonResponse);
        return commonResponse
    } catch (error) {
        throw error
    }
}



/**
 * Rota para setar o preço unitário de um produto na 
 * pre venda.
 */
export async function updateUnityPrice({ pvTenant, updatePrice }: IReqUpdateTablePrice): Promise<ICommonResponse> {
    try {
        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: updatePrice.AtendimentoProdutoId,
            PrecoUnitario: updatePrice.Valor
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoUnitario`
        const result = await api.post(url, null, { params: urlParams })
        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        return commonResponse
    } catch (error) {
        throw error
    }
}

/**
 * Rota para setar o preço unitário de um produto na 
 * pre venda.
 */
export async function updateTablePrice({ pvTenant, updatePrice }: IReqUpdateTablePrice): Promise<ICommonResponse> {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: updatePrice.AtendimentoProdutoId,
            PrecoTabela: updatePrice.Valor
        }
        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoTabelaItem`

        const result = await api.post(url, null, { params: urlParams })
        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        return commonResponse

    } catch (error) {
        console.log(error);

        throw error
    }
}


/**
 * Rota para atualizar a quantidade de um protudo na pre venda
 */
export async function updateProductAmount({ pvTenant, AtendimentoProdutoId, productAmount: updateQuantidade }: IReqUpdateAmount): Promise<ICommonResponse> {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: AtendimentoProdutoId
        }

        const bodyParams = {
            Quantidade: updateQuantidade.Quantidade!.toFixed(1)
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/Salvar_Qtd_PV`


        const result = await api.put(url, bodyParams, { params: urlParams })


        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        return commonResponse
    } catch (error) {
        console.log(error);
        throw error

    }
}


/**
 * Rota para atualizar os itens de switch   IsMontar?: boolean,
    IsSaldoNegativo?: boolean,
    IsRequisitar?: boolean,
    IsEntregar?: boolean
 */
export async function updateProductSwitchItens({ pvTenant, AtendimentoProdutoId, productAmount: updateQuantidade }: IReqUpdateAmount): Promise<ICommonResponse> {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: AtendimentoProdutoId
        }

        const bodyParams = {
            IsMontar: updateQuantidade.IsMontar,
            IsSaldoNegativo: updateQuantidade.IsSaldoNegativo,
            IsRequisitar: updateQuantidade.IsRequisitar,
            IsEntregar: updateQuantidade.IsEntregar,
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/Salvar_Set_ItemPV`


        const result = await api.put(url, bodyParams, { params: urlParams })


        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        return commonResponse
    } catch (error) {
        console.log(error);
        throw error

    }
}

export async function getLastSalesProduct({ cs_tenant_id, cs_produto_id, cs_conta_id }:
    { cs_tenant_id: number, cs_produto_id: string, cs_conta_id: string }): Promise<IResUltimasVendaProduto> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_produto_id}/${cs_conta_id}`
    const response = await api.get(url)
    console.log({ cs_tenant_id, cs_conta_id, cs_produto_id });

    console.log(response.data);

    return response.data as IResUltimasVendaProduto
}




