import { ReactNode } from "react";
import { Text, View, StyleSheet } from "react-native";

interface CustomProp {
    children: ReactNode
}


const CustomTopItem = ({ children }: CustomProp) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

export default CustomTopItem;

export const styles = StyleSheet.create({
    container: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})