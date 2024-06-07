import React, { lazy, Suspense, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import CustomInput from "../../../components/input/CustomInput";
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
            <CustomInput>
                <CustomInput.InputFormsAreaHandle
                    textTitleIdentifier={'Código'}
                    handleValueOfInput={handleInputTyping}
                    valueOfInput={attributesMap.Código}
                    securityTextEnter={false}
                />
            </CustomInput>

            <CustomInput>
                <CustomInput.InputFormsAreaHandle
                    textTitleIdentifier={'Descrição Produto'}
                    handleValueOfInput={handleInputTyping}
                    valueOfInput={attributesMap.Usuário}
                    securityTextEnter={false}
                />
            </CustomInput>



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
