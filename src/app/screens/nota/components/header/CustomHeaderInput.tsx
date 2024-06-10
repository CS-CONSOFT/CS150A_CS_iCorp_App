import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight } from "react-native";
import { commonStyle } from "../../../../CommonStyle";


export interface CustomModalInputProps {
    titleText: string;
    //recebe o hook ou funcao responsavel por alterar o estado da variavel
    setValue: any,
    //armazena a nova variavel
    value: string,
    onPress: () => void,
    buttonStyle: object,
    textStyle: object
}

const CustomHeaderInput = ({ titleText, setValue, value, onPress, buttonStyle = {}, textStyle = {} }: CustomModalInputProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{titleText}</Text>
            <Text>Nota</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={setValue}
                value={value}
                keyboardType='numeric'
            />

            <TouchableHighlight
                onPress={onPress}
                style={buttonStyle}
                underlayColor='white'
            ><Text style={textStyle}>Pesquisar</Text></TouchableHighlight>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    }
});

export default CustomHeaderInput;