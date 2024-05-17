import React, { useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../components/button/CustomButton";
import CustomSearch from "../../../components/input/CustomSearch";
import { getUserProperties } from "../../../view_controller/SharedViewController";
import { searchProductVc } from "../../../view_controller/produto/ProductViewController";
import { ISearchProduto } from "./ISearchProduto";

const CS_SC_ConsultaProdutos = () => {
    const [filterValues, setFilterValues] = useState<ISearchProduto>({
        code: "",
        article: "",
        ref: "",
        brand: "",
        hasPromotion: false,
        hasBalance: false,
    });

    const [productList, setProductList] = useState<IResProductSearch[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [isDataFetched, setIsDataFetched] = useState(false)

    function changeValueToSearch(key: keyof ISearchProduto, newValue: any) {
        setFilterValues((prevState) => ({ ...prevState!, [key]: newValue }))
    }

    function resetValuesToSearch() {
        setIsDataFetched(false)
    }

    async function search() {
        setIsLoading(true)
        setIsDataFetched(false)

        const tenant = (await getUserProperties()).tenantId;
        const estabId = (await getUserProperties()).estabId;

        const productSearch: IGetProductSearch = {
            cs_tenant_id: tenant!,
            cs_estab_id: estabId,
            cs_codigo_produto: filterValues.code,
            cs_codigo_marca: filterValues.brand,
            cs_codigo_artigo: filterValues.article,
            cs_codigo_referencia: filterValues.ref,
            cs_is_saldo: true,
            cs_is_promotion: false
        }

        searchProductVc(productSearch).then((res) => {
            setProductList(res.products)
            setIsLoading(false)
            setIsDataFetched(true)
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <>
                {!isDataFetched && (
                    <View style={styles.searchContainer}>
                        <CustomSearch
                            iconName=""
                            setValue={(newValue: string) => changeValueToSearch('code', newValue)}
                            value={filterValues!.code}
                            placeholder="Código"
                        />

                        <CustomSearch
                            iconName=""
                            setValue={(newValue: string) => changeValueToSearch('article', newValue)}
                            value={filterValues!.article}
                            placeholder="Artigo"
                        />

                        <CustomSearch
                            iconName=""
                            setValue={(newValue: string) => changeValueToSearch('brand', newValue)}
                            value={filterValues!.brand}
                            placeholder="Marca"
                        />

                        <CustomSearch
                            iconName=""
                            setValue={(newValue: string) => changeValueToSearch('ref', newValue)}
                            value={filterValues!.ref}
                            placeholder="Referência"
                        />

                        <CustomButton
                            title="Pesquisar"
                            onPress={search}
                            buttonStyle={styles.searchButton}
                            textStyle={styles.searchButtonText}
                        />

                        {isLoading ? <ActivityIndicator /> : <></>}





                    </View>
                )
                }

                {isDataFetched && productList && productList.length > 0 && (

                    <View>
                        <CustomButton
                            title="Nova Pesquisa"
                            onPress={resetValuesToSearch}
                            buttonStyle={styles.btnNewSearch}
                            textStyle={styles.searchButtonText}
                        />

                        <FlatList
                            data={productList}
                            keyExtractor={(item) => item.Id!}
                            renderItem={({ item }) => <ProductItem product={item} />}
                        />
                    </View>
                )}

                {isDataFetched && (!productList || productList.length === 0) && (
                    <Text>Nenhum produto encontrado.</Text>
                )}
            </>
        </SafeAreaView>
    );
}

const ProductItem = ({ product }: { product: IResProductSearch }) => {
    return (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{product.GG003_DescGrupo}</Text>
            <Text style={styles.productInfo}>{`R$: ${product.GG008_Prc_VendaVarejo}`}</Text>
            <Text style={styles.productInfo}>{`R$: ${product.GG520_SaldoSum}`}</Text>
            <Text style={styles.productInfo}>{`Qtd: ${product.Qtd_Sec}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
    },
    searchButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnNewSearch: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin:16
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    productInfo: {
        fontSize: 16,
        color: '#666',
        marginBottom: 3,
    },
});

export default CS_SC_ConsultaProdutos;
