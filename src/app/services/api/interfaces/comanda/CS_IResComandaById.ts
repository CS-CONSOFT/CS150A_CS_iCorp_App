export interface CS_IResComandaById {
    csicp_tt010: Csicp_tt010
    produtos_comanda: Produtos_comanda[]
}

export interface Csicp_tt010 {
    csicp_tt010: Csicp_tt0102
    csicp_tt010_sta: Csicp_tt010_sta
}

export interface Csicp_tt0102 {
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

export interface Produtos_comanda {
    csicp_tt011: Csicp_tt011
    csicp_gg008: Csicp_gg008
    csicp_gg520: Csicp_gg520
    Kardex: Kardex
    Imagens: Imagens[]
}

export interface Csicp_tt011 {
    tt011_Id: number
    tt010_id: number
    tt011_SaldoID: string
    tt011_qVendida: number
    tt011_pVenda: number
    tt011_UsuarioPropID: string
}

export interface Csicp_gg008 {
    Id: string
    GG008_FilialID: string
    GG008_Filial: number
    GG008_CodgProduto: number
    GG008_Tipo_Produto: string
    GG008_Codigo_Grupo: number
    GG008_Codigo_Classe: number
    GG008_Codigo_Artigo: number
    GG008_Codigo_Marca: number
    GG008_Codigo_Padrao: string
    GG008_Codigo_Tipo: string
    GG008_Codigo_Qualidade: string
    GG008_TipoProdutoID: string
    GG008_GrupoID: string
    GG008_SubGrupoID: string
    GG008_ClasseID: string
    GG008_ArtigoID: string
    GG008_MarcaID: string
    GG008_LinhaID: string
    GG008_PadraoID: string
    GG008_TipoID: string
    GG008_QualidadeID: string
    GG008_Referencia: string
    GG008_Complemento: string
    GG008_CodIndustrial: string
    GG008_SafraDiaMesInicio: number
    GG008_Safra_DiaMesFim: number
    GG008_Etiqueta: number
    GG008_NCM: number
    GG008_EX_NCM: string
    GG008_NCMID: string
    GG008_Peso_Bruto: number
    GG008_Peso_Liquido: number
    GG008_Tamanho: number
    GG008_Largura: number
    GG008_Espessura: number
    GG008_Embalagem_1: string
    GG008_Embalagem_2: string
    GG008_Qtd_Embalagem_1: number
    GG008_Qtd_Embalagem_2: number
    GG008_ComprimentoArmaz: number
    GG008_Largura_Armaz: number
    GG008_Altura_Armaz: number
    GG008_Fator_Armaz: number
    GG008_Empilhagem: number
    GG008_DescReduzida: string
    GG008_Usa_Nro_Serie: number
    GG008_ReferSimilar: string
    GG008_PrzGaranCompra: number
    GG008_PrzGaranVenda: number
    GG008_Servico: number
    GG008_Montavel: number
    GG008_ClassifVegetal: string
    GG008_Is_Active: boolean
    GG008_EstadoFisico_ID: number
    GG008_TpGarantiaCompra_ID: number
    GG008_TpGarantiaVenda_ID: number
    GG008_TipoKit_ID: number
    GG008_Pesavel_ID: number
    GG008_IsForaLinha: boolean
    GG008_DataForaLinha: string
    GG008_ListServico_ID: number
    GG008_GrpSubGrupoID: number
    GG008_Sequence: number
    GG008_dUltAlteracao: string
    GG008_Entregar: number
    GG008_Isecommerce: boolean
    GG008_ANP_ID: string
    GG008_dRegistro: string
    gg008_UsuarioPropID: string
    gg008_UsuarioAltID: string
    gg008_IERelevanteID: number
    gg008_CNPJFabricante: string
    gg008_NomeFabricante: string
    GG008_vICMSProprio: number
    gg008_DescEspecial1: string
    gg008_DescEspecial2: string
}

export interface Csicp_gg520 {
    Id: string
    GG520_FilialID: string
    GG520_Kardex_ID: string
    GG520_AlmoxID: string
    GG520_CodBarras_ID: string
    GG520_NS_NumeroSaldo: number
    GG520_DescricaoSaldo: string
    GG520_Filial: number
    GG520_CodAlmoxarifado: number
    GG520_Produto: number
    GG520_Saldo: number
    GG520_QtdComprometida: number
    GG520_Qtd_Producao: number
    GG520_Qtd_Empenho: number
    GG520_Qtd_Reserva: number
    GG520_QNPT: number
    GG520_QTNP: number
    GG520_UltInventario: string
    GG520_UltFechamento: string
    GG520_QtdUltFechamento: number
    GG520_Item_em_Contagem: boolean
    GG520_ProxInventario: string
    GG520_UltRecebimento: string
    GG520_QtdUltRecebto: number
    GG520_Ultima_Venda: string
    GG520_Qtde_Ult_Venda: number
    GG520_QtdPedidoCompra: number
    GG520_Lote: string
    GG520_SubLote: string
    GG520_Descricao_Lote: string
    GG520_CompraID: string
    GG520_Codg_Fornecedor: number
    GG520_ContaID: string
    GG520_UsuarioID: string
    GG520_Data_Fabricacao: string
    GG520_Data_Validade: string
    GG520_Dias_Validade: number
    GG520_Docto: number
    GG520_Serie: string
    GG520_CompraEntrada: string
    GG520_GradeLinhaID: string
    GG520_GradeColunaID: string
    GG520_CodgGradeLinha: string
    GG520_CodgGradeColuna: string
    GG520_Estq_Minimo: number
    GG520_EstoqueMaximo: number
    GG520_LocalizacaoWMS: string
    GG520_SuperPromocao: number
    GG520_PeriodicidadeInv: number
    GG520_ExibirEmConsulta: boolean
    GG520_SaldoZeroDesabAutom: boolean
    GG520_PermiteTroca: boolean
    GG520_vBCSTRet: number
    GG520_vICMSSTRet: number
    GG520_IsActive: boolean
    GG520_TimeStamp: string
    gg520_IsPDV: boolean
    gg520_vICMSSubstituto: number
    gg520_VFutura_SaldoID: string
}

export interface Kardex {
    PrecoVenda: number
}

export interface Imagens {
    Id: string
    GG008c_FilialID: string
    GG008c_ProdutoID: string
    GG008c_Filial: number
    GG008c_CodgProduto: number
    GG008c_Descricao: string
    GG008c_Ordem: number
    GG008c_TipoRegistro: string
    GG008c_Objeto: string
    GG008c_FileType: string
    GG008c_Texto: string
    FILENAME: string
    GG008c_IsPadrao: boolean
    gg008c_Path: string
    gg008c_Size: number
    gg008c_CDNId: number
}