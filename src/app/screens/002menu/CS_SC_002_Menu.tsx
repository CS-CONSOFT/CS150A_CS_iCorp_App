import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, ImageBackground, SafeAreaView, View } from "react-native";
import CustomHeaderUserInfo from "../../components/headers/CustomHeaderUserInfo";
import CustomItemIconTitleHalfRoundedWhite from "../../components/items/CustomItemIconTitleHalfRoundedWhite";
import { DataKey } from "../../enum/DataKeys";
import { checkIfUserIsLogged, logout } from "../../view_controller/login/LoginViewController";
import { data } from "./ListMenu";


const CS_SC_002_Menu = () => {
    const { navigate } = useNavigation()


    useEffect(() => {
        checkIfUserIsLogged().then((isLogged) => {
            if (!isLogged) {
                logout(DataKey.LoginResponse).then(() => {
                    navigate('Login')
                })
            }
        })
    }, [])




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/Pre-venda.png')}
                style={{ flex: 1 }}
            >
                <View style={{
                    paddingVertical: 16,
                    flex: 1,
                }}>
                    <CustomHeaderUserInfo />
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <CustomItemIconTitleHalfRoundedWhite
                                    title={item.title}
                                    onPress={() => item.onPress(navigate)}
                                    iconName={item.iconName}
                                />
                            );
                        }}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}


export default CS_SC_002_Menu;