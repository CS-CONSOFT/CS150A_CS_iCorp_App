import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { commonStyle } from "../../../../CommonStyle";
import CustomIcon from "../../../../components/icon/CustomIcon";
import CustomLoading from "../../../../components/loading/CustomLoading";
import { DD071_Enderecos } from "../../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { FETCH_STATUS } from "../../../../util/FETCH_STATUS";
import { ICON_NAME } from "../../../../util/IconsName";
import { ToastType, showToast } from "../../../../util/ShowToast";
import { handleGetCep, handleGetCityList, handleGetUfList } from "../../../../view_controller/endereco/EnderecoViewController";
import { handleGetPv, handleSaveDD071, mapToUpdateEndereco } from "../../../../view_controller/prevenda/PreVendaViewController";


const CS_SC_003_02_01_PreVendaEditEnd = ({ route }: { route: any }) => {
    // Estado para armazenar os atributos do endereço
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

    // Navegação para mudar de tela
    const navigation = useNavigation()

    // Estados para armazenar listas de UF e cidades
    const [ufList, setUfList] = useState<{ key: string, value: string }[]>()
    const [cityList, setCityList] = useState<{ key: string, value: string }[]>()

    // Estados para controlar carregamento
    const [isSavingLoading, setIsSavingLoading] = useState(false)
    const [isBtnCepLoading, setIsBtnCepLoading] = useState(false)

    // Estado para armazenar o endereço atual
    const [enderecamentoAtual, setEnderecamentoAtual] = useState<DD071_Enderecos>()

    // Estado para controlar o status de busca
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    // Pegar o parâmetro de rota (enderecoId)
    const { enderecoId } = route.params

    // Função para resetar o formulário
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

    // Função para pegar a pré-venda atual e setar os valores do endereço atual no formulário
    function getCurrentPv() {
        setStatus(FETCH_STATUS.LOADING)
        handleGetPv().then((res) => {
            if (res !== undefined) {
                const current = res.DD071_Enderecos.find((item) => item.csicp_dd071.DD070_ID === enderecoId)

                handleInputTyping('CEP', (current?.csicp_dd071.DD071_CEP || 0).toString())
                handleInputTyping('Logradouro', current?.csicp_dd071.DD071_Logradouro || "")
                handleInputTyping('Bairro', current?.csicp_dd071.DD071_NomeBairro || "")
                handleInputTyping('Complemento', current?.csicp_dd071.DD071_Complemento || "")
                handleInputTyping('UF', current?.csicp_dd071.DD071_UF_ID || "")
                handleInputTyping('Cidade', current?.csicp_dd071.DD071_Cidade_ID || "")
                handleInputTyping('Numero', current?.csicp_dd071.DD071_Numero || "")
                handleInputTyping('Perímetro', current?.csicp_dd071.DD071_Perimetro || "")

                setEnderecamentoAtual(current)
            }
        })
    }

    // useEffect para pegar a pré-venda atual e a lista de UFs na montagem do componente
    useEffect(() => {
        getCurrentPv()
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
                setStatus(FETCH_STATUS.SUCCESS)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Falha", "Ao recuperar os estados")
        }
        setStatus(FETCH_STATUS.SUCCESS)
    }, [])

    // Função para setar o valor do input no state attributesMap
    function handleInputTyping(id: string, value: string): void {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    }

    /**
     * Função para setar um valor no state attributesMap quando um input é digitado
     * @param id id do valor do objeto
     * @param value valor do objeto
     */
    function setValueToObjectWhenInputTyped(id: string, value: string): void {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    }

    /**
     * Função que recupera os valores do CEP do VIA CEP
     */
    function getValuesFromCep() {
        setIsBtnCepLoading(true)
        try {
            handleGetCep(attributesMap.CEP).then((res) => {
                if (res !== undefined) {
                    setValueToObjectWhenInputTyped('Logradouro', res.LOGRADOURO)
                    setValueToObjectWhenInputTyped('Bairro', res.BAIRRO)
                    setValueToObjectWhenInputTyped('UF', res.UF_ID)
                    setValueToObjectWhenInputTyped('Cidade', res.CIDADE_ID)
                    setSelectedUf(res.UF_ID)
                    setSelectedCity(res.CIDADE_ID)
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
     * Função que salva um endereço
     */
    function saveEndereco() {
        if (!attributesMap.CEP || !attributesMap.Logradouro || !attributesMap.Bairro || !attributesMap.Numero) {
            showToast(ToastType.ERROR, "Campos Faltando", "Preencha corretamente todos")
            return;
        }
        setIsSavingLoading(true)

        const iSaveEndereco = mapToUpdateEndereco(enderecamentoAtual!, attributesMap)

        handleSaveDD071({ cs_req_save: iSaveEndereco }).then(() => {
            resetForm()
            navigation.goBack()
        })
    }

    /**
     * Função chamada ao selecionar uma UF no dropdown
     * @param key id da seleção
     */
    function setSelectedUf(key: string) {
        setValueToObjectWhenInputTyped('Cidade', '')
        setValueToObjectWhenInputTyped('UF', key)
        getCities()
    }

    /**
     * Função que busca as cidades
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
     * Função chamada ao selecionar uma cidade
     * @param key id da cidade selecionada
     */
    function setSelectedCity(key: string) {
        setValueToObjectWhenInputTyped('Cidade', key)
    }

    // Renderiza um loading se o status estiver carregando
    if (status === FETCH_STATUS.LOADING) {
        return <CustomLoading />
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
                            value={attributesMap.CEP}
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
                        defaultOption={{ key: enderecamentoAtual?.csicp_dd071.DD071_UF_ID, value: enderecamentoAtual?.csicp_aa027.AA027_Sigla }}
                    />


                    {cityList !== undefined && (
                        <View style={[commonStyle.common_columnItem, { width: 230 }]}>
                            <SelectList
                                placeholder="Cidade"
                                /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                                 * getFormaPagamento()
                                 */
                                setSelected={(key: string) => { setSelectedCity(key) }}
                                data={cityList!}
                                save="key"
                                defaultOption={{ key: enderecamentoAtual?.csicp_dd071.DD071_Cidade_ID, value: enderecamentoAtual?.csicp_aa028.AA028_Cidade }}
                            />

                        </View>
                    )}


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
                    {isSavingLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={commonStyle.common_text_button_style}>Atualizar</Text>}
                </TouchableHighlight>
            </ScrollView>
        </SafeAreaView >
    );
}


export default CS_SC_003_02_01_PreVendaEditEnd;