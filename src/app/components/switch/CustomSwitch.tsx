import { Switch, Text, View, StyleSheet } from "react-native";

const CustomSwitch = ({ title }: { title: string }) => {
    return (
        <View style={styles.containerRenderItem}>
            <Text style={styles.textTitle}>{title}</Text>
            <Switch />
        </View>
    );
}

const styles = StyleSheet.create({
    containerRenderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textTitle: {
        textAlign: 'center',
        fontWeight: '600'
    }
});

export default CustomSwitch;