import Toast from "react-native-toast-message";

export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}

export function showToast(
    /**
     *  SUCCESS = 'success',
        ERROR = 'error',
        INFO = 'info'
     */
    toastType: ToastType,
    title: string,
    message: string) {
    Toast.show({
        type: toastType,
        text1: title,
        text2: message
    });
}