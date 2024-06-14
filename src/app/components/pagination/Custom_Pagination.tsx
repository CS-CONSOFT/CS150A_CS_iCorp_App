import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { paginationStyles } from "./PaginationStyles";

const Custom_Pagination = ({ paginationArray, onPagePress }:
    { paginationArray: number[], onPagePress: (page: number) => void }) => {

    const [currentPage, setCurrentPage] = useState<number>(1)

    function clickedPage(page: number) {
        setCurrentPage(page)
        onPagePress(page)
    }

    return (
        <View>
            <FlatList
                horizontal
                data={paginationArray}
                keyExtractor={item => item.toString()}
                renderItem={({ item }) => <PaginationItem
                    currentPage={currentPage!}
                    paginationArray={paginationArray}
                    item={item}
                    onPagePress={(item) => clickedPage(item)} />} />
        </View >
    );
}

const PaginationItem = ({ currentPage, item, onPagePress, paginationArray }:
    { currentPage: number, paginationArray: number[], item: number, onPagePress: (item: number) => void }) => {
    return (
        <View style={{ padding: 8 }}>
            {currentPage == paginationArray[item - 1]
                ? <TouchableOpacity style={paginationStyles.clickedItem}>
                    <Text style={paginationStyles.text}>{item}</Text>
                </TouchableOpacity> :

                <TouchableOpacity style={paginationStyles.item} onPress={() => onPagePress(item)}>
                    <Text style={paginationStyles.text}>{item}</Text>
                </TouchableOpacity>
            }

        </View >

    );
}

export default Custom_Pagination;

