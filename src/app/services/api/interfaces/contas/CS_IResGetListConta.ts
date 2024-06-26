export interface IResGetListConta {
    PageSize: PageSize
    csicp_bb012: Csicp_bb012[]
    Code_Erro: Code_Erro
}

export interface PageSize {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
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

export interface Code_Erro {
    Code_Erro: string
    Mensagem: string
}