export interface IResProdutoGarantia {
    IsOk: boolean
    Msg: string
    Garantia?: Garantia[]
    GarantiaComprada?: GarantiaComprada[]
}

export interface Garantia {
    csicp_ge002: Csicp_ge002
    csicp_ge003: Csicp_ge003
}

export interface Csicp_ge002 {
    ge002_Id: string
    ge002_SeguradoraId: number
    ge002_CodEquipamento: string
    ge002_Codg_Produto: string
    ge002_Desc_Produto: string
    ge002_vFaixaInicial: number
    ge002_vFaixaFinal: number
    ge002_GarantiaFabrica: number
    ge002_GE_Meses: number
    ge002_PremioNet: number
    ge002_vTributos: number
    ge002_pProLabore: number
    ge002_vProLabore: number
    ge002_vPremioTotal: number
    ge002_pCorretagem: number
    ge002_vCorretagem: number
    ge002_TipoCusto: number
    ge002_dtAlteracao: string
    ge002_Alt_UsuarioID: string
    ge002_dtInclusao: string
    ge002_Inc_UsuarioID: string
    ge002_IsGarantiaBasica: boolean
    ge002_TpCusto_Id: number
    ge002_LinhaSAFRA: string
    ge002_CodLinhaSAFRA: number
}

export interface Csicp_ge003 {
    ge003_Id: string
    ge003_SeguradoraID: number
    ge002_id: string
    ge003_ProdutoId: string
    ge003_TempoGFabrica: number
}

export interface GarantiaComprada {
    csicp_ge002: Csicp_ge0022
    csicp_ge011: Csicp_ge011
}

export interface Csicp_ge0022 {
    ge002_Id: string
    ge002_SeguradoraId: number
    ge002_CodEquipamento: string
    ge002_Codg_Produto: string
    ge002_Desc_Produto: string
    ge002_vFaixaInicial: number
    ge002_vFaixaFinal: number
    ge002_GarantiaFabrica: number
    ge002_GE_Meses: number
    ge002_PremioNet: number
    ge002_vTributos: number
    ge002_pProLabore: number
    ge002_vProLabore: number
    ge002_vPremioTotal: number
    ge002_pCorretagem: number
    ge002_vCorretagem: number
    ge002_TipoCusto: number
    ge002_dtAlteracao: string
    ge002_Alt_UsuarioID: string
    ge002_dtInclusao: string
    ge002_Inc_UsuarioID: string
    ge002_IsGarantiaBasica: boolean
    ge002_TpCusto_Id: number
    ge002_LinhaSAFRA: string
    ge002_CodLinhaSAFRA: number
}

export interface Csicp_ge011 {
    ge011_Id: string
    ge002_ID: string
    DD080_ID: string
    dd060_id: string
    ge010_ID: string
    ge011_DataHoraInc: string
}