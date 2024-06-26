import { ICON_NAME } from "../../util/IconsName"

/**001 */
export const listBottomComanda001 = [
    {
        id: 1,
        title: "Home",
        onPress: (navigate: any) => { navigate('Menu') },
        iconName: ICON_NAME.ESTATISTICA_CONTORNADO
    },
    {
        id: 2,
        title: "Nova Comanda",
        onPress: (navigate: any) => { navigate("NovaComanda") },
        iconName: ICON_NAME.ADICIONAR_CONTORNADO
    },
    {
        id: 3,
        title: "Lista",
        onPress: (navigate: any) => { navigate("ComandaLista") },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
 
]
