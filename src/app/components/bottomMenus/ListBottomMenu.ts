import { Alert } from "react-native"
import { ICON_NAME } from "../../util/IconsName"

/**001 */
export const listBottomMenu001 = [
    {
        id: 1,
        title: "Home",
        onPress: (navigate: any) => { navigate('Menu') },
        iconName: ICON_NAME.ESTATISTICA_CONTORNADO
    },
    {
        id: 2,
        title: "Lista",
        onPress: (navigate: any) => { Alert.alert("Falta fazer") },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
    {
        id: 'special-button',
        title: "Lista",
        onPress: (navigate: any) => { navigate('Consulta_Produtos') },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
    {
        id: 4,
        title: "Leitor",
        onPress: (navigate: any) => { Alert.alert("Falta fazer") },
        iconName: ICON_NAME.CODIGO_BARRA_CONTORNADO

    },
    {
        id: 5,
        title: "Cesta",
        onPress: (navigate: any) => { Alert.alert("Falta fazer") },
        iconName: ICON_NAME.CESTA_CONTORNADO
    }
]

/**002 */
export const listBottomMenu002 = [
    {
        id: 1,
        title: "Home",
        onPress: (navigate: any) => { navigate('Menu') },
        iconName: ICON_NAME.ESTATISTICA_CONTORNADO
    },
    {
        id: 'special-button',
        title: "Produto",
        onPress: (navigate: any) => { navigate('Consulta_Produtos') },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
    {
        id: 4,
        title: "Pré Venda",
        onPress: (navigate: any) => { navigate('Pre_Venda') },
        iconName: ICON_NAME.CODIGO_BARRA_CONTORNADO

    }
]