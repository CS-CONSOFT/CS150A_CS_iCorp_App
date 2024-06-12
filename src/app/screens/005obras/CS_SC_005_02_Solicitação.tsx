import { View, Text, TextInput } from "react-native";
import CustomCard_001 from "../../components/containers/CustomCard_001";
import { commonStyle } from "../../CommonStyle";

const CS_SC_005_02_Solicitação = ({ route }: { route: any }) => {
    const { obraId } = route.params
    return (
        <CustomCard_001
            title={obraId}
            children={<BodyCard />}
        />
    );
}

const BodyCard = () => {
    return (
        <View style={[commonStyle.common_columnItem]}>
            <Text style={[commonStyle.common_fontWeight_600,
            commonStyle.text_size_20,
            { textAlign: 'left', paddingHorizontal: 32, paddingVertical: 16 }]}>Autorama
            </Text>


            <View style={[commonStyle.common_rowItem,
            commonStyle.justify_content_space_btw,
            { paddingVertical: 8, paddingHorizontal: 32 }]}>


                <Text style={[commonStyle.text_size_16]}>Qt Entregue</Text>

                <Text style={[commonStyle.text_size_16]}>Qt Solicitada</Text>

            </View>

            <View style={[commonStyle.common_rowItem,
            commonStyle.justify_content_space_btw,
            { paddingBottom: 16, paddingHorizontal: 32 }]}>
                <Text style={[commonStyle.text_size_16, { alignSelf: 'center' }]}>11</Text>

                <TextInput
                    style={[commonStyle.common_input, { width: 150 }]}
                    onChangeText={() => { }}
                    value={'0'}
                    keyboardType='decimal-pad'
                />
            </View>
        </View>
    )
}

export default CS_SC_005_02_Solicitação;