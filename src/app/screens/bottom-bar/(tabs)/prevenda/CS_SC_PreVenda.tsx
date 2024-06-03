import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { IPreVendaListModel } from "../../../../services/api/interfaces/prevenda/IPreVenda";
import { handleFetchPv } from "../../../../view_controller/prevenda/PreVendaViewController";
import CS_SearchInputPreVenda from "./CS_SearchInputPreVenda";
import { stylesPreVenda } from "./PreVendaStyles";
import { router } from "expo-router";




const CS_SC_PreVenda = () => {
    const [pvList, setPvList] = useState<IPreVendaListModel[]>([]);
    const [isLoading, setIsLoading] = useState(false)

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
            handleFetchPv(initialDateString, finalDateString, preSaleSearch).then((res) => {
                setPvList(res.List)
            })
        };
    }, [initialDate, finalDate])

    const _fetchPV = async (preSaleSearch: string) => {
        await memorizeFetchPV(preSaleSearch)
    }

    function handleRefreshList(): void {
        setIsLoading(true)
        _fetchPV("").then(() => {
            setIsLoading(false)
        })
    }

    function goToDetails() {
        router.push("screens/top-bar-slider/(tabs)")
    }

    return (
        <View>
            <CS_SearchInputPreVenda onSearchPress={_fetchPV} />
            <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>
            <FlatList
                data={pvList}
                refreshing={isLoading}
                onRefresh={handleRefreshList}
                renderItem={({ item }) => <PreVendaRenderItem item={item} onPress={goToDetails} />}
                keyExtractor={(item) => item.ID.toString()}
            />


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
                    <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>{item.Situacao}</Text>
                </View>
            </View>
        </Pressable>
    )
}