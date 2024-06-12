import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { commonStyle } from "../../../../CommonStyle";
import CustomItemIconTitleRoundedBlue from "../../../../components/items/CustomItemIconTitleRoundedBlue";
import CustomAlertDialog from "../../../../components/modal/CustomAlertDialog";
import CustomTopItem from "../../../../components/topItem/CustomTopItem";
import { ICON_NAME } from "../../../../util/IconsName";

const C_003_01_05_TopHeaderItensProdutosDetalhesPV = () => {
    const { navigate } = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false)

    function showModal() {
        setIsModalVisible(true)
    }

    return (
        <View>
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
                        title={"Código"}
                        onPress={() => navigate('Consulta_Produtos', { cameFromPv: true })}
                        iconName={ICON_NAME.ADICIONAR_CONTORNADO}
                    />
                </View>
                <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                    <CustomItemIconTitleRoundedBlue
                        title={"Requisição"}
                        onPress={() => Alert.alert("Falta fazer")}
                        iconName={ICON_NAME.CAIXA_ARQUIVO_CONTORNADO}
                    />
                </View>
            </CustomTopItem>
            <CustomAlertDialog
                isVisible={isModalVisible}
                onDismiss={() => { }}
                children={<DescontoItem save={() => setIsModalVisible(false)} dismiss={() => setIsModalVisible(false)} />}
            />
        </View>
    );
}

const DescontoItem = ({ save, dismiss }: { save: () => void, dismiss: () => void }) => {
    const [desc1, setDesc1] = useState('')
    const [desc2, setDesc2] = useState('')

    return (
        <View style={commonStyle.modal_common_container}>
            <Text>1° Desconto</Text>
            <TextInput style={commonStyle.common_input}
                onChangeText={setDesc1}
                value={desc1}
                keyboardType='decimal-pad' />
            <Text>2° Desconto</Text>
            <TextInput
                style={commonStyle.common_input}
                onChangeText={setDesc2}
                value={desc2}
                keyboardType='decimal-pad'
            />
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl]}>
                <Pressable style={styleProdutoPVDetalhe.btn_apply_desconto} onPress={save}>
                    <Text style={styleProdutoPVDetalhe.btn_text_apply_desconto}>Salvar</Text>
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
        justifyContent: 'space-between',
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