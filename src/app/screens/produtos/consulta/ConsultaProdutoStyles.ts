import { StyleSheet } from "react-native";
//estilos
export const stylesConsultaProduto = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'column',
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
    },
    productContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    productInfo: {
        fontSize: 16,
        color: '#666',
        marginBottom: 3,
    },
});