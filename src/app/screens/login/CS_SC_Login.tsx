import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ActivityIndicator } from "react-native";


import CustomButton from "../../components/button/CustomButton";
import CustomInput from "../../components/input/CustomInput";
import { ILoginResponse } from "./ILoginResponse";
import { getObjectDataVc, storeObjectDataVc } from "../../view_controller/SharedViewController";
import { generalLoginVc } from "../../view_controller/login/LoginViewController";
import { DataKey } from "../../enum/DataKeys";
import HeaderLogo from "../../components/headers/HeaderLogo";
import { stylesLogin } from "./StylesLogin";


const CS_SC_Login = () => {

    //variaveis
    const [domain, setDomain] = useState('Comercial')
    const [user, setUser] = useState('Valter')
    const [password, setPassword] = useState('va1234va')
    const [isLoading, setIsLoading] = useState(false)
    //fim variaveis

    function navigateToMenu() {
        router.replace("./screens/menu/CS_SC_Menu")
    }

    useEffect(() => {
        getObjectDataVc("LoginResponse").then((res) => {
            if (res !== null) {
                const result = res as ILoginResponse
                if (result.TenantId !== undefined) {
                    navigateToMenu()
                }
            }

        })
    }, [])



    async function onClickLogin(): Promise<void> {
        setIsLoading(true)
        const loginData: ILoginData = { domain, user, password }
        try {
            const response = await generalLoginVc(loginData);
            if (response.IsOk) {
                //salvando dados localmente
                storeObjectDataVc(DataKey.LoginResponse, response.Model)

                navigateToMenu()

            }
        } catch (error) {
            console.log('Erro ao fazer login:', error);
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <SafeAreaView>
            <HeaderLogo />
            <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>

            <CustomInput
                titleText="Domínio"
                setValue={setDomain}
                value={domain}
            />

            <CustomInput
                titleText="Usuário"
                setValue={setUser}
                value={user}
            />
            <CustomInput titleText="Senha"
                setValue={setPassword}
                value={password}
                securityTextEnter={true}
            />


            {isLoading ?
                <ActivityIndicator />
                : <CustomButton
                    title="Logar"
                    onPress={() => { onClickLogin() }}
                    buttonStyle={stylesLogin.button}
                    textStyle={stylesLogin.text} />
            }

        </SafeAreaView>

    );
}





export default CS_SC_Login;