import { View } from "react-native";
import { commonStyle } from "../../../../CommonStyle";

const C_003_02_01_HeaderClient = () => {
    return (
        <View style={[commonStyle.rowItem]}>
            <View style={[commonStyle.rowItem]}>
                <View>{/**image */}</View>
                <View style={[commonStyle.columnItem]}>{/**nome e id*/}</View>
            </View>

            <View style={[commonStyle.rowItem]}>

            </View>
        </View>
    );
}

export default C_003_02_01_HeaderClient;