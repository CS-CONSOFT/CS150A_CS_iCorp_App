import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { commonStyle } from "../../CommonStyle";
import CustomSwitch from "../../components/switch/CustomSwitch";
import { handleGetListOfPaymentFormCreditoLoja, handleGetPaymentTermList } from "../../view_controller/pagamento/CS_PagamentoViewController";
import { SelectList } from "react-native-dropdown-select-list";
import { ToastType, showToast } from "../../util/ShowToast";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomLoading from "../../components/loading/CustomLoading";
import { IResPaymentFormByIdComplete } from "../../services/api/interfaces/pagamento/CS_IResPaymentFormByIdComplete";
import { Csicp_bb0082 } from "../../services/api/interfaces/pagamento/CS_IResPaymentFormById";
import { handleSimulacaoCrediario } from "../../view_controller/crediario/CrediarioViewController";

const CS_SC_012_SimuladorDeCredito = ({ route }: { route: any }) => {
    const [paymentValue, setPaymentValue] = useState(0)
    const [enterPaymentValue, setEnterPaymentValue] = useState(0)
    const [enterValue, setEnterValue] = useState(false)
    const [paymentsForm, setPaymentsForm] = useState<{ key: string, value: string }[]>();
    const [paymentTerms, setPaymentTerms] = useState<IResPaymentFormByIdComplete>();
    const { contaCodigo } = route.params


    const [selected, setSelected] = useState("");
    const [listaCondicao, setListaCondicao] = useState<Csicp_bb0082[]>([])
    const [listaJson, setListaJson] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        handleGetListOfPaymentFormCreditoLoja().then((res) => {
            const transformedData = res.Lista_bb026!.map(item => ({
                key: item.ID,
                value: item.BB026_FormaPagamento
            }));
            setPaymentsForm(transformedData)
            setIsLoading(false)
        })
    }, [])

    function insertTermOnList(term: Csicp_bb0082) {
        listaCondicao.push(term)
        setListaCondicao(listaCondicao)
    }

    async function generateJSONList() {
        setListaJson(JSON.stringify(listaCondicao))
    }

    return (
        <View>
            <View style={{ height: 85 }}>
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
            <CustomSwitch title="Valor Entrada?" switchValue={enterValue} onValueChange={(value: boolean) => setEnterValue(value)} />
            {enterValue && (
                <View style={{ height: 85 }}>
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

            <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Escolha a forma de pagamento</Text>
            <SelectList
                placeholder="Escolha a forma de pagamento"
                /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                 * getFormaPagamento()
                 */
                setSelected={(key: string) => {
                    handleGetPaymentTermList({ paymentFormKey: key }).then((res) => {
                        if (res !== undefined) {
                            setPaymentTerms(res)
                            setIsLoading(false)
                        } else {
                            showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                            setIsLoading(false)
                        }
                    })
                    setSelected(key)
                }}
                data={paymentsForm || [{}]}
                save="key"
            />

            <View style={{ height: 140, borderWidth: 1, padding: 12, margin: 12, borderRadius: 20, borderColor: "#949494" }}>
                {isLoading && (
                    <CustomLoading />
                )}

                {!isLoading && (
                    <FlatList data={paymentTerms?.formByIdWithConditions?.FatoresAcrescimos}
                        keyExtractor={(item) => item.csicp_bb008.ID}
                        renderItem={(item) => <RenderItemCondicao onTermSelected={(term) => insertTermOnList(term)} term={item.item.csicp_bb008} title={item.item.csicp_bb008.BB008_Condicao_Pagto} />}
                    />
                )}
            </View>


            <Pressable style={[commonStyle.btn_gray]} onPress={() => {
                generateJSONList().then(() => {
                    handleSimulacaoCrediario({ cs_conta_codigo: contaCodigo, cs_valor_financiado: paymentValue, cs_condicoes_lista: listaJson }).then((res) => {
                        console.log(res);
                    }).catch(() => [
                        showToast(ToastType.ERROR, "Falha!", "")
                    ])
                })
            }
            }>
                <Text style={commonStyle.btn_text_gray}>Simular</Text>
            </Pressable>


        </View >
    );
}


/**
 * 
 * @param onTermSelected é a funcao callback que ira levar para o componente pai o valor do id da condicao selecionada 
 * @returns 
 */
const RenderItemCondicao = ({ term, title, onTermSelected }: { term: Csicp_bb0082, title: string, onTermSelected: (term: Csicp_bb0082) => void }) => {
    return (
        <View>
            <Pressable onPress={() => onTermSelected(term)}>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center]}>{title}</Text>
                <CustomSeparator />
            </Pressable>
        </View>
    )
}

export default CS_SC_012_SimuladorDeCredito;