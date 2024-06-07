import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";


import { stylesPreVenda } from "./PreVendaStyles";

import { useNavigation } from "@react-navigation/native";
import { DataKey } from "../../enum/DataKeys";
import { IPreVendaItemListModel } from "../../services/api/interfaces/prevenda/IPreVenda";
import { storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatDate, formatMoneyValue } from "../../util/FormatText";
import { handleFetchPv } from "../../view_controller/prevenda/PreVendaViewController";
import C_003_SearchInputPreVenda from "./components/C_003_SearchInputPreVenda";




const CS_SC_003_PreVenda = () => {
    const [pvList, setPvList] = useState<IPreVendaItemListModel[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { navigate } = useNavigation()


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



    function goToDetails(currentPv: IPreVendaItemListModel) {
        storeSimpleData(DataKey.CurrentPV, currentPv.ID)
        navigate('Pre_Venda_Detalhes', {
            currentPv: currentPv.ID,
            emissao: formatDate(currentPv.Data_Emissao),
            validade: formatDate(currentPv.DataValidade),
            totalLiquido: formatMoneyValue(currentPv.Total!)
        })
    }

    const isLoading = status === FETCH_STATUS.LOADING

    return (
        <View>
            <C_003_SearchInputPreVenda onSearchPress={_fetchPV} />
            {isLoading ? <>
                <ActivityIndicator />
            </> :
                <>
                    <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>
                    <FlatList
                        data={pvList}
                        refreshing={isLoading}
                        onRefresh={handleRefreshList}
                        renderItem={({ item }) => <PreVendaRenderItem item={item}
                            onPress={() => goToDetails(item)} />}
                        keyExtractor={(item) => item.ID.toString()}
                        extraData={pvList}
                    />
                </>
            }
        </View>
    );
}
export default CS_SC_003_PreVenda;


/** RENDER ITEM */
function PreVendaRenderItem({ item, onPress }: { item: IPreVendaItemListModel, onPress: () => void }) {
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