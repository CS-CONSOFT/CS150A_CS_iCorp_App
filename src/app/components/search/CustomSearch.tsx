import { useState } from "react";
import { TextInput, Text, View, StyleSheet, KeyboardType } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";


const CustomSearch = ({
    /** Funcao responsavel por realizar a busca em si */
    onSearchPress,
    /** variavel que define se havera ou nao clique de filtros */
    onFilterClick = undefined,
    /** tipo de teclado */
    keyboartType = 'default',
    /** placeholder do input */
    placeholder,
    /** variavel que define se a pesquisa deve ser feita ao clicar no icone de pesquisa ou enquanto digita o campo */
    clickToSearch = false }:
    {
        onSearchPress: (atributes: any) => void,
        /**
         * funcao para definir o clique no icone de filtro
         */
        onFilterClick?: () => void,
        /** tipo de teclado */
        keyboartType?: KeyboardType,
        /** placeholder do input */
        placeholder: string,
        /**
         * variavel que define se a busca deve ser feita ao digitar ou apenas ao clicar em um botao
         * de pesquisa. O botao de pesquisa deve ser implementado na tela pai e chamar a funcao
         * onSearchPress
         */
        clickToSearch?: boolean
    }) => {

    const [valueSearch, setValueSearch] = useState('')

    /**
     * funcao que e chamada enquanto o usuario digita algo
     */

    const handleInputTyping = (value: string) => {
        //se nao for para pesquisar durante o clique, faça a pesquisa aqui
        if (!clickToSearch) {
            onSearchPress(value)
        }
        setValueSearch(value)
    };


    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[commonStyle.common_input, { flex: 1 }]}
                onChangeText={(value) => handleInputTyping(value)}
                value={valueSearch}
                placeholder={placeholder}
                keyboardType={keyboartType}
                clearButtonMode='always'

            >

            </TextInput>
            {clickToSearch && (
                <CustomIcon icon={ICON_NAME.BUSCA_CONTORNADO} iconSize={44} onPress={() => onSearchPress(valueSearch)} />
            )}
            {onFilterClick !== undefined && (
                <CustomIcon icon={ICON_NAME.FILTRAR_CONTORNADO} iconSize={44} onPress={onFilterClick} />
            )}
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


