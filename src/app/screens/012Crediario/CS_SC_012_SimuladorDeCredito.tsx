import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { commonStyle } from "../../CommonStyle";
import CustomSwitch from "../../components/switch/CustomSwitch";
import { handleGetListOfPaymentFormCombo, handleGetListOfPaymentFormCreditoLoja, handleGetPaymentTermList } from "../../view_controller/pagamento/CS_PagamentoViewController";
import { SelectList } from "react-native-dropdown-select-list";
import { ToastType, showToast } from "../../util/ShowToast";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomLoading from "../../components/loading/CustomLoading";
import { IResPaymentFormByIdComplete } from "../../services/api/interfaces/pagamento/CS_IResPaymentFormByIdComplete";
import { Csicp_bb0082 } from "../../services/api/interfaces/pagamento/CS_IResPaymentFormById";
import { handleSimulacaoCrediario } from "../../view_controller/crediario/CrediarioViewController";
import { useNavigation } from "@react-navigation/native";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import React from "react";

const CS_SC_012_SimuladorDeCredito = ({ route }: { route: any }) => {
    const [paymentValue, setPaymentValue] = useState(0)
    const [enterPaymentValue, setEnterPaymentValue] = useState(0)
    const [enterValue, setEnterValue] = useState(false)
    const [paymentsForm, setPaymentsForm] = useState<{ key: string, value: string }[]>();
    const [paymentTerms, setPaymentTerms] = useState<IResPaymentFormByIdComplete>();
    const { contaCodigo } = route.params

    const [listaCondicao, setListaCondicao] = useState<Csicp_bb0082[]>([])
    const [listaJson, setListaJson] = useState('')

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    const { navigate } = useNavigation()

    useEffect(() => {
        setStatus(FETCH_STATUS.LOADING)
        handleGetListOfPaymentFormCombo(undefined, "CreditoLoja", false).then((res) => {
            const transformedData = res.Csicp_bb026!.map(item => ({
                key: item.ID,
                value: item.BB026_FormaPagamento
            }));
            setPaymentsForm(transformedData)
            setStatus(FETCH_STATUS.IDLE)
        }).catch((err) => {
            showToast(ToastType.ERROR, "Falha", err.response.data.Errors[0])
            setStatus(FETCH_STATUS.ERROR)
        })
    }, [])

    /**
     * insere ou remove item da lista de condicao selecionada
     * @param term condicao
     */

    function insertTermOnList(term: Csicp_bb0082) {
        const hasTermOnList = listaCondicao.includes(term)
        if (!hasTermOnList) {
            setListaCondicao([...listaCondicao, term])//
        } else {
            const newList = listaCondicao.filter((item) => item !== term)
            setListaCondicao(newList)
        }
    }

    async function generateJSONList() {
        setListaJson(JSON.stringify(listaCondicao))
    }

    function checkIfHasEntranceAndThrowErrorIfItIs() {
        listaCondicao.forEach((item) => {
            if (item.BB008_Condicao_Pagto.startsWith("1 +") && enterPaymentValue === 0) {
                showToast(ToastType.ERROR, "Sem valor Entrada!", "Valor de entrada deve ser maior que R$ 0,00")
                setEnterValue(true)
                return
            }
        })
    }

    async function simulate() {
        setStatus(FETCH_STATUS.LOADING);
        await generateJSONList();
        try {
            const res = await handleSimulacaoCrediario({
                cs_conta_codigo: contaCodigo,
                cs_valor_financiado: paymentValue,
                cs_condicoes_lista: listaJson
            });
            navigate('RespostaCrediario', { jsonResponse: JSON.stringify(res), valorEntrada: enterPaymentValue });
        } catch {
            showToast(ToastType.ERROR, "Falha!", "");
        } finally {
            setStatus(FETCH_STATUS.IDLE);
        }
    }

    if (status === FETCH_STATUS.LOADING) {
        return <CustomLoading />;
    }

    return (
        <ScrollView style={commonStyle.common_padding_16}>
            <View style={{ height: 85, marginBottom: 12 }}>
                <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Pagamento</Text>
                <CurrencyInput
                    value={paymentValue}
                    onChangeValue={(number) => setPaymentValue(number || 0)}
                    /** @ts-ignore */
                    renderTextInput={textInputProps => <TextInput style={[
                        commonStyle.common_input,
                        { height: 40, flex: 1, padding: 10 }
                    ]} {...textInputProps} />}
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                />
            </View>
            <CustomSeparator />
            <CustomSwitch title="Valor Entrada?" switchValue={enterValue} onValueChange={(value: boolean) => setEnterValue(value)} />
            {enterValue && (
                <View style={{ marginVertical: 12, height: 85 }}>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Valor Entrada</Text>
                    <CurrencyInput
                        value={enterPaymentValue}
                        onChangeValue={(number) => setEnterPaymentValue(number || 0)}
                        /** @ts-ignore */
                        renderTextInput={textInputProps => <TextInput style={[
                            commonStyle.common_input,
                            { height: 40, flex: 1, padding: 10 }
                        ]} {...textInputProps} />}
                        prefix="R$ "
                        delimiter="."
                        separator=","
                        precision={2}
                    />
                </View>
            )}


            <CustomSeparator />


            <Text style={[commonStyle.common_fontWeight_600, commonStyle.common_margin_top_8, commonStyle.font_size_18]}>Escolha a forma de pagamento</Text>
            <SelectList
                placeholder="Escolha a forma de pagamento"
                /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                 * getFormaPagamento()
                 */
                setSelected={(key: string) => {
                    handleGetPaymentTermList({ paymentFormKey: key }).then((res) => {
                        if (res !== undefined) {
                            setPaymentTerms(res)
                        } else {
                            showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                        }
                    })
                }}
                data={paymentsForm || [{}]}
                save="key"
            />
            <Text style={[commonStyle.common_fontWeight_600, commonStyle.common_margin_top_8, commonStyle.font_size_18]}>Condições</Text>
            <View style={{ height: 140, borderWidth: 1, padding: 12, margin: 12, borderRadius: 20, borderColor: "#949494" }}>
                {paymentTerms !== undefined && (
                    <FlatList data={paymentTerms?.formByIdWithConditions?.FatoresAcrescimos}
                        keyExtractor={(item) => item.csicp_bb008.ID}
                        renderItem={(item) => <RenderItemCondicao onTermSelected={(term) => insertTermOnList(term)} term={item.item.csicp_bb008} title={item.item.csicp_bb008.BB008_Condicao_Pagto} />}
                    />
                )}
            </View>

            <CustomSeparator />
            <Text style={[commonStyle.common_fontWeight_600, commonStyle.common_margin_top_8, commonStyle.font_size_18]}>Condições Selecionadas</Text>
            <FlatList data={listaCondicao}
                horizontal={false}
                keyExtractor={(item) => item.ID}
                renderItem={({ item, index }) => <>
                    {index % 2 === 0 && (
                        <View style={{ backgroundColor: "#C3C3C3", borderRadius: 12, padding: 4 }}>
                            <Text> {item.BB008_Condicao_Pagto}; </Text>
                        </View>
                    )}

                    {index % 2 !== 0 && (
                        <View style={{ borderRadius: 12, padding: 4 }}>
                            <Text> {item.BB008_Condicao_Pagto}; </Text>
                        </View>
                    )}

                </>}
            />
            <CustomSeparator />

            <TouchableOpacity style={[commonStyle.btn_gray, { padding: 16, marginBottom: 16 }]} onPress={() => simulate()}>
                <Text style={commonStyle.btn_text_gray}>Simular</Text>
            </TouchableOpacity>


        </ScrollView >
    );
}


/**
 * 
 * @param onTermSelected é a funcao callback que ira levar para o componente pai o valor do id da condicao selecionada 
 * @returns 
 */
const RenderItemCondicao = ({ term, title, onTermSelected }: { term: Csicp_bb0082, title: string, onTermSelected: (term: Csicp_bb0082) => void }) => {
    const [itemSelected, setItemSelected] = useState(false)
    return (
        <View>
            {itemSelected && (
                <Pressable style={{ backgroundColor: "#c3c3c3" }} onPress={() => {
                    setItemSelected(!itemSelected)
                    onTermSelected(term)
                }}>
                    <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center]}>{title}</Text>
                    <CustomSeparator />
                </Pressable>
            )}

            {!itemSelected && (
                <Pressable onPress={() => {
                    setItemSelected(!itemSelected)
                    onTermSelected(term)
                }}>
                    <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center]}>{title}</Text>
                    <CustomSeparator />
                </Pressable>
            )}

        </View>
    )
}

export default CS_SC_012_SimuladorDeCredito;