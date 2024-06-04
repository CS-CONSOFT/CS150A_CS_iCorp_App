import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from "react-native";
import ItemListHeaderProdutoPreVenda from "../../../../components/lists/ItemListHeaderProdutoPreVenda";
import { ProductPvItem } from "../../../../components/lists/ProductPvItem";
import { IProductItemModel, IProductsPvModel } from "../../../../services/api/interfaces/prevenda/IPreVenda";
import { handleDeleteProductFromPv, handleGetProductsPv } from "../../../../view_controller/prevenda/PreVendaViewController";
import { data } from "./ListHeader";
import { styleProdutoPVDetalhe } from "./StylePreVendaProdutoDetalhe";
import { FETCH_STATUS } from "../../../../util/FETCH_STATUS";

const CS_SC_PreVendaDetalheProduto = () => {
    const [productsPv, setProductsPv] = useState<IProductItemModel[]>([])
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    function getProductsToCurrentPv() {
        setStatus(FETCH_STATUS.LOADING)
        handleGetProductsPv().then((res) => {
            setStatus(FETCH_STATUS.SUCCESS)
            const response = res as IProductsPvModel
            if (response.IsOk) {
                setProductsPv(response.List)
            }
        })
    }

    function deleteProduct(productId: string) {
        handleDeleteProductFromPv(productId).then((res) => {
            if (res) {
                getProductsToCurrentPv()
            }
        })
    }

    useEffect(() => {
        getProductsToCurrentPv()
    }, [])

    function handleRefreshProducts(): void {
        getProductsToCurrentPv()
    }

    const isLoading = status === FETCH_STATUS.LOADING
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={styleProdutoPVDetalhe.topHeaderStyle}>
                <ItemListHeaderProdutoPreVenda
                    title={data.at(0)?.title!}
                    onPress={data.at(0)?.onPress}
                    iconName={data.at(0)?.iconName!}
                />
                <ItemListHeaderProdutoPreVenda
                    title={data.at(1)?.title!}
                    onPress={data.at(1)?.onPress}
                    iconName={data.at(1)?.iconName!}
                />
                <ItemListHeaderProdutoPreVenda
                    title={data.at(2)?.title!}
                    onPress={data.at(2)?.onPress}
                    iconName={data.at(2)?.iconName!}
                />
            </View>



            {isLoading ? <ActivityIndicator /> : <>
                <Text style={styleProdutoPVDetalhe.textProduct}>PRODUTOS</Text>
                <FlatList
                    data={productsPv}
                    keyExtractor={(item) => item.Id!}
                    refreshing={isLoading}
                    onRefresh={handleRefreshProducts}
                    renderItem={({ item }) => (
                        <ProductPvItem
                            product={item}
                            onProductClick={(product) => {
                                console.log(product);
                            }}
                            onDeleteProductClick={(productId) => { deleteProduct(productId) }}
                        />
                    )}
                />
            </>}

        </SafeAreaView>
    );
}

export default CS_SC_PreVendaDetalheProduto;