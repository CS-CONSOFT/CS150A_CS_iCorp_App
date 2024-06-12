
import { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


interface CustomModalProps {
    isVisible: boolean;
    onDismiss: () => void;
    children: ReactNode
}

const CustomAlertDialog = ({ isVisible, onDismiss, children }: CustomModalProps) => {
    return (
        <GestureHandlerRootView>
            <Modal
                visible={isVisible}
                transparent
                animationType='none'
                onRequestClose={onDismiss}
            >
                <View style={styles.container}>
                    {children}
                </View>
            </Modal>
        </GestureHandlerRootView>
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


