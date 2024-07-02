import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View, StyleSheet, Pressable, FlatList } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { CS_IReqSaveEndereco } from "../../services/api/interfaces/contas/CS_IReqSaveEndereco";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleSave1206 } from "../../view_controller/conta/ContaViewController";
import { handleGetCep, handleGetCityList, handleGetUfList } from "../../view_controller/endereco/EnderecoViewController";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomSearch from "../../components/search/CustomSearch";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import { getPaginationList } from "../../util/GetPaginationArray";


const CS_SC_009_CadastroEndereco = () => {
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        CEP: '',
        Logradouro: '',
        Bairro: '',
        Complemento: '',
        UF: '',
        Cidade: '',
        CidadeNome: '',
        Numero: '',
        Perimetro: ''
    });

    const { navigate } = useNavigation()
    const [isBtnCepLoading, setIsBtnCepLoading] = useState(false)
    const [ufList, setUfList] = useState<{ key: string, value: string }[]>()
    const [cityList, setCityList] = useState<{ key: string, value: string }[]>()
    const [isSavingLoading, setIsSavingLoading] = useState(false)

    function resetForm() {
        setAttributesMap({
            CEP: '',
            Logradouro: '',
            Bairro: '',
            Complemento: '',
            UF: '',
            Cidade: '',
            CidadeNome: '',
            Numero: '',
            Perimetro: ''
        });
        setIsSavingLoading(false)
    }


    useEffect(() => {
        resetForm()
        try {
            handleGetUfList().then((res) => {
                const list = res.csicp_aa027
                const mappedUfList = list.map(item => (
                    {
                        key: item.csicp_aa027.Id,
                        value: item.csicp_aa027.AA027_Sigla
                    }
                ))
                setUfList(mappedUfList)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Falha", "Ao recuperar os estados")
        }
    }, [])


    /**
     * funcao que seta um valor para o state de formulario criado acima
     * @param id id do valor do objeto
     * @param value valor do objeto
     */
    function setValueToObjectWhenInputTyped(id: string, value: string): void {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    }

    /**
     * funcao que recupera os valores do CEP do VIA CEP
     */
    function getValuesFromCep() {
        setIsBtnCepLoading(true)
        try {
            handleGetCep(attributesMap.CEP).then((res) => {
                if (!res.erro) {
                    setValueToObjectWhenInputTyped('Logradouro', res.logradouro)
                    setValueToObjectWhenInputTyped('Bairro', res.bairro)
                    setValueToObjectWhenInputTyped('Complemento', res.complemento)
                } else {
                    showToast(ToastType.ERROR, "Falha", "Ocorreu uma falha ao procurar pelo CEP")
                }
                setIsBtnCepLoading(false)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Falha", error)
        }
    }

    /**
     * Funcao que salva um endereco
     */
    function saveEndereco() {

        let iSaveEndereco: CS_IReqSaveEndereco = {}

        if (!attributesMap.CEP || !attributesMap.Logradouro || !attributesMap.Bairro || !attributesMap.Numero || !attributesMap.Complemento || !attributesMap.Perimetro) {
            showToast(ToastType.ERROR, "Campos Faltando", "Preencha corretamente todos")
            return;
        }
        setIsSavingLoading(true)
        iSaveEndereco.BB012_CEP = Number(attributesMap.CEP)
        iSaveEndereco.BB012_Logradouro = attributesMap.Logradouro
        iSaveEndereco.BB012_Bairro = attributesMap.Bairro
        iSaveEndereco.BB012_Numero = attributesMap.Numero
        iSaveEndereco.BB012_Complemento = attributesMap.Complemento
        iSaveEndereco.BB012_Perimetro = attributesMap.Perimetro
        iSaveEndereco.BB012_UF = attributesMap.UF
        iSaveEndereco.BB012_Codigo_Cidade = attributesMap.Cidade

        handleSave1206({ cs_req_save: iSaveEndereco }).then(() => {
            resetForm()
            navigate('CadastroCliente')
        })
    }

    /**
     * funcao que é chamada ao selecionar uma uf no dropdown
     * @param key id da selecao
     */
    function setSelectedUf(key: string) {
        setValueToObjectWhenInputTyped('Cidade', '')
        setValueToObjectWhenInputTyped('UF', key)
        getCities()
    }

    /**
     * funcao que busca as cidades
     * @param valor o valor de pesquisa
     */
    function getCities(valor?: string) {
        handleGetCityList(attributesMap.UF, valor).then((res) => {
            const list = res.csicp_aa028
            const mappedList = list.map(item =>
            (
                {
                    key: item.csicp_aa028.Id,
                    value: item.csicp_aa028.AA028_Cidade
                }
            )
            )
            setCityList(mappedList)
        })
    }

    /**
     * funcao chamada ao selecionar uma ciade
     * @param key id da cidade selecionada
     */
    function setSelectedCity(key: string, value: string) {
        setValueToObjectWhenInputTyped('Cidade', key)
        setValueToObjectWhenInputTyped('CidadeNome', value)
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
                            onChangeText={(value) => setValueToObjectWhenInputTyped('CEP', value)}
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
                        {isBtnCepLoading ? <ActivityIndicator color={"#fff"} /> : <><Text style={commonStyle.common_text_button_style}>Buscar</Text></>}

                    </TouchableHighlight>
                </View>

                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Logradouro</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => setValueToObjectWhenInputTyped('Logradouro', value)}
                    value={attributesMap.Logradouro}
                    placeholder="Logradouro"
                />

                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl, { alignSelf: 'flex-start' }]}>
                    <View style={[commonStyle.common_columnItem, commonStyle.common_margin_right_16]}>
                        <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>N</Text>
                        <TextInput
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 80 }]}
                            onChangeText={(value) => setValueToObjectWhenInputTyped('Numero', value)}
                            value={attributesMap.Numero}
                            placeholder="N"
                        />
                    </View>

                    <View style={[commonStyle.common_columnItem]}>
                        <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Complemento</Text>
                        <TextInput
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 250 }]}
                            onChangeText={(value) => setValueToObjectWhenInputTyped('Complemento', value)}
                            value={attributesMap.Complemento}
                            placeholder="Complemento"
                        />
                    </View>
                </View>

                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Perímetro</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => setValueToObjectWhenInputTyped('Perimetro', value)}
                    value={attributesMap.Perimetro}
                    placeholder="Perímetro"
                />


                <View style={[commonStyle.justify_content_space_btw,
                commonStyle.common_rowItem,
                commonStyle.common_padding_08,
                commonStyle.common_margin_right_16]}>

                    <SelectList
                        placeholder="UF"
                        /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                         * getFormaPagamento()
                         */
                        setSelected={(key: string) => { setSelectedUf(key) }}
                        data={ufList!}
                        save="key"
                        search={false}
                        dropdownItemStyles={styles.dropdownStyle}
                    />

                    {cityList === undefined && attributesMap.UF !== '' && (
                        <Text>Carregando cidades</Text>
                    )}

                    {cityList !== undefined && (
                        <View style={[commonStyle.common_columnItem, { width: 230 }]}>
                            <SelectList
                                placeholder="Cidade"
                                /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                                 * getFormaPagamento()
                                 */
                                setSelected={(key: string) => { setSelectedCity(key, '') }}
                                data={cityList!}
                                save="key"
                            />

                        </View>
                    )}

                    {/**
                    {cityList !== undefined && attributesMap.Cidade === '' && (
                        <View style={[commonStyle.common_columnItem, { width: 230 }]}>
                            <CustomSearch
                                clickToSearch={false}
                                onSearchPress={(valor) => { getCities(valor) }}
                                placeholder="Cidade"
                            />
                            <View style={{ flexDirection: 'column', height: 140, borderWidth: 1, padding: 12, borderRadius: 20, borderColor: "#949494" }}>
                                <FlatList data={cityList}
                                    keyExtractor={(item) => item.key}
                                    renderItem={(item) => <RenderItemCondicao onCitySelected={(valor, key) => setSelectedCity(key, valor)} id={item.item.key} title={item.item.value} />}
                                />
                            </View>
                        </View>
                    )}
                         */}

                    {attributesMap.Cidade !== '' && (
                        <Text>{attributesMap.CidadeNome}</Text>
                    )}




                </View>



                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Bairro</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => setValueToObjectWhenInputTyped('Bairro', value)}
                    value={attributesMap.Bairro}
                    placeholder="Bairro"
                />

                <TouchableHighlight
                    onPress={() => { isSavingLoading ? showToast(ToastType.INFO, "Carregando!", "Aguarde") : saveEndereco() }}
                    style={commonStyle.common_button_style}
                    underlayColor='white'
                >
                    {isSavingLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={commonStyle.common_text_button_style}>Continuar</Text>}
                </TouchableHighlight>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    dropdownStyle: {
        width: 100
    }
})

export default CS_SC_009_CadastroEndereco;