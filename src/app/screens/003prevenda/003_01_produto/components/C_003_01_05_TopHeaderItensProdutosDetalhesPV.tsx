import { Alert, View, StyleSheet, Modal, Text } from "react-native";
import CustomItemIconTitleRoundedBlue from "../../../../components/items/CustomItemIconTitleRoundedBlue";
import CustomTopItem from "../../../../components/topItem/CustomTopItem";
import { ICON_NAME } from "../../../../util/IconsName";
import { useNavigation } from "@react-navigation/native";
import CustomAlertDialog from "../../../../components/modal/CustomAlertDialog";
import { TextInput } from "react-native-gesture-handler";

const C_003_01_05_TopHeaderItensProdutosDetalhesPV = () => {
    const { navigate } = useNavigation()
    return (
        <View>
            <CustomTopItem>
                <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                    <CustomItemIconTitleRoundedBlue
                        title={"Descontos"}
                        onPress={() => Alert.alert("Falta fazer")}
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
                isVisible={true}
                onDismiss={() => { }}
                title="Modal"
                children={<DescontoItem />}
            />
        </View>
    );
}

const DescontoItem = () => {
    return (
        <View>
            <Text>1° Desconto</Text>

            <Text>2° Desconto</Text>
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
    }
});

export default C_003_01_05_TopHeaderItensProdutosDetalhesPV;