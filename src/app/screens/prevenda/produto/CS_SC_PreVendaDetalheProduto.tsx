import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { IProductItemModel, IProductsPvModel } from "../../../services/api/interfaces/prevenda/IPreVenda";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleDeleteProductFromPv, handleGetProductsPv, handleUpdatePercentDiscount, handleUpdateProductItes, handleUpdateTablePrice, handleUpdateUnityPrice, handleUpdateValueDiscount } from "../../../view_controller/prevenda/PreVendaViewController";
import CS_BottomScreenItemProdutosDetalhesPV from "./components/CS_BottomScreenItemProdutosDetalhesPV";
import { ProductPvItem } from "./components/CS_ProductPvItem";
import CS_TopHeaderItensProdutosDetalhesPV from "./components/CS_TopHeaderItensProdutosDetalhesPV";
import { IScreenUpdateProductItens } from "../../../services/api/interfaces/produto/IProduct";


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

    function updateProductItens(productUpdateItens: IScreenUpdateProductItens, product: IProductItemModel, changedFields: string[]): void {
        setStatus(FETCH_STATUS.LOADING)
        handleUpdateProductItes(productUpdateItens, product, changedFields).then(() => {
            getProductsToCurrentPv()
        })
    }



    const isLoading = status === FETCH_STATUS.LOADING
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            {isLoading ? <ActivityIndicator /> : <>
                <FlatList
                    data={productsPv}
                    keyExtractor={(item) => item.Id!}
                    refreshing={isLoading}
                    onRefresh={handleRefreshProducts}
                    ListHeaderComponent={CS_TopHeaderItensProdutosDetalhesPV}
                    renderItem={({ item }) => (
                        <ProductPvItem
                            product={item}
                            onProductClick={(product) => {

                            }}
                            onDeleteProductClick={(productId) => { deleteProduct(productId) }}
                            saveDiscountPercent={(discountPercent, productId) => handleUpdatePercentDiscount({ AtendimentoProdutoId: productId, Valor: discountPercent }).then(() => getProductsToCurrentPv())}
                            saveDiscountValue={(valueDiscount, productId) => handleUpdateValueDiscount({ AtendimentoProdutoId: productId, Valor: valueDiscount }).then(() => getProductsToCurrentPv())}
                            saveTablePrice={(tablePrice, productId) => handleUpdateTablePrice({ AtendimentoProdutoId: productId, Valor: tablePrice }).then(() => getProductsToCurrentPv())}
                            saveUnityPrice={(unityPrice, productId) => handleUpdateUnityPrice({ AtendimentoProdutoId: productId, Valor: unityPrice }).then(() => getProductsToCurrentPv())}
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