import { FlatList, SafeAreaView, View } from "react-native";
import CustomHeaderUserInfo from "../../components/headers/CustomHeaderUserInfo";
import CustomItemIconTitleHalfRoundedWhite from "../../components/items/CustomItemIconTitleHalfRoundedWhite";
import { data } from "./ListMenu";
import { useNavigation } from "@react-navigation/native";


const CS_SC_002_Menu = () => {
    const { navigate } = useNavigation()
    return (
        <SafeAreaView>
            <CustomHeaderUserInfo />
            <View style={{
                paddingVertical: 32
            }}>
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
        </SafeAreaView>
    );
}


export default CS_SC_002_Menu;