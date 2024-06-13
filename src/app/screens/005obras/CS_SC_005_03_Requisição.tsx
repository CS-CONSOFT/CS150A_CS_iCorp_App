import { Pressable, SafeAreaView, Text } from "react-native";
import { commonStyle } from "../../CommonStyle";

const CS_SC_005_03_Requisição = ({ route }: { route: any }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable style={commonStyle.common_button_style}>
                <Text style={commonStyle.common_text_button_style}>Requisitar</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default CS_SC_005_03_Requisição;