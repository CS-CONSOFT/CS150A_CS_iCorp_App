import { StyleSheet, Text, Modal, View, TouchableOpacity } from "react-native";
import CustomInput from "../input/CustomInput";
import { useEffect, useState } from "react";


interface CustomModalProps {
    isVisible: boolean;
    onDismiss: () => void;
    title: string;
    onSave: (newSerie: string) => void;
    onCloseButton: () => void;
}

const CustomAlertDialog = ({ isVisible, onDismiss, title, onSave, onCloseButton }: CustomModalProps) => {

    const [serie, setSerie] = useState('')

    useEffect(() => {
        setSerie(title)
    }, []);

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onDismiss}
        >
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <TouchableOpacity onPress={() => {setSerie(''); onCloseButton()}} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>

                    <CustomInput
                        titleText={title}
                        setValue={setSerie}
                        value={serie}
                    />


                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => {setSerie(''); onSave(serie)}} style={styles.button}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

function usEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
