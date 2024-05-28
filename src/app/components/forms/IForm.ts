import { KeyboardType } from "react-native";

export interface IForm {
    //variavel que armazena cada item que nosso formulario tera
    formInputList: FormInputType[]
}

export interface FormInputType {
    //texto do input
    title: string,
    placeholder?: string,
    keyboardType?: KeyboardType,
    securityTextEnter?: boolean
}
