import { ImageBackground, SafeAreaView, Text, Image, useWindowDimensions, StyleSheet, Dimensions } from "react-native";
import { MotiView, View } from "moti";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { DataKey } from "../../enum/DataKeys";

const CS_SC_011_splash = () => {

    const dimensions = useWindowDimensions();
    const largura = Dimensions.get("window").width;
    const { navigate } = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            getSimpleData(DataKey.IsFirstTimeOpenApp).then((res) => {
                if (res == undefined || res == null) {
                    navigate('Splash_Entrega')
                } else {
                    navigate('Config_Ambiente')
                }
            })
        }, 3500)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../../../assets/splash01.png')}
            >

                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 100,
                        height: 80
                    }}
                >
                    <MotiView
                        from={{
                            opacity: 0,
                            translateY: -dimensions.height,
                        }}
                        animate={{
                            opacity: 1,
                            translateY: 380,
                            translateX: 156
                        }}
                        transition={{
                            duration: 5000,
                        }}

                    >
                        <Image
                            source={require('../../../../assets/LogoBrancoVermelho.png')}
                            style={{
                                width: 400,
                                height: 80
                            }}
                        />
                    </MotiView>

                </View>


            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash;

