import { TouchableHighlight, Text, StyleSheet, View, Pressable } from "react-native";
import CustomIcon from "../icon/CustomIcon";



export interface IItemListMenu {
    title: string,
    onPress?: () => void,
    iconName: string
}

const ItemListMenu = ({ title, onPress = () => { }, iconName }: IItemListMenu) => {
    return (
        <Pressable style={styles.containerItem} onPress={onPress}>
            <View>
                <CustomIcon icon={iconName} />
                <Text style={styles.preVendaText}>{title}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonSerie: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        margin: 32
    },
    buttonDelivery: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
        margin: 32
    }, containerItem: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        margin: 12,
        padding: 16,
        borderRadius: 16,

    },
    preVendaText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },
});



export default ItemListMenu;