import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomButton from "../../../../components/button/CustomButton";
import CustomInput from "../../../../components/input/CustomInput";


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
            <CustomInput>
                <CustomInput.TitleText titleText="Nota" />
                <CustomInput.InputFormsAreaHandle
                    textTitleIdentifier="nota"
                    valueOfInput={value}
                    handleValueOfInput={setValue}
                    keyboardType='numeric' />
            </CustomInput>

            <CustomButton
                title="Pesquisar"
                onPress={onPress}
                buttonStyle={buttonStyle}
                textStyle={textStyle}
            />
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