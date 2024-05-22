import { KeyboardType, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

interface CustomInputProps {
    titleText?: string;
    //recebe o hook ou funcao responsavel por alterar o estado da variavel
    setValue: (newValues: any) => void,
    //armazena a nova variavel
    value: string,
    securityTextEnter?: boolean
    placeholder?: string,
    keyboardType?: KeyboardType
}

const CustomInput = ({ titleText = '', setValue, value, securityTextEnter = false, placeholder, keyboardType = 'default' }: CustomInputProps) => {

    const handleChangeText = (newValue: string) => {
        setValue(newValue)
    }


    return (
        <SafeAreaView>
            {titleText !== '' ? <Text>{titleText}</Text> : <></>}
            <TextInput
                style={styles.input}
                onChangeText={handleChangeText}
                value={value}
                secureTextEntry={securityTextEnter}
                placeholder={placeholder}
                keyboardType={keyboardType}
            ></TextInput>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 250,
        margin: 4,
        borderWidth: 1,
        padding: 10,
    }
})

export default CustomInput;