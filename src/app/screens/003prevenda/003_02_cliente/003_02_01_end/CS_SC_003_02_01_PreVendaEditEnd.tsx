import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { handleGetCep } from "../../../../view_controller/endereco/EnderecoViewController";
import { ToastType, showToast } from "../../../../util/ShowToast";
import { CS_IReqSaveEndereco } from "../../../../services/api/interfaces/contas/CS_IReqSaveEndereco";
import { handleSave1206 } from "../../../../view_controller/conta/ContaViewController";
import { commonStyle } from "../../../../CommonStyle";
import CustomIcon from "../../../../components/icon/CustomIcon";
import { ICON_NAME } from "../../../../util/IconsName";
import { SelectList } from "react-native-dropdown-select-list";
import estados from "../../../009Cliente/ListaEstados";
import ColorStyle from "../../../../ColorStyle";
import { DD071_Enderecos } from "../../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";


const CS_SC_003_02_01_PreVendaEditEnd = ({ route }: { route: any }) => {
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

    const [enderecamento, setEnderecamento] = useState<DD071_Enderecos>()

    const { navigate } = useNavigation()
    const [isBtnCepLoading, setIsBtnCepLoading] = useState(false)
    const { DD071_JSON } = route.params

    useEffect(() => {
        setEnderecamento(JSON.parse(DD071_JSON))
        console.log(enderecamento);
        console.log(DD071_JSON);

        /*
        if (enderecamento) {
            handleInputTyping('CEP', enderecamento!.csicp_dd071.DD071_CEP.toString())
            handleInputTyping('Logradouro', enderecamento!.csicp_dd071.DD071_Logradouro.toString())
            handleInputTyping('Bairro', enderecamento!.csicp_dd071.DD071_NomeBairro.toString())
            handleInputTyping('Complemento', enderecamento!.csicp_dd071.DD071_Complemento.toString())
            handleInputTyping('UF', enderecamento!.csicp_aa027.AA027_Sigla.toString())
            handleInputTyping('Cidade', enderecamento!.csicp_aa028.AA028_Cidade.toString())
            handleInputTyping('Numero', enderecamento!.csicp_dd071.DD071_Numero.toString())
            handleInputTyping('Perímetro', enderecamento!.csicp_dd071.DD071_Perimetro.toString())
        }
            */


    }, [DD071_JSON])

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


        if (!attributesMap.CEP || !attributesMap.Logradouro || !attributesMap.Bairro || !attributesMap.Numero || !attributesMap.Complemento || !attributesMap.Perímetro) {
            showToast(ToastType.ERROR, "Campos Faltando", "Preencha corretamente todos")
            return;
        }


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

                <View style={[commonStyle.common_rowItem, commonStyle.common_padding_08, commonStyle.common_margin_right_16, commonStyle.justify_content_space_evl]}>
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


                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Bairro</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => handleInputTyping('Bairro', value)}
                    value={attributesMap.Bairro}
                    placeholder="Bairro"
                />

                <TouchableHighlight
                    onPress={() => { saveEndereco() }}
                    style={commonStyle.common_button_style}
                    underlayColor='white'
                ><Text style={commonStyle.common_text_button_style}>Continuar</Text></TouchableHighlight>
            </ScrollView>
        </SafeAreaView >
    );
}

export default CS_SC_003_02_01_PreVendaEditEnd;