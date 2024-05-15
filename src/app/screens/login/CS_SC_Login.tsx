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
            <Text style={styles.txtAtendimentoMobile}>Atendimento Mobile</Text>

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
                    buttonStyle={styles.button}
                    textStyle={styles.text} />
            }

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 32
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    txtAtendimentoMobile: {
        fontWeight: '600',
        textAlign: 'center',
        margin: 32,
        fontSize: 18
    }
});


export default CS_SC_Login;