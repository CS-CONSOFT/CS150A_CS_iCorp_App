import { useState } from "react";
import { Pressable, View } from "react-native";
import CustomSearch from "../../../../components/input/CustomSearch";
import { ICON_NAME } from "../../../../util/IconsName";
import { stylesPreVenda } from "./PreVendaStyles";




const CS_SearchInputPreVenda = ({ onSearchPress }: { onSearchPress: (searchValue: string) => {} }) => {
    const [preSaleSearch, setPreSaleSearch] = useState<string>('');


    const handleInputTyping = (id: string, value: string) => {
        setPreSaleSearch(value)
    };

    return (
        <View style={stylesPreVenda.containerFilter}>
            <CustomSearch>
                <CustomSearch.InputHandle
                    handleValueOfInput={handleInputTyping}
                    valueOfInput={preSaleSearch}
                    placeholder="Protocolo/Conta"
                    keyboardType="numeric"
                />
                <View style={stylesPreVenda.pressable}>
                    <Pressable onPress={() => onSearchPress(preSaleSearch)}>
                        <CustomSearch.IconSearch style={stylesPreVenda.searchIcon} iconSize={22} iconColor="#FFF" iconName={ICON_NAME.BUSCA_CONTORNADO} />
                    </Pressable>

                    <CustomSearch.IconFilter iconName={ICON_NAME.FILTRAR_CONTORNADO} iconSize={42} />
                </View>
            </CustomSearch>
        </View>
    );
}
export default CS_SearchInputPreVenda;
