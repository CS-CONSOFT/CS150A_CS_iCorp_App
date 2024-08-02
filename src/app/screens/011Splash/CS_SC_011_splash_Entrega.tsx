import { ImageBackground, SafeAreaView, Text, TouchableOpacity } from "react-native";

const CS_SC_011_splash_Entrega = () => {
 
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                style={{ flex: 1}}
                source={require('../../../../assets/Entrega.png')}
            >
                <Text>Faça suas entregas e registre series de produtos</Text>
                <TouchableOpacity onPress={() => ""}>
                    <Text>Proximo</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash_Entrega;