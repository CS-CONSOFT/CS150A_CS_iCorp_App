import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";
import { DataKey } from "../../enum/DataKeys";
import { removeValueFromStorage } from "../../services/storage/AsyncStorageConfig";
import CustomItemIconTitleNoColor from "../items/CustomItemIconTitleNoColor";
import CustomSeparator from "../lists/CustomSeparator";
import { listBottomMenu002 } from "./ListBottomMenu";

const CustomPvBottomMenu_002 = () => {
    const { navigate } = useNavigation()
    function goToSearchProduct() {
        removeValueFromStorage(DataKey.CurrentPV).then(() => {
            navigate('Consulta_Produtos', { cameFromPv: false })
        })
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    return (
        <View>
            {!isKeyboardVisible && (
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
            )}
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