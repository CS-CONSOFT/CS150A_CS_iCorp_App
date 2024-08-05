export interface CS_IResEstaticasPV {
    csicp_dd070_TpAte: Csicp_dd070_TpAte[]
    csicp_dd070_Sit: Csicp_dd070_Sit[]
    csicp_dd080_Estq: Csicp_dd080_Estq[]
    csicp_dd999_nfcf: Csicp_dd999_nfcf[]
    csicp_dd040_TNt: Csicp_dd040_TNt[]
    csicp_dd040_iPres: Csicp_dd040_iPres[]
    csicp_dd041_Frete: Csicp_dd041_Frete[]
}

export interface Csicp_dd070_TpAte {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd070_Sit {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd080_Estq {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd999_nfcf {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd040_TNt {
    Id: number
    Label: string
    Order: number
    FinalidadeEmissao: string
    TipoOperacao: number
    Is_Active: boolean
    cs_codg: number
}

export interface Csicp_dd040_iPres {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    indPres: string
}

export interface Csicp_dd041_Frete {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codigo_SEFAZ: string
}