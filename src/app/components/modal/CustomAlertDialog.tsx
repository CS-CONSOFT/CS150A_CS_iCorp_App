import { StyleSheet, Text, Modal, View, TouchableOpacity, TextInput } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import { commonStyle } from "../../CommonStyle";


interface CustomModalProps {
    isVisible: boolean;
    onDismiss: () => void;
    title: string;
    children: ReactNode
}

const CustomAlertDialog = ({ isVisible, onDismiss, title, children }: CustomModalProps) => {
    const [serie, setSerie] = useState('')
    useEffect(() => {
        setSerie(title)
    }, [isVisible]);

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onDismiss}
        >
            <View style={styles.container}>
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    dialog: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginHorizontal: 5
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'red',
        borderRadius: 5,
        marginHorizontal: 5,
        alignSelf: "flex-end"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});


export default CustomAlertDialog;


