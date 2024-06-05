import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { DataKey } from "../../enum/DataKeys";
import { removeValueFromStorage } from "../../services/storage/AsyncStorageConfig";
import { ICON_NAME } from "../../util/IconsName";
import CustomIcon from "../icon/CustomIcon";
import ItemIconTitleNoColor from "../items/ItemIconTitleNoColor";
import Separator from "../lists/Separator";
import { listBottomMenu001 } from "./ListBottomMenu";

const CustomPvBottomMenu_001 = () => {
    const { navigate } = useNavigation()
    function goToSearchProduct() {
        removeValueFromStorage(DataKey.CurrentPV).then(() => {
            navigate('Consulta_Produtos')
        })
    }

    return (
        <View style={styles.mainContainer}>
            <Separator />
            <FlatList
                data={listBottomMenu001}
                key={"_"}
                keyExtractor={item => "_" + item.id.toString()}
                numColumns={5}
                renderItem={({ item }) => {
                    if (item.id === "special-button") {
                        return (
                            <Pressable onPress={goToSearchProduct}>
                                <View style={styles.centerBottomMenuButtonContainer}>
                                    <CustomIcon
                                        icon={ICON_NAME.ADICIONAR_CONTORNADO}
                                        iconColor="#A3C5D9" />
                                </View>
                            </Pressable>
                        )
                    } else {
                        return (
                            <ItemIconTitleNoColor
                                title={item.title}
                                onPress={() => item.onPress(navigate)}
                                iconName={item.iconName}
                            />
                        );
                    }
                }}
            />
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

export default CustomPvBottomMenu_001;