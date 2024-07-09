export interface CS_IResBB026_Estatica {
    csicp_bb026_Classe: Csicp_bb026_Classe[]
    csicp_bb026_Tipo: Csicp_bb026_Tipo[]
    csicp_bb026_Vin: Csicp_bb026_Vin[]
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

export interface Csicp_bb026_Vin {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

