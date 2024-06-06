import { ReactNode, useEffect, useState } from "react";
import { Text, View, StyleSheet, Keyboard } from "react-native";

interface CustomProp {
    children: ReactNode,
    height: number
}
const CustomBottomItem = ({ children, height }: CustomProp) => {
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
                <View style={[styles.container, { height: height }]}>
                    {children}
                </View>
            )}
        </View>

    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E3E3E3"
    }

})

export default CustomBottomItem;

