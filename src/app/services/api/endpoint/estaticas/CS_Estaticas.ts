import api from "../../axios_config";
import { CS_IResEstaticasBB012 } from "../../interfaces/estaticas/CS_IResEstaticasBB012";
import { CS_IResEstaticasPV } from "../../interfaces/estaticas/CS_IResEstaticasPV";

export async function getEstaticasBB012(): Promise<CS_IResEstaticasBB012> {
    try {
        const response = await api.get('/CSR_BB100_ClienteFor_IS/rest/CS_Contas/bb012_Estaticas');

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}

export async function getEstaticasPV(): Promise<CS_IResEstaticasPV> {
    try {
        const response = await api.get('/CSR_DD100_PreVenda/rest/CS_Get_All_EstaticasPV/Get_All_EstaticasPV');

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}

export async function getEstaticasBB(): Promise<GetEstaticaBB> {
    try {
        const response = await api.get('/CSR_BB100_Tabelas_LIB/rest/CS_Estaticas/Get_Estaticas_BB');

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}


export interface GetEstaticaBB {
    csicp_bb001_Aliq: Csicp_bb001_Aliq[]
    csicp_bb001_AtPJ: Csicp_bb001_AtPJ[]
    csicp_bb001_CapMun: Csicp_bb001_CapMun[]
    csicp_bb001_NatPJ: Csicp_bb001_NatPJ[]
    csicp_bb001_Staimg: Csicp_bb001_Staimg[]
    csicp_bb001_TpTri: Csicp_bb001_TpTri[]
    csicp_bb006_Banco: Csicp_bb006_Banco[]
    csicp_bb008_tipo: Csicp_bb008_tipo[]
    csicp_bb010_tp: Csicp_bb010_tp[]
    csicp_bb019_Tipo: Csicp_bb019_Tipo[]
    csicp_bb026_Classe: Csicp_bb026_Classe[]
    csicp_bb026_Tipo: Csicp_bb026_Tipo[]
    csicp_bb026_Vin: Csicp_bb026_Vin[]
    csicp_bb027a_TpCalc: Csicp_bb027a_TpCalc[]
    csicp_bb027_BCalc: Csicp_bb027_BCalc[]
    csicp_BB027_CICMS: Csicp_BB027_CICMS[]
    csicp_bb027_entsai: Csicp_bb027_entsai[]
    csicp_bb027_fdesen: Csicp_bb027_fdesen[]
    csicp_bb027_Modal: Csicp_bb027_Modal[]
    csicp_bb027_Motivo: Csicp_bb027_Motivo[]
    csicp_bb027_PTerc: Csicp_bb027_PTerc[]
    csicp_bb028_tp: Csicp_bb028_tp[]
    csicp_email: Csicp_email[]
    csicp_bb12_clacta: Csicp_bb12_clacta[]
    csicp_bb12_gructa: Csicp_bb12_gructa[]
    csicp_bb061_tp: Csicp_bb061_tp[]
    csicp_bb062_sta: Csicp_bb062_sta[]
    csicp_ff003_TpEsp: Csicp_ff003_TpEsp[]
}

export interface Csicp_bb001_Aliq {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb001_AtPJ {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodigoFiscal: string
    LabelGrande: string
}

export interface Csicp_bb001_CapMun {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb001_NatPJ {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodigoFiscal: string
    LabelGrande: string
}

export interface Csicp_bb001_Staimg {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb001_TpTri {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb006_Banco {
    Id: number
    NroBanco: string
    NomedoBanco: string
    PaginanaInternet: string
    DVBanco: string
}

export interface Csicp_bb008_tipo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb010_tp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CS_Codg: number
}

export interface Csicp_bb019_Tipo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    tBand: string
    CodgBandeira_Sitef: string
    CodgAutorizadora: number
}

export interface Csicp_bb026_Classe {
    Id: number
    Label: string
    Imagem: string
    Order: number
    Is_Active: boolean
    tPag: string
    UsoCS: string
    URL_FormaPagto: string
}

export interface Csicp_bb026_Tipo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb026_Vin {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb027a_TpCalc {
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

export interface Csicp_BB027_CICMS {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb027_entsai {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    ID_PDV: number
}

export interface Csicp_bb027_fdesen {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb027_Modal {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Digito: string
}

export interface Csicp_bb027_Motivo {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Conteudo: string
}

export interface Csicp_bb027_PTerc {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb028_tp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Codg_CS: string
}

export interface Csicp_email {
    Id: number
    Label: string
    Order: number
    Descricao: string
    Tipo: string
    Is_Active: boolean
}

export interface Csicp_bb12_clacta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb12_gructa {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    UsoCS: string
}

export interface Csicp_bb061_tp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb062_sta {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_ff003_TpEsp {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    ID_PDV: number
}