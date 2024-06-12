import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import CustomItemIconTitleNoColor from "../items/CustomItemIconTitleNoColor";
import CustomSeparator from "../lists/CustomSeparator";
import { listBottomMenu002 } from "./ListBottomMenu";

const CustomPvBottomMenu_002 = () => {
    const { navigate } = useNavigation()
    return (
        <View>
            <View style={styles.mainContainer}>
                <CustomSeparator />
                <FlatList
                    data={listBottomMenu002}
                    key={"_"}
                    keyExtractor={item => "_" + item.id.toString()}
                    numColumns={5}
                    renderItem={({ item }) => {
                        return (
                            <CustomItemIconTitleNoColor
                                title={item.title}
                                onPress={() => item.onPress(navigate)}
                                iconName={item.iconName}
                            />
                        );
                    }}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFF',
    },
    content: {
        textAlign: 'center', // Centraliza o texto horizontalmente dentro da View
    },
    centerBottomMenuButtonContainer: {
        backgroundColor: '#0A3147',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center'
    }
});

export default CustomPvBottomMenu_002;