export interface CS_IResEstaticasBB012 {
    csicp_bb012_ClaCta: Csicp_bb012_ClaCta[]
    csicp_bb012_GruCta: Csicp_bb012_GruCta[]
    csicp_bb012j_TpEnd: Csicp_bb012j_TpEnd[]
    csicp_bb012_mcred: Csicp_bb012_mcred[]
    csicp_bb012_MRel: Csicp_bb012_MRel[]
    csicp_bb012mdc: Csicp_bb012mdc[]
    csicp_bb012mtd: Csicp_bb012mtd[]
    csicp_bb012_SitCta: Csicp_bb012_SitCta[]
    csicp_bb012_StaCta: Csicp_bb012_StaCta[]
    csicp_bb012_TpCta: Csicp_bb012_TpCta[]
    csicp_bb01201_con: Csicp_bb01201_con[]
    csicp_bb01201_jur: Csicp_bb01201_jur[]
    csicp_bb01201_TGer: Csicp_bb01201_TGer[]
    csicp_bb01202_Dom: Csicp_bb01202_Dom[]
    csicp_bb01202_ECiv: Csicp_bb01202_ECiv[]
    csicp_bb01202_Esc: Csicp_bb01202_Esc[]
    csicp_bb01202_Ins: Csicp_bb01202_Ins[]
    csicp_bb01202_Ocu: Csicp_bb01202_Ocu[]
    csicp_bb01202_Res: Csicp_bb01202_Res[]
    csicp_bb01202_Sex: Csicp_bb01202_Sex[]
}

export interface Csicp_bb012_ClaCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_GruCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    UsoCS: string
}

export interface Csicp_bb012j_TpEnd {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_mcred {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_MRel {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012mdc {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012mtd {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_SitCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodgCS: number
}

export interface Csicp_bb012_StaCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_TpCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01201_con {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01201_jur {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodgCS: number
}

export interface Csicp_bb01201_TGer {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01202_Dom {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01202_ECiv {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01202_Esc {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    LabelMeuCrediario: string
}

export interface Csicp_bb01202_Ins {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01202_Ocu {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01202_Res {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb01202_Sex {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}