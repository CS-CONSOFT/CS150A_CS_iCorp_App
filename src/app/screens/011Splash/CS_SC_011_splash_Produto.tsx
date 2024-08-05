import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";

const CS_SC_011_splash_Produto = () => {
 
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                style={{ flex: 1}}
                source={require('../../../../assets/CadastroProduto.png')}
            >
                <View
                    style={[
                        
                        { 
                        height:"100%",
                        marginHorizontal:15,
                        paddingVertical: 60,
                        alignItems: "flex-start",
                        justifyContent: "space-between"
                        }
                    ]}
                >
                    <Text
                        style={[
                            commonStyle.common_fontWeight_800,
                            {
                                width: "100%",
                                fontSize: 52,
                                textAlign: "left",
                                color: "white",
                            }
                        ]}
                    >
                        Encontre produtos{'\n'}com{'\n'}facilidade
                    </Text>
                    <TouchableOpacity 
                        onPress={() => ""}
                        style={[
                            commonStyle.border_radius_32,
                            commonStyle.align_centralizar,
                            {
                                backgroundColor: ColorStyle.colorPrimary100,
                                width: "100%",
                                height: 60,
                            }
                        ]}
                    >
                        <Text
                            style={[
                                commonStyle.common_fontWeight_600,
                                commonStyle.font_size_18,
                                {
                                    color: ColorStyle.colorPrimary300,
                                }
                            ]}
                        >
                            Proximo
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash_Produto;