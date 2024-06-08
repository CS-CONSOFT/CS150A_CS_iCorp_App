/** INSERT PV RESPONSE */
export interface IResInsertPv {
    IsOk: boolean,
    Msg: string,
    Key: string,
    Model: {
        AtendimentoId: string,
        AtendimentoProdutoId: string
    }
}