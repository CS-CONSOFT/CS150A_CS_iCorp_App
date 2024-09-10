import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { commonStyle } from "../../../../CommonStyle";
import CustomItemIconTitleRoundedBlue from "../../../../components/items/CustomItemIconTitleRoundedBlue";
import CustomAlertDialog from "../../../../components/modal/CustomAlertDialog";
import CustomTopItem from "../../../../components/topItem/CustomTopItem";
import { ICON_NAME } from "../../../../util/IconsName";
import { formatPercentInput } from "../../../../util/Masks";
import { ToastType, showToast } from "../../../../util/ShowToast";
import { handleSaveGlobalDiscount } from "../../../../view_controller/pagamento/CS_PagamentoViewController";
import CurrencyInput from "react-native-currency-input";

const C_003_01_05_TopHeaderItensProdutosDetalhesPV = ({ isConsulta = false, descontoValor = 0 }: { isConsulta?: boolean, descontoValor?: number }) => {
    const { navigate } = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false)

    function showModal() {
        setIsModalVisible(true)
    }

    return (
        <View>
            {isConsulta && (
                <>
                    <CustomTopItem>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Descontos"}
                                onPress={showModal}
                                iconName={ICON_NAME.PAPEL_LISTA_CONTORNADO}
                            />
                        </View>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Requisição"}
                                onPress={() => navigate('Requisicao')}
                                iconName={ICON_NAME.DOCUMENT}
                            />
                        </View>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Código"}
                                onPress={() => navigate('Consulta_Produtos', { cameFromPv: true, insertComanda: false })}
                                iconName={ICON_NAME.ADICIONAR_CONTORNADO}
                            />
                        </View>

                    </CustomTopItem>
                    <CustomAlertDialog
                        isVisible={isModalVisible}
                        onDismiss={() => { }}
                        children={<DescontoItem descontoValor={descontoValor} save={(discountValue) => {
                            handleSaveGlobalDiscount({ cs_valor_percentual: discountValue }).then((res) => {
                                if (res.IsOk) {
                                    showToast(ToastType.SUCCESS, "Sucesso", res.Msg)
                                } else {
                                    showToast(ToastType.ERROR, "Erro", res.Msg)
                                }
                                setIsModalVisible(false)
                            })
                        }} dismiss={() => setIsModalVisible(false)} />}
                    />
                </>
            )}
        </View>
    );
}

const DescontoItem = ({ descontoValor, save, dismiss }: { descontoValor?: number, save: (discountValue: number) => void, dismiss: () => void }) => {
    const [desc1, setDesc1] = useState(descontoValor || 0)
    return (
        <View style={commonStyle.modal_common_container}>
            <Text>1° Desconto</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CurrencyInput
                    value={desc1}
                    onChangeValue={(number) => {
                        setDesc1(number || 0)
                    }}
                    //@ts-ignore
                    renderTextInput={textInputProps => <TextInput
                        style={[
                            commonStyle.common_input,
                            { height: 40, flex: 1, padding: 10 }
                        ]}
                        {...textInputProps}
                    />}
                    prefix=""
                    delimiter="."
                    separator="."
                    precision={2}
                    maxValue={99.99}
                />
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl]}>
                <Pressable style={commonStyle.btn_gray} onPress={() => save(Number(desc1))}>
                    <Text style={commonStyle.btn_text_gray}>Salvar</Text>
                </Pressable>
                <Pressable style={styleProdutoPVDetalhe.btn_cancel_desconto} onPress={dismiss}>
                    <Text style={styleProdutoPVDetalhe.btn_text_cancel_desconto}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    )
}
export const styleProdutoPVDetalhe = StyleSheet.create({
    textProduct: {
        fontWeight: '600',
        margin: 16,
        fontSize: 16
    },
    topHeaderStyle: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    topHeaderItemStyle: {
        elevation: 1,
        width: '33.3%'
    },
    btn_apply_desconto: {
        backgroundColor: '#E3E3E3',
        paddingHorizontal: 32,
        paddingVertical: 8,
        marginVertical: 8,
        borderRadius: 32,
        elevation: 3
    },
    btn_text_apply_desconto: {
        color: '#000',
        fontWeight: '600',
        alignSelf: 'center'
    },
    btn_cancel_desconto: {
        fontWeight: '600',
        alignSelf: 'center'
    },
    btn_text_cancel_desconto: {
        color: '#1068EB',
        fontWeight: '600',
        alignSelf: 'center'
    }
});

export default C_003_01_05_TopHeaderItensProdutosDetalhesPV;