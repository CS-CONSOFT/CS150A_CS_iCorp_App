import api from "../../axios_config";
import { ICommonResponse } from "../../interfaces/CS_ICommonResponse";

import { IReqGetProductSearch } from "../../interfaces/produto/CS_IReqGetProdutoSearch";
import { IReqUpdatePercentageDiscount } from "../../interfaces/produto/CS_IReqUpdatePercentualDesconto";
import { IReqUpdateTablePrice } from "../../interfaces/produto/CS_IReqUpdateProdutoPreco";
import { IReqUpdateAmount } from "../../interfaces/produto/CS_IReqUpdateQuantidadeProduto";
import { IReqUpdateValueDiscount } from "../../interfaces/produto/CS_IReqUpdateValorDesconto";
import { IResProdutoGarantia } from "../../interfaces/produto/CS_IResGetProdutoGarantia";
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

        let urlParams = {}
        /**
         * se tiver descricao do produto, ira pesquisar pela descricao, se nao
         * ira pesquisar pelo codigo
         */
        if (IGetProdutoSearch.cs_codigo_produto) {
            urlParams = {
                cs_page_size: IGetProdutoSearch.cs_page_size,
                cs_page: IGetProdutoSearch.cs_page,
                cs_itens_per_page: 5,
                cs_codigo_produto: IGetProdutoSearch.cs_codigo_produto
            }
        } else if (IGetProdutoSearch.cs_descricao_reduzida) {
            urlParams = {
                cs_page_size: IGetProdutoSearch.cs_page_size,
                cs_page: IGetProdutoSearch.cs_page,
                cs_itens_per_page: 5,
                cs_descricao_artigo: IGetProdutoSearch.cs_descricao_reduzida
            }
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
export async function updatePercentDiscount({ pvTenant, usuarioId, productDiscount: percentDiscount }: IReqUpdatePercentageDiscount): Promise<ICommonResponse> {
    try {

        const bodyData = {
            AtendimentoProdutoId: percentDiscount.AtendimentoProdutoId,
            Valor: percentDiscount.Valor
        }
        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${pvTenant.TenantId}/${pvTenant.AtendimentoId}/SalvarDescontoPercentual?IN_UsuarioID=${usuarioId}`

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
export async function updateValueDiscount({ pvTenant, usuarioId, productDiscount }: IReqUpdateValueDiscount): Promise<ICommonResponse> {
    try {

        const params = {
            AtendimentoProdutoId: productDiscount.AtendimentoProdutoId,
            Valor: productDiscount.Valor
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${pvTenant.TenantId}/${pvTenant.AtendimentoId}/SalvarDescontoValor?IN_UsuarioID=${usuarioId}`

        const result = await api.post(url, params)
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
export async function updateUnityPrice({ pvTenant, usuarioId, updatePrice }: IReqUpdateTablePrice): Promise<ICommonResponse> {
    try {
        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: updatePrice.AtendimentoProdutoId,
            IN_UsuarioID: usuarioId,

        }
        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoUnitario`
        const result = await api.post(url, { prm_valor: updatePrice.Valor }, { params: urlParams })
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
export async function updateTablePrice({ pvTenant, usuarioId, updatePrice }: IReqUpdateTablePrice): Promise<ICommonResponse> {
    try {

        const urlParams = {
            TenantId: pvTenant.TenantId,
            AtendimentoId: pvTenant.AtendimentoId,
            AtendimentoProdutoId: updatePrice.AtendimentoProdutoId,
            IN_UsuarioID: usuarioId,
        }


        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/SetPrecoTabelaItem`

        const result = await api.post(url, { prm_valor: updatePrice.Valor }, { params: urlParams })

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
            IsClienteRetira: updateQuantidade.IsClienteRetira
        }

        const url = `/cs_At_40_LogicoService/rest/CS_PV_API/Salvar_Set_ItemPV`


        const result = await api.put(url, bodyParams, { params: urlParams })


        const commonResponse: ICommonResponse = {
            IsOk: result.data.IsOk,
            Msg: result.data.Msg
        }
        return commonResponse
    } catch (error) {
        throw error

    }
}

export async function getLastSalesProduct({ cs_tenant_id, cs_produto_id, cs_conta_id }:
    { cs_tenant_id: number, cs_produto_id: string, cs_conta_id: string }): Promise<IResUltimasVendaProduto> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_produto_id}/${cs_conta_id}`
    const response = await api.get(url)

    return response.data as IResUltimasVendaProduto
}


/**
 * Salvar desconto global na pv
 */
export async function saveGlobalDiscount({ cs_tenant_id, cs_atendimento_id, cs_valor_percentual }:
    { cs_tenant_id: number, cs_atendimento_id: string, cs_valor_percentual: number }): Promise<ICommonResponse> {

    console.log("Data: " + cs_valor_percentual);
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/${cs_tenant_id}/${cs_atendimento_id}/SalvarDescontoGlobal`
    const response = await api.post(url, null, { params: { ValorPercentual: cs_valor_percentual } })
    return response.data as ICommonResponse
}

//Retorna se um produto possui ou não garantia estendida comprada.
export async function getProdutoGarantia({ cs_tenant_id, cs_produto_id, cs_atendimento_produto_id }:
    { cs_tenant_id: number, cs_produto_id: string, cs_atendimento_produto_id: string }): Promise<IResProdutoGarantia> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/GE_ProdutoComGarantia`
    const response = await api.get(url, {
        params: {
            TenantId: cs_tenant_id,
            ProdutoId: cs_produto_id,
            AtendimentoProdutoId: cs_atendimento_produto_id
        }
    })
    return response.data as IResProdutoGarantia
}

export async function comprarGarantiaEstendida({ cs_tenant_id, cs_atendimento_produto_id, ge002id }:
    { cs_tenant_id: number, ge002id: string, cs_atendimento_produto_id: string }): Promise<ICommonResponse> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/GE_ComprarGarantiaEstendida`
    const response = await api.get(url, {
        params: {
            TenantId: cs_tenant_id,
            SeguroId: ge002id,
            AtendimentoProdutoId: cs_atendimento_produto_id
        }
    })
    return response.data as IResProdutoGarantia
}

export async function removerGarantiaEstendida({ cs_tenant_id, GE011_Id }:
    { cs_tenant_id: number, GE011_Id: string }): Promise<ICommonResponse> {
    const url = `/cs_At_40_LogicoService/rest/CS_PV_API/GE_RemoverGarantiaEstendida`
    const response = await api.get(url, {
        params: {
            TenantId: cs_tenant_id,
            GE011_Id: GE011_Id,
        }
    })
    return response.data as IResProdutoGarantia
}





