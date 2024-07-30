import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomLoading from "../../components/loading/CustomLoading";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import { DataKey } from "../../enum/DataKeys";
import { Csicp_dd070_Completo } from "../../services/api/interfaces/prevenda/CS_IResPreVendaLista";
import { storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatMoneyValue } from "../../util/FormatText";
import { getPaginationList } from "../../util/GetPaginationArray";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleFetchPv, handleLiberarPV, handleRetornarPV } from "../../view_controller/prevenda/PreVendaViewController";
import { stylesPreVenda } from "./PreVendaStyles";



const CS_SC_003_PreVenda = () => {
    const [pvList, setPvList] = useState<Csicp_dd070_Completo[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { navigate } = useNavigation()
    const [paginationArray, setPaginationArray] = useState<number[]>([])

    useFocusEffect(
        useCallback(() => {
            _fetchPV(1)
        }, [])
    );


    /**Formatando data */
    const finalDate: Date = new Date()

    const initialDate: Date = new Date()
    initialDate.setDate(initialDate.getDate() - 500)

    const initialDateString: string = finalDate.toISOString().slice(0, 10);
    const finalDateString: string = finalDate.toISOString().slice(0, 10);
    /**Formatando data */
    const _fetchPV = async (page: number) => {
        setStatus(FETCH_STATUS.LOADING)
        handleFetchPv(initialDateString, finalDateString, page, 4).then((res) => {
            try {
                if (res.csicp_dd070_Completo !== undefined) {
                    if (res.csicp_dd070_Completo.length !== 0 || res.csicp_dd070_Completo.length !== undefined) {
                        setPvList(res.csicp_dd070_Completo)
                        const pagesArray = getPaginationList(res.Contador.cs_number_of_pages)
                        setPaginationArray(pagesArray)
                    }
                }
                setStatus(FETCH_STATUS.SUCCESS)
            } catch (error) {
                navigate('Menu')
                showToast(ToastType.ERROR, "Erro", "Indefinição na resposta do servidor, provável erro de domínio")
            }
        }).catch((err) => {
            navigate('Menu')
            showToast(ToastType.ERROR, err.code, "Indefinição na resposta do servidor, provável erro de domínio")
        })
    }

    function handleRefreshList(): void {
        setStatus(FETCH_STATUS.LOADING)
        _fetchPV(1).then(() => {
            setStatus(FETCH_STATUS.SUCCESS)
        })
    }

    function goToDetails(currentPv: Csicp_dd070_Completo) {
        storeSimpleData(DataKey.CurrentPV, currentPv.DD070_Nota.csicp_dd070.DD070_Id)
        navigate('Pre_Venda_Detalhes', {
            currentPv: currentPv.DD070_Nota.csicp_dd070.DD070_ProtocolNumber
        })
    }

    const isLoading = status === FETCH_STATUS.LOADING

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <>
                <CustomLoading />
            </> :
                <View>
                    <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>
                    <FlatList
                        style={{ height: '77%' }}
                        data={pvList.toReversed()}
                        refreshing={isLoading}
                        onRefresh={handleRefreshList}
                        ListEmptyComponent={<CustomEmpty text={"Nenhuma pré venda encontrada"} />}
                        renderItem={({ item }) => <PreVendaRenderItem item={item}
                            onPress={() => goToDetails(item)} />}
                        keyExtractor={(item) => item.DD070_Nota.csicp_dd070.DD070_Id.toString()}
                        extraData={pvList}
                    />
                </View>
            }
            {paginationArray !== undefined && paginationArray.length > 1 && (
                <View style={{ height: '23%' }}>
                    <Custom_Pagination
                        onPagePress={(page) => _fetchPV(page)}
                        paginationArray={paginationArray} />
                </View>
            )}
        </View>
    );
}
export default CS_SC_003_PreVenda;


/** RENDER ITEM */
function PreVendaRenderItem({ item, onPress }: { item: Csicp_dd070_Completo, onPress: () => void }) {
    const [year, month, day] = item.DD070_Nota.csicp_dd070.DD070_Data_Emissao.split('-')
    const [isLoading, setIsLoading] = useState(false)

    function liberarPV(): void {
        setIsLoading(true)
        handleLiberarPV({ cs_bb012_id: item.DD070_Nota.csicp_bb012.ID, cs_pv_id: item.DD070_Nota.csicp_dd070.DD070_Id }).then((res) => {
            setIsLoading(false)
            if (!res.IsErro) {
                showToast(ToastType.SUCCESS, "Sucesso", res.Msg)
            } else {
                showToast(ToastType.ERROR, "Falha", res.Msg)
            }
        }).catch(() => {
            setIsLoading(false)
            showToast(ToastType.ERROR, "Falha", "Um erro desconhecido ocorreu!")
        })
    }

    function retornarPv(): void {
        setIsLoading(true)
        handleRetornarPV({ cs_pv_id: item.DD070_Nota.csicp_dd070.DD070_Id }).then((res) => {
            setIsLoading(false)
            if (!res.IsErro) {
                showToast(ToastType.SUCCESS, "Sucesso", res.Msg)
            } else {
                showToast(ToastType.ERROR, "Falha", res.Msg)
            }
        }).catch(() => {
            setIsLoading(false)
            showToast(ToastType.ERROR, "Falha", "Um erro desconhecido ocorreu!")
        })
    }

    return (
        <Pressable onPress={onPress}>
            <View style={stylesPreVenda.containerRenderItem}>

                <View style={stylesPreVenda.containerRenderItemLeft}>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{day}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{month}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{year}</Text>
                </View>

                <View style={stylesPreVenda.containerRenderItemRight}>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.DD070_Nota.csicp_dd070.DD070_ProtocolNumber} - {item.DD070_Nota.csicp_bb012.BB012_Codigo}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>{item.DD070_Nota.csicp_bb012.BB012_Nome_Cliente}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightPriceText}>{formatMoneyValue(item.DD070_Nota.csicp_dd070.DD070_Total_Liquido || 0)}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>{item.DD070_Nota.csicp_sy001_Atendente.SY001_Nome}</Text>
                    <View>
                        <Text style={[stylesPreVenda.containerRenderItemRightTextNormal]}>{item.DD070_Nota.csicp_dd070_Sit.Label}</Text>
                    </View>
                </View>


                <View style={[stylesPreVenda.containerRenderItemIcons, commonStyle.justify_content_space_evl]}>
                    {isLoading && (
                        <ActivityIndicator color={"#c3c3c3"} size={32} style={commonStyle.align_centralizar} />
                    )}

                    {!isLoading && (
                        <>
                            <CustomIcon icon={ICON_NAME.CHECK_CONTORNADO} onPress={() => liberarPV()} />
                            <CustomIcon icon={ICON_NAME.VOLTAR_CONTORNADO} onPress={() => retornarPv()} />
                        </>
                    )}

                </View>

            </View>
        </Pressable>
    )
}