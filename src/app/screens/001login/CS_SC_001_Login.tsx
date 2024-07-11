import { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import CustomHeaderLogo from "../../components/headers/CustomHeaderLogo";
import { checkIfUserIsLogged } from "../../view_controller/login/LoginViewController";
import CS_SC001_LoginForm from "./C_001_LoginForm";
import { stylesLogin } from "./StylesLogin";
import { useNavigation } from "@react-navigation/native";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { DataKey } from "../../enum/DataKeys";
import { commonStyle } from "../../CommonStyle";


const CS_SC_001_Login = () => {
    const { navigate } = useNavigation()
    const [currentDominio, setCurrentDominio] = useState('')
    function navigateToMenu() {
        navigate('Menu')
    }

    useEffect(() => {
        getSimpleData(DataKey.DominioValorString).then((res) => {
            setCurrentDominio(res as string)
        })
        checkIfUserIsLogged().then((isLogged) => {
            if (isLogged) {
                navigateToMenu()
            }
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/imgpersonselling.jpg')}
                style={{ flex: 1 }}
            >
                <View style={{ margin: 56 }}>
                    <CustomHeaderLogo />
                    <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>
                    <Text style={[commonStyle.common_fontWeight_800, { fontSize: 18 }]}>Domínio: {currentDominio}</Text>
                    <CS_SC001_LoginForm />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_001_Login;