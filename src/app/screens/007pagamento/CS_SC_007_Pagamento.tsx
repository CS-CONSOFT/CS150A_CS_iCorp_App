import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomCard_003 from "../../components/cards/CustomCard_003";
import CustomSeparator from "../../components/lists/CustomSeparator";
import { PaymentType } from "../../services/api/interfaces/pagamento/CS_IReqListFormPayment";
import { TermItem } from "../../services/api/interfaces/pagamento/IResPaymentTerm";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetListOfPaymentForm, handleGetListOfPaymentForm002, handleGetPaymentTerm, handleGetPaymentTermList } from "../../view_controller/pagamento/CS_PagamentoViewController";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { formatMoneyValue } from "../../util/FormatText";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { DataKey } from "../../enum/DataKeys";
import { handleGetPv } from "../../view_controller/prevenda/PreVendaViewController";
import { IResGetPv } from "../../services/api/interfaces/prevenda/CS_Common_IPreVenda";

const CS_SC_007_Pagamento = () => {
    const [currentPv, setCurrentPv] = useState<IResGetPv>()
    function start() {
        try {
            handleGetPv().then((res) => {
                if (res !== undefined) {
                    setCurrentPv(res)
                } else {
                    showToast(ToastType.ERROR, "Algo deu errado!", "---")
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Algo deu errado!", error)
        }
    }
    useEffect(() => {
        start()
    }, [])
    return (
        <SafeAreaView>
            <TopOfScreen currentPv={currentPv?.Id} />

            <CustomSeparator />

            <BuyValues />


            <CustomCard_003 children={<ItemSelecao />} />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_padding_16]}>
                <Text style={[commonStyle.common_fontWeight_800, { fontSize: 18 }]}>Detalhamento</Text>
                <CustomIcon icon={ICON_NAME.LIXEIRA} />
            </View>

            <CustomCard_001 title="Forma    -    Condição    -    Valor" children={<ItemDetalhamento />} />
        </SafeAreaView>
    );
}

const TopOfScreen = ({ currentPv }: { currentPv?: string }) => {
    return (
        <View>
            <Text style={[commonStyle.text_aligment_center, commonStyle.common_fontWeight_600, commonStyle.margin_8, commonStyle.font_size_18, { color: '#0A3147' }]}>{currentPv}</Text>
            <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_16, { color: '#0A3147', fontWeight: 500 }]}>99999 - Venda à  vista PDV-PA</Text>
        </View>
    )
}

const BuyValues = () => {
    return (
        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.margin_8]}>
            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Total da Compra
                </Text>
                <Text style={[commonStyle.text_aligment_center, , commonStyle.font_size_16, commonStyle.common_fontWeight_800, { color: '#0A3147' }]}>
                    RS125
                </Text>
            </View>

            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Valor Pago
                </Text>
                <Text style={[commonStyle.text_aligment_center, , commonStyle.font_size_16, commonStyle.common_fontWeight_800, { color: '#0A3147' }]}>
                    RS125
                </Text>
            </View>

            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Valor a Pagar
                </Text>
                <Text style={[commonStyle.text_aligment_center, , commonStyle.font_size_16, commonStyle.common_fontWeight_800, { color: '#0A3147' }]}>
                    RS125
                </Text>
            </View>

        </View>
    )
}


enum PaymentStage {
    FORMA = 1,
    CONDICAO = 2,
    PAGAMENTO = 3
}
const ItemSelecao = () => {
    /** o item atual correspondente a forma, condicao ou pagamento, para mostrar em tela */
    const [currentItem, setCurrentItem] = useState(PaymentStage.FORMA)
    const [formaId, setFormaId] = useState('')
    const [condicaoId, setCondicaoId] = useState('')
    /**
     * trata a funcao callback que recebe o id da forma selecionada
     * @param key id da forma selecionada
    */
    function onFormSelected(key: string) {
        setCurrentItem(PaymentStage.CONDICAO)
        setFormaId(key)
    }

    /**
     * trata a funcao callback que recebe o id da condicao selecionada
     * @param key id da condicao selecionada
     */
    function onTermSelected(key: string) {
        setCondicaoId(key)
        setCurrentItem(PaymentStage.PAGAMENTO)
    }

    const stages = [
        { stage: PaymentStage.FORMA, number: 1, label: "Forma" },
        { stage: PaymentStage.CONDICAO, number: 2, label: "Condição" },
        { stage: PaymentStage.PAGAMENTO, number: 3, label: "Pagamento" }
    ];


    return (
        <View style={commonStyle.common_columnItem}>
            {/** topo onde fica as colunas de forma, condicao e pagamento */}
            <View style={[commonStyle.common_columnItem, { padding: 16 }]}>
                {/** numeros */}
                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    {stages.map(({ stage, number }) => renderStageItem(stage, number, currentItem))}
                </View>

                {/** texto */}
                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    {stages.map(({ stage, label }) => renderStageLabel(stage, label, currentItem))}
                </View>
            </View>

            {/**esse ignore é porque o typescript estava achando que a comparação era nao intencional */}
            {/**@ts-ignore */}
            {currentItem === PaymentStage.FORMA && (
                <View style={[commonStyle.justify_content_space_evl, commonStyle.margin_8]}>
                    <ItemFormaPagamento onFormSelected={(key) => onFormSelected(key)} />
                </View>
            )}

            {/**@ts-ignore */}
            {currentItem === PaymentStage.CONDICAO && (
                <ItemCondicao onTermSelected={onTermSelected} formaId={formaId} />
            )}

            {/**@ts-ignore */}
            {currentItem === PaymentStage.PAGAMENTO && (
                <ItemPagamento paymentFormId={formaId} termId={condicaoId} />
            )}
        </View>
    )
}

