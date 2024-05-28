import { FlatList, StyleSheet, View, Text } from "react-native";
import { menu01Data } from "./01ListMenu";
import ItemListMenu01Pv from "../lists/ItemListMenu01Pv";
import Separator from "../lists/Separator";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";

const CustomPvBottomMenu = () => {
    return (
        <View style={styles.mainContainer}>
            <Separator />
            <FlatList
                data={menu01Data}
                key={"_"}
                keyExtractor={item => "_" + item.id.toString()}
                numColumns={5}
                renderItem={({ item }) => {
                    if (item.id === "special-button") {
                        return (
                            <View style={styles.centerBottomMenuButtonContainer}>
                                <CustomIcon
                                    icon={ICON_NAME.ADICIONAR_CONTORNADO}
                                    iconColor="#A3C5D9" />
                            </View>
                        )
                    } else {
                        return (
                            <ItemListMenu01Pv
                                title={item.title}
                                onPress={item.onPress}
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

export default CustomPvBottomMenu;