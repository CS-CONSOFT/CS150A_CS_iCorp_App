import { useState } from "react";
import { TextInput, Text, View, StyleSheet, KeyboardType } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";


const CustomSendChat = ({
    /** Funcao responsavel por realizar a busca em si */
    onSend, }:
    {
        onSend: (message: string) => void
    }) => {

    const [value, setValue] = useState('')

    /**
     * funcao que e chamada enquanto o usuario digita algo
     */

    const handleInputTyping = (value: string) => {
        setValue(value)
    };


    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[commonStyle.common_input, { flex: 1 }]}
                onChangeText={(value) => handleInputTyping(value)}
                value={value}
                placeholder={"Digite sua mensagem..."}
                keyboardType={'default'}
                clearButtonMode='always'
                multiline={true}
            >

            </TextInput>
            <CustomIcon icon={ICON_NAME.ENVIAR} iconSize={32} onPress={() => onSend(value)} />
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

export default CustomSendChat;


