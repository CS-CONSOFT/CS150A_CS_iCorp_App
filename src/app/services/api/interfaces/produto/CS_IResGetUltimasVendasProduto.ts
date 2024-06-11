export interface IResUltimasVendaProduto {
    IsOk: boolean
    Msg: string
    UltimasVendas: IProdutoItemUltimasVendas[]
}

export interface IProdutoItemUltimasVendas {
    ProtocoloVenda: string
    Emissao: string
    Quantidade: number
    PrecoVenda: number
    Serie_NF: string
    TotalVenda: number
}