import FontAwesome from '@expo/vector-icons/Ionicons';
import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { stylesPreVenda } from "../PreVendaStyles";
import { commonStyle } from '../../../CommonStyle';


/**
 * Componente de busca de pre vendas
 */
const C_003_SearchInputPreVenda = ({ onSearchPress }: { onSearchPress: (searchValue: string) => {} }) => {
    const [preSaleSearch, setPreSaleSearch] = useState<string>('');
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={stylesPreVenda.containerFilter}>
                <TextInput
                    style={[commonStyle.common_input, { width: '90%' }]}
                    onChangeText={(value) => {
                        onSearchPress(value)
                        setPreSaleSearch(value)
                    }}
                    value={preSaleSearch}
                    placeholder="Protocolo/Conta"
                    keyboardType="numeric"
                />
            </View>
            <View style={stylesPreVenda.pressable}>
                {/**   <FontAwesome size={30} style={{
                    backgroundColor: '#5E5D5D',
                    padding: 8,
                    borderRadius: 32,
                    marginLeft: 8,
                    marginRight: 6,
                    alignSelf: 'center'
                }} name={'search-outline'} color={"#000"} onPress={() => onSearchPress(preSaleSearch)} /> */}
                <FontAwesome size={52} style={{ alignSelf: 'center' }} name={'filter-circle-outline'} color={"#000"} />
            </View>
        </View>
    );
}
export default C_003_SearchInputPreVenda;
