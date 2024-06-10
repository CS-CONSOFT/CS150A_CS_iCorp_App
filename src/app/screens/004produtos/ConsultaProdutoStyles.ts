import { StyleSheet } from "react-native";
//estilos
export const stylesConsultaProduto = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rightIcons: {
        backgroundColor: '#E3E3E3',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
    },
    productCode: {
        fontWeight: '600',
        fontSize: 16
    },
    productDesc: {
        fontWeight: '400'
    },
    productPrice: {
        fontSize: 24,
        color: '#333333',
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