import { KeyboardType, View } from "react-native";
import CustomInput from "./CustomInput";
import CustomIcon from "../icon/CustomIcon";


interface CustomSearchProps {
    titleText?: string,
    iconName: string,
    //recebe o hook ou funcao responsavel por alterar o estado da variavel
    setValue: any,
    //armazena a nova variavel
    value: string,
    placeholder?: string,
    keyboardType?: KeyboardType
}



const CustomSearch = ({ titleText, iconName, setValue, value, placeholder, keyboardType }: CustomSearchProps) => {
    return (
        <View>
            <CustomIcon title={iconName} />
            <CustomInput
                titleText={titleText}
                setValue={setValue}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    );
}

export default CustomSearch;