import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import CustomHeaderLogo from "../../components/headers/CustomHeaderLogo";
import { checkIfUserIsLogged } from "../../view_controller/login/LoginViewController";
import CS_SC001_LoginForm from "./C_001_LoginForm";
import { stylesLogin } from "./StylesLogin";
import { useNavigation } from "@react-navigation/native";


const CS_SC_001_Login = () => {
    const { navigate } = useNavigation()
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

    return (
        <SafeAreaView>
            <View style={{ margin: 56 }}>
                <CustomHeaderLogo />
                <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>
                <CS_SC001_LoginForm />
            </View>
        </SafeAreaView>
    );
}

export default CS_SC_001_Login;