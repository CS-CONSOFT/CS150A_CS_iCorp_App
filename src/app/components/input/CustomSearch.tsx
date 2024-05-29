import React, { ReactNode, useState } from "react";
import { KeyboardType, View, StyleSheet } from "react-native";
import CustomIcon from "../icon/CustomIcon";
import CustomInput from "./CustomInput";

/** INTERFACES */
interface CustomSearchProps {
    titleText?: string,
    placeholder?: string,
    keyboardType?: KeyboardType,
    securityTextEnter?: boolean,
    valueOfInput: string,
    //lida com a escrita dos valores no input
    handleValueOfInput: (id: any, valueTyped: any) => void,
    initialState?: any
}


interface CustomProp {
    children: ReactNode;
}
/** FIM DAS INTERFACES */


/** COMPONENTE EXPORTADO */
const CustomSearch = ({ children }: CustomProp) => {
    return <View style={styles.searchContainer}>{children}</View>;
}

CustomSearch.IconSearch = IconSearch
CustomSearch.IconFilter = IconFilter
CustomSearch.InputHandle = InputHandle

export default CustomSearch;
/** COMPONENTE EXPORTADO */


/** FUNÇÕES PARA A COMPOSIÇÃO */
function IconSearch({ iconName, iconColor, style, iconSize }: { iconName: string, iconColor?: string, style?: object, iconSize?: number }) {
    return <>
        <View style={style}>
            <CustomIcon icon={iconName} iconColor={iconColor} iconSize={iconSize} />
        </View>
    </>
}

function IconFilter({ style, iconName, iconSize }: { style?: object, iconName: string, iconSize: number }) {
    return <>
        <CustomIcon style={style} icon={iconName} iconSize={iconSize} />
    </>
}


function InputHandle({
    titleText = '',
    placeholder = '',
    keyboardType = 'default',
    securityTextEnter = false,
    handleValueOfInput,
    valueOfInput }: CustomSearchProps) {
    /**Inicio do Metodo */

    return <>
        <CustomInput>
            <View >
                <CustomInput.TitleText titleText={titleText} />
                <CustomInput.InputAreaHandle
                    titleText={titleText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    securityTextEnter={securityTextEnter}
                    handleValueOfInput={handleValueOfInput}
                    valueOfInput={valueOfInput}
                />
            </View>
        </CustomInput>
    </>
}



/** FUNÇÕES PARA A COMPOSIÇÃO */

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
    }
});


