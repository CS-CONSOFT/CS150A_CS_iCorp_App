import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import HeaderLogo from "../../components/headers/HeaderLogo";
import { checkIfUserIsLogged } from "../../view_controller/login/LoginViewController";
import CS_SC_LoginForm from "./CS_LoginForm";
import { stylesLogin } from "./StylesLogin";
import { useNavigation } from "@react-navigation/native";


const CS_SC_Login = () => {
    const { navigate } = useNavigation()
    function navigateToMenu() {
        navigate('Login')
    }

    useEffect(() => {
        checkIfUserIsLogged().then((isLogged) => {
            if (isLogged) {
                navigateToMenu()
            }
        })
    }, [])

    return (
        <SafeAreaView>
            <View style={{ margin: 56 }}>
                <HeaderLogo />
                <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>
                <CS_SC_LoginForm />
            </View>
        </SafeAreaView>
    );
}

export default CS_SC_Login;