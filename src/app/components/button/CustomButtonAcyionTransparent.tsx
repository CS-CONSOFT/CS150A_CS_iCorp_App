import { View, Text, TouchableOpacity } from "react-native"
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";

interface BtnSecondary{
    label: string;
    onPress: () => void;
}


export const ButtonActionTransparent = ({label, onPress}: BtnSecondary) => {
    return <View>
        <TouchableOpacity onPress={onPress} style={[commonStyle.align_centralizar, {width: 180, height:40}]}>
            <Text style={{color: ColorStyle.colorstatusselected}}>{label}</Text>
        </TouchableOpacity>
    </View>
}