import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import CustomButton from "../../components/button/CustomButton";
import CustomInput from "../../components/input/CustomInput";
import { DataKey } from "../../enum/DataKeys";
import { storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc } from "../../view_controller/login/LoginViewController";
import { stylesLogin } from "./StylesLogin";


const CS_SC001_LoginForm = () => {
    //variaveis
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        Domínio: 'Comercial',
        Usuário: 'Barros',
        Senha: 'ba'
    });
    const { navigate } = useNavigation()
    //fim variaveis

    function navigateToMenu() {
        navigate('Config_Ambiente')
    }

    useEffect(() => {
        checkIfUserIsLogged().then((isLogged) => {
            if (isLogged) {
                navigateToMenu()
            }
        })
    }, [])



    async function onClickLogin(done: () => void): Promise<void> {
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
            }
        } catch (error) {
            Alert.alert(error as string)
        } finally {
            done()
        }
    }

    const handleInputTyping = (id: string, value: string) => {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    };

    return (
        <SafeAreaView>
            <CustomInput>
                <CustomInput.InputFormsAreaHandle
                    valueOfInput={attributesMap.Domínio}
                    handleValueOfInput={handleInputTyping}
                    textTitleIdentifier="Domínio"
                />
            </CustomInput>

            <CustomInput>
                <CustomInput.InputFormsAreaHandle
                    valueOfInput={attributesMap.Usuário}
                    handleValueOfInput={handleInputTyping}
                    textTitleIdentifier="Usuário"
                />
            </CustomInput>

            <CustomInput>
                <CustomInput.InputFormsAreaHandle
                    valueOfInput={attributesMap.Senha}
                    handleValueOfInput={handleInputTyping}
                    textTitleIdentifier="Senha"
                />
            </CustomInput>

            <CustomButton
                title={'Logar'}
                onPress={(done) => onClickLogin(done)}
                buttonStyle={stylesLogin.button}
                textStyle={stylesLogin.textButton}
            />


        </SafeAreaView>
    );
}

export default CS_SC001_LoginForm;