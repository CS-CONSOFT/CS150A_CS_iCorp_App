import React from "react";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CustomProp {
    children: ReactNode
}


const CustomTopItem = ({ children }: CustomProp) => {
    return (
        <View>
            <View style={styles.container}>
                {children}
            </View>
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