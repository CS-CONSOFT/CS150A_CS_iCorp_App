import { Alert, View } from "react-native";
import { styleProdutoPVDetalhe } from "./StylePreVendaProdutoDetalhe";
import ItemIconTitleRoundedBlue from "../../../components/items/ItemIconTitleRoundedBlue";
import { ICON_NAME } from "../../../util/IconsName";
import CustomTopItem from "../../../components/topItem/CustomTopItem";

const CS_TopHeaderItensProdutosDetalhesPV = () => {
    return (
        <CustomTopItem>
            <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                <ItemIconTitleRoundedBlue
                    title={"Descontos"}
                    onPress={() => Alert.alert("Falta fazer")}
                    iconName={ICON_NAME.PAPEL_LISTA_CONTORNADO}
                />
            </View>
            <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                <ItemIconTitleRoundedBlue
                    title={"Código"}
                    onPress={() => Alert.alert("Falta fazer")}
                    iconName={ICON_NAME.ADICIONAR_CONTORNADO}
                />
            </View>
            <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                <ItemIconTitleRoundedBlue
                    title={"Requisição"}
                    onPress={() => Alert.alert("Falta fazer")}
                    iconName={ICON_NAME.CAIXA_ARQUIVO_CONTORNADO}
                />
            </View>
        </CustomTopItem>
    );
}

export default CS_TopHeaderItensProdutosDetalhesPV;