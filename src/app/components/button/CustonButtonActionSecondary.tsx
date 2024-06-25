import { TouchableOpacity, Text, StyleSheet } from "react-native";
import ColorStyle from "../../ColorStyle";

interface BtnSecondary{
    label: string;
    onPress: () => void;
}

export const ButtonActionSecondary = ({label, onPress}: BtnSecondary) => {
    return <TouchableOpacity
                style={styles.btn}
                onPress={onPress}
            >
                <Text style={styles.txtBtnStyle}>{label}</Text>
    </TouchableOpacity>
}


const styles = StyleSheet.create({
    btn:{
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        height: 40,
        backgroundColor: ColorStyle.colorwhite,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    txtBtnStyle: {
        color: ColorStyle.colorblack,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 16.94,
    }
})