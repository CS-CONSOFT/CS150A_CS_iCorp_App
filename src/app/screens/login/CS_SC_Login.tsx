import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import CustomForm from "../../components/forms/CustomForm";
import { FormInputType } from "../../components/forms/IForm";
import HeaderLogo from "../../components/headers/HeaderLogo";
import { DataKey } from "../../enum/DataKeys";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc } from "../../view_controller/login/LoginViewController";
import { stylesLogin } from "./StylesLogin";


const CS_SC_Login = () => {
    //variaveis
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    //fim variaveis

    function navigateToMenu() {
        router.replace("./screens/menu/CS_SC_Menu")
    }

    useEffect(() => {
        checkIfUserIsLogged().then((isLogged) => {
            if (isLogged) {
                navigateToMenu()
            }
        })
    }, [])



    async function onClickLogin(domain: string, user: string, password: string): Promise<void> {
        setStatus(FETCH_STATUS.LOADING)
        const loginData: ILoginData = { domain, user, password }
        try {
            const response = await generalLoginVc(loginData);
            if (response.IsOk) {
                //salvando dados localmente
                storeObjectDataVc(DataKey.LoginResponse, response.Model)
                navigateToMenu()
            } else {
                setStatus(FETCH_STATUS.ERROR)
            }
        } catch (error) {
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    const handleFormSubmit = (formData: any) => {
        /**
         * Os valores de formData seguem a estrutura de titles que formam o formFields
         * Ex: Dominio: 'Comercial'; Usuario: 'Valter'; Senha:'xpto'
         * A chave das propriedades é o que será usado em 'key' -> formData.[key]
         * 
         */
        onClickLogin(formData.Domínio, formData.Usuário, formData.Senha)
    };


    /** INICIO - MONTANDO PROPRIEDADES DO CUSTOM FORM */
    const formFields: FormInputType[] = [
        { title: 'Domínio' },
        { title: 'Usuário' },
        { title: 'Senha', securityTextEnter: true },
        // Adicione mais campos conforme necessário
    ];

    const buttonFormProp = {
        title: "Logar",
        onPress: handleFormSubmit,
        buttonStyle: stylesLogin.button,
        textStyle: stylesLogin.textButton
    }
    /** FIM - MONTANDO PROPRIEDADES DO CUSTOM FORM */

    return (
        <SafeAreaView>
            <View style={{ margin: 56 }}>
                <HeaderLogo />
                <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>
                <CustomForm
                    status={status}
                    formInputTypeList={formFields}
                    customButtonProp={buttonFormProp}
                    initialFormState={{ Domínio: 'Comercial', Usuário: 'Valter', Senha: 'va1234va' }}
                />
            </View>



        </SafeAreaView>
    );
}

export default CS_SC_Login;