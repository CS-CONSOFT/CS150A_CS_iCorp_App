import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { CS_IReqSaveEndereco } from "../../services/api/interfaces/contas/CS_IReqSaveEndereco";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetContaById, handleSave1206 } from "../../view_controller/conta/ContaViewController";
import { handleGetCep, handleGetCityList, handleGetUfList } from "../../view_controller/endereco/EnderecoViewController";
import { IResGetContaById } from "../../services/api/interfaces/contas/CS_IResGetContaById";
import ColorStyle from "../../ColorStyle";


const CS_SC_009_CadastroEndereco = ({ route }: { route: any }) => {
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        CEP: '',
        Logradouro: '',
        Bairro: '',
        Complemento: '',
        CidadeNome: '',
        UFNome: '',
        Numero: '',
        Perimetro: ''
    });

    const [ufSelected, setUfSelected] = useState('')
    const [citySelected, setCitySelected] = useState('')

    const { navigate } = useNavigation()
    const [isBtnCepLoading, setIsBtnCepLoading] = useState(false)
    const [ufList, setUfList] = useState<{ key: string, value: string }[]>()
    const [cityList, setCityList] = useState<{ key: string, value: string }[]>()
    const [isSavingLoading, setIsSavingLoading] = useState(false)
    const [userToEdit, setUserToEdit] = useState<IResGetContaById>()
    const [isLoadingData, setIsLoadingData] = useState(false)

    const { bb12id, isEdit } = route.params

    function resetForm() {
        setAttributesMap({
            CEP: '',
            Logradouro: '',
            Bairro: '',
            Complemento: '',
            CidadeNome: '',
            UFNome: '',
            Numero: '',
            Perimetro: ''
        });
        setIsSavingLoading(false)
    }


    useEffect(() => {
        try {
            handleGetUfList().then((res) => {
                const list = res.Lista_csicp_aa027
                console.log(list);

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

        if (isEdit) {
            setIsLoadingData(true)
            getContaByIdToEdit(bb12id)
        }


    }, [bb12id])


    function getContaByIdToEdit(bb012_id: string) {
        handleGetContaById({ cs_conta_id: bb012_id }).then((res) => {
            //seta o usuario para editar
            setUserToEdit(res)
            setSelectedUf(res.BB01206_Endereco.csicp_aa028.UFId)
            setSelectedCity(res.BB01206_Endereco.csicp_aa028.Id)
            setAttributesMap({
                CEP: (res.BB01206_Endereco.csicp_bb01206.BB012_CEP).toString(),
                Logradouro: res.BB01206_Endereco.csicp_bb01206.BB012_Logradouro,
                Bairro: res.BB01206_Endereco.csicp_bb01206.BB012_Bairro,
                Complemento: res.BB01206_Endereco.csicp_bb01206.BB012_Complemento,
                Numero: res.BB01206_Endereco.csicp_bb01206.BB012_Numero,
                Perimetro: res.BB01206_Endereco.csicp_bb01206.BB012_Perimetro
            });
            setIsLoadingData(false)
        })
    }


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
                if (res !== undefined) {
                    setValueToObjectWhenInputTyped('Logradouro', res.LOGRADOURO)
                    setValueToObjectWhenInputTyped('Bairro', res.BAIRRO)
                    setValueToObjectWhenInputTyped('UFNome', res.UF_NOME)
                    setValueToObjectWhenInputTyped('CidadeNome', res.CIDADE_NOME)
                    setSelectedCity(res.CIDADE_ID)
                    setSelectedUf(res.UF_ID)
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

        let iSaveEndereco: CS_IReqSaveEndereco = userToEdit?.BB01206_Endereco.csicp_bb01206 || {}

        if (!citySelected || !ufSelected || !attributesMap.CEP || !attributesMap.Logradouro || !attributesMap.Bairro || !attributesMap.Numero || !attributesMap.Complemento || !attributesMap.Perimetro) {
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
        iSaveEndereco.BB012_UF = ufSelected
        iSaveEndereco.BB012_Codigo_Cidade = citySelected
        iSaveEndereco.BB012_ID = isEdit ? userToEdit?.csicp_bb012.csicp_bb012.ID : bb12id
        try {
            handleSave1206({ cs_req_save: iSaveEndereco }).then(() => {
                resetForm()
                navigate('TabListCliente')
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error)
        }
    }

    /**
     * funcao que é chamada ao selecionar uma uf no dropdown
     * @param key id da selecao
     */
    function setSelectedUf(key: string) {
        setUfSelected(key)
        getCities(key, undefined)
    }

    /**
     * funcao que busca as cidades
     * @param valor o valor de pesquisa
     * @param ufId id da UF
     */
    function getCities(ufId: string, valor?: string) {
        handleGetCityList(ufId, valor).then((res) => {
            const list = res.csicp_aa028
            if (list !== undefined) {
                const mappedList = list.map(item =>
                (
                    {
                        key: item.csicp_aa028.Id,
                        value: item.csicp_aa028.AA028_Cidade
                    }
                )
                )
                setCityList(mappedList)
            }
        })
    }

    /**
     * funcao chamada ao selecionar uma ciade
     * @param key id da cidade selecionada
     */
    function setSelectedCity(key: string) {
        setCitySelected(key)
    }

    function sair() {
        navigate('TabListCliente')
    }



    if (isLoadingData) {
        return <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
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
                        <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>N°</Text>
                        <TextInput
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16, { width: 80 }]}
                            onChangeText={(value) => setValueToObjectWhenInputTyped('Numero', value)}
                            value={attributesMap.Numero}
                            placeholder="N°"
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

                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>UF - CIDADE</Text>
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
                        defaultOption={isEdit ? { key: ufSelected, value: userToEdit?.BB01206_Endereco.csicp_aa027.AA027_Sigla } : { key: ufSelected, value: attributesMap.UFNome }}
                    />

                    {cityList === undefined && ufSelected !== '' && (
                        <Text>Carregando cidades</Text>
                    )}

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
                                defaultOption={isEdit ? { key: citySelected, value: userToEdit?.BB01206_Endereco.csicp_aa028.AA028_Cidade } : { key: citySelected, value: attributesMap.CidadeNome }}
                            />

                        </View>
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
                    {isSavingLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={commonStyle.common_text_button_style}>Finalizar</Text>}
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => { isSavingLoading ? showToast(ToastType.INFO, "Carregando!", "Aguarde") : sair() }}
                    style={[{ margin: 16 }]}
                    underlayColor='white'
                >
                    {isSavingLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={commonStyle.btn_text_transparente}>Cancelar/Sair</Text>}
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