import { lazy, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { stylesPreVenda } from "./PreVendaStyles";
import { useNavigation } from "@react-navigation/native";
import CustomEmpty from "../../components/lists/CustomEmpty";
import { DataKey } from "../../enum/DataKeys";
import { Csicp_dd070_Completo } from "../../services/api/interfaces/prevenda/CS_IResPreVendaLista";
import { storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { handleFetchPv } from "../../view_controller/prevenda/PreVendaViewController";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import { getPaginationList } from "../../util/GetPaginationArray";

const CustomSearch = lazy(() => import("../../components/search/CustomSearch"))


const CS_SC_003_PreVenda = () => {
    const [pvList, setPvList] = useState<Csicp_dd070_Completo[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { navigate } = useNavigation()
    const [paginationArray, setPaginationArray] = useState<number[]>([])


    useEffect(() => {
        _fetchPV(1)
    }, [])


    /**Formatando data */
    const finalDate: Date = new Date()

    const initialDate: Date = new Date()
    initialDate.setDate(initialDate.getDate() - 500)

    const initialDateString: string = finalDate.toISOString().slice(0, 10);
    const finalDateString: string = finalDate.toISOString().slice(0, 10);
    /**Formatando data */
    const _fetchPV = async (page: number) => {
        setStatus(FETCH_STATUS.LOADING)
        handleFetchPv(initialDateString, finalDateString, page, 5).then((res) => {
            setStatus(FETCH_STATUS.SUCCESS)
            setPvList(res.csicp_dd070_Completo)

            const pagesArray = getPaginationList(res.Contador.cs_number_of_pages)
            setPaginationArray(pagesArray)
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
            currentPv: currentPv.DD070_Nota.csicp_dd070.DD070_Id
        })
    }

    const isLoading = status === FETCH_STATUS.LOADING

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            {isLoading ? <>
                <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
            </> :
                <View>
                    <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>
                    <FlatList
                        data={pvList}
                        refreshing={isLoading}
                        ListEmptyComponent={<CustomEmpty text={"Nenhuma pré venda encontrada"} />}
                        onRefresh={handleRefreshList}
                        renderItem={({ item }) => <PreVendaRenderItem item={item}
                            onPress={() => goToDetails(item)} />}
                        keyExtractor={(item) => item.DD070_Nota.csicp_dd070.DD070_Id.toString()}
                        extraData={pvList}
                    />
                </View>
            }
            {paginationArray.length > 1 && (
                <View>
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
    return (
        <Pressable onPress={onPress}>
            <View style={stylesPreVenda.containerRenderItem}>

                <View style={stylesPreVenda.containerRenderItemLeft}>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{day}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{month}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{year}</Text>
                </View>


                <View style={stylesPreVenda.containerRenderItemRight}>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.DD070_Nota.csicp_dd070.DD070_ProtocolNumber}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>{item.DD070_Nota.csicp_bb012.BB012_Codigo}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightPriceText}>{item.DD070_Nota.csicp_bb012.BB012_Nome_Cliente}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>{item.DD070_Nota.csicp_sy001_Atendente.SY001_Usuario}</Text>
                </View>
            </View>
        </Pressable>
    )
}