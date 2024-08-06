import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";
import { useNavigation } from "@react-navigation/native";
import { storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { DataKey } from "../../enum/DataKeys";
import Ionicons from '@expo/vector-icons/Ionicons';

const CS_SC_011_splash_Produto = () => {
    const { navigate } = useNavigation()
    function finish(): void {
        storeSimpleData(DataKey.IsFirstTimeOpenApp, "0")
        navigate('Config_Ambiente')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../../../assets/CadastroProduto.png')}
            >
                <View
                    style={[

                        {
                            height: "100%",
                            marginHorizontal: 15,
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
                        onPress={() => finish()}
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
                            Login
                        </Text>
                        <Ionicons size={24} color={ColorStyle.colorPrimary300} name="arrow-forward-outline"/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default CS_SC_011_splash_Produto;