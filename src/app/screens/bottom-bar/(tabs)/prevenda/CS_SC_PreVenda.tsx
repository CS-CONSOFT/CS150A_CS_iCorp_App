import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { IPreVendaListModel } from "../../../../services/api/interfaces/prevenda/IPreVenda";
import { handleFetchPv } from "../../../../view_controller/prevenda/PreVendaViewController";
import CS_SearchInputPreVenda from "./CS_SearchInputPreVenda";
import { stylesPreVenda } from "./PreVendaStyles";
import { router } from "expo-router";
import { storeSimpleData } from "../../../../services/storage/AsyncStorageConfig";
import { DataKey } from "../../../../enum/DataKeys";
import { FETCH_STATUS } from "../../../../util/FETCH_STATUS";




const CS_SC_PreVenda = () => {
    const [pvList, setPvList] = useState<IPreVendaListModel[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    useEffect(() => {
        _fetchPV('')
    }, [])


    /**Formatando data */
    const finalDate: Date = new Date()

    const initialDate: Date = new Date()
    initialDate.setDate(initialDate.getDate() - 128)

    const initialDateString: string = finalDate.toISOString().slice(0, 10);
    const finalDateString: string = finalDate.toISOString().slice(0, 10);
    /**Formatando data */
    const memorizeFetchPV = useMemo(() => {
        return async (preSaleSearch: string) => {
            setStatus(FETCH_STATUS.LOADING)
            handleFetchPv(initialDateString, finalDateString, preSaleSearch).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                setPvList(res.List)
            })
        };
    }, [initialDate, finalDate])

    const _fetchPV = async (preSaleSearch: string) => {
        await memorizeFetchPV(preSaleSearch)
    }

    function handleRefreshList(): void {
        setStatus(FETCH_STATUS.LOADING)
        _fetchPV("").then(() => {
            setStatus(FETCH_STATUS.SUCCESS)
        })
    }



    function goToDetails(currentPv: string) {
        storeSimpleData(DataKey.CurrentPV, currentPv)
        router.push("screens/top-bar-slider/(tabs)")
    }

    const isLoading = status === FETCH_STATUS.LOADING

    return (
        <View>
            <CS_SearchInputPreVenda onSearchPress={_fetchPV} />
            {isLoading ? <>
                <ActivityIndicator />
            </> :
                <>
                    <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>
                    <FlatList
                        data={pvList}
                        refreshing={isLoading}
                        onRefresh={handleRefreshList}
                        renderItem={({ item }) => <PreVendaRenderItem item={item} onPress={() => goToDetails(item.ID)} />}
                        keyExtractor={(item) => item.ID.toString()}
                    />
                </>
            }
        </View>
    );
}
export default CS_SC_PreVenda;


/** RENDER ITEM */
function PreVendaRenderItem({ item, onPress }: { item: IPreVendaListModel, onPress: () => void }) {
    const [year, month, day] = item.Data_Emissao.split('-')
    return (
        <Pressable onPress={onPress}>
            <View style={stylesPreVenda.containerRenderItem}>

                <View style={stylesPreVenda.containerRenderItemLeft}>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{day}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{month}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{year}</Text>
                </View>


                <View style={stylesPreVenda.containerRenderItemRight}>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.ProtocolNumber}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>{item.Codigo}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightPriceText}>{item.Nome_Cliente}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>{item.NomeUsuario}</Text>
                </View>
            </View>
        </Pressable>
    )
}