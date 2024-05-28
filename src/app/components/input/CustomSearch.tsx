import React, { ReactNode } from "react";
import { KeyboardType, View, StyleSheet } from "react-native";
import CustomIcon from "../icon/CustomIcon";
import CustomInput from "./CustomInput";

/** INTERFACES */
interface CustomSearchProps {
    titleText?: string,
    //armazena a nova variavel
    value: string,
    placeholder?: string,
    keyboardType?: KeyboardType,
    securityTextEnter?: boolean,
    //lida com a escrita dos valores no input
    handleInput?: (newValue: any) => void
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

function IconFilter({ iconName, iconSize }: { iconName: string, iconSize: number }) {
    return <>
        <CustomIcon icon={iconName} iconSize={iconSize} />
    </>
}


function InputHandle({ titleText = '', value, placeholder = '', keyboardType = 'default', handleInput, securityTextEnter = false }: CustomSearchProps) {
    return <>
        <CustomInput>
            <View >
                <CustomInput.TitleText titleText={titleText} />
                <CustomInput.InputAreaHandle
                    setValue={handleInput!}
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    securityTextEnter={securityTextEnter}
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


