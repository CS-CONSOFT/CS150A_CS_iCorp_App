import { Alert } from "react-native"
import { ICON_NAME } from "../../util/IconsName"


export const menu01Data = [
    {
        id: 1,
        title: "Menu",
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