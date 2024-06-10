import { FlatList, SafeAreaView, View } from "react-native";
import CustomSearch from "../../components/search/CustomSearch";
import CustomEmpty from "../../components/lists/CustomEmpty";

const CS_SC_005_Obras = () => {
    return (
        <View>
            <CustomSearch
                placeholder="Pesquisar"
                onSearchPress={() => { }}
                onFilterClick={() => { }}
            />

        </View>
    );
}

export default CS_SC_005_Obras;