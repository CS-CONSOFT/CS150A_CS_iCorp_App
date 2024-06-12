import { StyleSheet } from "react-native"

export const commonStyle = StyleSheet.create({
    common_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border_radius_32: {
        borderRadius: 32
    },
    margin_16: {
        margin: 16
    },
    common_menuText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    common_buttonLogoff: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        margin: 32
    },
    common_textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    common_rowItem: {
        flexDirection: 'row'
    },
    common_columnItem: {
        flexDirection: 'column'
    },
    common_fontWeight_600: {
        fontWeight: '600'
    },
    common_margin_bottom_16: {
        marginBottom: 16
    },
    common_margin_bottom_8: {
        marginBottom: 8
    },
    common_margin_top_8: {
        marginTop: 8
    },
    common_margin_left_16: {
        marginLeft: 16
    },
    common_margin_right_16: {
        marginRight: 16
    },
    common_input: {
        margin: 4,
        borderWidth: 1,
        padding: 10,
        borderRadius: 32,
        paddingHorizontal: 16
    },
    productImage: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    common_button_style: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 16
    },
    common_text_button_style: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    justify_content_space_btw: {
        justifyContent: 'space-between'
    },
    justify_content_space_evl: {
        justifyContent: 'space-evenly'
    },
    modal_common_container: {
        backgroundColor: '#FFF', padding: 16, borderRadius: 16, alignSelf: 'center', width: '80%'
    }
});