import { ReactNode } from "react";
import { KeyboardType, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import CustomIcon from "../icon/CustomIcon";

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

interface CustomProp {
    children: ReactNode
}
const CustomInput = ({ children }: CustomProp) => {
    return <>{children}</>
}

CustomInput.TitleText = TitleText
CustomInput.Icon = Icon
CustomInput.InputArea = InputArea


export default CustomInput;

function TitleText({ titleText }: { titleText: string }) {
    return <Text>{titleText}</Text>
}

function Icon({ iconName }: { iconName: string }) {
    return <>
        <View style={styles.iconContainer}>
            <CustomIcon icon={iconName} />
        </View>
    </>
}

function InputArea({ setValue, value, securityTextEnter = false, placeholder, keyboardType = 'default' }: CustomInputProps) {
    const handleChangeText = (newValue: string) => {
        setValue(newValue)
    }
    return <TextInput
        style={styles.input}
        onChangeText={handleChangeText}
        value={value}
        secureTextEntry={securityTextEnter}
        placeholder={placeholder}
        keyboardType={keyboardType}

    ></TextInput>
}



const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 250,
        margin: 4,
        borderWidth: 1,
        padding: 10,
        borderRadius: 32,
        paddingHorizontal: 16
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

