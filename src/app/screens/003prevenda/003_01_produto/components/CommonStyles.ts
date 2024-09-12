
import { StyleSheet } from "react-native";
export const common003_01_styles = StyleSheet.create({
    containerRenderItem: {
        borderRadius: 12,
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8,
        height: 150,
    },
    boxShadow: {
        shadowColor: "#333333",
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4
    },
    productContainerLeft: {
        width: 111,
        height: 'auto',
        backgroundColor: '#A3C5D9',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    productContainerMiddle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#fffafa',
        paddingLeft: 8
    },
    productImage: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333'
    },
    productInfo: {
        fontSize: 16,
        color: '#000'
    },
    btnNewSearch: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 16
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    leftSwipeAction: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    productContainerArrow: {
        width: 30,
        height: 'auto',
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12
    },
    openContainerX: {
        backgroundColor: '#95B5C7'
    },
    iconsRight: {
        backgroundColor: '#95B5C7',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    extraBottomStyleSwitchs: {
        flexDirection: 'column',
        padding: 12,
        justifyContent: 'space-evenly',
    },
    extraBottomStyleAmount: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8
    },
    extraBottomStyleTitles: {
        color: "#0A3147",
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 21,
        marginLeft: 8,
        padding: 4
    },
    extraBottomStyleChilds: {
        color: "#000",
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 21,
        marginLeft: 8,
        padding: 4
    },
    extraBottomStyleInputs: {
        marginLeft: 32,
        marginBottom: 8
    },
    extraBottomPriceStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    extraBottomStyleBtnSalvar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#E3E3E3',
    },
    extraBottomStyleBtnCancelar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        backgroundColor: '#FFF',
    },
    extraBottomStyleTextButtonSave: {
        fontWeight: '600',
        fontSize: 16
    },
    extraBottomStyleTextButtonCancel: {
        fontWeight: '600',
        fontSize: 16,
        color: "#1068EB"
    },
    extraBottomStyleRow: {
        flexDirection: 'row'
    },
    extraBottomStyleJustify: {
        justifyContent: 'space-evenly'
    },
    extraBottomStyleContainer: {
        padding: 16
    }
});