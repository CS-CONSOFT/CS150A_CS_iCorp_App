import { ReactNode, useState } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";
import CustomIcon from "../icon/CustomIcon";

interface CustomInputFormProps {
    textTitleIdentifier: string;
    securityTextEnter?: boolean
    placeholder?: string,
    keyboardType?: KeyboardType,
    valueOfInput: string
    //lida com a escrita dos valores no input
    handleValueOfInput: (id: any, valueTyped: any) => void
}

interface CustomInputFormProp {
    title: string;
    securityTextEnter?: boolean
    placeholder?: string,
    keyboardType?: KeyboardType,
    value: string
    //lida com a escrita dos valores no input
    setValue: any
}

interface CustomProp {
    children: ReactNode
}
const CustomInput = ({ children }: CustomProp) => {
    return <>{children}</>
}

CustomInput.TitleText = TitleText
CustomInput.Icon = Icon
CustomInput.InputFormsAreaHandle = InputFormsAreaHandle
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

/**
 * Input usado em formularios que possuem muitos campos
 * podendo dividir todos esses campos em um objeto chave valor
 * que levara como identificador [key] ou [chave] o 
 * @textTitleIdentifier e o valor sera o valor digitado no 
 * onChangeText, ou seja, @valueTyped
 * 
 * Use quando tiver um formulario grande
 * 
 */
function InputFormsAreaHandle({
    /**
     * Responsavel por identificar o input atual
     */
    textTitleIdentifier,
    handleValueOfInput,
    valueOfInput,
    securityTextEnter = false,
    placeholder,
    keyboardType = 'default',

}: CustomInputFormProps) {
    return <TextInput
        style={styles.input}
        onChangeText={(valueTyped) => {
            handleValueOfInput!(textTitleIdentifier, valueTyped)
        }}
        value={valueOfInput}
        secureTextEntry={securityTextEnter}
        placeholder={placeholder}
        keyboardType={keyboardType}
    ></TextInput>
}

/**
 * Utiliza o useState normal para definir um change text,
 * usar em contextos com poucos inputs
 */
function InputAreaHandle({
    /**
     * Responsavel por identificar o input atual
     */
    title,
    value,
    setValue,
    securityTextEnter = false,
    placeholder,
    keyboardType = 'default',

}: CustomInputFormProp) {
    return <TextInput
        style={styles.input}
        onChangeText={setValue}
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

