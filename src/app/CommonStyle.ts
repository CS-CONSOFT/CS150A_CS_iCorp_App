import { StyleSheet } from "react-native"

export const commonStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonLogoff: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        margin: 32
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    rowItem: {
        flexDirection: 'row'
    },
    columnItem: {
        flexDirection: 'column'
    },
    fontWeight_600: {
        fontWeight: '600'
    },
    margin_bottom_16: {
        marginBottom: 16
    },
    margin_bottom_8: {
        marginBottom: 8
    },
    margin_top_8: {
        marginTop: 8
    },
});