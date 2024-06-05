import { Text, View, StyleSheet } from "react-native";
import CustomBottomItem from "../../../components/bottomItem/CustomBottomItem";
import CustomTextValueWithTitleBoldHorizontal from "../../../components/text/CustomTextValueWithTitleBoldHorizontal";
import Separator from "../../../components/lists/Separator";
import CustomButton from "../../../components/button/CustomButton";

export interface IPreVendaData {
    dataEmissao: string,
    dataValidade: string,
    totalLiquido: number
}

const CS_BottomScreenItemProdutosDetalhesPV = ({ dataEmissao, dataValidade, totalLiquido }: IPreVendaData) => {
    return (
        <CustomBottomItem height={160}>
            <View style={[styles.row, styles.padding_12, styles.space_between]}>
                <CustomTextValueWithTitleBoldHorizontal title="Emissão" value={dataEmissao} />
                <CustomTextValueWithTitleBoldHorizontal title="Validade" value={dataValidade} />
            </View>
            <Separator />
            <View style={[styles.row, styles.space_between]}>
                <Text style={[styles.total_liquido_text, styles.padding_12]}>Total Liquido</Text>
                <Text style={[styles.valor, styles.padding_12]}>{totalLiquido}</Text>
            </View>
            <CustomButton
                title="Pagamento"
                onPress={(done) => { done() }}
                buttonStyle={styles.btnStyle}
                textStyle={styles.txtBtnStyle} />
        </CustomBottomItem>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E3E3E3",
        height: 100
    },
    row: {
        flexDirection: 'row'
    },
    padding_12: {
        padding: 12
    },
    padding_16: {
        padding: 16
    },
    space_between: {
        justifyContent: 'space-between'
    },
    total_liquido_text: {
        fontSize: 22,
        fontWeight: '600'
    },
    valor: {
        fontSize: 22,
        fontWeight: '600',
        color: '#0A3147'
    },
    btnStyle: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16,
        backgroundColor: "#A3C5D9",
        borderRadius: 20,
        height: 40,
        width: 230,
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 2
    },
    txtBtnStyle: {
        color: '#0A3147',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 16.94
    }

})


export default CS_BottomScreenItemProdutosDetalhesPV;