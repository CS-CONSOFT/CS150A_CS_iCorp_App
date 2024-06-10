import { Switch, Text, View, StyleSheet } from "react-native";

const CustomSwitch = ({ title, switchValue, onValueChange }: { title: string, switchValue: boolean, onValueChange: (value: boolean) => void }) => {
    return (
        <View style={styles.containerRenderItem}>
            <Text style={styles.textTitle}>{title}</Text>
            <Switch onValueChange={onValueChange} value={switchValue} />
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