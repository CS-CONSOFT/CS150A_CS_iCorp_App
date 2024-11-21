export interface IResFormPayment {
    Lista_bb026: any
    PageSize: PageSize
    Csicp_bb026: Csicp_bb026[]
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


export interface ResComboBB026 {
    Csicp_bb026: Csicp_bb026[]
    Code_Erro: Code_Erro
}

export interface Csicp_bb026 {
    ID: string
    EmpresaID: string
    BB026_Filial: number
    BB026_Codigo: number
    BB026_FormaPagamento: string
    BB026_DadosChequeSN: number
    BB026_DadosCartaoSN: number
    BB026_VincCupomFiscal: number
    BB026_Classificacao: number
    BB026_CRPlanoContaID: string
    BB026_DBPlanoContaID2: string
    BB026_NRO_Autenticacoes: number
    BB026_Valor_Minimo: number
    BB026_Valor_Maximo: number
    BB026_Troco_Maximo: number
    BB026_PontoSangria: number
    BB026_Tipo: number
    BB026_ParcelaPorDepto: boolean
    BB026_CondPagtoFixoID: string
    BB026_AdministradoraID: string
    BB026_Utiliza_PINPAD: boolean
    BB026_ConsultaCheque: boolean
    BB026_ImpressaoCheque: boolean
    BB026_ChequeBomPara: boolean
    BB026_SolicitaEmitente: boolean
    BB026_SolicitaQtd: boolean
    BB026_SolicitaCondPagto: boolean
    BB026_AceitaPagto: boolean
    BB026_AceitaRecebimento: boolean
    BB026_CapturaRecebPVPDV: boolean
    BB026_PermiteTroco: boolean
    BB026_SangriaAutomatica: boolean
    BB026_NaoAbreGaveta: boolean
    BB026_TipoVinculo_ID: number
    BB026_IsActive: boolean
    BB026_Classe_Id: number
    BB026_Especie_ID: string
    BB026_MeioPagtoImpFiscal: string
    BB026_TipoEspecie: number
    BB026_pComissaoVend: number
    BB026_AceitaVPresente: boolean
    BB026_IsLibEntregaLiq: boolean
    bb026_IsAplicaAprovCond: boolean
    bb026_IsAgrupa: boolean
}

export interface Code_Erro {
    Code_Erro: string
    Mensagem: string
}