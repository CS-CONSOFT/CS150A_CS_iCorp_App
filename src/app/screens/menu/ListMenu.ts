import { router } from "expo-router"
import { navigateTo } from "../../view_controller/SharedViewController"
function goToSerie() {
    router.push("/screens/nota/serie/CS_SC_Serie")
}


export const data = [
    {
        id: 1,
        title: "Pré-Venda",
        onPress: () => { navigateTo("screens/bottom-bar/(tabs)") },
        iconName: "cart-outline"
    },
    {
        id: 2,
        title: "Lista Comanda",
        onPress: () => { goToSerie() },
        iconName: "newspaper-outline"
    },
    {
        id: 3,
        title: "Consulta Produtos",
        onPress: () => { navigateTo("/screens/produtos/consulta/CS_SC_ConsultaProdutos") },
        iconName: "search-outline"

    },
    {
        id: 4,
        title: "Cadastro Cliente",
        onPress: () => { goToSerie() },
        iconName: "person-add-outline"
    },
    {
        id: 5,
        title: "Carga",
        onPress: () => { goToSerie() },
        iconName: "archive-outline"
    },
    {
        id: 6,
        title: "Consulta Preços",
        onPress: () => { goToSerie() },
        iconName: "search-outline"
    },
    {
        id: 7,
        title: "Série Produto",
        onPress: () => { navigateTo("/screens/nota/serie/CS_SC_Serie") },
        iconName: "barcode-outline"
    },
    {
        id: 8,
        title: "Obras",
        onPress: () => { goToSerie() },
        iconName: "construct-outline"
    },
    {
        id: 9,
        title: "Entrega",
        onPress: () => { navigateTo("/screens/nota/entrega/CS_SC_Entrega") },
        iconName: "bag-check-outline"
    }

]