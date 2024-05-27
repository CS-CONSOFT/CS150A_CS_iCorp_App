import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../../components/button/CustomButton";
import CustomSearch from "../../../components/input/CustomSearch";
import Custom_Pagination from "../../../components/pagination/Custom_Pagination";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { logWithTimestamp } from "../../../util/Logger";
import { searchProductVc } from "../../../view_controller/produto/ProductViewController";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";

const CS_SC_ConsultaProdutos = () => {
    logWithTimestamp("renderizou")
    const [filterValues, setFilterValues] = useState<IGetProductSearch>({
        cs_page: 1,
        cs_codigo_produto: '',
        cs_descricao_artigo: "",
        cs_referencia: "sadfasdf",
        cs_complemento: "asd",
        cs_descricao_marca: "",
        cs_descricao_grupo: "",
        cs_descricao_classe: "",
        cs_descricao_sub_grupo: "",
        cs_descricao_reduzida: "",
        cs_is_com_saldo: false,
    });
    const [productList, setProductList] = useState<IResProductSearch[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [paginationArray, setPaginationArray] = useState<number[]>([])
    const [errorMsg, setErrorMsg] = useState();



    /**
     * Essa função é chamada no formulário de filtros, no qual cada input é atribuído a 
     * um valor da interface ISearchProduto.
     * 
     * Ou seja, o 'code' passando na key é atribuído ao 'code' da interface ISearchProduto.
     * 
     * @param key chave da interface
     * @param newValue valor que será setado no lugar do valor da chave informada.
     */
    function changeValueToSearch(key: keyof IGetProductSearch, newValue: any) {
        setFilterValues((prevState) => ({ ...prevState!, [key]: newValue }))
    }

    /**
     * Nova pesquisa
     */
    function resetValuesToSearch() {
        setStatus(FETCH_STATUS.IDLE)
    }


    /** Pesquisar Produtos */
    async function search(page: number) {
        //seta a página atual que desejamos mostrar na lista ex. 1,2, 3...
        changeValueToSearch('cs_page', page)

        setStatus(FETCH_STATUS.LOADING)

        searchProductVc(filterValues).then((res) => {
            if (res.isOk) {
                setProductList(res.productResponse?.List)
                setPaginationArray(res.pagesArray)
                setStatus(FETCH_STATUS.SUCCESS)
            } else {
                // @ts-ignore
                setErrorMsg(res.error)
                setStatus(FETCH_STATUS.ERROR)
            }
        })
    }



    const isSuccess = status == FETCH_STATUS.SUCCESS
    const isNewSearch = status == FETCH_STATUS.IDLE
    const isLoading = status == FETCH_STATUS.LOADING
    const isError = status == FETCH_STATUS.ERROR


    /** CARREGANDO */
    if (isLoading) {
        return <ActivityIndicator />
    }

    //Tela
    return (
        <SafeAreaView style={stylesConsultaProduto.container}>
            <>
                {isNewSearch && (
                    <ScrollView>
                        <View style={stylesConsultaProduto.searchContainer}>
                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_codigo_produto', newValue)}
                                    value={filterValues.cs_codigo_produto.toString()}
                                    placeholder="Código"
                                    keyboardType="numeric"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_artigo', newValue)}
                                    value={filterValues.cs_descricao_artigo}
                                    placeholder="Artigo"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_marca', newValue)}
                                    value={filterValues.cs_descricao_marca}
                                    placeholder="Marca"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_referencia', newValue)}
                                    value={filterValues.cs_referencia}
                                    placeholder="Referência"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_complemento', newValue)}
                                    value={filterValues.cs_complemento}
                                    placeholder="Complemento"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_classe', newValue)}
                                    value={filterValues.cs_descricao_classe}
                                    placeholder="Classe"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_grupo', newValue)}
                                    value={filterValues.cs_descricao_grupo}
                                    placeholder="Grupo"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_reduzida', newValue)}
                                    value={filterValues.cs_descricao_reduzida}
                                    placeholder="Descrição Produto"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.IconSearch iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_sub_grupo', newValue)}
                                    value={filterValues.cs_descricao_sub_grupo}
                                    placeholder="Descrição Subgrupo"
                                />
                            </CustomSearch>


                            <CustomButton
                                title="Pesquisar"
                                onPress={() => search(1)}
                                buttonStyle={stylesConsultaProduto.searchButton}
                                textStyle={stylesConsultaProduto.searchButtonText}
                            />

                        </View>
                    </ScrollView>
                )
                }

                {isSuccess && productList!.length > 0 && (
                    <View>
                        <FlatList
                            data={productList}
                            keyExtractor={(item) => item.Id!}
                            ListHeaderComponent={() => <CustomButton title="Nova Pesquisa" onPress={resetValuesToSearch} buttonStyle={stylesConsultaProduto.btnNewSearch} textStyle={stylesConsultaProduto.searchButtonText} />}
                            ListFooterComponent={() => <Custom_Pagination currentClickedItem={filterValues.cs_page!} paginationArray={paginationArray} onItemClick={(page) => search(page)} />}
                            /*onEndReached={}*/
                            renderItem={({ item }) => <ProductItem product={item} />}
                        />
                    </View>
                )}

                {isError && (
                    <View>
                        <CustomButton title="Nova Pesquisa" onPress={resetValuesToSearch} buttonStyle={stylesConsultaProduto.btnNewSearch} textStyle={stylesConsultaProduto.searchButtonText} />
                        <Text>{errorMsg}</Text>
                    </View>
                )}

                {isSuccess && (!productList || productList.length === 0) && (
                    <Text>Nenhum produto encontrado.</Text>
                )}
            </>
        </SafeAreaView>
    );
}


//Item de produto que aparece na listagem
const ProductItem = ({ product }: { product: IResProductSearch }) => {
    return (
        <View style={stylesConsultaProduto.productContainer}>
            <Image source={{ uri: product.Imagens?.find(img => img.IsPadrao)?.URL_Path }} />
            <Text style={stylesConsultaProduto.productName}>{product.DescMarca}</Text>
            <Text style={stylesConsultaProduto.productInfo}>{`R$: ${product.DescGrupo}`}</Text>
            <Text style={stylesConsultaProduto.productInfo}>{`R$: ${product.Saldo}`}</Text>
            <Text style={stylesConsultaProduto.productInfo}>{`Qtd: ${product.Preco}`}</Text>
        </View>
    );
};




export default CS_SC_ConsultaProdutos;
