export interface IPostLoginData {
    tenant: number,
    user: string,
    password: string
}

export interface IRegraItem {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    Descricao: string
}

export interface IMenuItem {
    id: number,
    title: string,
    iconName: string
}

export enum MenuTitle {
    OBRAS = "Obras",
    SERIE = "Série Produto",
    ENTREGA = "Entrega",
    PV = "PV",
    PRODUTO = "Consulta Produto",
    COMANDA = "Comandas",
    CLIENTE = "Cadastro Cliente"
}
