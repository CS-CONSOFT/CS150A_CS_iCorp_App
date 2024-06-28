import { lazy, Suspense, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { IResNotaProdutoItem } from "../../../services/api/interfaces/notas/CS_IResNoteData";

import { stylesNotaSerie } from "./StylesNotaSerie";
import { commonStyle } from "../../../CommonStyle";
import { ButtonActionSecondary } from "../../../components/button/CustonButtonActionSecondary";
import CustomSearch from "../../../components/search/CustomSearch";
import ColorStyle from "../../../ColorStyle";
import CustomEmpty from "../../../components/lists/CustomEmpty";
import { DataListaSerie, SerieProduct } from "./DataListSerie";



const CS_SC_SerieProduto = () => {



    const loadingProducts = false


    /*TESTE */
    const isSuccess = true;


    return <SafeAreaView>
            <CustomSearch
                onSearchPress={() => ""}
                onFilterClick={() => ""}
                placeholder={"Nota"} 
                clickToSearch={true}    
            />
            {
                loadingProducts 
                ?
                <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
                :
                <>
                    <FlatList
                        data={DataListaSerie}
                        ListEmptyComponent={<CustomEmpty text={"Nenhuma comanda encontrada"} />}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) =>
                            <ProductItem product={item}/>
                        }
        
                    />
    
                </>

            }

    </SafeAreaView>
}

export default CS_SC_SerieProduto;   


const ProductItem = ({product}: {product: SerieProduct}) => {
    return (

        <View style={[commonStyle.common_margin_horizontal, commonStyle.card_white_shadow]}>
                <Text style={stylesNotaSerie.titleNota}>{product.descricao}</Text>
                <Text style={stylesNotaSerie.text}>Cor Série {product.cor}</Text>
                <ButtonActionSecondary label={"Alterar cor série"} onPress={() => ""}/>
        </View>

    );
};


