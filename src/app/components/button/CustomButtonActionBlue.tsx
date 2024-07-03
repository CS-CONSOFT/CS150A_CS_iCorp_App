import { TouchableOpacity, StyleSheet, Text } from "react-native";
import ColorStyle from "../../ColorStyle";

interface ButtonProps {
    text: string;
    onPress: () => void;
}

const ButtonActionBlue = ({ text, onPress }: ButtonProps) => {
    return <TouchableOpacity
        onPress={onPress}
        style={styles.btn}
    >
        <Text style={styles.txtBtnStyle}>{text}</Text>
    </TouchableOpacity>
}

export default ButtonActionBlue;

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 250,
        height: 50,
        backgroundColor: ColorStyle.colorPrimary100,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 15
    },
    txtBtnStyle: {
        color: ColorStyle.colorPrimary300,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 16.94,
    }
})
