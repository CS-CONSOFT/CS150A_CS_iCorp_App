
export interface ItemListPaymentForm {
  csicp_dd072: Csicp_dd072
  csicp_bb008: Csicp_bb008
  csicp_bb026: Csicp_bb026
  MemoriaCalculo: MemoriaCalculo[]
}

export interface Csicp_dd072 {
  DD072_Id: string
  DD070_ID: string
  DD072_FPagtoID: string
  DD072_Valor_Pago: number
  DD072_Qtd: number
  DD072_Valor_TotalPago: number
  DD072_Valor_Troco: number
  DD072_CondicaoID: string
  DD072_NroParcelas: number
  DD072_Valor_1aParcela: number
  DD072_AdministradoraID: string
  DD072_Filial: number
  DD072_CI: number
  DD072_Forma_Pagto: number
  DD072_Data_Movimento: string
  DD072_Operador: number
  DD072_RegTransferido: string
  DD072_chave_Vinc_ID: string
  DD072_ProdutoServico: number
  dd072_cNSU: string
  DD072_cDataMovimento: string
  DD072_cPV: number
  DD072_cDoc: string
  DD072_cAut: string
  DD072_cNSUCTF: string
  DD072_cAutorizadora: string
  DD072_cVANCTF: string
  DD072_cInstituicaoCTF: string
  DD072_cNSUCanc: string
  DD072_cDataCanc: string
  dd072_ret_CompEstab: string
  dd072_ret_CompCliente: string
  dd072_ret_CompCanc: string
  dd072_ValorDesconto: string
  dd072_fatorAcresc: number
}

export interface Csicp_bb008 {
  ID: string
  EmpresaID: string
  BB008_Filial: number
  BB008_Codigo: number
  BB008_Condicao_Pagto: string
  BB008_Tipo: number
  BB008_Condicao: string
  BB008_CodFormaPagto: number
  BB008_VlrMaxFormaPagto: number
  BB008_VlrMinFormaPagto: number
  BB008_EntLiquidada: number
  BB008_ParcLiquidadas: number
  BB008_Aprova_Venda: number
  BB008_Perc_Acrescimo: number
  BB008_Perc_Desconto: number
  BB008_IndPrecoVenda: number
  BB008_PercEntrada: number
  BB008_ValorAcrescimo: number
  BB008_FatorJuros: number
  BB008_IsActive: boolean
  BB008_tipoID: number
  BB008_QtdParcela: number
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

export interface MemoriaCalculo {
  csicp_dd073: Csicp_dd073
  csicp_sy001_UserAltVenc: Csicp_sy001_UserAltVenc
}

export interface Csicp_dd073 {
  DD073_Id: string
  DD072_id: string
  DD073_Parcela: number
  DD073_Data_Vencto: string
  DD073_Valor_Parcela: number
  DD073_No_Cartao: string
  DD073_Banco: number
  DD073_Agencia: number
  DD073_DVAgencia: string
  DD073_Conta: number
  DD073_DVConta: string
  DD073_Cheque: number
  DD073_RG: number
  DD073_Telefone: string
  DD073_Compensacao: boolean
  DD073_Cheque_Terceiro: boolean
  DD073_Data_Vencto_Ori: string
  DD073_UsuarioID_AltDtVc: string
}

export interface Csicp_sy001_UserAltVenc {
  Id: string
  SY001_Usuario: string
  SY001_Nome: string
  SY001_Senha: string
  SY001_Bloqueado: boolean
  SY001_Data_Validade: string
  SY001_AutAlterarSenha: number
  SY001_AltSenhaPxLogin: number
  SY001_Expira_Senha: number
  SY001_SenhExpAposNDias: number
  SY001_DtExpiracaoLogin: string
  SY001_DeptoLotado: string
  SY001_Cargo: string
  SY001_Email: string
  SY001_Imagem: string
  SY001_DataUltimoAcesso: string
  UserID: number
  SY001_Idioma_ID: number
  SY001_SenhaCS: string
  SY001_Celular: string
}