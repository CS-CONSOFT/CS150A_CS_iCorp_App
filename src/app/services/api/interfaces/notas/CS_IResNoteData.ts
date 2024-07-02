export interface IResDadosNota {
    Produtos: Produtos[]
    info_Nota: Info_Nota
}

export interface Produtos {
    DD060_Id: string
    DD060_Descricao: string
    DD060_Quantidade: number
    DD060_Cor_Serie_Merc: string
    dd060_InfAdProd: string
    DD060_mod_Entrega: string
    DD060_image_url: string
}

export interface Info_Nota {
    result: string
    dd040_id: string
    protocolo: string
    cliente: string
    n_nota: string
    tp_nota: string
    dt_emissao: string
    situacao: string
    isOk: boolean
}