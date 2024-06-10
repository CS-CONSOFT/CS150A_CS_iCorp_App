import { Alert, View, StyleSheet } from "react-native";
import CustomItemIconTitleRoundedBlue from "../../../../components/items/CustomItemIconTitleRoundedBlue";
import CustomTopItem from "../../../../components/topItem/CustomTopItem";
import { ICON_NAME } from "../../../../util/IconsName";

const C_003_01_05_TopHeaderItensProdutosDetalhesPV = () => {

    return (
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
                    onPress={() => Alert.alert("Falta fazer")}
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
    );
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