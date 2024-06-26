import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { SelectList } from "react-native-dropdown-select-list";
import { handleGetCep } from "../../view_controller/endereco/EnderecoViewController";
import { ToastType, showToast } from "../../util/ShowToast";
import { useNavigation } from "@react-navigation/native";

const CS_SC_009_CadastroEndCliente = () => {
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        CEP: '',
        Logradouro: '',
        Bairro: '',
        Complemento: '',
        UF: ''
    });

    const { navigate } = useNavigation()




    function onPagePress(page: number): void {
        throw new Error("Function not implemented.");
    }

    function handleInputTyping(id: string, value: string): void {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    }

    function getValuesFromCep() {
        try {
            handleGetCep(attributesMap.CEP).then((res) => {
                if (!res.erro) {
                    handleInputTyping('Logradouro', res.logradouro)
                    handleInputTyping('Bairro', res.bairro)
                    handleInputTyping('Complemento', res.complemento)
                    handleInputTyping('UF', res.uf)
                } else {
                    showToast(ToastType.ERROR, "Falha", "Ocorreu uma falha ao procurar pelo CEP")
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Falha", error)
        }
    }

    return (
        <SafeAreaView>
            <View style={[commonStyle.common_rowItem, commonStyle.align_centralizar, commonStyle.common_margin_top_32, commonStyle.common_margin_bottom_16]}>
                <CustomIcon icon={ICON_NAME.LOCALIZACAO} iconColor="#0A3147" />
                <Text style={[commonStyle.text_size_20, commonStyle.common_fontWeight_800, commonStyle.common_margin_left_16, { color: "#0A3147" }]}>Endereço Principal</Text>
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>CEP</Text>
                    <TextInput
                        style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 230 }]}
                        onChangeText={(value) => handleInputTyping('CEP', value)}
                        value={attributesMap.Domínio}
                        placeholder="CEP"
                    />
                </View>
                <TouchableHighlight
                    onPress={() => { getValuesFromCep() }}
                    style={commonStyle.common_button_style}
                    underlayColor='white'
                ><Text style={commonStyle.common_text_button_style}>Buscar</Text></TouchableHighlight>
            </View>

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Logradouro</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('Logradouro', value)}
                value={attributesMap.Logradouro}
                placeholder="Logradouro"
            />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl, { alignSelf: 'flex-start' }]}>
                <View style={[commonStyle.common_columnItem, commonStyle.common_margin_right_16]}>
                    <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>N</Text>
                    <TextInput
                        style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                        onChangeText={(value) => handleInputTyping('N', value)}
                        value={attributesMap.Domínio}
                        placeholder="N"
                    />
                </View>

                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Complemento</Text>
                    <TextInput
                        style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 290 }]}
                        onChangeText={(value) => handleInputTyping('Complemento', value)}
                        value={attributesMap.Domínio}
                        placeholder="Complemento"
                    />
                </View>
            </View>

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Perímetro</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('Perímetro', value)}
                value={attributesMap.Domínio}
                placeholder="Perímetro"
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Bairro</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('Bairro', value)}
                value={attributesMap.Bairro}
                placeholder="Bairro"
            />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Complemento</Text>
                    <TextInput
                        style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 250 }]}
                        onChangeText={(value) => handleInputTyping('Complemento', value)}
                        value={attributesMap.Complemento}
                        placeholder="Complemento"
                    />
                </View>
                <View style={[commonStyle.common_columnItem, commonStyle.common_margin_right_16]}>
                    <Text style={commonStyle.common_margin_top_8}></Text>
                    <SelectList
                        placeholder="UF"
                        /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                         * getFormaPagamento()
                         */
                        setSelected={(key: string) => { }}
                        data={[{ key: 1, value: 'PA' }]}
                        save="key"
                    />
                </View>
            </View>

            <TouchableHighlight
                onPress={() => { navigate('Cadastro_003_Perf') }}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Continuar</Text></TouchableHighlight>

        </SafeAreaView >
    );
}

export default CS_SC_009_CadastroEndCliente;