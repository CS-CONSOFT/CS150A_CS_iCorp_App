import { TouchableOpacity, Text } from "react-native";
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";

interface BtnLink{
    label: string;
    onPress: () => void;
}

export const ButtonLink = ({label, onPress}: BtnLink) => {
    return <TouchableOpacity
                style={[commonStyle.common_rowItem, {height:40}, commonStyle.align_centralizar]}
                onPress={onPress}
            >
                <Text style={[{textDecorationLine: "underline", fontSize: 12, color: ColorStyle.colorstatusselected}]}>{label}</Text>
    </TouchableOpacity>
}