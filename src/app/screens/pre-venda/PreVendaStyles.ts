import { StyleSheet } from "react-native";
//estilos
export const stylesPreVenda = StyleSheet.create({
    searchIcon: {
        backgroundColor: '#c3c3c3',
        padding: 8,
        borderRadius: 32,
        marginLeft: 8,
        marginRight: 4
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 18,
        marginTop: 8
    },
    containerRenderItem: {
        borderWidth: 1,
        flexDirection: 'row',
        margin: 8
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
        justifyContent: 'center',
        marginLeft: '10%',
        flexDirection: 'column',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    containerRenderItemRightTextBold: {
        color: "#000",
        fontWeight: 'bold',
        padding: 1
    },
    containerRenderItemRightPriceText: {
        color: "#0A3147",
        fontWeight: 'bold',
        fontSize: 22,
        padding: 1
    },
    containerRenderItemRightTextNormal: {
        color: "#000",
        padding: 1
    },
});


