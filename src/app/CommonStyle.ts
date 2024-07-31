import { StyleSheet } from "react-native"
import ColorStyle from "./ColorStyle";

export const commonStyle = StyleSheet.create({
    filterDateClicked: {
        backgroundColor: "#0A3147",
        borderRadius: 32
    },
    filterDateTextClicked: {
        color: "#FFF"
    },
    filterDate: {
        backgroundColor: "#A3C5D9",
        borderRadius: 32
    },
    filterDateText: {
        color: "#0A3147"
    },
    common_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border_radius_32: {
        borderRadius: 32
    },
    border_right_radius_16: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16
    },
    bg_blacktransparent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    margin_16: {
        margin: 16
    },
    margin_8: {
        margin: 8
    },
    font_size_18: {
        fontSize: 18
    },
    font_size_16: {
        fontSize: 16
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
    common_padding_16: {
        padding: 16
    },
    common_padding_08: {
        padding: 8
    },
    common_rowItem: {
        flexDirection: 'row'
    },
    common_columnItem: {
        flexDirection: 'column'
    },
    common_fontWeight_800: {
        fontWeight: '800'
    },
    common_fontWeight_600: {
        fontWeight: '600'
    },
    common_fontWeight_200: {
        fontWeight: '200'
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
    common_margin_top_64: {
        marginTop: 64
    },
    common_margin_top_32: {
        marginTop: 32
    },
    common_margin_left_16: {
        marginLeft: 16
    },
    common_margin_right_16: {
        marginRight: 16
    },
    common_margin_horizontal: {
        marginHorizontal: 15
    },
    common_margin_vertical: {
        marginVertical: 12
    },
    common_input: {
        margin: 4,
        borderWidth: 1,
        padding: 10,
        borderRadius: 32,
        paddingHorizontal: 16,
        borderColor: "#B0B0B0"
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
        borderRadius: 32,
        elevation: 3,
        margin: 14
    },
    common_text_button_style: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    justify_content_space_btw: {
        justifyContent: 'space-between'
    },
    justify_content_space_evl: {
        justifyContent: 'space-evenly'
    },
    modal_common_container: {
        backgroundColor: '#FFF', padding: 16, borderRadius: 16, alignSelf: 'center', width: '80%'
    },
    text_size_20: {
        fontSize: 20
    },
    text_size_16: {
        fontSize: 16
    },
    text_aligment_center: {
        textAlign: 'center'
    },
    text_aligment_left: {
        textAlign: 'left'
    },
    btn_gray: {
        backgroundColor: '#E3E3E3',
        paddingHorizontal: 32,
        paddingVertical: 8,
        marginVertical: 8,
        borderRadius: 32,
        elevation: 3
    },
    btn_text_gray: {
        color: '#000',
        fontWeight: '600',
        alignSelf: 'center'
    },
    btn_transparente: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        marginVertical: 8,
        borderRadius: 32
    },
    btn_text_transparente: {
        color: '#1068EB',
        fontWeight: '600',
        alignSelf: 'center'
    },
    avatar_Imagem: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignContent: "center",
        justifyContent: "center",
    },
    avatar_nomeIniciais: {
        width: 60,
        height: 60,
        backgroundColor: ColorStyle.colorPrimary200,
        borderRadius: 100,
        alignContent: "center",
        justifyContent: "center",
    },
    title_nomeIniciais: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        color: ColorStyle.colorPrimary300,
    },
    title_accordion: {
        fontWeight: "700",
        color: ColorStyle.colorPrimary300,
        fontSize: 16,
    },
    align_centralizar: {
        alignItems: "center",
        justifyContent: "center",
    },
    align_spacebetween_row: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    align_start_spaceAround_collumn: {
        alignItems: "flex-start",
        justifyContent: "space-around",
    },
    align_start_spaceAround_center: {
        alignItems: "center",
        justifyContent: "space-around",
    },
    card_white_shadow: {
        backgroundColor: ColorStyle.colorwhite,
        borderRadius: 20,
        elevation: 2,
        paddingBottom: 15,
        height: "auto",
        width: "auto",
    },
    card_bottom_shadow: {
        backgroundColor: ColorStyle.colorwhite,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        elevation: 2,
        paddingBottom: 15,
        paddingHorizontal: 10,
        height: "auto",
        width: "auto",
        marginBottom: 10,
        borderColor: ColorStyle.colorneutrais100

    }
});