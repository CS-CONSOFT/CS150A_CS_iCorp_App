import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../../components/button/CustomButton";
import CustomSearch from "../../../components/input/CustomSearch";
import { searchProductVc } from "../../../view_controller/produto/ProductViewController";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";
import { ISearchProduto } from "./ISearchProduto";
import Custom_Pagination from "../../../components/pagination/Custom_Pagination";

const CS_SC_ConsultaProdutos = () => {
    const [filterValues, setFilterValues] = useState<IGetProductSearch>({
        cs_page: 1,
        cs_codigo_produto: "",
        cs_descricao_artigo: "",
        cs_referencia: "",
        cs_complemento: "",
        cs_descricao_marca: "",
        cs_descricao_grupo: "",
        cs_descricao_classe: "",
        cs_descricao_sub_grupo: "",
        cs_descricao_reduzida: "",
        cs_is_com_saldo: false,
    });
    const [productList, setProductList] = useState<IResProductSearch[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [isNewSearch, setIsNewSearch] = useState(true)
    const [paginationArray, setPaginationArray] = useState<number[]>([])



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
        setIsDataFetched(false)
        setIsNewSearch(true)
        setIsLoading(false)
    }


    /** Pesquisar Produtos */
    async function search(page: number) {
        //seta a página atual que desejamos mostrar na lista ex. 1,2, 3...
        changeValueToSearch('cs_page', page)

        setIsLoading(true)

        searchProductVc(filterValues).then((res) => {
            if (res.productResponse.cs_is_ok) {
                setProductList(res.productResponse.List)
                setPaginationArray(res.pagesArray)

                setIsLoading(false)
                setIsDataFetched(true)
            }
        })
    }



    //Tela
    return (
        <SafeAreaView style={stylesConsultaProduto.container}>
            <>
                {!isDataFetched && isNewSearch && (
                    <ScrollView>
                        <View style={stylesConsultaProduto.searchContainer}>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_codigo_produto', newValue)}
                                    value={filterValues.cs_codigo_produto}
                                    placeholder="Código"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_artigo', newValue)}
                                    value={filterValues.cs_descricao_artigo}
                                    placeholder="Artigo"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_marca', newValue)}
                                    value={filterValues.cs_descricao_marca}
                                    placeholder="Marca"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_referencia', newValue)}
                                    value={filterValues.cs_referencia}
                                    placeholder="Referência"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_complemento', newValue)}
                                    value={filterValues.cs_complemento}
                                    placeholder="Complemento"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_classe', newValue)}
                                    value={filterValues.cs_descricao_classe}
                                    placeholder="Classe"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_grupo', newValue)}
                                    value={filterValues.cs_descricao_grupo}
                                    placeholder="Grupo"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
                                <CustomSearch.Input
                                    setValue={(newValue: string) => changeValueToSearch('cs_descricao_reduzida', newValue)}
                                    value={filterValues.cs_descricao_reduzida}
                                    placeholder="Descrição Produto"
                                />
                            </CustomSearch>

                            <CustomSearch>
                                <CustomSearch.Icon iconName="" />
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
                            {isLoading ? <ActivityIndicator /> : <></>}
                        </View>
                    </ScrollView>
                )
                }

                {isDataFetched && productList!.length > 0 && (
                    <View>
                        {isLoading ? <ActivityIndicator /> :
                            <FlatList
                                data={productList}
                                keyExtractor={(item) => item.Id!}
                                ListHeaderComponent={() => <CustomButton title="Nova Pesquisa" onPress={resetValuesToSearch} buttonStyle={stylesConsultaProduto.btnNewSearch} textStyle={stylesConsultaProduto.searchButtonText} />}
                                ListFooterComponent={() => <Custom_Pagination currentClickedItem={filterValues.cs_page!} paginationArray={paginationArray} onItemClick={search} />}
                                /*onEndReached={} change*/
                                renderItem={({ item }) => <ProductItem product={item} />}
                            />
                        }
                    </View>
                )}

                {isDataFetched && (!productList || productList.length === 0) && (
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
