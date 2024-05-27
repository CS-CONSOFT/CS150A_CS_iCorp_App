import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import CustomButton from "../../components/button/CustomButton";
import HeaderLogo from "../../components/headers/HeaderLogo";
import CustomInput from "../../components/input/CustomInput";
import { DataKey } from "../../enum/DataKeys";
import { getObjectDataVc, storeObjectDataVc } from "../../view_controller/SharedViewController";
import { generalLoginVc } from "../../view_controller/login/LoginViewController";
import { ILoginResponse } from "./ILoginResponse";
import { stylesLogin } from "./StylesLogin";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";


const CS_SC_Login = () => {

    //variaveis
    const [domain, setDomain] = useState('Comercial')
    const [user, setUser] = useState('Valter')
    const [password, setPassword] = useState('va1234va')
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [errorMsg, setErrorMsg] = useState('')
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
        setStatus(FETCH_STATUS.LOADING)
        const loginData: ILoginData = { domain, user, password }
        try {
            const response = await generalLoginVc(loginData);
            if (response.IsOk) {
                //salvando dados localmente
                storeObjectDataVc(DataKey.LoginResponse, response.Model)
                navigateToMenu()
            }
        } catch (error) {
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    const isLoading = status == FETCH_STATUS.LOADING
    return (
        <SafeAreaView>
            <HeaderLogo />
            <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>

            <CustomInput>
                <CustomInput.TitleText titleText="Domínio" />
                <CustomInput.InputArea
                    setValue={setDomain}
                    value={domain}
                />
            </CustomInput>


            <CustomInput>
                <CustomInput.TitleText titleText="Usuário" />
                <CustomInput.InputArea
                    setValue={setUser}
                    value={user}
                />
            </CustomInput>


            <CustomInput>
                <CustomInput.TitleText titleText="Senha" />
                <CustomInput.InputArea
                    setValue={setPassword}
                    value={password}
                    securityTextEnter={true}
                />
            </CustomInput>


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