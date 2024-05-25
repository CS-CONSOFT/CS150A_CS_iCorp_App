import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { paginationStyles } from "./PaginationStyles";

const Custom_Pagination = ({ paginationArray, onItemClick, currentClickedItem }:
    { currentClickedItem: number, paginationArray: number[], onItemClick: (item: number) => void }) => {

    return (
        <FlatList
            horizontal
            data={paginationArray}
            keyExtractor={item => item.toString()}
            renderItem={({ item }) => <PaginationItem currentClickedItem={currentClickedItem} paginationArray={paginationArray} item={item} onItemClick={onItemClick} />} />
    );
}

const PaginationItem = ({ currentClickedItem, item, onItemClick, paginationArray }:
    { currentClickedItem: number, paginationArray: number[], item: number, onItemClick: (item: number) => void }) => {
    return (
        <View>
            {currentClickedItem == paginationArray[item - 1]
                ? <TouchableOpacity style={paginationStyles.clickedItem}>
                    <Text style={paginationStyles.text}>{item}</Text>
                </TouchableOpacity> :

                <TouchableOpacity style={paginationStyles.item} onPress={() => onItemClick(item)}>
                    <Text style={paginationStyles.text}>{item}</Text>
                </TouchableOpacity>
            }

        </View >

    );
}

export default Custom_Pagination;

