import { FlatList, SafeAreaView, View } from "react-native";
import HeaderUserInfo from "../../components/headers/HeaderUserInfo";
import ItemListMenu from "../../components/lists/ItemListMenu";
import { data } from "./ListMenu";


const CS_SC_Menu = () => {
    return (
        <SafeAreaView>
            <HeaderUserInfo />
            <View style={{
                paddingVertical: 32
            }}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                    renderItem={({ item }) => {
                        return (
                            <ItemListMenu
                                title={item.title}
                                onPress={item.onPress}
                                iconName={item.iconName}
                            />
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
}


export default CS_SC_Menu;