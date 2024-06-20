import { FlatList, ImageBackground, SafeAreaView, View } from "react-native";
import CustomHeaderUserInfo from "../../components/headers/CustomHeaderUserInfo";
import CustomItemIconTitleHalfRoundedWhite from "../../components/items/CustomItemIconTitleHalfRoundedWhite";
import { data } from "./ListMenu";
import { useNavigation } from "@react-navigation/native";


const CS_SC_002_Menu = () => {
    const { navigate } = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/imgpersonselling.jpg')}
                style={{ flex: 1 }}
            >
                <View style={{
                    paddingVertical: 16,
                    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'
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