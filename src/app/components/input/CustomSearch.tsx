import { KeyboardType, View } from "react-native";
import CustomInput from "./CustomInput";
import CustomIcon from "../icon/CustomIcon";
import React, { ReactNode } from "react";

/** INTERFACES */
interface CustomSearchProps {
    titleText?: string,
    //recebe o hook ou funcao responsavel por alterar o estado da variavel
    setValue: any,
    //armazena a nova variavel
    value: string,
    placeholder?: string,
    keyboardType?: KeyboardType
}

interface CustomProp {
    children: ReactNode;
}
/** FIM DAS INTERFACES */


/** COMPONENTE EXPORTADO */
const CustomSearch = ({ children }: CustomProp) => {
    return (
        <>{children}</>
    )
}

CustomSearch.Icon = Icon
CustomSearch.Input = Input

export default CustomSearch;

/** COMPONENTE EXPORTADO */


/** FUNÇÕES PARA A COMPOSIÇÃO */
function Icon({ iconName }: { iconName: string }) {
    return <>
        <CustomIcon icon={iconName} />
    </>
}

function Input({ titleText, setValue, value, placeholder, keyboardType }: CustomSearchProps) {
    return <>
        <CustomInput
            titleText={titleText}
            setValue={setValue}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
        />
    </>
}
/** FUNÇÕES PARA A COMPOSIÇÃO */


