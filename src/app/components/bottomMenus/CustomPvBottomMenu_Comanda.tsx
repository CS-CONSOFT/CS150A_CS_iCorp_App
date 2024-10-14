import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { DataKey } from "../../enum/DataKeys";
import { removeValueFromStorage } from "../../services/storage/AsyncStorageConfig";
import { ICON_NAME } from "../../util/IconsName";
import CustomIcon from "../icon/CustomIcon";
import CustomItemIconTitleNoColor from "../items/CustomItemIconTitleNoColor";
import CustomSeparator from "../lists/CustomSeparator";
import { listBottomMenuComanda } from "./ListBottomMenu";

const CustomPvBottomMenu_Comanda = () => {
    const { navigate } = useNavigation()

    function goToSearchProduct() {
        removeValueFromStorage(DataKey.CurrentPV).then(() => {
            navigate('Consulta_Produtos', { cameFromPv: false, insertComanda: false })
        })
    }

    return (
        <View style={styles.mainContainer}>
            <CustomSeparator />
            <FlatList
                data={listBottomMenuComanda}
                key={"_"}
                keyExtractor={item => "_" + item.id.toString()}
                numColumns={5}
                renderItem={({ item }) => {
                    if (item.id === "special-button") {
                        return (
                            <Pressable onPress={goToSearchProduct} style={{ alignItems: 'center', width: '100%', padding: 4 }}>
                                <View style={[styles.centerBottomMenuButtonContainer]}>
                                    <CustomIcon
                                        icon={ICON_NAME.ADICIONAR_CONTORNADO}
                                        iconColor="#A3C5D9" />
                                </View>
                            </Pressable>
                        )
                    } else {
                        return (
                            <CustomItemIconTitleNoColor
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

export default CustomPvBottomMenu_Comanda;