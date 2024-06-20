import { SafeAreaView, View, FlatList, Text, TouchableOpacity, StyleSheet} from "react-native";
import { ButtonLink } from "../../components/button/CustomButtonLink";
//Componentes
import { C_003_01_ProductPvItem } from "../003prevenda/003_01_produto/components/C_003_01_ProductPvItem";
//Estilo
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";


interface Nota {
    nome: string;
    numero: number;
    data: Date;
}

const CS_SC_008_ListaComandas = ({nome, numero, data}: Nota) => {

    
    return <SafeAreaView style={{backgroundColor: "#fff", height: "100%"}}>
        <View style={[commonStyle.common_columnItem, commonStyle.align_centralizar, commonStyle.common_margin_horizontal,{borderBottomColor: ColorStyle.colorPrimary200, borderBottomWidth: 2, padding: 10}]}>
            <Text style={commonStyle.title_accordion}>{"CS-Consoft (DFIX)"}</Text>
            <Text>{"Nª 20240000000020"}</Text>
            <Text>{"20/06/24"}</Text>
        </View>
        <View style={[commonStyle.common_rowItem,commonStyle.align_spacebetween_row, commonStyle.common_margin_horizontal]}>
            <Text style={[commonStyle.title_accordion, commonStyle.font_size_18]}>Produtos</Text>
            <ButtonLink onPress={() => ("")} label={"Adicionar"}/>
        </View>
        
    </SafeAreaView>
}

export default CS_SC_008_ListaComandas;

/*
<FlatList
    data={""}
    refreshing={""}
    ListEmptyComponent={""}
    onRefresh={""}
    renderItem={""}
    onPress={""}
    keyExtractor={""}
    extraData={""}
/>



*/ 
