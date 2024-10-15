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
import { handleDeleteComanda, handleGetListComanda } from "../../view_controller/comanda/CS_ComandaViewController";
import { ButtonLink } from "../../components/button/CustomButtonLink";
import { formatMoneyValue } from "../../util/FormatText";
import React from "react";
//Interface



const CS_SC_008_ListaComandas = () => {

    const navigation = useNavigation();
    const [listaComanda, setListaComanda] = useState<Lista_TT010[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    useFocusEffect(
        useCallback(() => {
            getListComanda()
        }, [])
    )

    function getListComanda() {
        setStatus(FETCH_STATUS.LOADING)
        handleGetListComanda().then((res) => {
            setListaComanda(res.Lista_TT010)
            setStatus(FETCH_STATUS.SUCCESS)
        }).catch((err) => {
            navigation.navigate('Menu')
            showToast(ToastType.ERROR, err.code, err.response.data.Errors[0])
        })
    }



    const isLoading = status === FETCH_STATUS.LOADING

    return <SafeAreaView style={{ backgroundColor: "#fff", height: "100%", paddingVertical: 10 }}>

        {isLoading
            ?
            <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
            :
            <>
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
                            update={getListComanda}

                        />
                    }

                />

            </>

        }
    </SafeAreaView>
}

export default CS_SC_008_ListaComandas;


// Componente de exibição da imagem do produto
function ComandaItem({ item, totalValor, onPress, update }: { item: Lista_TT010, totalValor: number, onPress: () => void, update: () => void }) {
    const [year, month, day] = item.csicp_tt010.tt010_datahora.split('-')

    function deleteComanda(comandaId: number) {
        handleDeleteComanda({ comandaId: comandaId }).then(() => {
            showToast(ToastType.SUCCESS, "Comanda deletada!", "")
            update()
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro ao deletar comanda!", "")
        })
    }

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
                {/*   <Pressable onPress={() => deleteComanda(item.csicp_tt010.tt010_Id)} style={[stylesConsultaProduto.rightIcons]}>
                    <CustomIcon icon={ICON_NAME.LIXEIRA} />
                </Pressable> */}
            </View>


        </Pressable>


    )
}


