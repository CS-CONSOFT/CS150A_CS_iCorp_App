import Ioicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../../../CommonStyle";
import CustomEmpty from "../../../../components/lists/CustomEmpty";
import CustomSeparator from "../../../../components/lists/CustomSeparator";
import { IResProdutoGarantia } from "../../../../services/api/interfaces/produto/CS_IResGetProdutoGarantia";
import { formatMoneyValue } from "../../../../util/FormatText";
import { handleComprarGarantia, handleRemoverGarantia } from '../../../../view_controller/produto/ProductViewController';
import { ToastType, showToast } from '../../../../util/ShowToast';

const C_003_01_03_ProductPvItemGarantia = ({ guarantee, produtoAtendimentoId, close, refresh }: { guarantee: IResProdutoGarantia, produtoAtendimentoId: string, close: () => void, refresh: () => void }) => {

    const [isBtnLoading, setIsBtnLoading] = useState(false)

    function buyGuarantee(ge002id: string) {
        setIsBtnLoading(true)
        handleComprarGarantia({ cs_atendimento_produto_id: produtoAtendimentoId, ge002id: ge002id }).then((res) => {
            if (res.IsOk) {
                showToast(ToastType.SUCCESS, "Sucesso", "Garantia comprada com sucesso!")
            } else {
                showToast(ToastType.ERROR, "Erro", "Falha ao comprar garantia!")
            }
            refresh()
            setIsBtnLoading(false)
        })
    }


    function removeGuarantee(ge011id: string) {
        setIsBtnLoading(true)
        handleRemoverGarantia({ GE011_Id: ge011id }).then((res) => {
            if (res.IsOk) {
                showToast(ToastType.SUCCESS, "Sucesso", "Garantia removida com sucesso!")
            } else {
                showToast(ToastType.ERROR, "Erro", "Falha ao remover garantia!")
            }
            refresh()
            setIsBtnLoading(false)
        })
    }


    if (isBtnLoading) {
        return <ActivityIndicator />
    }

    return (
        <View>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, common003_02_styles.blueBackgroundColor]}>
                <View style={[commonStyle.common_rowItem, common003_02_styles.blueBackgroundColor]}>
                    <Text style={[commonStyle.common_fontWeight_600, common003_02_styles.titleItem]}>Garantia</Text>
                </View>
                <View style={[commonStyle.common_rowItem, common003_02_styles.blueBackgroundColor, { marginRight: 2, justifyContent: 'flex-end' }]}>
                    <Ioicons name="close-outline" size={22} onPress={close} />
                </View>
            </View>
            {guarantee.GarantiaComprada !== undefined && (
                <FlatList
                    data={guarantee.GarantiaComprada}
                    ItemSeparatorComponent={CustomSeparator}
                    keyExtractor={(item) => item.csicp_ge011.ge002_ID}
                    renderItem={({ item }) =>
                        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_padding_08]}>
                            <Text style={[commonStyle.text_aligment_center, { alignSelf: 'center' }]}>{item.csicp_ge002.ge002_GE_Meses} Meses</Text>
                            <Text style={[commonStyle.text_aligment_center, { alignSelf: 'center' }]}>{formatMoneyValue(item.csicp_ge002.ge002_vPremioTotal)}</Text>
                            <TouchableOpacity style={commonStyle.btn_transparente} onPress={() => removeGuarantee(item.csicp_ge011.ge011_Id)}>
                                <Text style={commonStyle.btn_text_transparente}>Remover</Text>
                            </TouchableOpacity>
                        </View>}
                    ListEmptyComponent={<CustomEmpty text={guarantee.Msg || "Sem garantia estendida!"} />}
                />
            )}

            {guarantee.GarantiaComprada === undefined && (
                <FlatList
                    data={guarantee.Garantia}
                    ItemSeparatorComponent={CustomSeparator}
                    keyExtractor={(item) => item.csicp_ge002.ge002_Id}
                    renderItem={({ item }) =>
                        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_padding_08]}>
                            <Text style={[commonStyle.text_aligment_center, { alignSelf: 'center' }]}>{item.csicp_ge002.ge002_GE_Meses} Meses</Text>
                            <Text style={[commonStyle.text_aligment_center, , { alignSelf: 'center' }]}>{formatMoneyValue((item.csicp_ge002.ge002_vPremioTotal || 0))}</Text>
                            <TouchableOpacity style={commonStyle.btn_transparente} onPress={() => buyGuarantee(item.csicp_ge002.ge002_Id)}>
                                <Text style={[commonStyle.btn_text_transparente]}>Comprar</Text>
                            </TouchableOpacity>
                        </View>}
                    ListEmptyComponent={<CustomEmpty text={guarantee.Msg || "Sem garantia estendida!"} />}
                />
            )}

        </View>

    );
}


const common003_02_styles = StyleSheet.create({
    blueBackgroundColor: {
        backgroundColor: "#A3C5D9"
    },
    titleItem: {
        color: "#0A3147",
        fontSize: 18,
        marginLeft: '58%'
    },
    container: {
        justifyContent: 'center'
    },
    title: {
        fontSize: 16
    },
    value: {
        fontSize: 16,
        textAlign: 'center'
    }

})

export default C_003_01_03_ProductPvItemGarantia;