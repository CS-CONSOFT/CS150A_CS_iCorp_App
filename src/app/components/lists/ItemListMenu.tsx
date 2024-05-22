import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import CustomIcon from "../icon/CustomIcon";



export interface IItemListMenu {
    title: string,
    onPress?: () => void,
    iconName: string
}

const ItemListMenu = ({ title, onPress = () => { }, iconName }: IItemListMenu) => {
    return (
        <TouchableHighlight style={styles.container} onPress={onPress}>
            <View>
                <CustomIcon icon={iconName} />
                <Text style={styles.preVendaText}>{title}</Text>
            </View>
        </TouchableHighlight>
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
    }, container: {
        flex: 1,
        backgroundColor: '#C3C3C3',
        alignItems: 'center',
        margin: 12,
        padding: 16,
        borderRadius: 16,

    },
    preVendaText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});



export default ItemListMenu;