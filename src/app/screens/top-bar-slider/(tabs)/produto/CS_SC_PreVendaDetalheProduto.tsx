import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, View } from "react-native";
import ItemListHeaderProdutoPreVenda from "../../../../components/lists/ItemListHeaderProdutoPreVenda";
import { ProductPvItem } from "../../../../components/lists/ProductPvItem";
import { IProductItemModel, IProductsPvModel } from "../../../../services/api/interfaces/prevenda/IPreVenda";
import { FETCH_STATUS } from "../../../../util/FETCH_STATUS";
import { ICON_NAME } from "../../../../util/IconsName";
import { handleDeleteProductFromPv, handleGetProductsPv } from "../../../../view_controller/prevenda/PreVendaViewController";
import { styleProdutoPVDetalhe } from "./StylePreVendaProdutoDetalhe";

const CS_SC_PreVendaDetalheProduto = () => {
    const [productsPv, setProductsPv] = useState<IProductItemModel[]>([])
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { navigate } = useNavigation()

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
                    title={"Descontos"}
                    onPress={() => Alert.alert("Falta fazer")}
                    iconName={ICON_NAME.PAPEL_LISTA_CONTORNADO}
                />
                <ItemListHeaderProdutoPreVenda
                    title={"Código"}
                    onPress={() => Alert.alert("Falta fazer")}
                    iconName={ICON_NAME.ADICIONAR_CONTORNADO}
                />
                <ItemListHeaderProdutoPreVenda
                    title={"Requisição"}
                    onPress={() => Alert.alert("Falta fazer")}
                    iconName={ICON_NAME.CAIXA_ARQUIVO_CONTORNADO}
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