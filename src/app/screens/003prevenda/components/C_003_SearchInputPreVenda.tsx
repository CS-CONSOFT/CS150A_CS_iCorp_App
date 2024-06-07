import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { stylesPreVenda } from "../PreVendaStyles";
import FontAwesome from '@expo/vector-icons/Ionicons';
import CustomInput from "../../../components/input/CustomInput";


/**
 * Componente de busca de pre vendas
 */
const C_003_SearchInputPreVenda = ({ onSearchPress }: { onSearchPress: (searchValue: string) => {} }) => {
    const [preSaleSearch, setPreSaleSearch] = useState<string>('');
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={stylesPreVenda.containerFilter}>
                <CustomInput>
                    <CustomInput.InputAreaHandle
                        value={preSaleSearch}
                        setValue={setPreSaleSearch}
                        placeholder="Protocolo/Conta"
                        keyboardType="numeric"
                        width={250}

                    />
                </CustomInput>
            </View>
            <View style={stylesPreVenda.pressable}>
                <FontAwesome size={30} style={{
                    backgroundColor: '#5E5D5D',
                    padding: 8,
                    borderRadius: 32,
                    marginLeft: 8,
                    marginRight: 6,
                    alignSelf: 'center'
                }} name={'search-outline'} color={"#000"} onPress={() => onSearchPress(preSaleSearch)} />
                <FontAwesome size={52} style={{ alignSelf: 'center' }} name={'filter-circle-outline'} color={"#000"} />
            </View>
        </View>
    );
}
export default C_003_SearchInputPreVenda;
