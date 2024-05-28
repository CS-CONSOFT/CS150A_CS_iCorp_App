
export interface IGetPreVendaList {
    cs_tenant_id: number,
    cs_empresa_id: string,
    cs_usuario_id: string,
    cs_situacao_id?: number,
    cs_data_inicial: string,
    cs_data_final: string,
    cs_pesquisa?: string
}

export interface IResPreVenda {
    IsOk: boolean,
    Msg: string,
    List: IPreVendaListModel[]
}

export interface IPreVendaListModel {
    ID: string;
    ProtocolNumber: string;
    Data_Emissao: string;
    DataValidade: string;
    Codigo: string;
    Nome_Cliente: string;
    Codigo_ContaReal: string;
    Situacao: string;
    Estoque: string;
    NomeUsuario: string;
    Total?: number;
    Is_Selecionado?: boolean;
    Is_PV_Resultante?: boolean
}