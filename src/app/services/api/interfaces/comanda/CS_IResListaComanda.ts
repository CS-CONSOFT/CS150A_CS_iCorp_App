export interface IResComandaList {
    Contador: Contador
    Lista_TT010: Lista_TT010[]
    Code_Retorno: Code_Retorno
}

export interface Contador {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}

export interface Lista_TT010 {
    csicp_tt010: Csicp_tt010
    csicp_tt010_sta: Csicp_tt010_sta
    TotalValor: number
}

export interface Csicp_tt010 {
    tt010_Id: number
    tt010_EstabID: string
    tt010_ProtocolNumber: string
    tt010_datahora: string
    tt010_IPEstacao: string
    tt010_Status: number
    dd070_ID: string
    tt010_PropUsuarioID: string
}

export interface Csicp_tt010_sta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodgCS: number
}

export interface Code_Retorno {
    Code_Erro: string
    Mensagem: string
}