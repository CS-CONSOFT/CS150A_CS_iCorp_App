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
        id: 'special-button',
        title: "Lista",
        onPress: (navigate: any) => { navigate('Consulta_Produtos', { cameFromPv: false }) },
        iconName: ICON_NAME.LISTA_CONTORNADO
    },
    {
        id: 4,
        title: "Leitor",
        onPress: (navigate: any) => { navigate('Camera') },
        iconName: ICON_NAME.CODIGO_BARRA_CONTORNADO
    }
]

/**002 */
export const listBottomMenu002 = [
    {
        id: 1,
        title: "Home",
        onPress: (navigate: any) => { navigate('Menu') },
        iconName: ICON_NAME.ESTATISTICA_CONTORNADO
    }
]