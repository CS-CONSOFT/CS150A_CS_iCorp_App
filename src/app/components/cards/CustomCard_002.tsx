import { Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";

const CustomCard_002 = ({ title, icon }: { title: string, icon: string }) => {
    return (
        <View style={[commonStyle.margin_16, commonStyle.common_rowItem, commonStyle.justify_content_space_btw,
        { backgroundColor: '#95B5C7', borderRadius: 16, paddingLeft: 16 }]}>
            <CustomIcon icon={icon} />
            <Text style={{ color: '#2E2E2E', fontWeight: '600', fontSize: 18, alignSelf: 'center', padding: 16 }}>{title}</Text>
            {/**texto vazio apenas para o design se comportar como deve */}
            <Text style={{ color: '#2E2E2E', fontWeight: '600', fontSize: 18, alignSelf: 'center', padding: 16 }}></Text>
        </View>
    );
}

export default CustomCard_002;