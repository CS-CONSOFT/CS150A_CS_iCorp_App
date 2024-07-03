export interface CS_IResGetConta {
    csicp_bb012: Csicp_bb012
    BB01201: BB01201
    BB01202: BB01202
    BB01206_Endereco: BB01206_Endereco
    Outros_Endereco: Outros_Endereco[]
    Notas: Notas[]
    Retencao_Impostos: Retencao_Impostos[]
    Contatos: Contatos[]
    Membros: Membros[]
    Convenios: Convenios[]
    Avalistas: Avalistas[]
    Bens: Bens[]
    DadosBancarios: DadosBancarios[]
}

export interface Csicp_bb012 {
    csicp_bb012: Csicp_bb0122
    csicp_bb001: Csicp_bb001
    csicp_bb012_ClaCta: Csicp_bb012_ClaCta
    csicp_bb012_GruCta: Csicp_bb012_GruCta
    csicp_bb012_mcred: Csicp_bb012_mcred
    csicp_bb012_MRel: Csicp_bb012_MRel
    csicp_bb012_SitCta: Csicp_bb012_SitCta
    csicp_bb012_StaCta: Csicp_bb012_StaCta
    csicp_bb012_TpCta: Csicp_bb012_TpCta
}

export interface Csicp_bb0122 {
    ID: string
    BB012_Codigo: number
    BB012_Nome_Cliente: string
    BB012_Nome_Fantasia: string
    BB012_Data_Aniversario: string
    BB012_Data_Cadastro: string
    BB012_Telefone: string
    BB012_FaxCelular: string
    BB012_Home_Page: string
    BB012_Email: string
    BB012_Data_Entrada_Sit: string
    BB012_Data_Saida_Sit: string
    BB012_Descricao: string
    BB012_Is_Active: boolean
    BB012_Tipo_Conta_ID: number
    BB012_Grupoconta_ID: number
    BB012_ClasseConta_ID: number
    BB012_StatusConta_ID: number
    BB012_Sit_Conta_ID: number
    BB012_ModRelacao_ID: number
    BB012_Sequence: number
    bb012_dUltAlteracao: string
    bb012_EstabCadID: string
    bb012_KeyAcess: string
    bb012_ID_Indicador: string
    bb012_CountAppMCon: number
    bb012_OriCadastroID: number
}

