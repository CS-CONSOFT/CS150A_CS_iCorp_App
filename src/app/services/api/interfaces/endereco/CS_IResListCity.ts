export interface IResCityList {
    PageSize: PageSize
    csicp_aa028_List: Csicp_aa028[]
    Code_Erro: Code_Erro
}

export interface PageSize {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}

export interface Csicp_aa028 {
    csicp_aa028: Csicp_aa0282
    csicp_aa027: Csicp_aa027
}

export interface Csicp_aa0282 {
    Id: string
    AA028_Cidade: string
    AA028_CodgIBGE: number
    UFId: string
    AA028_Export_CidadeID: string
    AA027_Export_UFID: string
}

export interface Csicp_aa027 {
    Id: string
    AA027_Sigla: string
    Descricao: string
    AA027_MascInsEstadual: string
    AA027_CodigoIBGE: number
    PaisId: string
    RegiaoId: string
    AA027_Naturalidade: string
    AA027_Export_UFId: string
    AA025_Export_PaisID: string
    AA026_Export_RegiaoID: string
}

export interface Code_Erro {
    Code_Erro: string
    Mensagem: string
}