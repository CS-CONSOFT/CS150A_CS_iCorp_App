import { ImageBackground, SafeAreaView, Text, TouchableOpacity } from "react-native";

const CS_SC_011_splash_Produto = () => {
 
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                style={{ flex: 1}}
                source={require('../../../../assets/CadastroProduto.png')}
            >
                <Text>Encontre produtos com facilidade</Text>
                <TouchableOpacity onPress={() => ""}>
                    <Text>Proximo</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash_Produto;