import { Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";
import { ReactNode } from "react";

/**
 * Ref: Pagamento
 */
const CustomCard_003 = ({ children }: { children: ReactNode }) => {
    return (
        <View style={[commonStyle.margin_16, commonStyle.common_columnItem, commonStyle.justify_content_space_btw,
        { backgroundColor: '#fff', borderRadius: 16, paddingLeft: 16, elevation: 3 }]}>
            {children}
        </View>
    );
}

export default CustomCard_003;