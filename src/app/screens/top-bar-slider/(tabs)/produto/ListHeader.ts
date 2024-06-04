import { router } from "expo-router"
import { navigateTo } from "../../../../view_controller/SharedViewController"
function goToSerie() {
    router.push("/screens/nota/serie/CS_SC_Serie")
}


export const data = [
    {
        id: 2,
        title: "Descontos",
        onPress: () => { goToSerie() },
        iconName: "newspaper-outline"
    },
    {
        id: 4,
        title: "Código",
        onPress: () => { goToSerie() },
        iconName: "person-add-outline"
    },
    {
        id: 5,
        title: "Requisição",
        onPress: () => { navigateTo("/screens/produtos/consulta/CS_SC_ConsultaProdutos") },
        iconName: "archive-outline"
    }

]