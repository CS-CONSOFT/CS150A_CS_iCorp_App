import { StyleSheet } from "react-native";
import ColorStyle from "../../ColorStyle";
//estilos
export const stylesConsultaProduto = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
    rightIcons: {
        backgroundColor: '#E3E3E3',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        justifyContent: 'center',
    },
    productCode: {
        fontWeight: '700',
        fontSize: 14,
    },
    productDesc: {
        fontWeight: '400'
    },
    productPrice: {
        fontSize: 18,
        color: ColorStyle.colorPrimary300,
        fontWeight: 'bold'
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
    },
    searchButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
    }

});