import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomIcon from "../icon/CustomIcon";
import { IItemList } from "./IItemList";


const ItemListMenu01Pv = ({ title, onPress = () => { }, iconName }: IItemList) => {
    return (
        <Pressable style={styles.containerItem} onPress={onPress}>
            <View>
                <CustomIcon icon={iconName} iconSize={24} iconColor="#6A7178" />
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
    },
    containerItem: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        margin: 12
    },
    preVendaText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6A7178',
        textAlign: 'center'
    },
});



export default ItemListMenu01Pv;