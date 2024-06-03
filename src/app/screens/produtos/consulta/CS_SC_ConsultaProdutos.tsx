import React, { lazy, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, ToastAndroid, View } from "react-native";
import Custom_Pagination from "../../../components/pagination/Custom_Pagination";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleSearchProduct } from "../../../view_controller/produto/ProductViewController";
import { handleInsertProductPv } from "../../../view_controller/prevenda/PreVendaViewController";
import CS_ConsultaProdutoForm from "./CS_ConsultaProdutoForm";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";
import { ProductItem } from "../../../components/lists/ProductItem";

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

    function showToast(msg: string) {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }

    function scInsertProductPv(product: IResProductSearch, done: () => void) {
        handleInsertProductPv(
            product.CodgProduto!.toString(),
            '7463cf92-3601-4a06-b696-0f3b314294e5',
            false,
            1,
            1).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                showToast(res.Msg)
                done();
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

    const handleFormSubmitToSearch = (formData?: any, page?: number) => {
        /** caso a chamada seja feita por paginação, mudar o tipo de loading para manter a paginação mostrando em tela
         * enquanto o usuário estiver vendo uma lista de produto baseado nos filtros dele.
         */

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
                        <CS_ConsultaProdutoForm onSearchPress={handleFormSubmitToSearch} />
                    </ScrollView>
                )
                }


                {isSuccess && (
                    <View>
                        <CustomButton
                            title="Nova Pesquisa"
                            onPress={resetValuesToSearch}
                            buttonStyle={stylesConsultaProduto.btnNewSearch}
                            textStyle={stylesConsultaProduto.searchButtonText}
                        />
                        {!productList || productList.length === 0 ? (
                            <Text>Nenhum produto encontrado.</Text>
                        ) : (
                            <View style={{ height: '85%' }}>
                                <FlatList
                                    data={productList}
                                    keyExtractor={(item) => item.Id!}
                                    renderItem={({ item }) => (
                                        <ProductItem
                                            product={item}
                                            onClick={(currentProduct, done) => {
                                                scInsertProductPv(currentProduct, done);
                                            }}
                                        />
                                    )}
                                />
                            </View>
                        )}
                    </View>
                )}

                {isError && (
                    <View>
                        <CustomButton title="Nova Pesquisa"
                            onPress={resetValuesToSearch}
                            buttonStyle={stylesConsultaProduto.btnNewSearch}
                            textStyle={stylesConsultaProduto.searchButtonText} />
                        <Text>{errorMsg}</Text>
                    </View>
                )}

                <Custom_Pagination
                    onPagePress={(page) => handleFormSubmitToSearch(productAtributtesToSearch, page)}
                    paginationArray={paginationArray} />

            </>
        </SafeAreaView>
    );
}






export default CS_SC_ConsultaProdutos;
