import { useState } from "react";
import CustomSearch from "../../components/input/CustomSearch";
import { ICON_NAME } from "../../util/IconsName";
import { stylesPreVenda } from "./PreVendaStyles";
import { FlatList, Text, View } from "react-native";
import { Item, items } from "./MockPreVendaListaDados";

const CS_SC_PreVenda = () => {
    const [preSale, setPreSale] = useState<string>('');
    return (
        <View>
            <CustomSearch>
                <CustomSearch.Input
                    setValue={setPreSale}
                    value={preSale}
                    placeholder="Código"
                    keyboardType="numeric"
                />
                <CustomSearch.IconSearch style={stylesPreVenda.searchIcon} iconSize={22} iconColor="#FFF" iconName={ICON_NAME.BUSCA_CONTORNADO} />
                <CustomSearch.IconFilter iconName={ICON_NAME.FILTRAR_CONTORNADO} iconSize={42} />
            </CustomSearch>

            <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>

            <FlatList
                data={items}
                renderItem={(item) => <PreVendaRenderItem item={item.item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
export default CS_SC_PreVenda;


/** RENDER ITEM */
function PreVendaRenderItem({ item }: { item: Item }) {
    const [day, month, year] = item.date.split(' ')
    return (
        <View style={stylesPreVenda.containerRenderItem}>
            <View style={stylesPreVenda.containerRenderItemLeft}>
                <Text style={stylesPreVenda.containerRenderItemLeftText}>{day}</Text>
                <Text style={stylesPreVenda.containerRenderItemLeftText}>{month}</Text>
                <Text style={stylesPreVenda.containerRenderItemLeftText}>{year}</Text>
            </View>

            <View style={stylesPreVenda.containerRenderItemRight}>
                <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.number}</Text>
                <Text style={stylesPreVenda.containerRenderItemRightTextBold}>{item.description}</Text>
                <Text style={stylesPreVenda.containerRenderItemRightPriceText}>{item.price}</Text>
                <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>{item.additionalInfo}</Text>

            </View>
        </View>
    )
}