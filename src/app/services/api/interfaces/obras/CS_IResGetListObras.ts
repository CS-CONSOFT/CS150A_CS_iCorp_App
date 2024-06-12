export interface IResGetListObras {
    Contador: Contador
    dd190_Obras: Dd190_Obras[]
    Code_Retorno: Code_Retorno
}

export interface Contador {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}

export interface Dd190_Obras {
    DD190_Obra: DD190_Obra
    DD191_Produtos: DD191_Produtos[]
    DD198_Contatos: DD198_Contatos[]
    DD192_FormaPagto: DD192_FormaPagto[]
    DD201_Check: DD201_Check[]
    DD199_RecProdutos: DD199_RecProdutos[]
    DD202_Profissionais: DD202_Profissionais[]
    DD205_Ocorrencias: DD205_Ocorrencias[]
}

export interface DD190_Obra {
    csicp_dd190: Csicp_dd190
    CSColor: CSColor
    csicp_aa025: Csicp_aa025
    csicp_aa027: Csicp_aa027
    csicp_aa028: Csicp_aa028
    csicp_bb001: Csicp_bb001
    csicp_bb012: Csicp_bb012
    csicp_bb01201: Csicp_bb01201
    csicp_bb01202: Csicp_bb01202
    csicp_bb012_ClaCta: Csicp_bb012_ClaCta
    csicp_bb005: Csicp_bb005
    csicp_bb006: Csicp_bb006
    csicp_bb007: Csicp_bb007
    csicp_bb008: Csicp_bb008
    csicp_bb026: Csicp_bb026
    csicp_dd191_st: Csicp_dd191_st
    csicp_dd196: Csicp_dd196
    csicp_dd204: Csicp_dd204
    csicp_sy001_RespTecnico: Csicp_sy001_RespTecnico
    csicp_sy001_UsuarioAlt: Csicp_sy001_UsuarioAlt
    csicp_sy001_UsuarioProp: Csicp_sy001_UsuarioProp
}

export interface Csicp_dd190 {
    dd190_Id: number
    dd190_SKID: string
    dd190_EstabID: string
    dd190_ContaClienteID: string
    dd190_ProtocolNumber: string
    dd190_dMovto: string
    dd190_dInicioExec: string
    dd190_dFinalExec: string
    dd190_RespTecnicoID: string
    dd190_Descricao: string
    dd190_pAndamento: number
    dd190_UsuarioPropID: string
    dd190_dInclusao: string
    dd190_UsuarioAlt: string
    dd190_DAlteracao: string
    dd190_CCusto_ID: string
    dd190_AgCobrador_ID: string
    dd190_Cond_Pagto_ID: string
    dd190_Responsavel_ID: string
    dd190_FormaPagto_ID: string
    dd190_ValorObra: number
    dd190_statusID: number
    dd190_IsGeradoFinanc: boolean
    dd190_CEP: number
    dd190_Logradouro: string
    dd190_Numero: string
    dd190_Complemento: string
    dd190_Perimetro: string
    dd190_Bairro: string
    dd190_Pais_ID: string
    dd190_UF_ID: string
    dd190_Cidade_ID: string
    dd190_tHrTarefa: number
    dd190_tHrExec: number
    dd190_pExecucao: number
    dd190_Tag: string
    dd190_ID_ObraPai: number
    dd196_GrupoID: number
    dd190_ColorId: string
    dd190_TagID: number
}

