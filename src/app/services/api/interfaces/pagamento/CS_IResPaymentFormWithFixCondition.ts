export interface IResPaymentFormWithFixCondition {
    csicp_bb026: Csicp_bb026
}

export interface Csicp_bb026 {
    csicp_bb026: Csicp_bb0262
    csicp_bb008: Csicp_bb008
    csicp_bb019: Csicp_bb019
    csicp_bb026_Classe: Csicp_bb026_Classe
    csicp_bb026_Tipo: Csicp_bb026_Tipo
    csicp_ff003_TpEsp: Csicp_ff003_TpEsp
    csicp_statica_BB026_DadosCartaoSN: Csicp_statica_BB026_DadosCartaoSN
    csicp_statica_BB026_DadosChequeSN: Csicp_statica_BB026_DadosChequeSN
    csicp_statica_BB026_VincCupomFiscal: Csicp_statica_BB026_VincCupomFiscal
}

export interface Csicp_bb0262 {
    ID: string
    EmpresaID: string
    BB026_Codigo: number
    BB026_FormaPagamento: string
    BB026_DadosChequeSN: number
    BB026_DadosCartaoSN: number
    BB026_VincCupomFiscal: number
    BB026_Tipo: number
    BB026_CondPagtoFixoID: string
    BB026_AceitaRecebimento: boolean
    BB026_CapturaRecebPVPDV: boolean
    BB026_Classe_Id: number
    BB026_Especie_ID: string
    BB026_TipoEspecie: number
    BB026_AceitaVPresente: boolean
}

export interface Csicp_bb008 {
    ID: string
    EmpresaID: string
    BB008_Codigo: number
    BB008_Condicao_Pagto: string
    BB008_Tipo: number
    BB008_Condicao: string
    BB008_EntLiquidada: number
    BB008_ParcLiquidadas: number
    BB008_Aprova_Venda: number
    BB008_IndPrecoVenda: number
    BB008_tipoID: number
    BB008_QtdParcela: number
}

export interface Csicp_bb019 {
    ID: string
    BB019_Administradora: string
    BB019_IsActive: boolean
}

export interface Csicp_bb026_Classe {
    Id: number
    Label: string
    Imagem: string
    Order: number
    Is_Active: boolean
    tPag: string
    UsoCS: string
    URL_FormaPagto: string
}

export interface Csicp_bb026_Tipo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_ff003_TpEsp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    ID_PDV: number
}

export interface Csicp_statica_BB026_DadosCartaoSN {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface Csicp_statica_BB026_DadosChequeSN {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface Csicp_statica_BB026_VincCupomFiscal {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}