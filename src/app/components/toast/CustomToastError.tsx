import { useEffect, useState } from "react";
import { Animated, Text, StyleSheet } from "react-native";
interface ToastProps {
    message: string;
}
const CustomToastError = ({ message }: ToastProps) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }
        ).start(() => {
            setTimeout(() => {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ).start();
            }, 2000);
        });
    }, [fadeAnim]);

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    opacity: fadeAnim,
                },
            ]}
        >
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        marginBottom: 20,
    },
    toastContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastText: {
        color: 'white',
    },
});


export default CustomToastError;