export interface CSColor {
    Color: string
    Order: number
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

export interface Csicp_bb012 {
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

export interface Csicp_bb012_ClaCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb005 {
    ID: string
    BB005_Filial: number
    BB005_Codigo: number
    BB005_NomeCCusto: string
    BB005_ColunaImpressao: number
    EmpresaId: string
    BB005_IsActive: boolean
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

export interface Csicp_bb007 {
    ID: string
    BB007_Filial: number
    BB007_Codigo: number
    BB007_Responsavel: string
    BB007_NomeReduzido: string
    BB007_Classificacao: number
    BB007_Usuario_ID: string
    BB007_CodgSupervisor: string
    BB007_CodgGerente: string
    BB007_GeraCPagar: number
    BB007_Coms1: number
    BB007_Coms2: number
    BB007_Coms3: number
    BB007_Coms4: number
    BB007_Coms5: number
    BB007_BaseComICMS: number
    BB007_BaseComICMSRet: number
    BB007_BaseComIPI: number
    BB007_BaseComFrete: number
    BB007_BaseComAcrFinan: number
    BB007_BaseComDespesas: number
    BB007_BaseComSeguro: number
    BB007_MaxDescVenda: number
    BB007_CodgCCusto: number
    BB007_CodgAlmox: number
    BB007_CodgAtividade: number
    BB007_Senha: string
    BB007_NomeBanco: string
    BB007_Agencia: string
    BB007_Conta: string
    BB007_CORERegistro: string
    BB007_VinculoCliente: number
    BB007_Observacao: string
    BB007_NroHandHeld: number
    BB007_UserHandHeld: string
    BB007_SenhaHandHeld: string
    BB007_HandHeldSuperv: number
    BB007_ImpHandHeld: string
    BB007_NomeUsuario: string
    BB031_FuncaoID: string
    BB032_CargoID: string
    BB007_DtAdmissao: string
    BB007_DtDemissao: string
    BB007_CodgRegiao: string
    BB007_FaixaAutorizacao: string
    BB007_CCustoID: string
    BB007_AlmoxID: string
    EmpresaID: string
    BB007_IsActive: boolean
    bb007_ContaFornID: string
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

export interface Csicp_dd191_st {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd196 {
    dd196_Id: number
    dd196_Identificador: string
    dd196_Descricao: string
    dd196_SK_ID: string
}

export interface Csicp_dd204 {
    dd204_Id: number
    DD204_DescricaoTag: string
}

export interface Csicp_sy001_RespTecnico {
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

export interface Csicp_sy001_UsuarioAlt {
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

export interface Csicp_sy001_UsuarioProp {
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

export interface DD191_Produtos {
    csicp_dd191: Csicp_dd191
    csicp_dd192_Tp: Csicp_dd192_Tp
    csicp_gg008: Csicp_gg008
    csicp_gg520: Csicp_gg520
    AlteracaoProds: AlteracaoProds[]
}

export interface Csicp_dd191 {
    dd191_ID: number
    dd190_ObraID: number
    dd191_ProdutoID: string
    dd191_SaldoID: string
    dd191_QtdContratada: number
    dd191_QtdEntregue: number
    dd191_QtdSolicitada: number
    dd191_tipoProdutoID: number
    dd191_NroSerie: string
}

export interface Csicp_dd192_Tp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
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

export interface AlteracaoProds {
    csicp_dd195: Csicp_dd195
    csicp_sy001: Csicp_sy001
}

export interface Csicp_dd195 {
    dd195_Id: number
    dd191_Id: number
    dd195_UsuarioPropID: string
    dd195_dInclusao: string
    dd195_Motivo: string
    dd195_QtdAnterior: number
    dd195_QtdNova: number
}

export interface Csicp_sy001 {
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

export interface DD198_Contatos {
    csicp_dd198: Csicp_dd198
}

export interface Csicp_dd198 {
    dd198_Id: number
    dd190_ObraID: number
    dd198_NomeContato: string
    dd198_email: string
    dd198_Celular: string
    dd198_Celular2: string
    dd198_Cargo: string
}

export interface DD192_FormaPagto {
    csicp_dd192: Csicp_dd192
    csicp_bb008: Csicp_bb0082
    csicp_bb026: Csicp_bb0262
    DD192_Memoria: DD192_Memoria[]
}

export interface Csicp_dd192 {
    dd192_Id: number
    dd190_ObraID: number
    dd192_FPagtoID: string
    dd192_Valor_Pago: number
    dd192_Qtd: number
    dd192_Valor_TotalPago: number
    dd192_Valor_Troco: number
    dd192_CondicaoID: string
    dd192_NroParcelas: number
    dd192_Valor_1aParcela: number
    dd192_Data_Movimento: string
    dd192_Chave_Vinc_ID: string
}

export interface Csicp_bb0082 {
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

export interface Csicp_bb0262 {
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

export interface DD192_Memoria {
    csicp_dd193: Csicp_dd193
}

export interface Csicp_dd193 {
    dd193_Id: number
    dd192_MemCalculoID: number
    dd193_Parcela: number
    dd193_Data_Vencto: string
    dd193_Valor_Parcela: number
    dd193_Data_Vencto_Ori: string
    dd193_PfxTitulo: string
    dd193_Titulo: number
    dd193_SfxTitulo: string
    dd193_Titulo_CR_ID: string
}

export interface DD201_Check {
    csicp_dd201: Csicp_dd201
    csicp_dd200: Csicp_dd200
}

export interface Csicp_dd201 {
    dd201_id: number
    dd190_ObraID: number
    dd200_CheckListID: number
    dd201_qtdHrTarefa: number
    dd201_qtdHrExec: number
}

export interface Csicp_dd200 {
    dd200_CheckListId: number
    dd200_Descricao: string
    dd200_qtdEstimada: number
    dd200_IsActive: boolean
}

export interface DD199_RecProdutos {
    csicp_dd199: Csicp_dd199
    csicp_bb007: Csicp_bb0072
    csicp_gg073: Csicp_gg073
    csicp_sy001: Csicp_sy0012
    DD199Det: DD199Det[]
}

export interface Csicp_dd199 {
    dd199_id: number
    dd190_ObraID: number
    dd199_UsuarioID: string
    dd199_DataHora: string
    gg073_ID: string
    bb007_RespID: string
}

export interface Csicp_bb0072 {
    ID: string
    BB007_Filial: number
    BB007_Codigo: number
    BB007_Responsavel: string
    BB007_NomeReduzido: string
    BB007_Classificacao: number
    BB007_Usuario_ID: string
    BB007_CodgSupervisor: string
    BB007_CodgGerente: string
    BB007_GeraCPagar: number
    BB007_Coms1: number
    BB007_Coms2: number
    BB007_Coms3: number
    BB007_Coms4: number
    BB007_Coms5: number
    BB007_BaseComICMS: number
    BB007_BaseComICMSRet: number
    BB007_BaseComIPI: number
    BB007_BaseComFrete: number
    BB007_BaseComAcrFinan: number
    BB007_BaseComDespesas: number
    BB007_BaseComSeguro: number
    BB007_MaxDescVenda: number
    BB007_CodgCCusto: number
    BB007_CodgAlmox: number
    BB007_CodgAtividade: number
    BB007_Senha: string
    BB007_NomeBanco: string
    BB007_Agencia: string
    BB007_Conta: string
    BB007_CORERegistro: string
    BB007_VinculoCliente: number
    BB007_Observacao: string
    BB007_NroHandHeld: number
    BB007_UserHandHeld: string
    BB007_SenhaHandHeld: string
    BB007_HandHeldSuperv: number
    BB007_ImpHandHeld: string
    BB007_NomeUsuario: string
    BB031_FuncaoID: string
    BB032_CargoID: string
    BB007_DtAdmissao: string
    BB007_DtDemissao: string
    BB007_CodgRegiao: string
    BB007_FaixaAutorizacao: string
    BB007_CCustoID: string
    BB007_AlmoxID: string
    EmpresaID: string
    BB007_IsActive: boolean
    bb007_ContaFornID: string
}

export interface Csicp_gg073 {
    gg073_Id: string
    gg073_EstabID: string
    gg073_Data_Movimento: string
    gg073_UsuarioID: string
    gg073_Observacao: string
    gg073_CCustoID: string
    gg073_AlmoxMovD: string
    gg073_AlmoxMovSaida: string
    gg073_dhRegistro: string
    gg073_StatusID: number
    gg073_tMovID: number
    gg073_ValorizarPorID: number
    gg073_tMovimento: number
    gg073_ProtocoloNro: string
    gg073_Qtde_Itens: number
    gg073_ID_ORIG: string
    dd190_ObraID: number
}

export interface Csicp_sy0012 {
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

export interface DD199Det {
    csicp_dd199det: Csicp_dd199det
    csicp_ff002: Csicp_ff002
    csicp_gg074: Csicp_gg074
}

export interface Csicp_dd199det {
    dd199d_Id: number
    dd199_ID: number
    dd199d_MotivoId: string
    dd199_qtd: number
    gg074_id: number
}

export interface Csicp_ff002 {
    Id: string
    FF002_TipoRegistro: number
    FF002_Codigo: number
    FF002_Motivo: string
    FF002_Peso: number
}

export interface Csicp_gg074 {
    gg074_Id: number
    gg073_id: string
    gg074_CodBarrasAlfa: string
    gg074_Kardex_ID: string
    gg074_SaldoID: string
    gg074_UN_ID: string
    gg074_Qtd: number
    gg074_vUnitario: number
    gg074_StatusEstqID: number
    gg074_tMovID: number
    gg074_tProduto: number
}

export interface DD202_Profissionais {
    csicp_dd202: Csicp_dd202
    csicp_dd203_tp: Csicp_dd203_tp
    csicp_bb007: Csicp_bb0072
}

export interface Csicp_dd202 {
    dd202_Id: number
    dd202_ObraID: number
    dd202_UsuarioID: string
    dd202_DataHoraInc: string
    dd202_IsActive: boolean
    dd202_DtHrInativado: string
    dd202_TpProfisionalID: number
}

export interface Csicp_dd203_tp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb0072 {
    ID: string
    BB007_Filial: number
    BB007_Codigo: number
    BB007_Responsavel: string
    BB007_NomeReduzido: string
    BB007_Classificacao: number
    BB007_Usuario_ID: string
    BB007_CodgSupervisor: string
    BB007_CodgGerente: string
    BB007_GeraCPagar: number
    BB007_Coms1: number
    BB007_Coms2: number
    BB007_Coms3: number
    BB007_Coms4: number
    BB007_Coms5: number
    BB007_BaseComICMS: number
    BB007_BaseComICMSRet: number
    BB007_BaseComIPI: number
    BB007_BaseComFrete: number
    BB007_BaseComAcrFinan: number
    BB007_BaseComDespesas: number
    BB007_BaseComSeguro: number
    BB007_MaxDescVenda: number
    BB007_CodgCCusto: number
    BB007_CodgAlmox: number
    BB007_CodgAtividade: number
    BB007_Senha: string
    BB007_NomeBanco: string
    BB007_Agencia: string
    BB007_Conta: string
    BB007_CORERegistro: string
    BB007_VinculoCliente: number
    BB007_Observacao: string
    BB007_NroHandHeld: number
    BB007_UserHandHeld: string
    BB007_SenhaHandHeld: string
    BB007_HandHeldSuperv: number
    BB007_ImpHandHeld: string
    BB007_NomeUsuario: string
    BB031_FuncaoID: string
    BB032_CargoID: string
    BB007_DtAdmissao: string
    BB007_DtDemissao: string
    BB007_CodgRegiao: string
    BB007_FaixaAutorizacao: string
    BB007_CCustoID: string
    BB007_AlmoxID: string
    EmpresaID: string
    BB007_IsActive: boolean
    bb007_ContaFornID: string
}

export interface DD205_Ocorrencias {
    csicp_dd205: Csicp_dd205
    csicp_dd205_stat: Csicp_dd205_stat
    csicp_sy001: Csicp_sy0012
}

export interface Csicp_dd205 {
    dd205_Id: number
    dd205_ObraID: number
    dd205_Ocorrencia: string
    dd205_DataHoraInc: string
    dd205_StatID: number
    dd205_UsuarioPropID: string
    dd205_Responsavel: string
}

export interface Csicp_dd205_stat {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_sy0012 {
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

export interface Code_Retorno {
    Code_Erro: string
    Mensagem: string
}