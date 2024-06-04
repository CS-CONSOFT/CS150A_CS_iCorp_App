import React, { lazy, Suspense, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import CustomSearch from "../../../components/input/CustomSearch";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";
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
            <CustomSearch.InputHandle
                titleText={'Código'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Código}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Artigo'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Artigo}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Marca'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Marca}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Referência'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Referência}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Grupo'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Grupo}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Complemento'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Complemento}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Classe'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Classe}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Descrição Produto'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Usuário}
                securityTextEnter={false}
            />

            <CustomSearch.InputHandle
                titleText={'Descrição Subgrupo'}
                handleValueOfInput={handleInputTyping}
                valueOfInput={attributesMap.Usuário}
                securityTextEnter={false}
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
