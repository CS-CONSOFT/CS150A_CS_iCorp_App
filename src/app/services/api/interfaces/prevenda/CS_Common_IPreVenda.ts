
/**
 * INTERFACE PADRAO DE PV, TENANT E PRODUTO PV ID
 */
export interface IPVTenant {
    TenantId: number,
    AtendimentoId: string
}

/**
 * INTERFACE RELACIONADA AOS DESCONTOS DE PRODUTOS DA PV
 */
export interface IPVProductDiscount {
    AtendimentoProdutoId: string,
    Valor: number
}

export interface IResGetPv {
    DD070_Nota: DD070_Nota
    DD071_Enderecos: DD071_Enderecos[]
    DD072_FormaPagtos: DD072_FormaPagtos[]
    DD074_InfoAdicionais: DD074_InfoAdicionais[]
    DD075_Obs: DD075_Obs[]
    DD080_Produtos: DD080_Produtos[]
    DD077_DoctoArrecadacao: DD077_DoctoArrecadacao[]
    Requisicao: Requisicao
}

export interface DD070_Nota {
    csicp_dd070: Csicp_dd070
    csicp_dd070_TpAte: Csicp_dd070_TpAte
    csicp_bb001: Csicp_bb001
    csicp_bb012: Csicp_bb012
    csicp_bb01206: Csicp_bb01206
    csicp_aa025: Csicp_aa025
    csicp_aa027: Csicp_aa027
    csicp_aa028: Csicp_aa028
    csicp_dd070_Estq: Csicp_dd070_Estq
    csicp_dd040_iPres: Csicp_dd040_iPres
    csicp_dd070_Sit: Csicp_dd070_Sit
    csicp_dd040_TNt: Csicp_dd040_TNt
    csicp_dd041_Frete: Csicp_dd041_Frete
    csicp_bb005: Csicp_bb005
    csicp_bb006: Csicp_bb006
    csicp_bb007: Csicp_bb007
    csicp_sy001_Atendente: Csicp_sy001_Atendente
    csicp_sy001_Proprietario: Csicp_sy001_Proprietario
    csicp_bb025: Csicp_bb025
    csicp_bb012_Avalista: Csicp_bb012_Avalista
    csicp_bb012_ContaReal: Csicp_bb012_ContaReal
    csicp_dd999_nfcf: Csicp_dd999_nfcf
    csicp_aa013_CtrlSerie: Csicp_aa013_CtrlSerie
    csicp_bb027_Motivo: Csicp_bb027_Motivo
    csicp_statica_dd070_vICMSDesonSub_ID: Csicp_statica_dd070_vICMSDesonSub_ID
}

