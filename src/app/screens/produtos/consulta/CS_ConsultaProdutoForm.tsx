import React, { lazy, Suspense, useState } from "react";
import { ActivityIndicator, TextInput, View, Text } from "react-native";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";
import { commonStyle } from "../../../CommonStyle";
const CustomButton = lazy(() => import("../../../components/button/CustomButton"))

const CS_ConsultaProdutoForm = ({ onSearchPress }:
    { onSearchPress: (atributes: any) => void }) => {


    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({})

    const handleInputTyping = (id: string, value: string) => {
        setAttributesMap((prevState => {
            return { ...prevState, [id]: value }
        }))
    };


    //Tela
    return (
        <View style={stylesConsultaProduto.searchContainer}>
            <Text>Código</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={(value) => handleInputTyping('code', value)}
                value={attributesMap.code}
            />

            <Text>Descrição Produto</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={(value) => handleInputTyping('desc', value)}
                value={attributesMap.desc}
            />


            <Suspense fallback={<ActivityIndicator />}>
                <CustomButton
                    title={'Pesquisar'}
                    onPress={() => onSearchPress(attributesMap)}
                    buttonStyle={stylesConsultaProduto.searchButton}
                    textStyle={stylesConsultaProduto.searchButtonText}
                />
            </Suspense>

        </View>
    );
}

export default CS_ConsultaProdutoForm;
