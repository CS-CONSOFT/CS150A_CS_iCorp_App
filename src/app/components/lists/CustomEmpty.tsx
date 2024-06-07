import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const CustomEmpty = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sem Itens</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default CustomEmpty;