export interface Csicp_bb001 {
    ID: string
    BB001_CodigoEmpresa: number
    BB001_RazaoSocial: string
    BB001_Endereco: string
    BB001_Complemento: string
    BB001_NumResidencial: string
    BB001_Bairro: string
    BB001_CEP: number
    BB001_CNPJ: number
    BB001_InscEstadual: string
    BB001_InscJunta: number
    BB001_DataInscricao: string
    BB001_NomeFantasia: string
    BB001_Telefone: string
    BB001_Fax: string
    BB001_SlogamEmpresa1: string
    BB001_SlogamEmpresa2: string
    BB001_Email: string
    BB001_HomePage: string
    BB001_RamoEmpresa: number
    BB002_GrupoEmpresa: string
    BB001_CodgClienteAux: number
    BB001_AlmoxPadrao: number
    BB001_AlmoxTransfer: number
    BB001_BDDistribuida: number
    BB001_CNAEFiscal: number
    BB001_SUFRAMAEmp: string
    BB001_InscMunicipal: string
    BB001_PaisID: string
    CidadeId: string
    BB001_UFID: string
    BB001_NomeOficial: string
    BB001_CPF_Oficial: number
    BB001_CodgCartorio: number
    BB001_NomeSubstituto: string
    BB001_DescricaoOficial: string
    BB001_CapitalMunicipio: number
    bb001_Cor1_Hexa: string
    bb001_Cor2_Hexa: string
    BB001_Idioma_ID: number
    BB001_IsActive: boolean
    BB001_Token: string
    BB001_UsuarioSIRC: string
    BB001_SenhaSIRC: string
    BB001_TenantFiscal: number
    bb001_Token_eSitef: string
    bb001_URL_GooglePlay: string
    bb001_URL_AppStore: string
    bb001_CIX: string
    BB001_Chave_APL: string
    BB001_Aut_Token: string
    BB001_Token_CSPIX: string
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

export interface BB01201 {
    csicp_bb01201: Csicp_bb01201
    csicp_bb006: Csicp_bb006
    csicp_bb008: Csicp_bb008
    csicp_bb010: Csicp_bb010
    csicp_bb010_BB012_EntMtgRotaID: Csicp_bb010_BB012_EntMtgRotaID
    csicp_bb010_BB012_VendaRotaID: Csicp_bb010_BB012_VendaRotaID
    csicp_bb011: Csicp_bb011
    csicp_bb01201_con: Csicp_bb01201_con
    csicp_bb01201_jur: Csicp_bb01201_jur
    csicp_bb01201_TGer: Csicp_bb01201_TGer
    csicp_bb025: Csicp_bb025
    csicp_bb029: Csicp_bb029
    csicp_bb037: Csicp_bb037
    csicp_statica_BB012_Requisicao: Csicp_statica_BB012_Requisicao
    csicp_statica_BB012_Revenda: Csicp_statica_BB012_Revenda
}

export interface Csicp_bb01201 {
    Id: string
    BB012_ZonaID: string
    BB012_AtividadeID: string
    BB012_LimiteCredito: number
    BB012_LimCreditoSecun: number
    BB012_LimiteCCredito: number
    BB012_DiaVenctoCartao: number
    BB012_ContaConvenio: string
    BB012_DiasPagtoConv: number
    BB012_PadraoBancoID: string
    BB012_BcoAgenciaConta: string
    BB012_Revenda: number
    BB012_Taxa_Administracao_Con: number
    BB012_Requisicao: number
    BB012_ContaContabil: string
    BB012_HistoricoContabilID: string
    BB012_ContratoCartao: number
    BB012_DataContratoCartao: string
    BB012_DtValidadeCartao: string
    BB012_ModalidadeCredCartao: string
    BB012_PercLimCredito: number
    BB012_PrazoEntregaFornec: number
    BB012_CondPagtoFornec: string
    BB012_NatOperacaoID: string
    BB012_CondPagtoID: string
    BB012_TextoNotaId: string
    BB012_Grau_Risco: string
    BB012_Classe_Credito: string
    BB012_DtValidCadastro: string
    BB012_Perc_ICMS: number
    BB012_CodgCategoria: string
    BB012_CategoriaID: string
    BB012_LimiteCredParcela: number
    BB012_Num_Ult_Fatura: number
    BB012_TotCompraCarnet: number
    BB012_Valor_Entrada: number
    BB012_Maior_Compra: number
    BB012_Menor_Compra: number
    BB012_TotDiasAtraso: number
    BB012_Maior_Atraso: number
    BB012_Menor_Atraso: number
    BB012_MediaDeAtraso: number
    BB012_MaiorSaldo: number
    BB012_NumCompras: number
    BB012_DtPrimCompra: string
    BB012_DtUltCompra: string
    BB012_VlrMaiorPagto: number
    BB012_NumPagtoDia: number
    BB012_NumPagtoAtraso: number
    BB012_SaldoDevedor: number
    BB012_SaldoPedido: number
    BB012_QtdTitProtestado: number
    BB012_UltProtesto: string
    BB012_QtdChqDevolvido: number
    BB012_UltChqDevolvido: string
    BB012_Convenio_ID: number
    BB012_TipoGeracao_ID: number
    BB012_SitEspecial_ID: number
    BB012_EntMtgRotaID: string
    BB012_VendaRotaID: string
    bb012_DiaVenctoID: string
    bb012_CodgBcoDebConta: string
}

export interface Csicp_bb006 {
    ID: string
    BB006_Filial: number
    BB006_CodgBanco: number
    BB006_Banco: string
    BB006_NomeReduzido: string
    BB006_NoBanco: number
    BB006_Agencia: number
    BB006_Agencia_DV: string
    BB006_NoConta: number
    BB006_ContaDV: string
    BB006_DVAgenciaCC: string
    BB006_Endereco: string
    BairroId: string
    CidadeId: string
    BB006_Telefone: string
    BB006_Fax: string
    BB006_Email: string
    BB006_HomePage: string
    BB006_Contato: string
    BB006_DiasRetencao: number
    BB006_DiasRetencaoDesc: number
    BB006_SaldoAtual: number
    BB006_TxCobSimples: number
    BB006_TxDesconto: number
    BB006_ContaContabil: string
    BB006_CodgHistorico: number
    BB006_LimiteCredito: number
    BB006_MsgBoleto: string
    BB006_CodEmpresaBanco: string
    BB006_NroSeqRemessa: number
    BB006_PercComissao: number
    BB006_MovtaTesouraria: number
    BB006_NomeAgencia: string
    BB006_Classificacao: number
    BB006_CodGeracaoCRec: number
    EmpresaId: string
    BB006_TipoCobrancaID: string
    UFId: string
    BB006_IsActive: boolean
    BB006_Banco_ID: number
    BB006_CodCobrador_ID: string
    BB006_API_ID: number
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

export interface Csicp_bb010 {
    ID: string
    BB010_Codigo: number
    BB010_Zona: string
    BB010_Cod_Vendedor: number
    BB010_Col_Preco_Tabela: number
    BB010_Banco01_ID: string
    BB010_Banco02_ID: string
    BB010_Banco03_ID: string
    BB010_CCusto_ID: string
    BB010_Km: number
    BB010_Fone_Contato: string
    BB010_Promotor: number
    BB010_Observacao: string
    BB010_Periodo_Rota: number
    BB010_Periodo_Visita: number
    BB010_Tabela_Preco: string
    BB010_VendedorID: string
    BB010_IsActive: boolean
    BB010_TipoRotaID: number
    bb010_CidadeID: string
}

export interface Csicp_bb010_BB012_EntMtgRotaID {
    ID: string
    BB010_Codigo: number
    BB010_Zona: string
    BB010_Cod_Vendedor: number
    BB010_Col_Preco_Tabela: number
    BB010_Banco01_ID: string
    BB010_Banco02_ID: string
    BB010_Banco03_ID: string
    BB010_CCusto_ID: string
    BB010_Km: number
    BB010_Fone_Contato: string
    BB010_Promotor: number
    BB010_Observacao: string
    BB010_Periodo_Rota: number
    BB010_Periodo_Visita: number
    BB010_Tabela_Preco: string
    BB010_VendedorID: string
    BB010_IsActive: boolean
    BB010_TipoRotaID: number
    bb010_CidadeID: string
}

export interface Csicp_bb010_BB012_VendaRotaID {
    ID: string
    BB010_Codigo: number
    BB010_Zona: string
    BB010_Cod_Vendedor: number
    BB010_Col_Preco_Tabela: number
    BB010_Banco01_ID: string
    BB010_Banco02_ID: string
    BB010_Banco03_ID: string
    BB010_CCusto_ID: string
    BB010_Km: number
    BB010_Fone_Contato: string
    BB010_Promotor: number
    BB010_Observacao: string
    BB010_Periodo_Rota: number
    BB010_Periodo_Visita: number
    BB010_Tabela_Preco: string
    BB010_VendedorID: string
    BB010_IsActive: boolean
    BB010_TipoRotaID: number
    bb010_CidadeID: string
}

export interface Csicp_bb011 {
    ID: string
    BB011_Codigo: number
    BB011_Atividade: string
    BB011_Is_Active: boolean
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

export interface Csicp_bb025 {
    ID: string
    BB025_Filial: number
    BB025_Codigo: string
    BB025_Descricao: string
    BB025_Gera_Duplicata: number
    BB025_Usa_Tabela_Preco: number
    BB025_CodTpTransacao: number
    BB025_TransacaoID: string
    BB025_Grupo_Contabil: number
    BB025_ModDoctoFiscal: string
    BB025_CFOPDentroEstado: string
    BB025_CFOPForaEstado: string
    BB025_BaixaEstoque: number
    EmpresaID: string
    BB025_IsActive: boolean
    BB025_ModDoctoFiscal_ID: number
    bb025_ValorizarPrecoID: number
}

export interface Csicp_bb029 {
    ID: string
    BB029_CodgCategoria: number
    BB029_Categoria: string
    BB029_Is_Active: boolean
}

export interface Csicp_bb037 {
    Id: string
    bb037_Codigo: string
    bb037_Descricao: string
    bb037_Dia: number
    bb037_QtdDiasMCompra: number
    bb037_IsActive: boolean
}

export interface Csicp_statica_BB012_Requisicao {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface Csicp_statica_BB012_Revenda {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface BB01202 {
    csicp_bb01202: Csicp_bb01202
    csicp_aa028: Csicp_aa028
    csicp_bb001_TpTri: Csicp_bb001_TpTri
    csicp_bb012_GruCta: Csicp_bb012_GruCta2
    csicp_bb01202_Dom: Csicp_bb01202_Dom
    csicp_bb01202_ECiv: Csicp_bb01202_ECiv
    csicp_bb01202_Esc: Csicp_bb01202_Esc
    csicp_bb01202_Ins: Csicp_bb01202_Ins
    csicp_bb01202_Ocu: Csicp_bb01202_Ocu
    csicp_bb01202_Res: Csicp_bb01202_Res
    csicp_bb01202_Res_2: Csicp_bb01202_Res_2
    csicp_bb01202_Sex: Csicp_bb01202_Sex
    csicp_bb027_Motivo: Csicp_bb027_Motivo
    csicp_statica_BB012_RegSUFRAMAValido: Csicp_statica_BB012_RegSUFRAMAValido
}

export interface Csicp_bb01202 {
    Id: string
    BB012_CNPJ: number
    BB012_InscEstadual: number
    BB012_SUFRAMA: string
    BB012_RegSUFRAMAValido: number
    BB012_RegJuntaComercial: string
    BB012_DataRegJunta: string
    BB012_Patrimonio: number
    BB012_Capital_Social: number
    BB012_CPF: number
    BB012_RG: number
    BB012_ComplementoRG: string
    BB012_EmissaoRG: string
    BB012_PIS: number
    BB012_ResideDesde: string
    BB012_NroDependentes: number
    BB012_EmpAdmissao: string
    BB012_Emp_Profissao: string
    BB012_ValorRemuneracao: number
    BB012_OutrosRendimentos: number
    BB012_OrigemOutrosRend: string
    BB012_Insc_Est_SNI_ID: number
    BB012_Sexo_ID: number
    BB012_EstadoCivil_ID: number
    BB012_TipoDomicilio_ID: number
    BB012_CompResid01_ID: number
    BB012_CompResid02_ID: number
    BB012_GEscolaridade_ID: number
    BB012_Ocupacao_Id: number
    BB012_NaturalDe_ID: string
    BB012_TpTributacao_ID: number
    BB012_Ident_Estrangeiro: string
    BB012_Empresa: string
    BB012_Emp_Endereco: string
    BB012_Emp_Grupo_ID: number
    BB012_MotDesoneracaoID: number
}

export interface Csicp_aa028 {
    Id: string
    AA028_Cidade: string
    AA028_PercICMSContrib: number
    A028_PercICMSNContrib: number
    A028_PercSubstTribut: number
    A028_MascInsEstadual: string
    A028_PercICMSEntrada: number
    A028_MascIEImpressao: string
    AA028_CodgIBGE: number
    AA028_ZonaFranca: number
    AA028_EstadoBrasil: number
    UFId: string
    AA028_Export_CidadeID: string
    AA027_Export_UFID: string
}

export interface Csicp_bb001_TpTri {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_GruCta2 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    UsoCS: string
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

export interface Csicp_bb01202_Res_2 {
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

export interface Csicp_bb027_Motivo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Conteudo: string
}

export interface Csicp_statica_BB012_RegSUFRAMAValido {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface BB01206_Endereco {
    csicp_bb01206: Csicp_bb01206
    csicp_aa025: Csicp_aa025
    csicp_aa027: Csicp_aa027
    csicp_aa028: Csicp_aa0282
}

export interface Csicp_bb01206 {
    Id: string
    BB012_ID: string
    BB012J_EnderecoID: string
    BB012_Logradouro: string
    BB012_Numero: string
    BB012_Complemento: string
    BB012_Perimetro: string
    BB012_CodgBairro: string
    BB012_Bairro: string
    BB012_Codigo_Cidade: string
    BB012_UF: string
    BB012_CEP: number
    BB012_Codigo_Pais: string
    BB012_Entrega_Logradouro: string
    BB012_Entrega_Numero: string
    BB012_Entrega_Complement: string
    BB012_Entrega_CodgBairro: string
    BB012_Entrega_Bairro: string
    BB012_Entrega_Cod_Cidade: string
    BB012_Entrega_Uf: string
    BB012_Entrega_CEP: number
    BB012_Entrega_Pais: string
    BB012_Entrega_Perimetro: string
    bb012_Telefone: string
    bb012_Celular: string
    bb012_email: string
}

export interface Csicp_aa025 {
    Id: string
    AA025_CodigoPais: number
    AA025_Descricao: string
    AA025_CodigoBACEN: number
    AA025_CodigoSISCOMEX: number
    AA025_IsActive: boolean
    AA025_Nacionalidade: string
    AA025_ISO_3166_A2: string
    AA025_ISO_3166_A3: string
    AA025_ISO_3166_N3: number
    AA025_Export_PaisID: string
    AA025_Codigo_NacoesUnidas: number
}

export interface Csicp_aa027 {
    Id: string
    AA027_Sigla: string
    Descricao: string
    AA027_PercICMSContrib: number
    AA027_PercICMSNContrib: number
    AA027_PercSubstTribut: number
    AA027_MascInsEstadual: string
    AA027_PercICMSEntrada: number
    AA027_MascIEImpressao: string
    AA027_CodigoIBGE: number
    PaisId: string
    RegiaoId: string
    AA027_Naturalidade: string
    AA027_Export_UFId: string
    AA025_Export_PaisID: string
    AA026_Export_RegiaoID: string
}

export interface Csicp_aa0282 {
    Id: string
    AA028_Cidade: string
    AA028_PercICMSContrib: number
    A028_PercICMSNContrib: number
    A028_PercSubstTribut: number
    A028_MascInsEstadual: string
    A028_PercICMSEntrada: number
    A028_MascIEImpressao: string
    AA028_CodgIBGE: number
    AA028_ZonaFranca: number
    AA028_EstadoBrasil: number
    UFId: string
    AA028_Export_CidadeID: string
    AA027_Export_UFID: string
}

export interface Outros_Endereco {
    csicp_bb012j: Csicp_bb012j
    csicp_bb012j_TpEnd: Csicp_bb012j_TpEnd
    Endereco: Endereco
}

export interface Csicp_bb012j {
    ID: string
    BB012_ID: string
    BB012j_Telefone: string
    BB012j_Fax: string
    BB012j_Email: string
    BB012j_TipoEndereco: number
}

export interface Csicp_bb012j_TpEnd {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Endereco {
    csicp_bb01206: Csicp_bb012062
    csicp_aa025: Csicp_aa0252
    csicp_aa027: Csicp_aa0272
    csicp_aa028: Csicp_aa0282
}

export interface Csicp_bb012062 {
    Id: string
    BB012_ID: string
    BB012J_EnderecoID: string
    BB012_Logradouro: string
    BB012_Numero: string
    BB012_Complemento: string
    BB012_Perimetro: string
    BB012_CodgBairro: string
    BB012_Bairro: string
    BB012_Codigo_Cidade: string
    BB012_UF: string
    BB012_CEP: number
    BB012_Codigo_Pais: string
    BB012_Entrega_Logradouro: string
    BB012_Entrega_Numero: string
    BB012_Entrega_Complement: string
    BB012_Entrega_CodgBairro: string
    BB012_Entrega_Bairro: string
    BB012_Entrega_Cod_Cidade: string
    BB012_Entrega_Uf: string
    BB012_Entrega_CEP: number
    BB012_Entrega_Pais: string
    BB012_Entrega_Perimetro: string
    bb012_Telefone: string
    bb012_Celular: string
    bb012_email: string
}

export interface Csicp_aa0252 {
    Id: string
    AA025_CodigoPais: number
    AA025_Descricao: string
    AA025_CodigoBACEN: number
    AA025_CodigoSISCOMEX: number
    AA025_IsActive: boolean
    AA025_Nacionalidade: string
    AA025_ISO_3166_A2: string
    AA025_ISO_3166_A3: string
    AA025_ISO_3166_N3: number
    AA025_Export_PaisID: string
    AA025_Codigo_NacoesUnidas: number
}

export interface Csicp_aa0272 {
    Id: string
    AA027_Sigla: string
    Descricao: string
    AA027_PercICMSContrib: number
    AA027_PercICMSNContrib: number
    AA027_PercSubstTribut: number
    AA027_MascInsEstadual: string
    AA027_PercICMSEntrada: number
    AA027_MascIEImpressao: string
    AA027_CodigoIBGE: number
    PaisId: string
    RegiaoId: string
    AA027_Naturalidade: string
    AA027_Export_UFId: string
    AA025_Export_PaisID: string
    AA026_Export_RegiaoID: string
}

export interface Csicp_aa0282 {
    Id: string
    AA028_Cidade: string
    AA028_PercICMSContrib: number
    A028_PercICMSNContrib: number
    A028_PercSubstTribut: number
    A028_MascInsEstadual: string
    A028_PercICMSEntrada: number
    A028_MascIEImpressao: string
    AA028_CodgIBGE: number
    AA028_ZonaFranca: number
    AA028_EstadoBrasil: number
    UFId: string
    AA028_Export_CidadeID: string
    AA027_Export_UFID: string
}

export interface Notas {
    csicp_bb01203: Csicp_bb01203
}

export interface Csicp_bb01203 {
    Id: string
    BB012_ID: string
    BB012_ContatoID: string
    BB012_CandidatoID: string
    BB043_CampanhaID: string
    BB042_PotencialId: string
    BB040_AtividadeID: string
    BB041_CasoId: string
    BB046_ConcorrenteID: string
    BB012_Nota: string
    BB01203_Is_Active: boolean
}

export interface Retencao_Impostos {
    csicp_bb012o: Csicp_bb012o
    csicp_aa037_Imp: Csicp_aa037_Imp
    csicp_statica_Retem: Csicp_statica_Retem
}

export interface Csicp_bb012o {
    ID: string
    BB012_ID: string
    BB012o_Codigo: number
    BB012o_Retem: number
    BB012o_Percentual: number
    bb012o_Imposto_ID: number
}

export interface Csicp_aa037_Imp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_statica_Retem {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface Contatos {
    csicp_bb01208: Csicp_bb01208
    csicp_bb035: Csicp_bb035
    csicp_bb035_gpa: Csicp_bb035_gpa
}

export interface Csicp_bb01208 {
    Id: string
    BB012_ID: string
    BB012_ContatoID: string
    BB036_CandidatoID: string
    BB043_CampanhaId: string
    BB042_PotencialID: string
    BB040_AtividadeID: string
    BB041_CasoID: string
    BB01208_Is_Active: boolean
    ConcorrenteID: string
    BB01208_GrauParent_ID: number
}

export interface Csicp_bb035 {
    Id: string
    BB035_PrimeiroNome: string
    BB035_Sobrenome: string
    BB035_EMail: string
    BB035_Titulo: string
    BB035_Departamento: string
    BB035_Data_Aniversario: string
    BB035_Telefone: string
    BB035_OutroTelefone: string
    BB035_Celular: string
    BB035_Fax: string
    BB035_TelefoneResidencia: string
    BB035_Descricao: string
    BB035_Assistente: string
    BB035_TelefoneAssist: string
    BB035_EMailSecundario: string
    BB035_CPF: string
    BB035_RG: number
    BB035_Orgao_Exped_RG: string
    BB035_Data_Emissao_RG: string
    BB035_Is_Active: boolean
    BB035_Tratamento_ID: number
    BB035_OrigemContato_ID: number
}

export interface Csicp_bb035_gpa {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Membros {
    csicp_bb01207: Csicp_bb01207
    csicp_bb012: Csicp_bb0122
}

export interface Csicp_bb01207 {
    Id: string
    BB012_Tipo_Reg_MembroConveni: number
    BB012_ID: string
    BB012_MembroID: string
    BB01207_Is_Active: boolean
}

export interface Csicp_bb0122 {
    ID: string
    BB012_Codigo: number
    BB012_Nome_Cliente: string
    BB012_Nome_Fantasia: string
    BB012_Data_Aniversario: string
    BB012_Data_Cadastro: string
    BB012_Telefone: string
    BB012_FaxCelular: string
    BB012_Home_Page: string
    BB012_Email: string
    BB012_Data_Entrada_Sit: string
    BB012_Data_Saida_Sit: string
    BB012_Descricao: string
    BB012_Is_Active: boolean
    BB012_Tipo_Conta_ID: number
    BB012_Grupoconta_ID: number
    BB012_ClasseConta_ID: number
    BB012_StatusConta_ID: number
    BB012_Sit_Conta_ID: number
    BB012_ModRelacao_ID: number
    BB012_Sequence: number
    bb012_dUltAlteracao: string
    bb012_EstabCadID: string
    bb012_KeyAcess: string
    bb012_ID_Indicador: string
    bb012_CountAppMCon: number
    bb012_OriCadastroID: number
}

export interface Convenios {
    csicp_bb01207: Csicp_bb012072
    csicp_bb012: Csicp_bb0122
}

export interface Csicp_bb012072 {
    Id: string
    BB012_Tipo_Reg_MembroConveni: number
    BB012_ID: string
    BB012_MembroID: string
    BB01207_Is_Active: boolean
}

export interface Csicp_bb0122 {
    ID: string
    BB012_Codigo: number
    BB012_Nome_Cliente: string
    BB012_Nome_Fantasia: string
    BB012_Data_Aniversario: string
    BB012_Data_Cadastro: string
    BB012_Telefone: string
    BB012_FaxCelular: string
    BB012_Home_Page: string
    BB012_Email: string
    BB012_Data_Entrada_Sit: string
    BB012_Data_Saida_Sit: string
    BB012_Descricao: string
    BB012_Is_Active: boolean
    BB012_Tipo_Conta_ID: number
    BB012_Grupoconta_ID: number
    BB012_ClasseConta_ID: number
    BB012_StatusConta_ID: number
    BB012_Sit_Conta_ID: number
    BB012_ModRelacao_ID: number
    BB012_Sequence: number
    bb012_dUltAlteracao: string
    bb012_EstabCadID: string
    bb012_KeyAcess: string
    bb012_ID_Indicador: string
    bb012_CountAppMCon: number
    bb012_OriCadastroID: number
}

export interface Avalistas {
    csicp_bb01207: Csicp_bb012072
    csicp_bb012: Csicp_bb0122
}

export interface Csicp_bb012072 {
    Id: string
    BB012_Tipo_Reg_MembroConveni: number
    BB012_ID: string
    BB012_MembroID: string
    BB01207_Is_Active: boolean
}

export interface Csicp_bb0122 {
    ID: string
    BB012_Codigo: number
    BB012_Nome_Cliente: string
    BB012_Nome_Fantasia: string
    BB012_Data_Aniversario: string
    BB012_Data_Cadastro: string
    BB012_Telefone: string
    BB012_FaxCelular: string
    BB012_Home_Page: string
    BB012_Email: string
    BB012_Data_Entrada_Sit: string
    BB012_Data_Saida_Sit: string
    BB012_Descricao: string
    BB012_Is_Active: boolean
    BB012_Tipo_Conta_ID: number
    BB012_Grupoconta_ID: number
    BB012_ClasseConta_ID: number
    BB012_StatusConta_ID: number
    BB012_Sit_Conta_ID: number
    BB012_ModRelacao_ID: number
    BB012_Sequence: number
    bb012_dUltAlteracao: string
    bb012_EstabCadID: string
    bb012_KeyAcess: string
    bb012_ID_Indicador: string
    bb012_CountAppMCon: number
    bb012_OriCadastroID: number
}

export interface Bens {
    csicp_bb012c: Csicp_bb012c
}

export interface Csicp_bb012c {
    ID: string
    BB012_ID: string
    BB012c_DescEmpresa: string
    BB012c_ProprietRamo: string
    BB012c_Valor_Media: number
    BB012c_Fone: string
    BB012c_Is_Active: boolean
}

export interface DadosBancarios {
    csicp_bb012q: Csicp_bb012q
}

export interface Csicp_bb012q {
    Id: string
    BB012_ID: string
    BB012_Agencia: string
    BB012_Conta: string
    BB012_ValorFinanciamento: number
    BB012_NomeGerente: string
    BB012_Telefone: string
    BB012_FaxCelular: string
    BB012_HomePage: string
    BB012_Email: string
    bb012q_Is_Active: boolean
}