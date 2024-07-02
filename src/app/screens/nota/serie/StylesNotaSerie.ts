import { StyleSheet } from "react-native";
import ColorStyle from "../../../ColorStyle";
/** ESTILOS */
export const stylesNotaSerie = StyleSheet.create({
    container: {
        padding: 10,

    },
    titleNota: {
        marginBottom: 10,
        backgroundColor: ColorStyle.colorPrimary200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: ColorStyle.colorPrimary300,
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        fontWeight: 700,
        color: "#333",
    }, buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 32
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonStyleList: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        margin: 32
    },
    dialog: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginHorizontal: 5
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'red',
        borderRadius: 5,
        marginHorizontal: 5,
        alignSelf: "flex-end"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});