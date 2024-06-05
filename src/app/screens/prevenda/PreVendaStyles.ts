import { StyleSheet } from "react-native";

//estilos
export const stylesPreVenda = StyleSheet.create({
    searchIcon: {
        backgroundColor: '#5E5D5D',
        padding: 8,
        borderRadius: 32,
        marginLeft: 8,
        marginRight: 4
    },
    filterIcon: {
        marginBottom: 12,
        marginRight: 4
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14
    },
    containerFilter: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 18,
        marginTop: 18,
        marginBottom: 18

    },
    containerRenderItem: {
        borderRadius: 12,
        flexDirection: 'row',
        margin: 8,
        elevation: 3
    },
    containerRenderItemLeft: {
        width: 111,
        height: 'auto',
        backgroundColor: '#A3C5D9',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    containerRenderItemLeftText: {
        color: "#0A3147",
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 8,
        alignSelf: 'center'
    },
    containerRenderItemRight: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        overflow: 'visible',
        backgroundColor: '#FFF'
    },
    containerRenderItemRightTextBold: {
        color: "#000",
        fontWeight: 'bold',
        padding: 1,
        marginLeft: 12
    },
    containerRenderItemRightPriceText: {
        color: "#0A3147",
        fontWeight: 'bold',
        fontSize: 16,
        padding: 1,
        marginLeft: 12
    },
    containerRenderItemRightTextNormal: {
        color: "#000",
        padding: 1,
        marginLeft: 12
    },
});
