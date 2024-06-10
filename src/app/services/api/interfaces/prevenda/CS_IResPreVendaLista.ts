/**RES PV LIST*/
export interface IResPreVenda {
    IsOk: boolean,
    Msg: string,
    List: IResPreVendaItemListModel[]
}


/** RES PV MODEL LISTA*/
export interface IResPreVendaItemListModel {
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