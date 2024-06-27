export interface Comanda {
    id: number,
    protocolo: string,
    total: number,
    status: boolean,
}

export const DataListaComanda: Comanda[] = [
    {
        id: 1,
        protocolo: "2000079632222222",
        total: 100,
        status: true,
    },
    {
        id: 2,
        protocolo: "2000079632222222",
        total: 200,
        status: false,
    },
    {
        id: 3,
        protocolo: "2000079632222222",
        total: 150,
        status: true,
    }
]