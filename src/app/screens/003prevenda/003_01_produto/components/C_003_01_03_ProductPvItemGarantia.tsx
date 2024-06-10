import { View, StyleSheet, Text } from "react-native";
import { commonStyle } from "../../../../CommonStyle";
import Ioicons from '@expo/vector-icons/Ionicons';

const C_003_01_03_ProductPvItemGarantia = ({ close }: { close: () => void }) => {
    return (
        <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, common003_02_styles.blueBackgroundColor]}>
            <View style={[commonStyle.common_rowItem, common003_02_styles.blueBackgroundColor]}>
                <Text style={[commonStyle.common_fontWeight_600, common003_02_styles.titleItem]}>Garantia</Text>
            </View>
            <View style={[commonStyle.common_rowItem, common003_02_styles.blueBackgroundColor, { marginRight: 2, justifyContent: 'flex-end' }]}>
                <Ioicons name="close-outline" size={22} onPress={close} />
            </View>
        </View>
    );
}


const common003_02_styles = StyleSheet.create({
    blueBackgroundColor: {
        backgroundColor: "#A3C5D9"
    },
    titleItem: {
        color: "#0A3147",
        fontSize: 18,
        marginLeft: '58%'
    },
    container: {
        justifyContent: 'center'
    },
    title: {
        fontSize: 16
    },
    value: {
        fontSize: 16,
        textAlign: 'center'
    }

})

export default C_003_01_03_ProductPvItemGarantia;