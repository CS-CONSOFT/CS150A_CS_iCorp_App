import { ImageBackground, SafeAreaView, Text,  Image } from "react-native";

const CS_SC_011_splash = () => {
 
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                style={{ flex: 1}}
                source={require('../../../../assets/splash01.png')}
            >
                <Image source={require('../../../../assets/logo-extenso.png')}/>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash;