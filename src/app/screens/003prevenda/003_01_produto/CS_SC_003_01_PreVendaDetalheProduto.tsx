import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, SafeAreaView } from "react-native";
import { IProductItemModel, IProductsPvModel } from "../../../services/api/interfaces/prevenda/IPreVenda";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleDeleteProductFromPv, handleGetProductsPv, handleUpdatePercentDiscount, handleUpdateTablePrice, handleUpdateUnityPrice, handleUpdateValueDiscount } from "../../../view_controller/prevenda/PreVendaViewController";
import C_003_01_BottomScreenItemProdutosDetalhesPV from "./components/C_003_01_BottomScreenItemProdutosDetalhesPV";
import { C_003_01_ProductPvItem } from "./components/C_003_01_ProductPvItem";
import C_003_01_TopHeaderItensProdutosDetalhesPV from "./components/C_003_01_TopHeaderItensProdutosDetalhesPV";


const CS_SC_003_01_PreVendaDetalheProduto = ({ route }: { route: any }) => {
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

    function updateDiscountPercent(productId: string, discountPercent: number, getProductsToCurrentPv: () => void): void {
        handleUpdatePercentDiscount({ AtendimentoProdutoId: productId, Valor: discountPercent })
            .then((res) => {
                if (res.IsOk) {
                    getProductsToCurrentPv()
                } else {
                    Alert.alert(res.Msg)
                }
            });
    }


    function updateValueDiscount(productId: string, valueDiscount: number): void {
        handleUpdateValueDiscount({ AtendimentoProdutoId: productId, Valor: valueDiscount })
            .then((res) => {
                if (res.IsOk) {
                    getProductsToCurrentPv()
                } else {
                    Alert.alert(res.Msg)
                }
            });
    }



    function updateTablePrice(productId: string, tablePrice: number): void {
        handleUpdateTablePrice({ AtendimentoProdutoId: productId, Valor: tablePrice })
            .then((res) => {
                if (res.IsOk) {
                    getProductsToCurrentPv()
                } else {
                    Alert.alert(res.Msg)
                }
            });
    }



    function updateUnityPrice(productId: string, unityPrice: number): void {
        handleUpdateUnityPrice({ AtendimentoProdutoId: productId, Valor: unityPrice })
            .then((res) => {
                if (res.IsOk) {
                    getProductsToCurrentPv()
                } else {
                    Alert.alert(res.Msg)
                }
            });
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
                    ListHeaderComponent={C_003_01_TopHeaderItensProdutosDetalhesPV}
                    renderItem={({ item }) => (
                        <C_003_01_ProductPvItem
                            product={item}
                            onDeleteProductClick={(productId) => { deleteProduct(productId) }}
                            saveDiscountPercent={(discountPercent, productId) => updateDiscountPercent(productId, discountPercent, getProductsToCurrentPv)}
                            saveDiscountValue={(valueDiscount, productId) => updateValueDiscount(productId, valueDiscount)}
                            saveTablePrice={(tablePrice, productId) => updateTablePrice(productId, tablePrice)}
                            saveUnityPrice={(unityPrice, productId) => updateUnityPrice(productId, unityPrice)}
                        />
                    )}
                />

                <C_003_01_BottomScreenItemProdutosDetalhesPV
                    dataEmissao={emissao}
                    dataValidade={validade}
                    totalLiquido={totalLiquido}
                />
            </>}

        </SafeAreaView>
    );

}

export default CS_SC_003_01_PreVendaDetalheProduto;

