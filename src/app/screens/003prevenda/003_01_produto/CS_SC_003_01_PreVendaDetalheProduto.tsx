import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import ColorStyle from "../../../ColorStyle";
import { commonStyle } from "../../../CommonStyle";
import CustomEmpty from "../../../components/lists/CustomEmpty";
import { IResGetPv } from "../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { formatDateToSlashPattern, formatMoneyValue } from "../../../util/FormatText";
import { ToastType, showToast } from "../../../util/ShowToast";
import { handleDeleteProductFromPv, handleGetPv, handleUpdatePercentDiscount, handleUpdateTablePrice, handleUpdateUnityPrice, handleUpdateValueDiscount } from "../../../view_controller/prevenda/PreVendaViewController";
import C_003_01_04_BottomScreenItemProdutosDetalhesPV from "./components/C_003_01_04_BottomScreenItemProdutosDetalhesPV";
import C_003_01_05_TopHeaderItensProdutosDetalhesPV from "./components/C_003_01_05_TopHeaderItensProdutosDetalhesPV";
import { C_003_01_ProductPvItem } from "./components/C_003_01_ProductPvItem";
import CustomLoading from "../../../components/loading/CustomLoading";


const CS_SC_003_01_PreVendaDetalheProduto = () => {
    const [pv, setPv] = useState<IResGetPv>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)


    useEffect(() => {
        getCurrentPv()
    }, [])


    function getCurrentPv() {
        setStatus(FETCH_STATUS.LOADING)
        //pega a pv
        handleGetPv().then((res) => {
            if (res !== undefined) {
                setPv(res)
                setStatus(FETCH_STATUS.SUCCESS)
            }
        })
    }

    function deleteProduct(productId: string) {
        handleDeleteProductFromPv(productId).then((res) => {
            if (res) {
                getCurrentPv()
            }
        })
    }

    function handleRefreshProducts(): void {
        getCurrentPv()
    }

    function updateDiscountPercent(productId: string, discountPercent: number, getProductsToCurrentPv: () => void): void {
        handleUpdatePercentDiscount({ AtendimentoProdutoId: productId, Valor: discountPercent })
            .then((res) => {
                if (res.IsOk) {
                    getProductsToCurrentPv()
                } else {
                    showToast(ToastType.ERROR, "Falha", res.Msg)
                }
            });
    }


    function updateValueDiscount(productId: string, valueDiscount: number): void {
        console.log("s" + valueDiscount);
        handleUpdateValueDiscount({ AtendimentoProdutoId: productId, Valor: valueDiscount })
            .then((res) => {
                if (res.IsOk) {
                    getCurrentPv()
                } else {
                    showToast(ToastType.ERROR, "Falha", res.Msg)
                    showToast(ToastType.ERROR, "Falha", res.Msg)
                }
            });
    }



    function updateTablePrice(productId: string, tablePrice: number): void {
        handleUpdateTablePrice({ AtendimentoProdutoId: productId, Valor: tablePrice })
            .then((res) => {
                if (res.IsOk) {
                    getCurrentPv()
                } else {
                    showToast(ToastType.ERROR, "Falha", res.Msg)
                }
            });
    }



    function updateUnityPrice(productId: string, unityPrice: number): void {
        handleUpdateUnityPrice({ AtendimentoProdutoId: productId, Valor: unityPrice })
            .then((res) => {
                if (res.IsOk) {
                    getCurrentPv()
                } else {
                    showToast(ToastType.ERROR, "Falha", res.Msg)
                }
            });
    }


    const isLoading = status === FETCH_STATUS.LOADING
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            {isLoading ? <CustomLoading /> : <>
                {pv?.DD070_Nota.csicp_dd070_Sit.Label === 'Consulta' && (
                    <ScreenWhenIsConsulta
                        pv={pv}
                        isLoading={isLoading}
                        handleRefreshProducts={handleRefreshProducts}
                        deleteProduct={deleteProduct}
                        updateDiscountPercent={(productId, discountPercent) => updateDiscountPercent(productId, discountPercent, getCurrentPv)}
                        updateValueDiscount={updateValueDiscount}
                        updateUnityPrice={updateUnityPrice}
                        updateTablePrice={updateTablePrice}
                    />
                )}


                {pv?.DD070_Nota.csicp_dd070_Sit.Label !== 'Consulta' && (
                    <ScreenWhenIsNotConsulta
                        pv={pv}
                        isLoading={isLoading}
                        handleRefreshProducts={handleRefreshProducts}
                    />
                )}
            </>}

        </SafeAreaView>
    );
}

