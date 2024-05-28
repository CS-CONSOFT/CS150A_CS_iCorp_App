import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import CustomSearch from "../../components/input/CustomSearch";
import { IPreVendaListModel } from "../../services/api/interfaces/prevenda/IPreVenda";
import { ICON_NAME } from "../../util/IconsName";
import { handleFetchPv } from "../../view_controller/prevenda/PreVendaViewController";
import { stylesPreVenda } from "./PreVendaStyles";
import CustomPvBottomMenu from "../../components/bottomMenus/01CustomPvBottomMenu";

const CS_SC_PreVenda = () => {
    const [preSaleSearch, setPreSaleSearch] = useState<string>('');
    const [pvList, setPvList] = useState<IPreVendaListModel[]>([]);

    useEffect(() => {
        _fetchPV()
    }, [])


    /**Formatando data */
    const finalDate: Date = new Date()

    const initialDate: Date = new Date()
    initialDate.setDate(initialDate.getDate() - 128)

    const initialDateString: string = initialDate.toISOString().slice(0, 10);
    const finalDateString: string = finalDate.toISOString().slice(0, 10);
    /**Formatando data */
    const memorizeFetchPV = useMemo(() => {
        return async () => {
            handleFetchPv(initialDateString, finalDateString, preSaleSearch).then((res) => {
                setPvList(res.List)
            })
        };
    }, [initialDate, finalDate, preSaleSearch])

    const _fetchPV = async () => {
        await memorizeFetchPV()
    }

    return (
        <View>
            <CustomSearch>
                <CustomSearch.InputHandle
                    handleInput={setPreSaleSearch}
                    value={preSaleSearch}
                    placeholder="Protocolo/Conta"
                    keyboardType="numeric"
                />
                <Pressable onPress={_fetchPV}>
                    <CustomSearch.IconSearch style={stylesPreVenda.searchIcon} iconSize={22} iconColor="#FFF" iconName={ICON_NAME.BUSCA_CONTORNADO} />
                </Pressable>
                <CustomSearch.IconFilter iconName={ICON_NAME.FILTRAR_CONTORNADO} iconSize={42} />
            </CustomSearch>
            <CustomPvBottomMenu />
            <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>

            <FlatList
                data={pvList}
                renderItem={({ item }) => <PreVendaRenderItem item={item} />}
                keyExtractor={(item) => item.ID.toString()}
            />


        </View>
    );
}
export default CS_SC_PreVenda;


/** RENDER ITEM */
function PreVendaRenderItem({ item }: { item: IPreVendaListModel }) {
    const [year, month, day] = item.Data_Emissao.split('-')
    return (
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
    )
}