export interface Csicp_dd070 {
    DD070_Id: string
    DD070_EMPRESAID: string
    DD070_Filial: number
    DD070_TipoAtendimento_ID: number
    DD070_Tipo_Movimento: number
    DD070_Serie: string
    DD070_No_NF: number
    DD070_No_Pedido: number
    DD070_No_Estacao: number
    DD070_No_PDV: number
    DD070_Serie_Cupom: string
    DD070_No_Cupom: number
    DD070_Data_Emissao: string
    DD070_DataHoraEmissao: string
    DD070_Conta_ID: string
    DD070_ContaReal_ID: string
    DD070_Avalista_ID: string
    DD070_CCusto_ID: string
    DD070_AgCobrador_ID: string
    DD070_Cond_Pagto_ID: string
    DD070_Responsavel_ID: string
    DD070_Comp_Conta_ID: string
    DD070_NatOperacao_ID: string
    DD070_AlmoxDestino_ID: string
    DD070_Codg_CCusto: number
    DD070_Codg_AgCobrador: number
    DD070_Codg_Cond_Pagto: number
    DD070_CodRespVendedor: number
    DD070_CodRespComprador: number
    DD070_CodNatOperacao: string
    DD070_CodAlmoxDestino: number
    DD070_Perc1_Desconto: number
    DD070_Perc2_Desconto: number
    DD070_Perc3_Desconto: number
    DD070_Perc4_Desconto: number
    DD070_Perc5_Desconto: number
    DD070_Total_DescSUFRAMA: number
    DD070_Total_Bruto: number
    DD070_Total_Frete: number
    DD070_Arredondamento: number
    DD070_Frete_CIF_FOB: number
    DD070_Total_Seguro: number
    DD070_Total_OutDespesas: number
    DD070_Desconto: number
    DD070_Acrescimo: number
    DD070_Total_Liquido: number
    DD070_Total_Servico: number
    DD070_PercDescServico: number
    DD070_VlrDescServico: number
    DD070_TotLiqServico: number
    DD070_TotalProd_e_Serv: number
    DD070_Valor_Entrada: number
    DD070_Qtde_Parcelas: number
    DD070_VlrAFinanciar: number
    DD070_Texto: string
    DD070_Qtd_Volumes: number
    DD070_Especie: string
    DD070_Marca: string
    DD070_nVol: string
    DD070_Peso_Liquido: number
    DD070_Peso_Bruto: number
    DD070_Data_Saida: string
    DD070_Hora_Saida: string
    DD070_CodTabelaPreco: string
    DD070_Numero_Preco: number
    DD070_Usuario_Imp: string
    DD070_Data_Impressao: string
    DD070_Hora_Impressao: string
    DD070_Num_Impressoes: number
    DD070_Nro_Contrato: string
    DD070_Nro_Romaneio: number
    DD070_Empenho: string
    DD070_Processo: string
    DD070_No_Requisicao: number
    DD070_Comissao: number
    DD070_Data_Movimento: string
    DD070_Situacao: number
    DD070_Prazo_Entrega: string
    DD070_CI_Orcamento: number
    DD070_Codg_Atendente: number
    DD070_Usuario_AtendenteID: string
    DD070_Usuario_Propr_ID: string
    DD070_ClasseConta_ID: number
    DD070_StatusEstoque: number
    DD070_vBC: number
    DD070_vICMS: number
    DD070_vBCST: number
    DD070_vST: number
    DD070_vII: number
    DD070_vIPI: number
    DD070_vPIS: number
    DD070_vCOFINS: number
    DD070_vFCP: number
    DD070_vFCPST: number
    DD070_vFCPSTRet: number
    DD070_vIPIDevol: number
    DD070_Tot_Valor_Aprox_Imp: number
    DD070_Serv_vCOFINS: number
    DD070_Serv_vBC: number
    DD070_Serv_vISS: number
    DD070_Serv_vPIS: number
    DD070_Serv_dCompet: number
    DD070_Serv_vISSRet: number
    DD070_Serv_vOutro: number
    DD070_Serv_vDescIncond: number
    DD070_Serv_vDescCond: number
    DD070_Serv_cRegTrib: number
    DD070_Flag_Regra: boolean
    DD070_DataValidade: string
    DD070_Nro_PV_DAV: number
    ProcessID: number
    DD070_CFNF_ID: number
    DD040_TpNota_ID: number
    DD070_Ctrl_Serie_NF_ID: string
    DD070_ProtocolNumber: string
    DD070_IsAprovacao: boolean
    DD070_indPres: number
    DD070_finNfe: string
    DD070_vICMSDeson: number
    dd070_vFCPUFDest: number
    dd070_vICMSUFDest: number
    dd070_vICMSUFRemet: number
    DD070_IsVendaCasada: boolean
    dd070_ArquitetoID: string
    DD070_natOp: string
    DD070_TransComTef: number
    DD070_ModalidadeFrete: number
    dd0070_is_PV_Resultante: boolean
    dd070_PV_Grupada_ID: string
    dd070_RomaneioID: number
    dd070_isRomDiverg: boolean
    dd070_isMarcado: boolean
    dd070_IsOrigemCotacao: boolean
    dd070_MotDesoneracaoID: number
    dd070_PICMSDesonerado: number
    dd070_vICMSDesonSub_ID: number
    dd070_CNPJ_Marketplace: string
    dd070_Marketplace: string
    dd070_ChaveCashback: string
    W06b_1_qBCMono: number
    W06c_vICMSMono: number
    W06c_1_qBCMonoReten: number
    W06d_vICMSMonoReten: number
    W06d_1_qBCMonoRet: number
    W06e_vICMSMonoRet: number
    dd070_OrigemRegPV: number
    dd070_KeyeCommerce: string
}

