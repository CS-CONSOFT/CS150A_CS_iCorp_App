export interface IReqGetProductSearch {
    cs_tenant_id?: number,
    cs_empresa_id?: string,
    cs_page_size?: number,
    cs_page?: number,

    cs_codigo_produto: string,
    cs_descricao_reduzida: string,

    cs_is_com_saldo?: boolean
}
