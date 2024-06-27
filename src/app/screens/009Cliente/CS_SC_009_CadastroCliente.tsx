import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { useNavigation } from "@react-navigation/native";
import { cpfCnpjMask } from "../../util/Masks";

const CS_SC_009_CadastroCliente = () => {
    const { navigate } = useNavigation()
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        username: 'Comercial',
        fantasyName: 'Barros',
        CPF_CNPJ: 'ba',
        RG: 'ba',
        codigo: '',
    });


    function handleInputTyping(id: string, value: string): void {
        if (id === 'CPF_CNPJ') {
            setAttributesMap((prev) => {
                return { ...prev, [id]: cpfCnpjMask(value) }
            })
        } else {
            setAttributesMap((prev) => {
                return { ...prev, [id]: value }
            })
        }
    }

    function saveCliente() {
        if (attributesMap.CPF_CNPJ.length === 14) {
            console.log('CPF');
        } else if (attributesMap.CPF_CNPJ.length === 18) {
            console.log('CNPJ');
        }
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

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>CPF/CNPJ</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('CPF_CNPJ', value)}
                value={attributesMap.CPF_CNPJ}
                placeholder="CPF_CNPJ"
                keyboardType='numeric'
                maxLength={18}
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>RG</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('RG', value)}
                value={attributesMap.Domínio}
                placeholder="RG"
                keyboardType='numeric'
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