export interface Csicp_dd070_TpAte {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
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

export interface Csicp_dd070_Estq {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd040_iPres {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    indPres: string
}

export interface Csicp_dd070_Sit {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd040_TNt {
    Id: number
    Label: string
    Order: number
    FinalidadeEmissao: string
    TipoOperacao: number
    Is_Active: boolean
    cs_codg: number
}

export interface Csicp_dd041_Frete {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codigo_SEFAZ: string
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

export interface Csicp_sy001_Atendente {
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

export interface Csicp_sy001_Proprietario {
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

export interface Csicp_bb012_Avalista {
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

export interface Csicp_bb012_ContaReal {
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

export interface Csicp_dd999_nfcf {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_aa013_CtrlSerie {
    Id: string
    AA013_Filial: number
    AA013_Serie: string
    AA013_Numero: number
    AA013_Data_Validade: string
    AA013_FilialID: string
    AA013_MOD_ID: number
    aa013_IsUsoContigencia: boolean
}

export interface Csicp_bb027_Motivo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Conteudo: string
}

export interface Csicp_statica_dd070_vICMSDesonSub_ID {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface DD071_Enderecos {
    csicp_dd071: Csicp_dd071
    csicp_aa025: Csicp_aa0252
    csicp_aa027: Csicp_aa0272
    csicp_aa028: Csicp_aa0282
    csicp_bb012: Csicp_bb0122
    csicp_dd041_Docto: Csicp_dd041_Docto
    csicp_dd041_Frete: Csicp_dd041_Frete2
}

export interface Csicp_dd071 {
    DD071_Id: string
    DD070_ID: string
    DD071_Tipo: number
    DD071_Conta_ID: string
    DD071_TipoDocto: number
    DD071_CNPJ_CPF: number
    DD071_IE_RG: number
    DD071_Nome: string
    DD071_Logradouro: string
    DD071_Numero: string
    DD071_Complemento: string
    DD071_Perimetro: string
    DD071_Bairro_ID: string
    DD071_NomeBairro: string
    DD071_CEP: number
    DD071_Pais_ID: string
    DD071_UF_ID: string
    DD071_Cidade_ID: string
    DD071_Telefone: string
    DD071_Email: string
    DD071_SUFRAMA: string
    DD071_ModalidadeFrete: number
    DD071_PlacaVeiculo: string
    DD071_UFVeiculo: string
    DD071_MarcaVeiculo: string
    DD071_NumTransp: string
    DD071_PlacaReboque: string
    DD071_UFReboque_ID: string
    DD071_NumTranspReboq: string
    DD071_Vagao: string
    DD071_Balsa: string
    DD071_Endereco_ID: string
    DD070_Send_Email: boolean
    DD070_Send_SMS: boolean
    DD070_User_Operador_ID: string
    DD071_Data_Caixa: string
    DD071_SMS: string
    DD071_indFinal: string
    dd071_Ident_Estrangeiro: string
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

export interface Csicp_dd041_Docto {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd041_Frete2 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codigo_SEFAZ: string
}

export interface DD072_FormaPagtos {
    csicp_dd072: Csicp_dd072
    csicp_bb008: Csicp_bb008
    csicp_bb026: Csicp_bb026
    MemoriaCalculo: MemoriaCalculo[]
    FormaPagto_Vinculado: FormaPagto_Vinculado
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

export interface FormaPagto_Vinculado {
    V3_csicp_bb008: V3_csicp_bb008
    V2_csicp_bb026: V2_csicp_bb026
    V1_csicp_dd072: V1_csicp_dd072
}

export interface V3_csicp_bb008 {
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

export interface V2_csicp_bb026 {
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

export interface V1_csicp_dd072 {
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

export interface DD074_InfoAdicionais {
    csicp_dd074: Csicp_dd074
}

export interface Csicp_dd074 {
    DD074_Id: string
    DD070_ID: string
    DD074_TipoRegistro: number
    DD074_Descricao_Compl: string
}

export interface DD075_Obs {
    csicp_dd075: Csicp_dd075
    csicp_dd078: Csicp_dd078[]
}

export interface Csicp_dd075 {
    DD075_Id: string
    DD070_ID: string
    DD075_TipoRegistro: number
    DD075_NomeCampo: string
    DD075_Descricao_Compl: string
}

export interface Csicp_dd078 {
    csicp_dd078: Csicp_dd0782
    csicp_aa027: Csicp_aa0272
    csicp_dd048_Tipo: Csicp_dd048_Tipo
}

export interface Csicp_dd0782 {
    DD078_Id: string
    DD075_Id: string
    DD070_ID: string
    DD078_Filial: number
    DD078_CI: number
    DD078_Tipo: number
    DD078_Ind_Operacao: string
    DD078_Ind_Emitente: string
    DD078_Participante: string
    DD078_ChaveAcesso: string
    DD078_Serie: string
    DD078_Sub_Serie: number
    DD078_Num_Docto: number
    DD078_Num_ECF: number
    DD078_Mod_Doc_Fiscal: string
    DD078_Dt_Emis_Docto: string
    DD078_UF_ID: string
    DD078_UF: string
    DD078_CNPJ: number
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

export interface Csicp_dd048_Tipo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface DD080_Produtos {
    csicp_dd080: Csicp_dd080
    csicp_bb007: Csicp_bb0072
    csicp_bb027: Csicp_bb027
    csicp_bb027_Motivo: Csicp_bb027_Motivo2
    csicp_dd080_Estq: Csicp_dd080_Estq
    csicp_dd080_Regras: Csicp_dd080_Regras
    csicp_dd110_mod: Csicp_dd110_mod
    csicp_dd161: Csicp_dd161
    csicp_gg001_Almox: Csicp_gg001_Almox
    csicp_gg007: Csicp_gg007
    csicp_gg007_Un_Sec: Csicp_gg007_Un_Sec
    csicp_gg008: Csicp_gg008
    csicp_gg008_Con: Csicp_gg008_Con
    csicp_gg520: Csicp_gg520
    csicp_gg520_SaldoVirtual: Csicp_gg520_SaldoVirtual
    csicp_statica_dd080_vICMSDesonSub_ID: Csicp_statica_dd080_vICMSDesonSub_ID
    csicp_STRelevancia: Csicp_STRelevancia
    csicp_sy001_UsuarioVendedor: Csicp_sy001_UsuarioVendedor
    DD081_Impostos: DD081_Impostos[]
    DD061_CfgImpostos: DD061_CfgImpostos[]
    DD080_Combustivel: DD080_Combustivel[]
    csicp_sy001_UsuVendedor: Csicp_sy001_UsuVendedor
    csicp_gg008c_Imagens: Csicp_gg008c_Imagens[]
}

export interface Csicp_dd080 {
    DD080_Id: string
    DD080_AtendimentoID: string
    DD080_ProdutoID: string
    DD080_SaldoID: string
    DD080_CodgAlmox: number
    DD080_Codigo_Produto: number
    DD080_Codigo_Barras: number
    DD080_Filial: number
    DD080_CI: number
    DD080_Sequencia: number
    DD080_Lote: string
    DD080_Sub_Lote: string
    DD080_Localizacao: string
    DD080_Codg_Linha: string
    DD080_Codg_Coluna: string
    DD080_Quantidade: number
    DD080_Preco_Tabela: number
    DD080_TotalBruto: number
    DD080_Vlr_Desc_ST1Liq: number
    DD080_pAcrescimo: number
    DD080_vAcrescimo: number
    DD080_Prc_Tabela2: number
    DD080_TpDesc: number
    DD080_Perc_DescProduto: number
    DD080_Valor_DescProduto: number
    DD080_Preco_Unitario: number
    DD080_TotLiqProduto: number
    DD080_ST2_Liquido: number
    DD080_Total_Desc_Cascata: number
    DD080_Total_Desconto: number
    DD080_Frete: number
    DD080_Seguro: number
    DD080_ODespesas: number
    DD080_Total_Liquido: number
    DD080_vDescSUFRAMA: number
    DD080_vDescCupom: number
    DD080_DescProduto: string
    DD060_DescProdSecund: string
    DD080_UN_ID: string
    DD080_Unidade: string
    DD080_Cor_Serie_Merc: string
    DD080_Responsavel_ID: string
    DD080_Resp_Vendedor: number
    DD060_Resp_Comprador: number
    DD080_Base_Calc_ICMS: number
    DD080_Perc_ICMS: number
    DD080_Valor_ICMS: number
    DD080_Base_Calc_Subst: number
    DD080_Lucro_Estimado: number
    DD080_Perc_Subst_Trib: number
    DD080_VlrSubstTribAux: number
    DD080_VlrSubstTribut: number
    DD080_Base_Calc_IPI: number
    DD080_Perc_IPI: number
    DD060_Valor_IPI: number
    DD080_Valor_Aprox_Imp: number
    DD080_PercReducaoBaseICMS: number
    DD080_Qtd_Anterior: number
    DD080_CICronologicaSai: number
    DD080_CICronologicaEnt: number
    DD080_Tamanho: number
    DD080_Largura: number
    DD080_Espessura: number
    DD080_Codg_Transacao: number
    DD080_CFOP: string
    DD080_CST: string
    DD080_Data_Movimento: string
    DD080_Item_Trocado: boolean
    DD080_Ambiente: string
    DD080_Gera_Minuta: boolean
    DD080_Gera_Requisicao: boolean
    DD080_Gera_RequisicaoExterna: boolean
    DD080_Entregar: boolean
    DD080_Transferir: boolean
    DD080_Solicita_NS_Negativa: boolean
    DD080_FilialTransfSaida: number
    DD080_AlmoxTransfSaida: number
    DD080_Prc_Venda_Origin: number
    DD080_PrecoCusto: number
    DD080_PrecoCustoReal: number
    DD080_PrecoCustoMedio: number
    DD080_PrcCustoMedioEnt: number
    DD080_UN_Sec_ID: string
    DD080_Un_Sec: string
    DD080_Un_Sec_TipoConv_ID: number
    DD080_Un_Sec_FatorConv: number
    DD080_Un_Sec_Qtde: number
    DD080_Un_Sec_Valor: number
    DD080_Un_Sec_Valor_Liquido: number
    DD080_Transacao_ID: string
    DD080_StatusEstoque: number
    DD080_RegraAplicada: number
    DD080_SaldoVirtual_ID: string
    dd080_IsFixarCalcImp: boolean
    DD080_Comp_Conta_ID: string
    DD080_isServico: boolean
    dd080_UsuarioVend_ID: string
    dd080_CodBarrasAlfa: string
    dd080_xPed: string
    dd080_nItemPed: number
    dd080_InfAdProd: string
    dd080_AmbienteID: number
    dd080_dPrevEntrega: string
    dd080_ModEntregaID: number
    dd080_FPagtoID: string
    dd080_CondicaoPagtoID: string
    dd080_isSelecionado: boolean
    dd080_cBenefic: string
    dd080_IERelevanteID: number
    dd080_CNPJFabricante: string
    dd080_NomeFabricante: string
    dd080_MotDesoneracaoID: number
    dd080_PICMSDesonerado: number
    dd080_vICMSDesonerado: number
    dd080_vICMSDesonSub_ID: number
    DD080_IsMontar: boolean
    dd080_IsInseridoPDV: boolean
    dd080_PrecoReposicao: number
    dd080_NroPrcTabela: number
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

export interface Csicp_bb027 {
    ID: string
    BB027_Filial: number
    BB027_Codigo: number
    BB027_Descricao: string
    BB027_BaixaEstoque: number
    BB027_GeraCReceber: number
    BB027_AtualizaPrCompra: number
    BB027_CalcSubstituicao: number
    BB027_CalculaISS: number
    BB027_CFOPDentroEstado: string
    BB027_CFOPForaEstado: string
    BB027_AgregaSubsTrib: number
    BB027_DIFA: number
    BB027_ICST: number
    BB027_IRRF: number
    BB027_PIS: number
    BB027_COFINS: number
    BB027_IRPJ: number
    BB027_ICMSDiferido: number
    BB027_GeraEstatistica: number
    BB027_CodgCST: string
    BB027_TransDevolucao: number
    BB027_ReducaoICMS: number
    BB027_ReducaoIPI: number
    BB027_ReducaoICMSST: number
    BB027_ReducaoISS: number
    EmpresaID: string
    BB027_EntSai_ID: number
    BB027_PoderTerc_ID: number
    BB027_CalcICMS_ID: number
    BB027_CalcIPI_ID: number
    BB027_SomaIPI_BaseICMS_ID: number
    BB027_IPI_Bruto_ID: number
    BB027_BaseICMSBrutaLiq_ID: number
    BB027_BaseSubsBrutaLiq_ID: number
    BB027_CFOP_Statica_ID: number
    BB027_tDevolucao_ID: string
    BB027_Regime_ID: number
    BB027_CFOP_ForaEstado_ID: number
    BB027_HashID: string
    BB027_DescNatOper: string
    BB027_CalcAjusteICMS_ID: number
    bb027_CodgAjusteICMS_ID: number
    BB027_pICMS_Diferido: number
}

export interface Csicp_bb027_Motivo2 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Conteudo: string
}

export interface Csicp_dd080_Estq {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_dd080_Regras {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CS_CodgInterno: string
}

export interface Csicp_dd110_mod {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codg_CS: number
}

export interface Csicp_dd161 {
    dd161_Id: number
    dd161_Estab_ID: string
    dd161_DescAmbiente: string
    dd161_DescDetalhada: string
    dd161_UsuarioID: string
    dd161_dCriacao: string
}

export interface Csicp_gg001_Almox {
    Id: string
    GG001_Filial: number
    GG001_FilialID: string
    GG001_CodigoAlmox: number
    GG001_DescAlmox: string
    GG001_IsActive: boolean
    GG001_TipoAlmoxarifado: number
    GG001_RI_ControleQualidade: boolean
    GG001_CapArmaz: number
    GG001_DescNSPadrao: string
}

export interface Csicp_gg007 {
    Id: string
    GG007_Filial: number
    GG007_FilialID: string
    GG007_Unidade: string
    GG007_Descricao: string
    GG007_Is_Active: boolean
    GG007_FormaVenda_ID: number
    gg007_qDecimais: string
}

export interface Csicp_gg007_Un_Sec {
    Id: string
    GG007_Filial: number
    GG007_FilialID: string
    GG007_Unidade: string
    GG007_Descricao: string
    GG007_Is_Active: boolean
    GG007_FormaVenda_ID: number
    gg007_qDecimais: string
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

export interface Csicp_gg008_Con {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
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

export interface Csicp_gg520_SaldoVirtual {
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

export interface Csicp_statica_dd080_vICMSDesonSub_ID {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface Csicp_STRelevancia {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodgCS: string
}

export interface Csicp_sy001_UsuarioVendedor {
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

export interface DD081_Impostos {
    csicp_dd081: Csicp_dd081
    csicp_aa037_Imp: Csicp_aa037_Imp
    csicp_bb027_BCalc: Csicp_bb027_BCalc
    csicp_bb027_SIPI: Csicp_bb027_SIPI
}

export interface Csicp_dd081 {
    DD081_Id: string
    DD080_ID: string
    DD081_Imposto_ID: number
    DD081_ProdutoID: string
    DD081_CodgProduto: number
    DD081_ImpostoID: string
    DD081_Codg_Imposto: string
    DD081_CST: string
    DD081_CFOP: string
    DD081_DescImposto: string
    DD081_Valor_Contabil: number
    DD081_Base_Calculo: number
    DD081_Aliquota: number
    DD081_ValorImposto: number
    DD081_PercReducBase: number
    DD081_vRedBCICMS: number
    DD081_Isento: number
    DD081_Outros: number
    DD081_Cancelamentos: boolean
    DD081_Descontos: number
    DD081_LucroEstimado: number
    DD081_VlTribAux: number
    DD081_pRedBCST: number
    DD081_vBCST: number
    DD081_pICMSST: number
    DD081_vICMSST: number
    dd081_vBCFCP: number
    dd081_pFCP: number
    dd081_vFCP: number
    dd081_vBCFCPST: number
    dd081_pFCPST: number
    dd081_vFCPST: number
    DD081_AgregaSubTribut: number
    DD081_Qtd_Tributada: number
    DD081_Vlr_Unidade: number
    DD081_Vlr_Imposto: number
    DD081_Soma_IPI_Base_ID: number
    DD081_BaseLiqBruta_ID: number
    DD081_vBCSTRet: number
    DD081_vICMSSTRet: number
    DD081_vBCFCPSTRet: number
    DD081_pFCPSTRet: number
    DD081_vFCPSTRet: number
    DD081_vSUFRAMA: number
    DD081_pSUFRAMA: number
    DD081_vBCSUFRAMA: number
    DD081_vICMS_Desonerado: number
    DD081_vPauta_ICMS: number
    dd081_vBCUFDest: number
    dd081_vBCFCPUFDest: number
    dd081_pFCPUFDest: number
    dd081_pICMSUFDest: number
    dd081_pICMSInter: number
    dd081_pICMSInterPart: number
    dd081_vFCPUFDest: number
    dd081_vICMSUFDest: number
    dd081_vICMSUFRemet: number
    dd081_pCredSN: number
    dd081_vCredICMSSN: number
    dd081_impostoDevol: string
    dd081_pDevol: number
    dd081_IPI: string
    dd081_vIPIDevol: number
    DD081_vBCEfet: number
    DD081_pICMSEfet: number
    DD081_vICMSEfet: number
    DD081_pRedBCEfet: number
    DD081_pST: number
    dd081_vICMSSubstituto: number
    DD081_vICMSOp: number
    dd081_pDif: number
    dd081_vICMSDif: number
    N37a_qBCMono: number
    N38_adRemICMS: number
    N39_vICMSMono: number
    N39a_qBCMonoReten: number
    N40_adRemICMSReten: number
    N41_vICMSMonoReten: number
    N47_pRedAdRem: number
    N48_motRedAdRem: string
    N41a_vICMSMonoOp: number
    N42_pDif: number
    N43_vICMSMonoDif: number
    N43a_qBCMonoRet: number
    N44_adRemICMSRet: number
    N45_vICMSMonoRet: number
}

export interface Csicp_aa037_Imp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb027_BCalc {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb027_SIPI {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface DD061_CfgImpostos {
    csicp_dd061_cfgimp: Csicp_dd061_cfgimp
    csicp_aa027: Csicp_aa0272
    csicp_aa030_Regime: Csicp_aa030_Regime
    csicp_aa031_cstori: Csicp_aa031_cstori
    csicp_aa032_csticm: Csicp_aa032_csticm
    csicp_aa033_cstipi: Csicp_aa033_cstipi
    csicp_aa034_cstpis: Csicp_aa034_cstpis
    csicp_aa035_cstcof: Csicp_aa035_cstcof
    csicp_aa038_modst: Csicp_aa038_modst
    csicp_aa039_mp255: Csicp_aa039_mp255
    csicp_bb012_ClaCta: Csicp_bb012_ClaCta
    csicp_bb027: Csicp_bb0272
    csicp_bb027_Imp: Csicp_bb027_Imp
    csicp_bb027_Modal: Csicp_bb027_Modal
    csicp_bb027_Motivo: Csicp_bb027_Motivo2
    csicp_dd040_iPres: Csicp_dd040_iPres2
    sped_in_cEnq_IPI: Sped_in_cEnq_IPI
    sped_in_CFOP: Sped_in_CFOP
    sped_in_CFOP_Excecao: Sped_in_CFOP_Excecao
    sped_in_CFOP_Original: Sped_in_CFOP_Original
    sped_in_nat_bc_CredCof: Sped_in_nat_bc_CredCof
    sped_in_nat_bc_CredPIS: Sped_in_nat_bc_CredPIS
}

export interface Csicp_dd061_cfgimp {
    dd080_id: string
    dd081_bb027_ID: string
    dd081_BB027b_cfgimp_ID: string
    dd081_BB027b_CodgCST: string
    dd081_BB027b_Regime_ID: number
    dd081_BB027b_Origem_ID: number
    dd081_BB027b_CST_ICMS_ID: number
    dd081_BB027B_CST_IPI_ID: number
    dd081_BB027b_CST_PIS_ID: number
    dd081_Nat_Bc_Cred_Pis: number
    dd081_BB027b_CST_COFINS_Id: number
    dd081_Nat_Bc_Cred_Cofins: number
    dd081_BB027b_InforNF: string
    dd081_BB027b_InforIPI: string
    dd081_BB027b_InforPIS: string
    dd081_BB027b_InforCOFINS: string
    dd081_BB027b_ModBC_ID: number
    dd081_BB027b_MotDesoneracao: number
    dd081_bb027B_UF_Dest_ID: string
    dd081_BB027b_ClasseConta_Id: number
    dd081_BB027b_CFOP_Statica_ID: number
    dd081_BB027b_ModalBC_ICMS_ST: number
    dd081_BB027b_Aliquota: number
    dd081_BB027b_ReducaoBase: number
    dd081_BB027b_MP255_ID: number
    dd081_BB027b_ReducaoBCST: number
    dd081_bb027_cfop_id: number
    dd081_bb027b_cfop_excecao_id: number
    dd081_BB027b_cEnquad_IPI_ID: number
    dd081_bb027b_Aliq_InternaUF: number
    dd081_bb027b_indPres: number
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

export interface Csicp_aa030_Regime {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CRT_Digito: string
}

export interface Csicp_aa031_cstori {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CST_Digito: string
}

export interface Csicp_aa032_csticm {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CST_Digito: string
    Regime_ID: number
    Regime: string
    Informativo: string
}

export interface Csicp_aa033_cstipi {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CST_Digito: string
}

export interface Csicp_aa034_cstpis {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CST_Digito: string
}

export interface Csicp_aa035_cstcof {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CST_Digito: string
}

export interface Csicp_aa038_modst {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    digito: string
}

export interface Csicp_aa039_mp255 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb012_ClaCta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb0272 {
    ID: string
    BB027_Filial: number
    BB027_Codigo: number
    BB027_Descricao: string
    BB027_BaixaEstoque: number
    BB027_GeraCReceber: number
    BB027_AtualizaPrCompra: number
    BB027_CalcSubstituicao: number
    BB027_CalculaISS: number
    BB027_CFOPDentroEstado: string
    BB027_CFOPForaEstado: string
    BB027_AgregaSubsTrib: number
    BB027_DIFA: number
    BB027_ICST: number
    BB027_IRRF: number
    BB027_PIS: number
    BB027_COFINS: number
    BB027_IRPJ: number
    BB027_ICMSDiferido: number
    BB027_GeraEstatistica: number
    BB027_CodgCST: string
    BB027_TransDevolucao: number
    BB027_ReducaoICMS: number
    BB027_ReducaoIPI: number
    BB027_ReducaoICMSST: number
    BB027_ReducaoISS: number
    EmpresaID: string
    BB027_EntSai_ID: number
    BB027_PoderTerc_ID: number
    BB027_CalcICMS_ID: number
    BB027_CalcIPI_ID: number
    BB027_SomaIPI_BaseICMS_ID: number
    BB027_IPI_Bruto_ID: number
    BB027_BaseICMSBrutaLiq_ID: number
    BB027_BaseSubsBrutaLiq_ID: number
    BB027_CFOP_Statica_ID: number
    BB027_tDevolucao_ID: string
    BB027_Regime_ID: number
    BB027_CFOP_ForaEstado_ID: number
    BB027_HashID: string
    BB027_DescNatOper: string
    BB027_CalcAjusteICMS_ID: number
    bb027_CodgAjusteICMS_ID: number
    BB027_pICMS_Diferido: number
}

export interface Csicp_bb027_Imp {
    BB027b_Id: string
    BB027_ID: string
    bb027B_Impostos_ID: number
    BB027b_CodgFilial: number
    BB027b_CodgTransacao: number
    BB027b_CodgCST: string
    BB027b_Regime_ID: number
    BB027b_Origem_ID: number
    BB027b_CST_ICMS_ID: number
    BB027B_CST_IPI_ID: number
    BB027b_CST_PIS_ID: number
    BB027b_Nat_Bc_Cred_Pis: number
    BB027b_CST_COFINS_Id: number
    BB027b_Nat_Bc_Cred_Cofins: number
    BB027b_InformacoesNF: string
    BB027b_InformacoesIPI: string
    BB027b_InformacoesPIS: string
    BB027b_InformacoesCOFINS: string
    BB027b_ModBC_ID: number
    BB027b_MotDesoneracaoID: number
    bb027B_UF_Dest_ID: string
    BB027b_ClasseConta_Id: number
    BB027b_ModalBC_ICMS_ST_ID: number
    BB027b_Aliquota: number
    BB027b_ReducaoBase: number
    BB027b_MP255_ID: number
    BB027b_ReducaoBCST: number
    BB027b_CFOP_Statica_ID: number
    BB027b_cEnquad_IPI_ID: number
    BB027b_Aliq_InternaUF: number
    BB027b_HashID: string
    bb027b_fCalcICMSDes_ID: number
    BB027b_pICMS_Diferido: number
    bb027b_vICMSDesonSub_ID: number
    bb027c_indPres: number
    bb027b_pPropocaoDestino: number
}

export interface Csicp_bb027_Modal {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Digito: string
}

export interface Csicp_bb027_Motivo2 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Conteudo: string
}

export interface Csicp_dd040_iPres2 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    indPres: string
}

export interface Sped_in_cEnq_IPI {
    Id: number
    Cod: string
    GrupoCST: string
    Descricao: string
    Is_Active: boolean
}

export interface Sped_in_CFOP {
    Id: number
    Codigo: string
    Descricao: string
    Is_Active: boolean
    Order: number
}

export interface Sped_in_CFOP_Excecao {
    Id: number
    Codigo: string
    Descricao: string
    Is_Active: boolean
    Order: number
}

export interface Sped_in_CFOP_Original {
    Id: number
    Codigo: string
    Descricao: string
    Is_Active: boolean
    Order: number
}

export interface Sped_in_nat_bc_CredCof {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codigo: string
}

export interface Sped_in_nat_bc_CredPIS {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codigo: string
}

export interface DD080_Combustivel {
    csicp_dd080comb: Csicp_dd080comb
    csicp_DD080_Comb_LA01: Csicp_DD080_Comb_LA01[]
}

export interface Csicp_dd080comb {
    Id: number
    dd080_ID: string
    indImport: string
    cUFOrig: string
    pOrig: number
}

export interface Csicp_DD080_Comb_LA01 {
    csicp_dd080combLA01: Csicp_dd080combLA01
}

export interface Csicp_dd080combLA01 {
    Id: number
    dd080_ID: string
    LA02_cProdANP: string
    LA03_descANP: string
    LA03a_pGLP: number
    LA03b_pGNn: number
    LA03c_pGNi: number
    LA03d_vPart: number
    LA04_CODIF: string
    LA05_qTemp: number
    LA17_pBio: number
    LA06_UFCons: string
}

export interface Csicp_sy001_UsuVendedor {
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

export interface Csicp_gg008c_Imagens {
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

export interface DD077_DoctoArrecadacao {
    csicp_dd077: Csicp_dd077
    csicp_aa027: Csicp_aa0272
}

export interface Csicp_dd077 {
    DD077_Id: string
    DD070_ID: string
    DD077_Cod_Doc_Arrec: number
    DD077_UF_Beneficiaria: string
    DD077_UF_Benef: string
    DD077_Num_Doc_Arrec: string
    DD077_Autenticacao: string
    DD077_Valor_Doc_Arrec: number
    DD077_Dt_Vencimento: string
    DD077_Dt_Pagamento: string
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

export interface Requisicao {
    Requisicoes: Requisicoes[]
}

export interface Requisicoes {
    csicp_gg071: Csicp_gg071
    csicp_bb005: Csicp_bb0052
    csicp_gg001_Almox_Entrada: Csicp_gg001_Almox_Entrada
    csicp_gg001_Almox_Saida: Csicp_gg001_Almox_Saida
    csicp_gg041_tpreq: Csicp_gg041_tpreq
    csicp_sy001_UserAtendente: Csicp_sy001_UserAtendente
    csicp_sy001_UserProprietario: Csicp_sy001_UserProprietario
    Produtos: Produtos[]
}

export interface Csicp_gg071 {
    gg071_Id: number
    gg071_EstabID: string
    gg071_ProtocolNumber: string
    gg071_Data_Movimento: string
    gg071_UsuarioID: string
    gg071_Observacao: string
    gg071_CCustoID: string
    gg071_No_Docto: string
    gg071_StatusId: number
    dd070_ID: string
    gg071_AlmoxSaidaID: string
    GG071_AlmoxEntID: string
    gg071_Atendente_UsuarioId: string
    gg071_dAtendimento: string
    gg071_TpReqID: number
    gg071_dhSolicitacao: string
}

export interface Csicp_bb0052 {
    ID: string
    BB005_Filial: number
    BB005_Codigo: number
    BB005_NomeCCusto: string
    BB005_ColunaImpressao: number
    EmpresaId: string
    BB005_IsActive: boolean
}

export interface Csicp_gg001_Almox_Entrada {
    Id: string
    GG001_Filial: number
    GG001_FilialID: string
    GG001_CodigoAlmox: number
    GG001_DescAlmox: string
    GG001_IsActive: boolean
    GG001_TipoAlmoxarifado: number
    GG001_RI_ControleQualidade: boolean
    GG001_CapArmaz: number
    GG001_DescNSPadrao: string
}

export interface Csicp_gg001_Almox_Saida {
    Id: string
    GG001_Filial: number
    GG001_FilialID: string
    GG001_CodigoAlmox: number
    GG001_DescAlmox: string
    GG001_IsActive: boolean
    GG001_TipoAlmoxarifado: number
    GG001_RI_ControleQualidade: boolean
    GG001_CapArmaz: number
    GG001_DescNSPadrao: string
}

export interface Csicp_gg041_tpreq {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_sy001_UserAtendente {
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

export interface Csicp_sy001_UserProprietario {
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

export interface Produtos {
    csicp_gg072: Csicp_gg072
    csicp_gg007: Csicp_gg0072
    csicp_gg007_UN_Sec: Csicp_gg007_UN_Sec2
    csicp_gg008: Csicp_gg0082
    csicp_gg008_Con: Csicp_gg008_Con2
    csicp_gg072_stq: Csicp_gg072_stq
    csicp_gg520_NSSaida: Csicp_gg520_NSSaida
    csicp_gg520_NSEntrada: Csicp_gg520_NSEntrada
}

export interface Csicp_gg072 {
    gg072_Id: number
    gg071_id: number
    gg072_CodBarrasAlfa: string
    gg072_Kardex_ID: string
    gg072_SaidaSALDOID: string
    gg072_UN_ID: string
    gg072_QUANTIDADE: number
    gg072_VALOR_UNITARIO: number
    gg072_QTD_ANTERIOR: string
    gg072_EntradaSALDOID: string
    gg072_UN_Sec_ID: string
    gg072_Un_Sec_TipoConv_ID: number
    gg072_Un_Sec_FatorConv: number
    gg072_Un_Sec_Qtde: number
    gg072_StatusEstqID: number
    dd080_id: string
    gg072_qtdSolicitada: number
}

export interface Csicp_gg0072 {
    Id: string
    GG007_Filial: number
    GG007_FilialID: string
    GG007_Unidade: string
    GG007_Descricao: string
    GG007_Is_Active: boolean
    GG007_FormaVenda_ID: number
    gg007_qDecimais: string
}

export interface Csicp_gg007_UN_Sec2 {
    Id: string
    GG007_Filial: number
    GG007_FilialID: string
    GG007_Unidade: string
    GG007_Descricao: string
    GG007_Is_Active: boolean
    GG007_FormaVenda_ID: number
    gg007_qDecimais: string
}

export interface Csicp_gg0082 {
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

export interface Csicp_gg008_Con2 {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_gg072_stq {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodgCS: number
}

export interface Csicp_gg520_NSSaida {
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

export interface Csicp_gg520_NSEntrada {
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