const renderStageItem = (stage: PaymentStage, number: number, currentItem: PaymentStage) => (
    <View style={commonStyle.common_columnItem} key={number}>
        <View style={[{ borderWidth: 1, borderRadius: 32, padding: 8 }, currentItem === stage ? { borderColor: "#1068EB" } : { borderColor: "#CED4DA" }]}>
            <Text style={[
                commonStyle.common_fontWeight_600,
                commonStyle.text_aligment_center,
                currentItem === stage ? { color: "#1068EB" } : { color: "#CED4DA" }
            ]}>{number}</Text>
        </View>
    </View>
);

const renderStageLabel = (stage: PaymentStage, label: string, currentItem: PaymentStage) => (
    <Text style={[
        commonStyle.common_fontWeight_600,
        currentItem === stage ? { color: "#1068EB" } : { color: "#CED4DA" }
    ]} key={label}>{label}</Text>
);

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

    useEffect(() => {
        getFormaPagamento002()
    }, [])

    /**
      * Funcao que busca as formas de pagamento
      */
    function getFormaPagamento002() {
        try {
            handleGetListOfPaymentForm002().then((res) => {
                if (res !== undefined) {
                    console.log(res);

                    const transformedData = res.csicp_bb026!.map(item => ({
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
                    setSelected={(key: string) => { setSelected(key) }}
                    data={paymentsForm || [{}]}
                    save="key"
                />
            </View>
            {selected !== '' && !isEntrance && (
                <View style={[{ paddingHorizontal: 32 }, commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    <Pressable style={[commonStyle.btn_gray]} onPress={() => onFormSelected(selected)}>
                        <Text style={commonStyle.btn_text_gray}>Continuar</Text>
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

    useEffect(() => {
        getCondicaoPagamentoLista()
    }, [])

    /**
     * Funcao que busca as formas de pagamento
     */
    function getCondicaoPagamentoLista() {
        try {
            handleGetPaymentTermList({ paymentFormKey: formaId }).then((res) => {
                if (res !== undefined) {
                    const transformedData = res.List!.map(item => ({
                        key: item.Id,
                        value: item.Value
                    }));
                    setPaymentTerms(transformedData)
                } else {
                    showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "ERROR", error)
        }
    }
    return (
        <View style={{ height: 140, borderWidth: 1, padding: 12, margin: 12, borderRadius: 20, borderColor: "#949494" }}>
            <FlatList data={paymentTerms}
                keyExtractor={(item) => item.key}
                renderItem={(item) => <RenderItemCondicao onTermSelected={(key) => onTermSelected(key)} id={item.item.key} title={item.item.value} />}
            />
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

const ItemPagamento = ({ paymentFormId, termId }: { paymentFormId: string, termId: string }) => {
    const [termItem, setTermItem] = useState<TermItem>()
    const [paymentValue, setPaymentValue] = useState('')


    useEffect(() => {
        getCondicaoPagamento()
    }, [])

    /**
     * Funcao que busca as formas de pagamento
     */
    function getCondicaoPagamento() {
        try {
            handleGetPaymentTerm({ paymentFormKey: paymentFormId, termId: termId }).then((res) => {
                if (res !== undefined) {
                    setTermItem(res)
                } else {
                    showToast(ToastType.ERROR, "Lista vazia", "Não foi possivel recuperar a forma de pagamento!")
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "ERROR", error)
        }
    }


    return (
        <GestureHandlerRootView style={[commonStyle.common_columnItem, commonStyle.margin_8]}>
            <View>
                <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Pagamento</Text>
                <TextInput value={paymentValue} onChangeText={setPaymentValue} style={commonStyle.common_input} />

                {!termItem?.PermiteEntrada && (
                    <View>
                        <ItemFormaPagamento isEntrance={true} onFormSelected={(key: string) => { }} />
                        <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Valor Entrada</Text>
                        <TextInput value={paymentValue} onChangeText={setPaymentValue} style={commonStyle.common_input} />
                    </View>
                )}
                <View style={[{ paddingHorizontal: 32 }, commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                    <Pressable style={[commonStyle.btn_gray]} onPress={() => { }}>
                        <Text style={commonStyle.btn_text_gray}>Continuar</Text>
                    </Pressable>
                    <Pressable style={[commonStyle.btn_gray]} onPress={() => { }}>
                        <Text style={commonStyle.btn_text_gray}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

/**
 * Item de detalhamento
 */
const ItemDetalhamento = () => {
    return (
        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_padding_16]}>
            <Text>DINHEIRO</Text>
            <Text>XXXXXXXX</Text>
            <Text>{formatMoneyValue(12.9)} </Text>
        </View>
    )
}

export default CS_SC_007_Pagamento;