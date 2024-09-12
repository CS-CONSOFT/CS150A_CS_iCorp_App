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
    const [currentDominio, setCurrentDominio] = useState('')

    useEffect(() => {
        getSimpleData(DataKey.DominioValorString).then((res) => {
            setCurrentDominio(res as string)
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/loginConf02.png')}
                style={{ flex: 1 }}
            >
                <View style={{ marginTop: 50, marginHorizontal: 30 }}>
                    <CustomHeaderLogo />
                    <Text style={stylesLogin.txtAtendimentoMobile}>Atendimento Mobile</Text>
                    <View style={[commonStyle.bg_blacktransparent, { borderRadius: 20, padding: 10 }]}>
                        <Text style={[commonStyle.common_fontWeight_600, commonStyle.margin_8, { fontSize: 18, color: 'white' }]}>Domínio: {currentDominio}</Text>
                        <CS_SC001_LoginForm />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_001_Login;