/** RES PRODUTOS PV */
export interface IResProductsListPvModel {
    IsOk: boolean;
    Msg: string;
    List: IResProductItemModel[];

}

export interface IResProductItemModel {
    Id: string;
    Codigo: number;
    Sequencia: number;
    Descricao: string;
    Quantidade: number;
    Unidade: string;
    TotalLiquido: number;
    TotalBruto: number;
    TotalDesconto: number;
    PrecoUnitario: number;
    PrecoTabela: number;
    PrecoTabela2: string;
    Imagem: string;
    gg008_ID: string;
    gg008_Kdx_ID: string;
    gg520_ID: string;
    IsMontar: boolean,
    IsSaldoNegativo: boolean,
    IsRequisitar: boolean,
    IsEntregar: boolean,
    UN_Secundaria: string
    UN_Sec_FatorConversao: number
    UN_Sec_Quantidade: number
    UN_Sec_TipoConversao: number
    NroPrecoTabela: number
}
