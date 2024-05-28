
/**DADOS PARA CRIAR A TELA (VIRAO DE UMA API FUTURAMENTE) */
export interface Item {
    id: string,
    date: string;
    number: string;
    description: string;
    price: string;
    additionalInfo: string;
}
export const items: Item[] = [
    {
        id: "1",
        date: "17 MAIO 2024",
        number: "2000079632222222",
        description: "Kit Facil Everyday L'oreal",
        price: "R$ 150,85",
        additionalInfo: "venda à vista PDV - PA"
    },
    {
        id: "2",
        date: "18 JUNHO 2024",
        number: "2000079632333333",
        description: "Shampoo XYZ",
        price: "R$ 75,50",
        additionalInfo: "venda à vista PDV - SP"
    },
    {
        id: "3",
        date: "19 JULHO 2024",
        number: "2000079632444444",
        description: "Condicionador ABC",
        price: "R$ 90,99",
        additionalInfo: "venda à vista PDV - RJ"
    },
    {
        id: "4",
        date: "20 AGOSTO 2024",
        number: "2000079632555555",
        description: "Creme Hidratante DEF",
        price: "R$ 120,45",
        additionalInfo: "venda à vista PDV - MG"
    },
    {
        id: "5",
        date: "21 SETEMBRO 2024",
        number: "2000079632666666",
        description: "Perfume GHI",
        price: "R$ 250,00",
        additionalInfo: "venda à vista PDV - BA"
    },
    {
        id: "6",
        date: "22 OUTUBRO 2024",
        number: "2000079632777777",
        description: "Sabonete JKL",
        price: "R$ 30,85",
        additionalInfo: "venda à vista PDV - RS"
    },
    {
        id: "7",
        date: "23 NOVEMBRO 2024",
        number: "2000079632888888",
        description: "Loção Corporal MNO",
        price: "R$ 60,70",
        additionalInfo: "venda à vista PDV - SC"
    },
    {
        id: "8",
        date: "24 DEZEMBRO 2024",
        number: "2000079632999999",
        description: "Óleo Capilar PQR",
        price: "R$ 45,55",
        additionalInfo: "venda à vista PDV - PR"
    },
    {
        id: "9",
        date: "25 JANEIRO 2025",
        number: "2000079633000000",
        description: "Máscara Facial STU",
        price: "R$ 80,30",
        additionalInfo: "venda à vista PDV - CE"
    },
    {
        id: "10",
        date: "26 FEVEREIRO 2025",
        number: "2000079633111111",
        description: "Gel de Barbear VWX",
        price: "R$ 35,90",
        additionalInfo: "venda à vista PDV - PE"
    }
];

