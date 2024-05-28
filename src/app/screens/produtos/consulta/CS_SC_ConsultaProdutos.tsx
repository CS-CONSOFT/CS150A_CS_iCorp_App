import React, { lazy, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomForm from "../../../components/forms/CustomForm";
import Custom_Pagination from "../../../components/pagination/Custom_Pagination";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleSearchProduct } from "../../../view_controller/produto/ProductViewController";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";
import { formFields } from "./FormListItens";
const CustomButton = lazy(() => import("../../../components/button/CustomButton"))

const CS_SC_ConsultaProdutos = () => {
    const [productList, setProductList] = useState<IResProductSearch[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [paginationArray, setPaginationArray] = useState<number[]>([])
    const [errorMsg, setErrorMsg] = useState();
    const [filterValues, setFilterValues] = useState<IGetProductSearch>()


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
    }



    const isSuccess = status == FETCH_STATUS.SUCCESS
    const isNewSearch = status == FETCH_STATUS.IDLE
    const isLoading = status == FETCH_STATUS.LOADING
    const isError = status == FETCH_STATUS.ERROR


    /** CARREGANDO */
    if (isLoading) {
        return <ActivityIndicator />
    }

    const handleFormSubmit = (formData?: any, page?: number) => {
        setStatus(FETCH_STATUS.LOADING)

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
            cs_codigo_produto: formData.Código,
            cs_descricao_artigo: formData.Artigo,
            cs_referencia: formData.Referência,
            cs_complemento: formData.Complemento,
            cs_descricao_marca: formData.Marca,
            cs_descricao_grupo: formData.Grupo,
            cs_descricao_classe: formData.Classe,
            cs_descricao_sub_grupo: formData.DescriçãoSubgrupo,
            cs_descricao_reduzida: formData.DescriçãoProduto,
            cs_is_com_saldo: false,
        }
        setFilterValues(_filterValues)

        handleSearchProduct(filterValues!).then((res) => {
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


    /** INICIO - MONTANDO PROPRIEDADES DO CUSTOM FORM */
    const buttonFormProp = {
        title: "Pesquisar",
        onPress: handleFormSubmit,
        buttonStyle: stylesConsultaProduto.searchButton,
        textStyle: stylesConsultaProduto.searchButtonText
    }
    /** FIM - MONTANDO PROPRIEDADES DO CUSTOM FORM */

    //Tela
    return (
        <SafeAreaView style={stylesConsultaProduto.container}>
            <>
                {isNewSearch && (
                    <ScrollView>
                        <View style={stylesConsultaProduto.searchContainer}>
                            <CustomForm
                                status={status}
                                formInputTypeList={formFields}
                                customButtonProp={buttonFormProp}
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
                            ListFooterComponent={() => <Custom_Pagination currentClickedItem={filterValues?.cs_page!} paginationArray={paginationArray} onItemClick={(page) => handleFormSubmit(filterValues, page)} />}
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
                    <View>
                        <CustomButton title="Nova Pesquisa" onPress={resetValuesToSearch} buttonStyle={stylesConsultaProduto.btnNewSearch} textStyle={stylesConsultaProduto.searchButtonText} />
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
        </View>
    );
};




export default CS_SC_ConsultaProdutos;
