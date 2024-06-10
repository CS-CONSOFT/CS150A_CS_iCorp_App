import { Text, View, StyleSheet } from "react-native";

const CustomTextValueWithTitleBoldHorizontal = ({ title, value }: { title: string, value: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}: </Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    title: {
        fontWeight: '700',
        fontSize: 16
    },
    value: {
        fontSize: 16
    }

})


export default CustomTextValueWithTitleBoldHorizontal;