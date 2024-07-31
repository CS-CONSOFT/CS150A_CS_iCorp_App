export interface IResFormPayment {
    PageSize: PageSize
    Lista_bb026: Csicp_bb026[]
    Code_Erro: Code_Erro
}

export interface PageSize {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}

export interface Csicp_bb026 {
    ID: string
    EmpresaID: string
    BB026_Codigo: number
    BB026_FormaPagamento: string
    BB026_DadosChequeSN: number
    BB026_DadosCartaoSN: number
    BB026_VincCupomFiscal: number
    BB026_Tipo: number
    BB026_SolicitaCondPagto: boolean
    BB026_CapturaRecebPVPDV: boolean
    BB026_TipoVinculo_ID: number
    BB026_Classe_Id: number
    BB026_Especie_ID: string
    BB026_MeioPagtoImpFiscal: string
    BB026_TipoEspecie: number
    bb026_IsAgrupa: boolean
}

export interface Code_Erro {
    Code_Erro: string
    Mensagem: string
}