import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { commonStyle } from "../../CommonStyle";

const CustomHorizontalFilter = ({ onPress, currentItemSelected, dataList }: { onPress: (currentItem: number) => void, currentItemSelected: number, dataList: any[] }) => {
    return (
        <FlatList
            horizontal={true}
            style={{ width: 'auto' }}
            data={dataList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <>
                <FilterHorizontalItem currentItemSelected={currentItemSelected} onPress={(currentItem) => onPress(currentItem)} item={item} />
            </>}
        />
    );
}


/** item de renderizacao do filtro de dias */
export const FilterHorizontalItem = ({ item, onPress, currentItemSelected }: { item: any, onPress: (currentItem: number) => void, currentItemSelected: number }) => {
    return (
        <View>
            {currentItemSelected == item.id
                ?
                <TouchableOpacity onPress={() => {
                    onPress(-1)
                }}
                    style={[commonStyle.justify_content_space_btw,
                    commonStyle.filterDateClicked, commonStyle.margin_8,
                    commonStyle.common_padding_08]}>

                    <Text style={[commonStyle.filterDateTextClicked]}>{item.label}</Text>

                </TouchableOpacity>

                :

                <TouchableOpacity
                    onPress={() => {
                        onPress(item.id)
                    }}

                    style={[commonStyle.justify_content_space_btw,
                    commonStyle.filterDate, commonStyle.margin_8,
                    commonStyle.common_padding_08]}>

                    <Text style={[commonStyle.filterDateText]}>{item.label}</Text>

                </TouchableOpacity>
            }
        </View>
    )
}

export default CustomHorizontalFilter;