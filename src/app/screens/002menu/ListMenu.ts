import { Alert } from "react-native"


export const data = [

    {
        id: 1,
        title: "Pré-Venda",
        onPress: (navigate: any) => { navigate('Pre_Venda') },
        iconName: "cart-outline"
    },
    {
        id: 2,
        title: "Lista Comanda",
        onPress: (navigate: any) => { navigate('ComandaLista') },
        iconName: "newspaper-outline"
    },
    {
        id: 3,
        title: "Consulta Produtos",
        onPress: (navigate: any) => { navigate('Consulta_Produtos', { cameFromPv: false }) },
        iconName: "search-outline"

    },
    {
        id: 4,
        title: "Cadastro Cliente",
        onPress: (navigate: any) => { Alert.alert("Falta fazer") },
        iconName: "person-add-outline"
    },
    {
        id: 5,
        title: "Carga",
        onPress: (navigate: any) => { Alert.alert("Falta fazer") },
        iconName: "archive-outline"
    },
    {
        id: 6,
        title: "Consulta Preços",
        onPress: (navigate: any) => { Alert.alert("Falta fazer") },
        iconName: "search-outline"
    },
    {
        id: 7,
        title: "Série Produto",
        onPress: (navigate: any) => { navigate('Serie') },
        iconName: "barcode-outline"
    },
    {
        id: 8,
        title: "Obras",
        onPress: (navigate: any) => { navigate('Obras') },
        iconName: "construct-outline"
    },
    {
        id: 9,
        title: "Entrega",
        onPress: (navigate: any) => { navigate('Entrega') },
        iconName: "bag-check-outline"
    }

]