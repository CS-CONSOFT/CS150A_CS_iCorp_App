

/**GET PV */
export interface IReqGetPreVendaList {
    cs_tenant_id: number,
    cs_empresa_id: string,
    cs_usuario_id: string,
    cs_situacao_id?: number,
    cs_data_inicial: string,
    cs_data_final: string,
    cs_pesquisa?: string
}
