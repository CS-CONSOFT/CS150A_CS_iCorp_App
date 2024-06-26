export interface Produto {
    id: number,
    title: string,
    modo: string,
    quantidade: number,
}

export const DataListaEntrega: Produto[] = [
    {
        id: 1,
        title:"exemplo01",
        modo:"Balcão",
        quantidade: 1,
    },
    {
        id: 2,
        title:"exemplo02",
        modo:"Balcão",
        quantidade: 4,
    },
    {
        id: 3,
        title:"exemplo03",
        modo:"Balcão",
        quantidade: 10,
    },
    {
        id: 4,
        title:"exemplo04",
        modo:"Balcão",
        quantidade: 6,
    },
  
]