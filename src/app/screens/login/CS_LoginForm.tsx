import { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import CustomButton from "../../components/button/CustomButton";
import CustomSearch from "../../components/input/CustomSearch";
import { DataKey } from "../../enum/DataKeys";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc } from "../../view_controller/login/LoginViewController";
import { stylesLogin } from "./StylesLogin";
import { useNavigation } from "@react-navigation/native";


const CS_SC_LoginForm = () => {
    //variaveis
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        Domínio: 'Comercial',
        Usuário: 'Barros',
        Senha: 'ba'
    });
    const { navigate } = useNavigation()
    //fim variaveis

    function navigateToMenu() {
        navigate('Menu')
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
                onPress={(done) => onClickLogin(done)}
                buttonStyle={stylesLogin.button}
                textStyle={stylesLogin.textButton}
            />


        </SafeAreaView>
    );
}

export default CS_SC_LoginForm;