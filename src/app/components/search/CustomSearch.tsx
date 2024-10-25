import { useCallback, useEffect, useState } from "react";
import { TextInput, Text, View, StyleSheet, KeyboardType } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DataKey } from "../../enum/DataKeys";
import { getSimpleData, storeSimpleData } from "../../services/storage/AsyncStorageConfig";


const CustomSearch = ({
    /** Funcao responsavel por realizar a busca em si */
    onSearchPress,
    /** variavel que define se havera ou nao clique de filtros */
    onFilterClick = undefined,
    /** tipo de teclado */
    keyboartType = 'default',
    /** placeholder do input */
    placeholder,
    previusScreen = undefined,
    showCamera = false,
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
        clickToSearch?: boolean,

        /** tela que está chamando a camera, usado para voltar para a propria tela quando estiver na camera */
        previusScreen?: string,
        /** deve mostraar icone de camera */
        showCamera?: boolean
    }) => {

    const [valueSearch, setValueSearch] = useState('')

    const { navigate } = useNavigation()
    /**
     * funcao que e chamada enquanto o usuario digita algo
     */


    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const res = await getSimpleData(DataKey.CAMERA_CONTENT)
            if (res) {
                search(res as string)
                setValueSearch(res as string)
            }
        }
        fetchData()
    }, []))


    const handleInputTyping = (value: string) => {
        //se nao for para pesquisar durante o clique, faça a pesquisa aqui
        if (!clickToSearch) {
            search(value)
        }
        setValueSearch(value)
    };

    const search = async (value: string) => {
        onSearchPress(value)
        await storeSimpleData(DataKey.CAMERA_CONTENT, "")
    }


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
            {showCamera && (
                <CustomIcon icon={ICON_NAME.CAMERA} iconColor="#000" iconSize={44} onPress={() => {
                    navigate('Camera', {
                        previousScreen: previusScreen || "Menu"
                    })
                }} />
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


