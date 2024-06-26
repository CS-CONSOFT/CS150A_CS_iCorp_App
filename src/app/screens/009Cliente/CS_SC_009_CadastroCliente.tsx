import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { useNavigation } from "@react-navigation/native";

const CS_SC_009_CadastroCliente = () => {
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        username: 'Comercial',
        fantasyName: 'Barros',
        CPF: 'ba',
        RG: 'ba'
    });

    const { navigate } = useNavigation()


    function onPagePress(page: number): void {
        throw new Error("Function not implemented.");
    }

    function handleInputTyping(arg0: string, value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <SafeAreaView>
            <View style={[commonStyle.common_rowItem, commonStyle.align_centralizar, commonStyle.common_margin_top_64, commonStyle.common_margin_bottom_16]}>
                <CustomIcon icon={ICON_NAME.ADICIONAR_PESSOA_CONTORNADO} iconColor="#0A3147" />
                <Text style={[commonStyle.text_size_20, commonStyle.common_fontWeight_800, commonStyle.common_margin_left_16, { color: "#0A3147" }]}>Novo Cliente</Text>
            </View>

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Nome</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('Domínio', value)}
                value={attributesMap.Domínio}
                placeholder="Nome"
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Nome Fantasia</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('NomeFantasia', value)}
                value={attributesMap.Domínio}
                placeholder="Nome Fantasia"
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>CPF</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('CPF', value)}
                value={attributesMap.Domínio}
                placeholder="CPF"
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>RG</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('RG', value)}
                value={attributesMap.Domínio}
                placeholder="RG"
            />

            <TouchableHighlight
                onPress={() => navigate('Cadastro_002_End')}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Continuar</Text></TouchableHighlight>

        </SafeAreaView >
    );
}

export default CS_SC_009_CadastroCliente;