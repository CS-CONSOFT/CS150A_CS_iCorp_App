
import { ReactNode, useEffect, useState } from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";


interface CustomModalProps {
    triggerToast: boolean;
    message: string;
    /**
    SUCCESS = 0,
    WARNING = 1,
    ERROR = 2
     */
    toastType: ToastType
}

enum ToastType {
    SUCCESS = 0,
    WARNING = 1,
    ERROR = 2
}
const CustomToast = ({ triggerToast, message, toastType }: CustomModalProps) => {
    const [dismiss, setDismiss] = useState(false)

    useEffect(() => {
        setDismiss(triggerToast)
        handleDismiss()
    }, [])

    function handleDismiss() {
        setTimeout(() => {
            setDismiss(false)
        }, 2500);
    }

    return (
        <GestureHandlerRootView>
            <Modal
                visible={dismiss}
                transparent
                animationType='fade'
            >
                {toastType == ToastType.SUCCESS && (
                    <ToastSuccess message={message} />
                )}

                {toastType == ToastType.WARNING && (
                    <ToastWarning message={message} />
                )}
                {toastType == ToastType.ERROR && (
                    <ToastError message={message} />
                )}
            </Modal>
        </GestureHandlerRootView>
    )
}

const ToastSuccess = ({ message }: { message: string }) => {
    return (
        <View style={[styles.container, styles.back_sucess]}>
            <CustomIcon icon={ICON_NAME.SUCCESS} iconColor="#fff" iconSize={24} />
            <Text style={{ color: '#fff' }}>{message.toUpperCase()}</Text>
        </View>
    )
}

const ToastError = ({ message }: { message: string }) => {
    return (
        <View style={[styles.container, styles.back_err]}>
            <CustomIcon icon={ICON_NAME.BUG_ERROR} iconColor="#fff" iconSize={24} />
            <Text style={{ color: '#fff' }}>{message.toUpperCase()}</Text>
        </View>
    )
}

const ToastWarning = ({ message }: { message: string }) => {
    return (
        <View style={[styles.container, styles.back_war]}>
            <CustomIcon icon={ICON_NAME.ALERT} iconColor="#000" iconSize={24} />
            <Text style={{ color: '#000' }}>{message.toUpperCase()}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
        padding: 8,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 32
    },
    back_sucess: {
        backgroundColor: "green",
    },
    back_war: {
        backgroundColor: "yellow",
    },
    back_err: {
        backgroundColor: "red",
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


export default CustomToast;


