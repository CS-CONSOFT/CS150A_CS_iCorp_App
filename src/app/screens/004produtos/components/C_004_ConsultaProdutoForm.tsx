import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { commonStyle } from "../../../CommonStyle";
import CustomIcon from "../../../components/icon/CustomIcon";
import { ICON_NAME } from "../../../util/IconsName";
import { stylesConsultaProduto } from "../ConsultaProdutoStyles";

const CS_ConsultaProdutoForm = ({ onSearchPress, onFilterClick }:
    {
        onSearchPress: (atributes: any) => void,
        onFilterClick: () => void
    }) => {


    const [valueSearch, setValueSearch] = useState('')

    const handleInputTyping = (value: string) => {
        setValueSearch(value)
        onSearchPress(value)
    };


    //Tela
    return (
        <View style={stylesConsultaProduto.searchContainer}>
            <TextInput
                style={[commonStyle.common_input, { flex: 1 }]}
                onChangeText={(value) => handleInputTyping(value)}
                value={valueSearch}
                placeholder="Pesquisar Produto"
            />
            <CustomIcon icon={ICON_NAME.FILTRAR_CONTORNADO} iconSize={44} onPress={onFilterClick} />
        </View>
    );
}

export default CS_ConsultaProdutoForm;
