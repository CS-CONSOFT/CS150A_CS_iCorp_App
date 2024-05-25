import { StyleSheet } from "react-native";


export const paginationStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    item: {
        backgroundColor: '#007bff',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    clickedItem: {
        backgroundColor: '#c3c3c3',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    }
});