const ScreenWhenIsConsulta = ({ pv, isLoading, handleRefreshProducts, deleteProduct, updateDiscountPercent, updateUnityPrice, updateValueDiscount, updateTablePrice }: {
    pv?: IResGetPv,
    isLoading: boolean,
    handleRefreshProducts: () => void,
    deleteProduct: (productId: string) => void,
    updateDiscountPercent: (productId: string, discountPercent: number) => void,
    updateValueDiscount: (productId: string, valueDiscount: number) => void,
    updateUnityPrice: (productId: string, unityPrice: number) => void,
    updateTablePrice: (productId: string, tablePrice: number) => void,
}) => {
    return (
        <>
            <FlatList
                data={pv?.DD080_Produtos}
                keyExtractor={(item) => item.csicp_dd080.DD080_Id}
                refreshing={isLoading}
                onRefresh={handleRefreshProducts}
                ListEmptyComponent={<CustomEmpty text="Essa PV não tem produtos!" />}
                ListHeaderComponent={<C_003_01_05_TopHeaderItensProdutosDetalhesPV descontoValor={pv?.DD070_Nota.csicp_dd070.DD070_Desconto} isConsulta={true} />}
                renderItem={({ item }) => (
                    <C_003_01_ProductPvItem
                        isConsulta={true}
                        product={item}
                        onDeleteProductClick={(productId) => { deleteProduct(productId) }}
                        saveDiscountPercent={(discountPercent, productId) => updateDiscountPercent(productId, discountPercent)}
                        saveDiscountValue={(valueDiscount, productId) => updateValueDiscount(productId, valueDiscount)}
                        saveTablePrice={(tablePrice, productId) => updateTablePrice(productId, tablePrice)}
                        saveUnityPrice={(unityPrice, productId) => updateUnityPrice(productId, unityPrice)}
                    />
                )}
            />

            <C_003_01_04_BottomScreenItemProdutosDetalhesPV
                dataEmissao={formatDateToSlashPattern(pv?.DD070_Nota.csicp_dd070.DD070_Data_Emissao || '1999-01-01')}
                dataValidade={formatDateToSlashPattern(pv?.DD070_Nota.csicp_dd070.DD070_DataValidade || '1999-01-01')}
                totalLiquido={formatMoneyValue(pv?.DD070_Nota.csicp_dd070.DD070_Total_Liquido || 0)}
                isConsulta={true}
            />
        </>
    )
}

const ScreenWhenIsNotConsulta = ({ pv, isLoading, handleRefreshProducts }: {
    pv?: IResGetPv,
    isLoading: boolean,
    handleRefreshProducts: () => void
}) => {
    return (
        <>
            <FlatList
                data={pv?.DD080_Produtos}
                keyExtractor={(item) => item.csicp_dd080.DD080_Id}
                refreshing={isLoading}
                onRefresh={handleRefreshProducts}
                ListEmptyComponent={<CustomEmpty text="Essa PV não tem produtos!" />}
                ListHeaderComponent={C_003_01_05_TopHeaderItensProdutosDetalhesPV}
                renderItem={({ item }) => (
                    <C_003_01_ProductPvItem
                        product={item}
                        onDeleteProductClick={() => { }}
                        saveDiscountPercent={() => { }}
                        saveDiscountValue={() => { }}
                        saveTablePrice={() => { }}
                        saveUnityPrice={() => { }}
                    />
                )}
            />


            <C_003_01_04_BottomScreenItemProdutosDetalhesPV
                dataEmissao={formatDateToSlashPattern(pv?.DD070_Nota.csicp_dd070.DD070_Data_Emissao || '1999-01-01')}
                dataValidade={formatDateToSlashPattern(pv?.DD070_Nota.csicp_dd070.DD070_DataValidade || '1999-01-01')}
                totalLiquido={formatMoneyValue(pv?.DD070_Nota.csicp_dd070.DD070_Total_Liquido || 0)}
            />
        </>
    )
}

export default CS_SC_003_01_PreVendaDetalheProduto;

