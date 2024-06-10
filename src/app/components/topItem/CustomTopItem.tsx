import { ReactNode, useEffect, useState } from "react";
import { Text, View, StyleSheet, Keyboard } from "react-native";

interface CustomProp {
    children: ReactNode
}


const CustomTopItem = ({ children }: CustomProp) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View>
            {!isKeyboardVisible && (
                <View style={styles.container}>
                    {children}
                </View>
            )}
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