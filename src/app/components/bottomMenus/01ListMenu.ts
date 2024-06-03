import { router } from "expo-router"
import { navigateTo } from "../../view_controller/SharedViewController"
import { ICON_NAME } from "../../util/IconsName"

function goToSerie() {
    router.push("/screens/nota/serie/CS_SC_Serie")
}

function goToSearchProduct() {
    router.push("/screens/produtos/consulta/CS_SC_ConsultaProdutos")
}



export const menu01Data = [
    {
        id: 1,
        title: "Menu",
        onPress: () => { navigateTo("/screens/menu/CS_SC_Menu") },
        iconName: ICON_NAME.ESTATISTICA_CONTORNADO
    },
    {
        id: 2,
        title: "Lista",
        onPress: () => { goToSerie() },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
    {
        id: 'special-button',
        title: "Lista",
        onPress: () => { goToSearchProduct() },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
    {
        id: 4,
        title: "Leitor",
        onPress: () => { navigateTo("/screens/produtos/consulta/CS_SC_ConsultaProdutos") },
        iconName: ICON_NAME.CODIGO_BARRA_CONTORNADO

    },
    {
        id: 5,
        title: "Cesta",
        onPress: () => { goToSerie() },
        iconName: ICON_NAME.CESTA_CONTORNADO
    }
]