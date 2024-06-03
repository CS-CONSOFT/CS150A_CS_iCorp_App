import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import ItemListHeaderProdutoPreVenda from "../../../../components/lists/ItemListHeaderProdutoPreVenda";
import { ProductPvItem } from "../../../../components/lists/ProductPvItem";
import { IProductItemModel, IProductsPvModel } from "../../../../services/api/interfaces/prevenda/IPreVenda";
import { handleGetProductsPv } from "../../../../view_controller/prevenda/PreVendaViewController";
import { data } from "./ListHeader";
import { styleProdutoPVDetalhe } from "./StylePreVendaProdutoDetalhe";

const CS_SC_PreVendaDetalheProduto = () => {
    const [productsPv, setProductsPv] = useState<IProductItemModel[]>([])

    function getProductsToCurrentPv() {
        handleGetProductsPv().then((res) => {
            const response = res as IProductsPvModel
            if (response.IsOk) {
                setProductsPv(response.List)
            }
        })
    }

    useEffect(() => {
        getProductsToCurrentPv()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 4 }}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    renderItem={({ item }) => {
                        return (
                            <ItemListHeaderProdutoPreVenda
                                title={item.title}
                                onPress={item.onPress}
                                iconName={item.iconName}
                            />
                        );
                    }}
                />
            </View>

            <Text style={styleProdutoPVDetalhe.textProduct} >PRODUTOS</Text>

            <FlatList
                data={productsPv}
                keyExtractor={(item) => item.Id!}
                renderItem={({ item }) => (
                    <ProductPvItem
                        product={item}
                        onClick={(currentProduct, done) => {
                            console.log('s');
                        }}
                    />
                )}
            />
        </SafeAreaView>
    );
}

export default CS_SC_PreVendaDetalheProduto;