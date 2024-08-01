import { ImageBackground, SafeAreaView, Text, TouchableOpacity } from "react-native";

const CS_SC_011_splash_PreVenda = () => {
 
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                style={{ flex: 1}}
                source={require('../../../../assets/Pre-venda.png')}
            >
                <Text>Faça suas vendas de forma rápida e segura</Text>
                <TouchableOpacity onPress={() => ""}>
                    <Text>Proximo</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash_PreVenda;