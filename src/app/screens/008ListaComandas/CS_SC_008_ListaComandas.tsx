import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
//Rota

//Componentes
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";

//Estilo
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import { stylesPreVenda } from "../003prevenda/PreVendaStyles";
import { stylesConsultaProduto } from "../004produtos/ConsultaProdutoStyles";
//Icons
import { ICON_NAME } from "../../util/IconsName";
//DataFake
//Navegação
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Lista_TT010 } from "../../services/api/interfaces/comanda/CS_IResListaComanda";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetListComanda } from "../../view_controller/comanda/CS_ComandaViewController";
import { ButtonLink } from "../../components/button/CustomButtonLink";
import { formatMoneyValue } from "../../util/FormatText";
//Interface



const CS_SC_008_ListaComandas = () => {

    const navigation = useNavigation();
    const [listaComanda, setListaComanda] = useState<Lista_TT010[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)


    function getListComanda() {
        setStatus(FETCH_STATUS.LOADING)
        handleGetListComanda().then((res) => {
            setListaComanda(res.Lista_TT010)
            setStatus(FETCH_STATUS.SUCCESS)
        }).catch((err) => {
            navigation.navigate('Menu')
            showToast(ToastType.ERROR, err.code, "Indefinição na resposta do servidor")
        })
    }
    useFocusEffect(
        useCallback(() => {
            getListComanda()
        }, [])
    )

    const isLoading = status === FETCH_STATUS.LOADING

    return <SafeAreaView style={{ backgroundColor: "#fff", height: "100%", paddingVertical: 10 }}>

        {isLoading
            ?
            <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
            :
            <>
                <ButtonLink
                    onPress={
                        () => navigation.navigate("Consulta_Produtos",
                            { cameFromPv: false, insertComanda: true, comandaId: undefined })
                    }
                    label={"Nova Comanda"}
                />
                <FlatList
                    data={listaComanda}
                    refreshing={isLoading}
                    onRefresh={getListComanda}
                    ListEmptyComponent={<CustomEmpty text={"Nenhuma comanda encontrada"} />}
                    keyExtractor={(item) => item.csicp_tt010.tt010_Id.toString()}
                    renderItem={({ item }) =>
                        <ComandaItem
                            totalValor={item.TotalValor}
                            item={item}
                            onPress={() => {
                                navigation.navigate('DetalheComanda', {
                                    comandaId: item.csicp_tt010.tt010_Id
                                })
                            }}
                        />
                    }

                />

            </>

        }
    </SafeAreaView>
}

export default CS_SC_008_ListaComandas;


// Componente de exibição da imagem do produto
function ComandaItem({ item, totalValor, onPress }: { item: Lista_TT010, totalValor: number, onPress: () => void }) {
    const [year, month, day] = item.csicp_tt010.tt010_datahora.split('-')
    return (
        <Pressable onPress={onPress} style={[stylesPreVenda.containerRenderItem]}>
            <View style={stylesPreVenda.containerRenderItemLeft}>
                <Text style={stylesPreVenda.containerRenderItemLeftText}>{day.substring(0, 2)}</Text>
                <Text style={stylesPreVenda.containerRenderItemLeftText}>{month}</Text>
                <Text style={stylesPreVenda.containerRenderItemLeftText}>{year}</Text>
            </View>


            <View style={[stylesPreVenda.containerRenderItemRight, commonStyle.common_rowItem]}>
                <View style={[{ width: "85%" }, commonStyle.align_start_spaceAround_collumn]}>

                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.csicp_tt010.tt010_ProtocolNumber}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>{formatMoneyValue((totalValor || 0))}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>
                        {
                            item.csicp_tt010_sta.Is_Active
                                ?
                                "Aberto"
                                :
                                "Fechado"
                        }
                    </Text>
                </View>
                <Pressable onPress={onPress} style={[stylesConsultaProduto.rightIcons]}>

                    <CustomIcon icon={ICON_NAME.ENVIAR} />
                </Pressable>
            </View>


        </Pressable>


    )
}


