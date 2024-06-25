import { View, Text, StyleSheet } from "react-native";
import CustomSeparator from "../lists/CustomSeparator";
import Ionicons from '@expo/vector-icons/Ionicons';
import { common003_01_styles } from "../../screens/003prevenda/003_01_produto/components/CommonStyles";
import { commonStyle } from "../../CommonStyle";

export const ContainerQuantidade = () => {
    return ( 
        <View>
            <Text style={[common003_01_styles.extraBottomStyleTitles, commonStyle.common_margin_bottom_8]}>Quantidade</Text>
            <CustomSeparator/>
            <View style={[common003_01_styles.extraBottomStyleAmount, commonStyle.common_margin_vertical]}>
                <Ionicons name={'add-circle-outline'} size={36} onPress={() => ""} />
                <Text style={common003_01_styles.extraBottomStyleChilds}>{"1"}</Text>
                <Ionicons name={'remove-circle-outline'} size={36} onPress={() => ""} />
            </View> 
        </View>
        
    )
}