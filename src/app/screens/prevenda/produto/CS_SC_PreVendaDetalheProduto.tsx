import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";
import { ProductPvItem } from "../../../components/lists/ProductPvItem";
import { IProductItemModel, IProductsPvModel } from "../../../services/api/interfaces/prevenda/IPreVenda";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleDeleteProductFromPv, handleGetProductsPv } from "../../../view_controller/prevenda/PreVendaViewController";
import CS_BottomScreenItemProdutosDetalhesPV from "./CS_BottomScreenItemProdutosDetalhesPV";
import CS_TopHeaderItensProdutosDetalhesPV from "./CS_TopHeaderItensProdutosDetalhesPV";
import { styleProdutoPVDetalhe } from "./StylePreVendaProdutoDetalhe";


const CS_SC_PreVendaDetalheProduto = ({ route }: { route: any }) => {
    const [productsPv, setProductsPv] = useState<IProductItemModel[]>([])
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { emissao, validade, totalLiquido } = route.params
    const { navigate } = useNavigation()

    useEffect(() => {
        getProductsToCurrentPv()
    }, [])

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



    function handleRefreshProducts(): void {
        getProductsToCurrentPv()
    }

    const isLoading = status === FETCH_STATUS.LOADING
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <CS_TopHeaderItensProdutosDetalhesPV />

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

                <CS_BottomScreenItemProdutosDetalhesPV
                    dataEmissao={emissao}
                    dataValidade={validade}
                    totalLiquido={totalLiquido}
                />
            </>}

        </SafeAreaView>
    );
}

export default CS_SC_PreVendaDetalheProduto;