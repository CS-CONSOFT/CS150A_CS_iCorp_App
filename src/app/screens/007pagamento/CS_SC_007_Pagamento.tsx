import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomCard_003 from "../../components/cards/CustomCard_003";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomSeparator from "../../components/lists/CustomSeparator";
import { IReqInsertPaymentForm } from "../../services/api/interfaces/pagamento/CS_IReqInsertPaymentForm";
import { ItemListPaymentFormSaved } from "../../services/api/interfaces/pagamento/IResListPaymentFormSaved";
import { TermItem } from "../../services/api/interfaces/pagamento/IResPaymentTerm";
import { IResGetPv } from "../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { formatMoneyValue } from "../../util/FormatText";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleDeletePaymentForm, handleGetListOfPaymentForm002, handleGetPaymentTerm, handleGetPaymentTermList, handleInsertPaymentForm, handlePaymentSelectForm, handlePaymentSelectTerm } from "../../view_controller/pagamento/CS_PagamentoViewController";
import { INotaPagamentosValores, handleCalculateValuesPayedAndToPay, handleGetPv } from "../../view_controller/prevenda/PreVendaViewController";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import CustomLoading from "../../components/loading/CustomLoading";
import { moneyApplyMask, moneyRemoveMask } from "../../util/Masks";
import CurrencyInput from "react-native-currency-input";

const CS_SC_007_Pagamento = () => {
    // Estado para armazenar o PV (Ponto de Venda) atual
    const [currentPv, setCurrentPv] = useState<IResGetPv>()

    // Estado para controlar a exibição da opção de deletar forma de pagamento
    const [toDeleteForm, setToDeleteForm] = useState(false)

    // Estado para armazenar a lista de formas de pagamento salvas
    const [listOfPaymentSaved, setListOfPaymentSaved] = useState<ItemListPaymentFormSaved[]>()

    // Estado para armazenar os valores pagos e a pagar da nota
    const [iNotaValoresPagoEPagar, setiNotaValoresPagoEPagar] = useState<INotaPagamentosValores>()

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    // Função para inicializar o componente, obtendo os dados do PV e calculando os valores pagos e a pagar
    function start() {
        setStatus(FETCH_STATUS.LOADING)
        try {
            handleGetPv().then((res) => {
                if (res !== undefined) {
                    setCurrentPv(res)
                    setListOfPaymentSaved(res.DD072_FormaPagtos)

                    // Calculando valor pago e valor a pagar
                    setiNotaValoresPagoEPagar(handleCalculateValuesPayedAndToPay(res))
                    setStatus(FETCH_STATUS.SUCCESS)
                } else {
                    showToast(ToastType.ERROR, "Algo deu errado!", "---")
                    setStatus(FETCH_STATUS.ERROR)
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Algo deu errado!", error)
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    // useEffect para chamar a função start ao montar o componente
    useEffect(() => {
        start()
    }, [])

    // Função para deletar uma forma de pagamento
    function deletePaymentForm(formaPgtoAtendimentoId: string) {
        handleDeletePaymentForm({ formaPgtoAtendimentoId: formaPgtoAtendimentoId }).then((res) => {
            if (res !== undefined && res.IsOk) {
                showToast(ToastType.SUCCESS, "Forma deletada!", res.Msg)
                start()
            } else {
                showToast(ToastType.ERROR, "Error", res.Msg)
            }
        })
    }

    const isLoading = status === FETCH_STATUS.LOADING

    if (isLoading) {
        return <CustomLoading />
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {/* Componente para exibir o topo da tela com informações do protocolo e cliente */}
                <TopOfScreen currentPv={currentPv?.DD070_Nota.csicp_dd070.DD070_ProtocolNumber} clientPv={currentPv?.DD070_Nota.csicp_bb012.BB012_Nome_Cliente || ""} />

                <CustomSeparator />

                {/* Componente para exibir os valores de compra, pagamento a pagar e valor pago */}
                <BuyValues TotalLiquido={currentPv?.DD070_Nota.csicp_dd070.DD070_Total_Liquido} Pagamento_ValorAPagar={iNotaValoresPagoEPagar?.valorAPagar} Pagamento_ValorPago={iNotaValoresPagoEPagar?.valorPago} />

                {/* Componente para exibir a seleção de itens */}
                <CustomCard_003 children={<ItemSelecao valorAPagarZerado={iNotaValoresPagoEPagar?.valorAPagar === 0} finish={start} />} />

                {/* Seção de detalhamento com opção para deletar forma de pagamento */}
                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_padding_16]}>
                    <Text style={[commonStyle.common_fontWeight_800, { fontSize: 18 }]}>Detalhamento</Text>
                    <CustomIcon icon={ICON_NAME.LIXEIRA} onPress={() => setToDeleteForm(!toDeleteForm)} />
                </View>

                {/* Componente para exibir a lista de formas de pagamento com opção de deletar */}
                <CustomCard_001 title="Forma    -    Condição    -    Valor"
                    children={<ListDetalhamentoFormasPagamento
                        list={listOfPaymentSaved!}
                        toDeleteForm={toDeleteForm}
                        deletePaymentForm={(formaPgtoAtendimentoId) => deletePaymentForm(formaPgtoAtendimentoId)} />} />
            </ScrollView>
        </SafeAreaView>
    );
}
// Componente que exibe o topo da tela com informações do protocolo atual e do cliente
const TopOfScreen = ({ currentPv, clientPv }: { currentPv?: string, clientPv: string }) => {
    return (
        <View>
            {/* Exibe o protocolo atual no centro com estilo personalizado */}
            <Text style={[commonStyle.text_aligment_center, commonStyle.common_fontWeight_600, commonStyle.margin_8, commonStyle.font_size_18, { color: '#0A3147' }]}>{currentPv}</Text>
            {/* Exibe o nome do cliente no centro com estilo personalizado */}
            <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_16, { color: '#0A3147', fontWeight: 500 }]}>{clientPv}</Text>
        </View>
    )
}

// Componente que exibe os valores da compra, valor pago e valor a pagar
const BuyValues = ({ TotalLiquido, Pagamento_ValorPago, Pagamento_ValorAPagar }: { TotalLiquido?: number, Pagamento_ValorPago?: number, Pagamento_ValorAPagar?: number }) => {
    return (
        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.margin_8]}>
            {/* Exibe o valor total da compra */}
            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Total da Compra
                </Text>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_16, commonStyle.common_fontWeight_800, { color: '#0A3147' }]}>
                    {formatMoneyValue(TotalLiquido || 0)}
                </Text>
            </View>

            {/* Exibe o valor pago */}
            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Valor Pago
                </Text>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_16, commonStyle.common_fontWeight_800, { color: '#0A3147' }]}>
                    {formatMoneyValue(Pagamento_ValorPago || 0)}
                </Text>
            </View>

            {/* Exibe o valor a pagar */}
            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Valor a Pagar
                </Text>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_16, commonStyle.common_fontWeight_800, { color: '#0A3147' }]}>
                    {formatMoneyValue(Pagamento_ValorAPagar || 0)}
                </Text>
            </View>
        </View>
    )
}

