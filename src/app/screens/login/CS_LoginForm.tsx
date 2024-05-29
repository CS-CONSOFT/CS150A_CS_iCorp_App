import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import CustomButton from "../../components/button/CustomButton";
import CustomSearch from "../../components/input/CustomSearch";
import { DataKey } from "../../enum/DataKeys";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc } from "../../view_controller/login/LoginViewController";
import { stylesLogin } from "./StylesLogin";


const CS_SC_LoginForm = () => {
    //variaveis
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        Domínio: 'Comercial',
        Usuário: 'Barros',
        Senha: 'ba'
    });
    //fim variaveis

    function navigateToMenu() {
        router.replace("screens/menu/CS_SC_Menu")
    }

    useEffect(() => {
        checkIfUserIsLogged().then((isLogged) => {
            if (isLogged) {
                navigateToMenu()
            }
        })
    }, [])



    async function onClickLogin(): Promise<void> {
        setStatus(FETCH_STATUS.LOADING)
        const loginData: ILoginData = {
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
                attributesMap
            } else {
                setStatus(FETCH_STATUS.ERROR)
            }
        } catch (error) {
            setStatus(FETCH_STATUS.ERROR)
        } finally {
            setAttributesMap({})
        }
    }

    const handleInputTyping = (id: string, value: string) => {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 56 }}>
                <CustomSearch>
                    <CustomSearch.InputHandle
                        titleText={'Domínio'}
                        handleValueOfInput={handleInputTyping}
                        valueOfInput={attributesMap.Domínio}
                        securityTextEnter={false}
                    />
                </CustomSearch>

                <CustomSearch>
                    <CustomSearch.InputHandle
                        titleText={'Usuário'}
                        handleValueOfInput={handleInputTyping}
                        valueOfInput={attributesMap.Usuário}
                        securityTextEnter={false}
                    />
                </CustomSearch>

                <CustomSearch>
                    <CustomSearch.InputHandle
                        titleText={'Senha'}
                        handleValueOfInput={handleInputTyping}
                        valueOfInput={attributesMap.Senha}
                        securityTextEnter={false}
                    />
                </CustomSearch>

                <CustomButton
                    title={'Logar'}
                    onPress={onClickLogin}
                    buttonStyle={stylesLogin.button}
                    textStyle={stylesLogin.textButton}
                />

            </View>
        </SafeAreaView>
    );
}

export default CS_SC_LoginForm;