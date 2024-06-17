import { StyleSheet } from "react-native";

export const stylesNotaEntrega = StyleSheet.create({
    modalContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
        height: "100%",
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
    productContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    productItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    productText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        fontSize: 16,
        color: '#FF5733',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 32
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});