// Enumeração para as etapas do pagamento
enum PaymentStage {
    FORMA = 1,
    CONDICAO = 2,
    PAGAMENTO = 3
}

// Componente que exibe as opções de seleção de item para a forma de pagamento, condição e pagamento
const ItemSelecao = ({ finish, valorAPagarZerado }: {
    /** Função chamada para buscar novamente na API os dados ao finalizar um pagamento */
    finish: () => void,
    /** Variável que indica se o valor a pagar está zerado */
    valorAPagarZerado: boolean
}) => {
    /** Estado que mantém o estágio atual da seleção */
    const [currentStage, setCurrentStage] = useState(PaymentStage.FORMA)
    /** Estado para armazenar o ID da forma de pagamento selecionada */
    const [formaPagamentoId, setFormaPagamentoId] = useState('')
    /** Estado para armazenar o ID da condição de pagamento selecionada */
    const [condicaoId, setCondicaoId] = useState('')

    /**
     * Função callback que recebe o ID da forma selecionada e avança para o estágio de condição
     * @param key ID da forma selecionada
     */
    function onFormSelected(key: string) {
        setFormaPagamentoId(key)
        handlePaymentSelectForm({ formId: key }).then(() => {
            setCurrentStage(PaymentStage.CONDICAO)
        })
    }

    /**
     * Função callback que recebe o ID da condição selecionada e avança para o estágio de pagamento
     * @param key ID da condição selecionada
     */
    function onTermSelected(key: string) {
        setCondicaoId(key)
        handlePaymentSelectTerm({ formId: formaPagamentoId, termId: key }).then(() => {
            setCurrentStage(PaymentStage.PAGAMENTO)
        })
    }

    // Definição das etapas com seus respectivos números e labels
    const stages = [
        { stage: PaymentStage.FORMA, number: 1, label: "Forma" },
        { stage: PaymentStage.CONDICAO, number: 2, label: "Condição" },
        { stage: PaymentStage.PAGAMENTO, number: 3, label: "Pagamento" }
    ];

    // Função para finalizar o pagamento e reiniciar o estágio para forma
    function finishPayment() {
        setCurrentStage(PaymentStage.FORMA)
        finish()
    }

    return (
        <View style={commonStyle.common_columnItem}>
            {/* Topo onde ficam as colunas de forma, condição e pagamento */}
            <View style={[commonStyle.common_columnItem, { padding: 16 }]}>
                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    {stages.map(({ stage, number, label }) => (
                        <View key={stage} style={{ alignItems: 'center' }}>
                            <Text style={[styles.number, stage === currentStage ? styles.active : {}]}>
                                {number}
                            </Text>
                            <Text style={[styles.text, stage === currentStage ? styles.active : {}]}>
                                {label}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Renderiza o componente ItemFormaPagamento se o estágio atual for FORMA */}
            {/**@ts-ignore */}
            {currentStage === PaymentStage.FORMA && (
                <View style={[commonStyle.justify_content_space_evl, commonStyle.margin_8]}>
                    <ItemFormaPagamento onFormSelected={(key) => {
                        onFormSelected(key)
                    }} />
                </View>
            )}

            {/* Renderiza o componente ItemCondicao se o estágio atual for CONDICAO */}
            {/**@ts-ignore */}
            {currentStage === PaymentStage.CONDICAO && (
                <ItemCondicao onTermSelected={onTermSelected} formaId={formaPagamentoId} />
            )}

            {/* Renderiza o componente ItemPagamento se o estágio atual for PAGAMENTO */}
            {/**@ts-ignore */}
            {currentStage === PaymentStage.PAGAMENTO && (
                <ItemPagamento valorAPagarZerado={valorAPagarZerado} finishPayment={finishPayment} paymentFormId={formaPagamentoId} termId={condicaoId} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    number: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#CED4DA',
    },
    text: {
        fontSize: 14,
        color: '#CED4DA',
    },
    active: {
        color: '#1068EB',
    },
});
/**
 * 
 * @param onFormSelected funcao de callback que ira retornar o valor da forma selecionada
 * para que consigamos fazer o usuário avançar para a proxima etapa 
 */
const ItemFormaPagamento = ({ onFormSelected, isEntrance = false }: { isEntrance?: boolean, onFormSelected: (key: string) => void }) => {
    /** guarda o id da forma de pagamento selecionada */
    const [selected, setSelected] = useState("");
    /** guarda a lista de pagamento */
    const [paymentsForm, setPaymentsForm] = useState<{ key: string, value: string }[]>();
    const [btnLoading, setBtnLoading] = useState(false)

    useEffect(() => {
        setBtnLoading(false)
        getFormaPagamento002()
    }, [])

    /**
      * Funcao que busca as formas de pagamento
      */
    function getFormaPagamento002() {
        try {
            handleGetListOfPaymentForm002(isEntrance).then((res) => {
                if (res !== undefined) {
                    const transformedData = res.Csicp_bb026!.map(item => ({
                        key: item.ID,
                        value: item.BB026_FormaPagamento
                    }));
                    setPaymentsForm(transformedData)
                } else {
                    showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "ERROR", error)
        }

    }

    return (
        <View>
            <View style={{ padding: 16 }}>
                <SelectList
                    placeholder="Escolha a forma de pagamento"
                    /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                     * getFormaPagamento()
                     */
                    setSelected={(key: string) => {
                        setSelected(key)
                        if (isEntrance) {
                            onFormSelected(key)
                        }
                    }}
                    data={paymentsForm!}
                    save="key"
                />
            </View>
            {selected !== '' && !isEntrance && (
                <View style={[{ paddingHorizontal: 32 }, commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    <Pressable style={[commonStyle.btn_gray]} onPress={() => {
                        setBtnLoading(true)
                        onFormSelected(selected)
                    }}>
                        {btnLoading ? <ActivityIndicator /> : <Text style={commonStyle.btn_text_gray}>Continuar</Text>}
                    </Pressable>
                    <Pressable style={[commonStyle.btn_transparente]} onPress={() => setSelected('')}>
                        <Text style={commonStyle.btn_text_transparente}>Cancelar</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

/**
 * 
 * @param formaId - chave da forma de pagamento selecionada 
 * @param onTermSelected é a funcao callback que ira levar para o componente pai o valor do id da condicao selecionada 
 * @returns 
 */
const ItemCondicao = ({ formaId, onTermSelected }: { formaId: string, onTermSelected: (key: string) => void }) => {
    /** guarda a lista de pagamento */
    const [paymentTerms, setPaymentTerms] = useState<{ key: string, value: string }[]>();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(false)
        getCondicaoPagamentoLista()
    }, [])

    /**
     * Funcao que busca as formas de pagamento
     */
    function getCondicaoPagamentoLista() {
        setIsLoading(true)
        try {
            handleGetPaymentTermList({ paymentFormKey: formaId }).then((res) => {
                if (res !== undefined) {
                    //tem condicao de pagamento e ela nao e ela possui condições. Ou seja, NÃO É FIXA
                    if (res.formByIdWithConditions?.FatoresAcrescimos != undefined) {
                        const transformedData = res.formByIdWithConditions.FatoresAcrescimos!.map(item => ({
                            key: item.csicp_bb008.ID,
                            value: item.csicp_bb008.BB008_Condicao_Pagto
                        }));
                        setPaymentTerms(transformedData)
                        setIsLoading(false)
                    } else {
                        const transformedData = [{
                            key: res.formByIdWithFixedConditions!.csicp_bb026.csicp_bb008.ID,
                            value: res.formByIdWithFixedConditions!.csicp_bb026.csicp_bb008.BB008_Condicao_Pagto
                        }]
                        setPaymentTerms(transformedData)
                        onTermSelected(res.formByIdWithFixedConditions!.csicp_bb026.csicp_bb008.ID)
                    }
                } else {
                    showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                    setIsLoading(false)
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "ERROR", error)
            setIsLoading(false)
        }
    }
    return (
        <View style={{ height: 140, borderWidth: 1, padding: 12, margin: 12, borderRadius: 20, borderColor: "#949494" }}>
            {isLoading && (
                <CustomLoading />
            )}

            {!isLoading && (
                <FlatList data={paymentTerms}
                    keyExtractor={(item) => item.key}
                    renderItem={(item) => <RenderItemCondicao onTermSelected={(key) => onTermSelected(key)} id={item.item.key} title={item.item.value} />}
                />
            )}
        </View>
    )
}

/**
 * 
 * @param onTermSelected é a funcao callback que ira levar para o componente pai o valor do id da condicao selecionada 
 * @returns 
 */
const RenderItemCondicao = ({ id, title, onTermSelected }: { id: string, title: string, onTermSelected: (key: string) => void }) => {
    return (
        <View>
            <Pressable onPress={() => onTermSelected(id)}>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center]}>{title}</Text>
                <CustomSeparator />
            </Pressable>
        </View>
    )
}

/** termId == condicaoId */
const ItemPagamento = ({ paymentFormId, termId, finishPayment, valorAPagarZerado }: { valorAPagarZerado: boolean, paymentFormId: string, termId: string, finishPayment: () => void }) => {
    const [termItem, setTermItem] = useState<TermItem>()
    const [paymentValue, setPaymentValue] = useState(0)
    const [paymentValueEntranceValue, setPaymentValueEntranceValue] = useState(0)
    const [entranceFormId, setEntranceFormId] = useState('')
    const [btnClickLoading, setBtnClickLoading] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)


    useEffect(() => {
        getCondicaoPagamento()
    }, [])

    /**
     * Funcao que busca as formas de pagamento
     */
    function getCondicaoPagamento() {
        setIsLoadingData(true)
        try {
            handleGetPaymentTerm({ paymentFormKey: paymentFormId, termId: termId }).then((res) => {
                if (res !== undefined) {
                    setTermItem(res)
                } else {
                    showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                }
                setIsLoadingData(false)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "ERROR", error)
            setIsLoadingData(false)
        }
    }

    /** funcao para inserir forma de pagamento */
    function scInsertPaymentForm() {
        setBtnClickLoading(true)
        if (valorAPagarZerado) {
            showToast(ToastType.ERROR, "Aviso", "A nota tem VALOR PAGO igual ao TOTAL DA COMPRA! ")
            setBtnClickLoading(false)
            return
        }
        try {
            const iReqInsertPaymentForm: IReqInsertPaymentForm = {
                FormaPagamentoId: paymentFormId,
                CondicaoPagamentoId: termId,
                FormaPagamentoEntradaId: entranceFormId || undefined,
                Valor: paymentValue,
                ValorEntrada: paymentValueEntranceValue || 0
            }

            if (iReqInsertPaymentForm.ValorEntrada == 0 && entranceFormId != '') {
                showToast(ToastType.ERROR, "Aviso", "Insira valor de entrada!")
                setBtnClickLoading(false)
                return
            }



            if (iReqInsertPaymentForm.Valor == 0) {
                showToast(ToastType.ERROR, "Aviso", "Insira valor pagamento!")
                setBtnClickLoading(false)
                return
            }

            handleInsertPaymentForm({ insertPaymentBody: iReqInsertPaymentForm }).then((res) => {
                if (res.IsOk) {
                    showToast(ToastType.SUCCESS, "Sucesso", res.Msg)
                } else {
                    showToast(ToastType.ERROR, "Erro", res.Msg)
                }
                setBtnClickLoading(false)
                finishPayment()
            })

        } catch (error: any) {
            showToast(ToastType.ERROR, error, "")
            setBtnClickLoading(false)
        }
    }


    return (
        <GestureHandlerRootView style={[commonStyle.common_columnItem, commonStyle.margin_8]}>
            <View>
                {isLoadingData && (
                    <CustomLoading />
                )}
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

                {termItem?.PermiteEntrada && (
                    <View>

                        {/** CHAMANDO O COMPONENTE DE FORMA DE PAGAMENTO SETANDO A ENTRADA COMO TRUE */}
                        <ItemFormaPagamento onFormSelected={(key) => {
                            setEntranceFormId(key)
                        }} isEntrance={true} />


                        <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Valor Entrada</Text>
                        <CurrencyInput
                            value={paymentValueEntranceValue}
                            onChangeValue={(number) => setPaymentValueEntranceValue(number || 0)}
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
                <View style={[{ paddingHorizontal: 32 }, commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>


                    <Pressable style={[commonStyle.btn_gray]} onPress={() => scInsertPaymentForm()}>
                        {btnClickLoading ? <ActivityIndicator /> : <Text style={commonStyle.btn_text_gray}>Finalizar</Text>}
                    </Pressable>


                    <Pressable style={[commonStyle.btn_gray]} onPress={() => {
                        finishPayment()
                    }}>
                        <Text style={commonStyle.btn_text_gray}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

const ListDetalhamentoFormasPagamento = ({ list, toDeleteForm, deletePaymentForm }: { list: ItemListPaymentFormSaved[], toDeleteForm: boolean, deletePaymentForm: (formaPgtoAtendimentoId: string) => void }) => {
    return (
        <View>
            <FlatList
                data={list}
                keyExtractor={(item) => item.csicp_dd072.DD072_Id.toString()}
                renderItem={({ item }) => <ItemDetalhamento toDeleteForm={toDeleteForm} deletePaymentForm={(formaPgtoAtendimentoId) => deletePaymentForm(formaPgtoAtendimentoId)} item={item} />}
                ListEmptyComponent={<CustomEmpty text="Nenhuma forma de pagamento salva!" />}
            />
        </View>
    )
}

/**
 * Item de detalhamento
 */
const ItemDetalhamento = ({ toDeleteForm, deletePaymentForm, item }: { toDeleteForm: boolean, deletePaymentForm: (formaPgtoAtendimentoId: string) => void, item: ItemListPaymentFormSaved }) => {
    return (
        <View style={commonStyle.common_columnItem}>
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_padding_16, toDeleteForm && { backgroundColor: "#141414CC" }]}>
                <Text>{item.csicp_bb026.BB026_FormaPagamento}</Text>
                {toDeleteForm ? <CustomIcon icon={ICON_NAME.LIXEIRA} iconColor="#FFF" iconSize={24} onPress={() => deletePaymentForm(item.csicp_dd072.DD072_Id)} /> : <Text>{item.csicp_bb008.BB008_Condicao_Pagto}</Text>}
                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    <Text>{formatMoneyValue(item.csicp_dd072.DD072_Valor_TotalPago)} </Text>
                </View>
            </View>


            {item.FormaPagto_Vinculado && item.FormaPagto_Vinculado.V1_csicp_dd072.DD072_Valor_Pago > 0 && (
                <View>
                    <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, { paddingHorizontal: 16, backgroundColor: "#C3C3C3" }]}>
                        <Text style={{ padding: 16 }}>Entrada:</Text>
                        <Text style={{ padding: 16 }}>{item.FormaPagto_Vinculado.V2_csicp_bb026.BB026_FormaPagamento}</Text>
                        <Text style={{ padding: 16 }}>{formatMoneyValue(item.FormaPagto_Vinculado.V1_csicp_dd072.DD072_Valor_Pago)}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default CS_SC_007_Pagamento;
