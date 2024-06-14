import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomCard_003 from "../../components/cards/CustomCard_003";
import CustomSeparator from "../../components/lists/CustomSeparator";
import { PaymentForm } from "../../services/api/interfaces/pagamento/CS_IReqListFormPayment";
import { PaymentResponseListItem } from "../../services/api/interfaces/pagamento/CS_IResListFormPayment";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetListOfPaymentForm } from "../../view_controller/pagamento/CS_PagamentoViewController";

const CS_SC_007_Pagamento = () => {

    return (
        <SafeAreaView>
            <TopOfScreen />

            <CustomSeparator />

            <BuyValues />


            <CustomCard_003 children={<ItemSelecao />} />

            <Text>Detalhamento</Text>
            <CustomCard_001 title="Forma - Condição - Valor" children={<ItemDetalhamento />} />
        </SafeAreaView>
    );
}

const TopOfScreen = () => {
    return (
        <View>
            <Text style={[commonStyle.text_aligment_center, commonStyle.common_fontWeight_600, commonStyle.margin_8, commonStyle.font_size_18, { color: '#0A3147' }]}>200400000000000</Text>
            <Text style={[commonStyle.text_aligment_center, commonStyle.font_size_16, { color: '#0A3147' }]}>99999 - Venda à  vista PDV-PA</Text>
        </View>
    )
}

const BuyValues = () => {
    return (
        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.margin_8]}>
            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.common_fontWeight_600, , commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Total da Compra
                </Text>
                <Text style={[commonStyle.text_aligment_center, , commonStyle.font_size_16, { color: '#0A3147' }]}>
                    RS125
                </Text>
            </View>

            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.common_fontWeight_600, , commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Valor Pago
                </Text>
                <Text style={[commonStyle.text_aligment_center, , commonStyle.font_size_16, { color: '#0A3147' }]}>
                    RS125
                </Text>
            </View>

            <View style={commonStyle.common_columnItem}>
                <Text style={[commonStyle.text_aligment_center, commonStyle.common_fontWeight_600, , commonStyle.font_size_18, { color: '#0A3147' }]}>
                    Valor a Pagar
                </Text>
                <Text style={[commonStyle.text_aligment_center, , commonStyle.font_size_16, { color: '#0A3147' }]}>
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
    const [currentItem, setCurrentItem] = useState(PaymentStage.PAGAMENTO)

    return (
        <View style={commonStyle.common_columnItem}>
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                <Text onPress={() => setCurrentItem(PaymentStage.FORMA)}>Forma</Text>
                <Text onPress={() => setCurrentItem(PaymentStage.CONDICAO)}>Condição</Text>
                <Text onPress={() => setCurrentItem(PaymentStage.PAGAMENTO)}>Pagamento</Text>
            </View>

            {/**esse ignore é porque o typescript estava achando que a comparação era nao intencional */}
            {/**@ts-ignore */}
            {currentItem === PaymentStage.FORMA && (
                <View style={[commonStyle.justify_content_space_evl, commonStyle.margin_8]}>
                    <ItemFormaPagamento />
                </View>
            )}

            {/**@ts-ignore */}
            {currentItem === PaymentStage.CONDICAO && (
                <ItemCondicao />
            )}

            {/**@ts-ignore */}
            {currentItem === PaymentStage.PAGAMENTO && (
                <ItemPagamento />
            )}

            <View style={{ paddingHorizontal: 32 }}>
                <Pressable style={[commonStyle.btn_gray]}>
                    <Text style={commonStyle.btn_text_gray}>Continuar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const ItemFormaPagamento = () => {
    const [selected, setSelected] = useState("");
    const [paymentsForm, setPaymentsForm] = useState<{ key: string, value: string }[]>();

    useEffect(() => {
        getFormaPagamento()
    }, [])

    function getFormaPagamento() {
        try {
            handleGetListOfPaymentForm({ paymentForm: PaymentForm.DINHEIRO }).then((res) => {
                if (res !== undefined) {
                    const transformedData = res.List!.map(item => ({
                        key: item.Id,
                        value: item.Value
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
            <SelectList
                placeholder="Escolha a forma de pagamento"
                setSelected={(val: any) => setSelected(val)}
                data={paymentsForm || [{}]}

            />
        </View>
    )
}

const ItemCondicao = () => {
    const data = [
        { key: '1', value: '2 x R$ 121,42', disabled: true },
        { key: '2', value: '2 x R$ 121,42' },
        { key: '3', value: '2 x R$ 121,42' },
        { key: '4', value: '2 x R$ 121,42', disabled: true },
        { key: '5', value: '2 x R$ 121,42' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: '2 x R$ 121,42' },
    ]
    return (
        <View style={{ height: 140, borderWidth: 1, padding: 12, margin: 12, borderRadius: 20, borderColor: "#949494" }}>
            <FlatList data={data}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => <RenderItemCondicao item={item.value} />}
            />
        </View>
    )
}

const RenderItemCondicao = ({ item }: { item: string }) => {
    return (
        <View>
            <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center]}>{item}</Text>
            <CustomSeparator />
        </View>
    )
}

const ItemPagamento = () => {
    const [paymentValue, setPaymentValue] = useState('')
    return (
        <GestureHandlerRootView style={[commonStyle.common_columnItem, commonStyle.margin_8]}>
            <View>
                <Text style={[commonStyle.common_fontWeight_600, commonStyle.font_size_18]}>Pagamento</Text>
                <TextInput value={paymentValue} onChangeText={setPaymentValue} style={commonStyle.common_input} />
            </View>
        </GestureHandlerRootView>
    )
}

const ItemDetalhamento = () => {
    return (
        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
            <Text>Forma</Text>
            <Text>Condição</Text>
            <Text>Pagamento</Text>
        </View>
    )
}

export default CS_SC_007_Pagamento;