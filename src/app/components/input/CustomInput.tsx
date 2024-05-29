import { ReactNode, useState } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";
import CustomIcon from "../icon/CustomIcon";

interface CustomInputProps {
    titleText: string;
    securityTextEnter?: boolean
    placeholder?: string,
    keyboardType?: KeyboardType,
    valueOfInput: string
    //lida com a escrita dos valores no input
    handleValueOfInput: (id: any, valueTyped: any) => void


}

interface CustomProp {
    children: ReactNode
}
const CustomInput = ({ children }: CustomProp) => {
    return <>{children}</>
}

CustomInput.TitleText = TitleText
CustomInput.Icon = Icon
CustomInput.InputAreaHandle = InputAreaHandle


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


function InputAreaHandle({
    titleText,
    handleValueOfInput,
    valueOfInput,
    securityTextEnter = false,
    placeholder,
    keyboardType = 'default',

}: CustomInputProps) {
    return <TextInput
        style={styles.input}
        onChangeText={(valueTyped) => {
            handleValueOfInput!(titleText, valueTyped)
        }}
        value={valueOfInput}
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

