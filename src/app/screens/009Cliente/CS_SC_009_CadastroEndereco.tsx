import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { SelectList } from "react-native-dropdown-select-list";
import { handleGetCep } from "../../view_controller/endereco/EnderecoViewController";
import { ToastType, showToast } from "../../util/ShowToast";
import { useNavigation } from "@react-navigation/native";
import estados from "./ListaEstados";
import { CS_IReqSaveEndereco } from "../../services/api/interfaces/contas/CS_IReqSaveEndereco";
import { handleSave1206 } from "../../view_controller/conta/ContaViewController";
import ColorStyle from "../../ColorStyle";

const CS_SC_009_CadastroEndereco = ({ route }: { route: any }) => {
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        CEP: '',
        Logradouro: '',
        Bairro: '',
        Complemento: '',
        UF: 'PA',
        Cidade: '',
        Numero: '',
        Perímetro: ''
    });

    const { navigate } = useNavigation()
    const [isBtnCepLoading, setIsBtnCepLoading] = useState(false)
    const { isPreVendaEditEnd, endId } = route.params

    function handleInputTyping(id: string, value: string): void {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    }

    function getValuesFromCep() {
        setIsBtnCepLoading(true)
        try {
            handleGetCep(attributesMap.CEP).then((res) => {
                if (!res.erro) {
                    handleInputTyping('Logradouro', res.logradouro)
                    handleInputTyping('Bairro', res.bairro)
                    handleInputTyping('Complemento', res.complemento)
                    handleInputTyping('UF', res.uf)
                    handleInputTyping('Cidade', res.localidade)
                } else {
                    showToast(ToastType.ERROR, "Falha", "Ocorreu uma falha ao procurar pelo CEP")
                }
                setIsBtnCepLoading(false)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Falha", error)
        }
    }

    function saveEndereco() {
        let iSaveEndereco: CS_IReqSaveEndereco = {}
        iSaveEndereco.BB012_CEP = Number(attributesMap.CEP)
        iSaveEndereco.BB012_Logradouro = attributesMap.Logradouro
        iSaveEndereco.BB012_Bairro = attributesMap.Bairro
        iSaveEndereco.BB012_Numero = attributesMap.Numero
        iSaveEndereco.BB012_Complemento = attributesMap.Complemento
        iSaveEndereco.BB012_Perimetro = attributesMap.Perímetro

        handleSave1206({ cs_req_save: iSaveEndereco }).then(() => {
            navigate('CadastroCliente')
        })
    }

    return (
        <SafeAreaView style={{ padding: 8 }}>
            <ScrollView>
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
                            keyboardType='numeric'
                        />
                    </View>
                    <TouchableHighlight
                        onPress={() => { getValuesFromCep() }}
                        style={commonStyle.common_button_style}
                        underlayColor='white'
                    >
                        {isBtnCepLoading ? <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} /> : <><Text style={commonStyle.common_text_button_style}>Buscar</Text></>}

                    </TouchableHighlight>
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
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 80 }]}
                            onChangeText={(value) => handleInputTyping('Numero', value)}
                            value={attributesMap.Numero}
                            placeholder="N"
                        />
                    </View>

                    <View style={[commonStyle.common_columnItem]}>
                        <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Complemento</Text>
                        <TextInput
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 250 }]}
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

                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Cidade</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => handleInputTyping('Cidade', value)}
                    value={attributesMap.Cidade}
                    placeholder="Cidade"
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
                            data={estados}
                            save="value"
                            defaultOption={{ key: attributesMap.UF, value: attributesMap.UF }}
                        />
                    </View>
                </View>

                <TouchableHighlight
                    onPress={() => { saveEndereco() }}
                    style={commonStyle.common_button_style}
                    underlayColor='white'
                ><Text style={commonStyle.common_text_button_style}>Continuar</Text></TouchableHighlight>
            </ScrollView>
        </SafeAreaView >
    );
}

export default CS_SC_009_CadastroEndereco;