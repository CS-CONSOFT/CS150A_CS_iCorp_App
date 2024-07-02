import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { paginationStyles } from "./PaginationStyles";

/**
 * Componente de Paginação Customizada
 * 
 * Props:
 * - paginationArray: array que contém os números das páginas que serão mostradas na paginação.
 * - onPagePress: função que lida com o clique em uma página, recebendo o número da página clicada.
 */
const Custom_Pagination = ({
    paginationArray,  // Array de números de página a serem exibidos na paginação
    onPagePress       // Função chamada quando uma página é clicada, recebe o número da página como argumento
}: {
    paginationArray: number[],  // Array de números de página
    onPagePress: (page: number) => void  /** Função que lida com o clique na página, é uma função callback que manda pro componente pai a página clicada, para então enviar para a api. 
        
                <Custom_Pagination
                    onPagePress={(page) => getListObras(page)} -> Essa seria um exemplo de uso, ao clicar no pagePress a pagina é enviada para a funcao que busca uma lista
                    paginationArray={paginationArray} />
        
        */
}) => {

    // Estado para manter a página atual
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Função chamada quando uma página é clicada
    function clickedPage(page: number) {
        setCurrentPage(page);  // Atualiza o estado com a nova página
        onPagePress(page);     // Chama a função onPagePress passada como prop
    }

    return (
        <View style={[{ backgroundColor: "#0A3147", padding: 12, elevation: 2 }, commonStyle.margin_8, commonStyle.border_radius_32]}>
            <FlatList
                horizontal
                data={paginationArray}  // Array de dados para a FlatList
                keyExtractor={item => item.toString()}  // Chave única para cada item
                renderItem={({ item }) => (
                    <PaginationItem
                        currentPage={currentPage}  // Página atual
                        paginationArray={paginationArray}  // Array de números de página
                        item={item}  // Número da página atual
                        onPagePress={(item) => clickedPage(item)}  // Função chamada quando uma página é clicada
                    />
                )}
            />
        </View>
    );
}

/**
 * Componente de Item de Paginação
 * 
 * Props:
 * - currentPage: número da página atual.
 * - item: número da página que este item representa.
 * - onPagePress: função que lida com o clique neste item.
 * - paginationArray: array com os números das páginas.
 */
const PaginationItem = ({ currentPage, item, onPagePress, paginationArray }: {
    currentPage: number,  // Número da página atual
    paginationArray: number[],  // Array de números de página
    item: number,  // Número da página que este item representa
    onPagePress: (item: number) => void  // Função que lida com o clique neste item
}) => {
    return (
        <View>
            {currentPage == paginationArray[item - 1]  // Verifica se este item representa a página atual
                ? <TouchableOpacity style={paginationStyles.clickedItem}>
                    <Text style={paginationStyles.text}>{item}</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={paginationStyles.item} onPress={() => onPagePress(item)}>
                    <Text style={paginationStyles.textClicked}>{item}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default Custom_Pagination;

