

/**GET PV */
export interface IReqGetPreVendaList {
    cs_tenant_id: number,
    cs_is_count: boolean,
    cs_current_page: number,
    cs_page_size: number,
    cs_data_inicial: string,
    cs_data_final: string,
    cs_consulta: boolean,
    cs_faturado: boolean,
    cs_usuario_id: string,
    cs_acessa_todas_pv: number
}
