import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomIcon from "../icon/CustomIcon";
import { IItemList } from "../lists/IItemList";


const ItemIconTitleRoundedBlue = ({ title, onPress = () => { }, iconName }: IItemList) => {

    return (
        <View style={styles.containerItem}>
            <Pressable onPress={onPress} style={styles.containerIcon}>
                <CustomIcon icon={iconName} iconSize={14} style={styles.iconStyle} />
            </Pressable>
            <Text style={styles.preVendaText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 4,
        alignContent: 'center',
        margin: 4,
        justifyContent: 'space-evenly'
    },
    containerIcon: {
        backgroundColor: '#A3C5D9',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        marginBottom: 5,
    },
    preVendaText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        width: 100
    },
    iconStyle: {
        elevation: 1
    }
});


export default ItemIconTitleRoundedBlue;