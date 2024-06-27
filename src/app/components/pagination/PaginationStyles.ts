import { StyleSheet } from "react-native";


export const paginationStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    item: {
        backgroundColor: '#0A3147',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    clickedItem: {
        backgroundColor: '#A3C5D9',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    text: {
        color: '#0A3147',
        fontSize: 16,
    },
    textClicked: {
        color: '#FFF',
        fontSize: 16,
        borderRadius: 16
    }
});