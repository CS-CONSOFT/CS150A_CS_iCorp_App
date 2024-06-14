import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";

interface Props {
    onSearchPress: (atributes: any) => void,
    onFilterClick: () => void,
    placeholder: string
}

const CustomSearch = ({ onSearchPress, onFilterClick, placeholder }: Props) => {






    const [valueSearch, setValueSearch] = useState('')


    const handleInputTyping = (value: string) => {
        setValueSearch(value)
        onSearchPress(value)
    };


    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[commonStyle.common_input, { flex: 1 }]}
                onChangeText={(value) => handleInputTyping(value)}
                value={valueSearch}
                placeholder={placeholder}
            />
            <CustomIcon icon={ICON_NAME.FILTRAR_CONTORNADO} iconSize={44} onPress={onFilterClick} />
        </View>
    );
}


//estilos
export const styles = StyleSheet.create({

    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    }

});

export default CustomSearch;


