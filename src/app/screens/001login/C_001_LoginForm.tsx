import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, TextInput, Text, TouchableHighlight, ActivityIndicator } from "react-native";
import { DataKey } from "../../enum/DataKeys";
import { storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc } from "../../view_controller/login/LoginViewController";
import { stylesLogin } from "./StylesLogin";
import { commonStyle } from "../../CommonStyle";


const CS_SC001_LoginForm = () => {
    //variaveis
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        Domínio: 'Comercial',
        Usuário: 'Barros',
        Senha: 'ba'
    });
    const { navigate } = useNavigation()
    const [isBtnLoading, setIsBtnLoading] = useState(false)
    //fim variaveis

    function navigateToMenu() {
        navigate('Menu')
    }

    useEffect(() => {
        setIsBtnLoading(false)
        checkIfUserIsLogged().then((isLogged) => {
            if (isLogged) {
                navigateToMenu()
            }
        })
    }, [])



    async function onClickLogin(): Promise<void> {
        const loginData: IPostLoginData = {
            domain: attributesMap.Domínio,
            user: attributesMap.Usuário,
            password: attributesMap.Senha
        }
        try {
            const response = await generalLoginVc(loginData);
            if (response.IsOk) {
                //salvando dados localmente
                storeObjectDataVc(DataKey.LoginResponse, response.Model)
                navigateToMenu()
            }
        } catch (error) {
            Alert.alert(error as string)
        }
    }

    const handleInputTyping = (id: string, value: string) => {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    };

    return (
        <SafeAreaView>
            <Text>Domínio</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={(value) => handleInputTyping('Domínio', value)}
                value={attributesMap.Domínio}
            />

            <Text>Usuário</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={(value) => handleInputTyping('Usuário', value)}
                value={attributesMap.Usuário}
            />

            <Text>Senha</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={(value) => handleInputTyping('Senha', value)}
                value={attributesMap.Senha}
            />


            <TouchableHighlight
                onPress={() => {
                    isBtnLoading ? {} : onClickLogin()
                }}
                style={commonStyle.common_button_style}
                underlayColor='white'
            >
                {isBtnLoading ? <ActivityIndicator /> : <Text style={commonStyle.common_text_button_style}>Logar</Text>}


            </TouchableHighlight>
        </SafeAreaView>
    );
}

export default CS_SC001_LoginForm;