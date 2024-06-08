import { View } from "react-native";
import { commonStyle } from "../../../../CommonStyle";

const C_003_02_01_HeaderClient = () => {
    return (
        <View style={[commonStyle.common_rowItem]}>
            <View style={[commonStyle.common_rowItem]}>
                <View>{/**image */}</View>
                <View style={[commonStyle.common_columnItem]}>{/**nome e id*/}</View>
            </View>

            <View style={[commonStyle.common_rowItem]}>

            </View>
        </View>
    );
}

export default C_003_02_01_HeaderClient;