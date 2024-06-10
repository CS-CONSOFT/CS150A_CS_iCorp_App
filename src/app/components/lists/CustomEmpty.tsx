import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomIcon from '../icon/CustomIcon';
import { ICON_NAME } from '../../util/IconsName';
const CustomEmpty = ({ text }: { text: string }) => {
    return (
        <View style={styles.container}>
            <CustomIcon icon={ICON_NAME.TRISTE} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        flexDirection: 'column'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default CustomEmpty;