import React, { lazy, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Custom_Pagination from "../../../components/pagination/Custom_Pagination";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleSearchProduct } from "../../../view_controller/produto/ProductViewController";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";
import CS_ConsultaProdutoForm from "./CS_ConsultaProdutoForm";
const CustomButton = lazy(() => import("../../../components/button/CustomButton"))

const CS_SC_ConsultaProdutos = () => {
    const [productList, setProductList] = useState<IResProductSearch[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [paginationArray, setPaginationArray] = useState<number[]>([])
    const [errorMsg, setErrorMsg] = useState();
    const [productAtributtesToSearch, setProductAtributtesToSearch] = useState<IGetProductSearch>()


    /**
     * Essa função é chamada no formulário de filtros, no qual cada input é atribuído a 
     * um valor da interface ISearchProduto.
     * 
     * Ou seja, o 'code' passando na key é atribuído ao 'code' da interface ISearchProduto.
     * 
     * @param key chave da interface
     * @param newValue valor que será setado no lugar do valor da chave informada.
     */
    /*
    function changeValueToSearch(key: keyof IGetProductSearch, newValue: any) {
        setFilterValues((prevState) => ({ ...prevState!, [key]: newValue }))
    }
    */

    /**
     * Nova pesquisa
     */
    function resetValuesToSearch() {
        setStatus(FETCH_STATUS.IDLE)
        setPaginationArray([])
    }



    const isSuccess = status == FETCH_STATUS.SUCCESS
    const isNewSearch = status == FETCH_STATUS.IDLE
    const isLoading = status == FETCH_STATUS.LOADING
    const isLoadingPagination = status == FETCH_STATUS.LOADING_PAGINATION
    const isError = status == FETCH_STATUS.ERROR


    /** CARREGANDO */
    if (isLoading) {
        return <ActivityIndicator />
    }

    const handleFormSubmit = (formData?: any, page?: number, cameFromPagination?: boolean) => {
        /** caso a chamada seja feita por paginação, mudar o tipo de loading para manter a paginação mostrando em tela
         * enquanto o usuário estiver vendo uma lista de produto baseado nos filtros dele.
         */
        cameFromPagination ? setStatus(FETCH_STATUS.LOADING_PAGINATION) : setStatus(FETCH_STATUS.LOADING)


        /** Foi criada a variavel _filterValues para fazermos a busca, porem
         * para mostrar a lista precisamos de um objeto filterValues 
         * que tenha controle de estado a nivel da tela. Por iss foi implementado o useState que
         * guarda o _filterValues, para que possamos usar o filterValues na flat list.
        */

        /**
         * Os valores de formData seguem a estrutura de titles que formam o formFields
         * Ex: Dominio: 'Comercial'; Usuario: 'Valter'; Senha:'xpto'
         * A chave das propriedades é o que será usado em 'key' -> formData.[key]
         * 
         */
        const _filterValues: IGetProductSearch = {
            cs_page: page || 1,
            cs_codigo_produto: formData.Código || '',
            cs_descricao_artigo: formData.Artigo || '',
            cs_referencia: formData.Referência || '',
            cs_complemento: formData.Complemento || '',
            cs_descricao_marca: formData.Marca || '',
            cs_descricao_grupo: formData.Grupo || '',
            cs_descricao_classe: formData.Classe || '',
            cs_descricao_sub_grupo: formData.DescriçãoSubgrupo || '',
            cs_descricao_reduzida: formData.DescriçãoProduto || '',
            cs_is_com_saldo: false,
        }
        setProductAtributtesToSearch(_filterValues)
        handleSearchProduct(_filterValues!).then((res) => {
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
    };

    //Tela
    return (
        <SafeAreaView style={stylesConsultaProduto.container}>
            <>
                {isNewSearch && (
                    <ScrollView>
                        <CS_ConsultaProdutoForm onSearchPress={handleFormSubmit} />
                    </ScrollView>
                )
                }

                {isSuccess && productList!.length > 0 && (
                    <View>
                        {!isLoadingPagination && (
                            <FlatList
                                data={productList}
                                keyExtractor={(item) => item.Id!}
                                ListHeaderComponent={() => <CustomButton title="Nova Pesquisa"
                                    onPress={resetValuesToSearch}
                                    buttonStyle={stylesConsultaProduto.btnNewSearch}
                                    textStyle={stylesConsultaProduto.searchButtonText} />}
                                /*onEndReached={ }*/
                                renderItem={({ item }) => <ProductItem product={item} />}
                            />
                        )}
                    </View>
                )}


                <Custom_Pagination
                    onPagePress={(page, cameFromPagination) => handleFormSubmit(productAtributtesToSearch, page, cameFromPagination)}
                    paginationArray={paginationArray} />


                {isError && (
                    <View>
                        <CustomButton title="Nova Pesquisa"
                            onPress={resetValuesToSearch}
                            buttonStyle={stylesConsultaProduto.btnNewSearch}
                            textStyle={stylesConsultaProduto.searchButtonText} />
                        <Text>{errorMsg}</Text>
                    </View>
                )}

                {isSuccess && (!productList || productList.length === 0) && (
                    <View>
                        <CustomButton title="Nova Pesquisa"
                            onPress={resetValuesToSearch}
                            buttonStyle={stylesConsultaProduto.btnNewSearch}
                            textStyle={stylesConsultaProduto.searchButtonText} />
                        <Text>Nenhum produto encontrado.</Text>
                    </View>

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
            <CustomButton
                title="Adicionar Produto"
                onPress={() => {

                }}
                buttonStyle={stylesConsultaProduto.btnNewSearch}
                textStyle={stylesConsultaProduto.searchButtonText}

            />
        </View>
    );
};




export default CS_SC_ConsultaProdutos;
