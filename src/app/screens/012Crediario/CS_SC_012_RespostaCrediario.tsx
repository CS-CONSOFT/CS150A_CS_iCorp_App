import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomSeparator from "../../components/lists/CustomSeparator";
import { IResSimulacaoCrediario } from "../../services/api/interfaces/crediario/IResSimulacaoCrediario";
import { formatMoneyValue } from "../../util/FormatText";

const CS_SC_012_RespostaCrediario = ({ route }: { route: any }) => {
    const { jsonResponse, valorEntrada } = route.params
    const [responseCrediario, setResponseCrediario] = useState<IResSimulacaoCrediario>()
    const { navigate } = useNavigation()

    useEffect(() => {
        setResponseCrediario(JSON.parse(jsonResponse))
    }, [])
    return (
        <View style={commonStyle.common_padding_16}>
            <Text style={[commonStyle.common_fontWeight_600, commonStyle.common_margin_top_8, commonStyle.font_size_18]}>Valor Total: {formatMoneyValue(((responseCrediario?.propostas[0].valorfinanciado || 0) + (valorEntrada || 0)))}</Text>
            <Text style={[commonStyle.common_fontWeight_600, commonStyle.common_margin_top_8, commonStyle.font_size_18]}>Valor Financiado: {formatMoneyValue(((responseCrediario?.propostas[0].valorfinanciado || 0)))}</Text>
            <Text style={[commonStyle.common_fontWeight_600, commonStyle.common_margin_top_8, commonStyle.font_size_18]}>Valor Entrada Loja: {formatMoneyValue(((valorEntrada || 0)))} </Text>

            <FlatList
                style={{ height: '80%' }}
                data={responseCrediario?.propostas}
                ItemSeparatorComponent={() => <CustomSeparator />}
                keyExtractor={(item) => item.id}
                renderItem={(item) => <RenderItemCondicao proposta={item.item} />}
            />

            <TouchableOpacity style={[commonStyle.btn_gray, { padding: 16, marginBottom: 32 }]} onPress={() => navigate('Menu')}>
                <Text style={commonStyle.btn_text_gray}>Ir Para o Menu</Text>
            </TouchableOpacity>
        </View >
    );
}


/**
 * 
 * @param onTermSelected é a funcao callback que ira levar para o componente pai o valor do id da condicao selecionada 
 * @returns 
 */
const RenderItemCondicao = ({ proposta }: { proposta: any }) => {
    return (
        <View style={{ marginBottom: 12, padding: 12, borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { flex: 1 }]}>
                    Plano: {proposta.plano}
                </Text>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { flex: 1 }]}>
                    Valor Entrada: {formatMoneyValue(proposta.valorentrada)}
                </Text>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { flex: 1 }]}>
                    Valor Financiado: {formatMoneyValue(proposta.valorfinanciado)}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { flex: 1 }]}>
                    Valor Capital Financiado: {formatMoneyValue(proposta.valorCapitalfinanciado)}
                </Text>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { flex: 1 }]}>
                    Quantidade de Parcelas: {proposta.quantidadeparcelas}
                </Text>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { flex: 1 }]}>
                    Primeiro Vencimento: {proposta.primeirovencimento}
                </Text>
            </View>
            <View style={{ backgroundColor: proposta.creditscore.cor, padding: 8, borderRadius: 4 }}>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { color: proposta.creditscore.corfonte }]}>
                    Risco: {proposta.creditscore.risco}
                </Text>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { color: proposta.creditscore.corfonte }]}>
                    Ação Sugerida: {proposta.creditscore.acaoSugerida}
                </Text>
                <Text style={[commonStyle.margin_8, commonStyle.text_aligment_center, { color: proposta.creditscore.corfonte }]}>
                    Descritivo: {proposta.creditscore.descritivo}
                </Text>
            </View>
            <CustomSeparator />
        </View>
    );
};

export default CS_SC_012_RespostaCrediario;