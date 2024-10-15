import { useNavigation } from "@react-navigation/native";
import React, { Suspense, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomAlertDialog from "../../components/modal/CustomAlertDialog";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import CustomProduct from "../../components/product/CustomProduct";
import CustomSearch from "../../components/search/CustomSearch";
import CustomSwitch from "../../components/switch/CustomSwitch";
import { DataKey } from "../../enum/DataKeys";
import { IComandaDataInsert } from "../../services/api/endpoint/comanda/CS_Comanda";
import { IReqGetProductSearch } from "../../services/api/interfaces/produto/CS_IReqGetProdutoSearch";
import { IResGetProductItem } from "../../services/api/interfaces/produto/CS_IResGetProdutoSearch";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatMoneyValue } from "../../util/FormatText";
import { ICON_NAME } from "../../util/IconsName";
import { showToast, ToastType } from "../../util/ShowToast";
import { handleInsertProdutoComanda } from "../../view_controller/comanda/CS_ComandaViewController";
import { handleInsertProductPv } from "../../view_controller/prevenda/PreVendaViewController";
import { handleSearchProduct } from "../../view_controller/produto/ProductViewController";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";

const CS_SC_ConsultaProdutos = ({ route }: { route: any }) => {

    // Estados para gerenciar a lista de produtos, status de carregamento, paginação, mensagens de erro e filtros de pesquisa
    const [productList, setProductList] = useState<IResGetProductItem[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [paginationArray, setPaginationArray] = useState<number[]>([])
    const [productAtributtesToSearch, setProductAtributtesToSearch] = useState<IReqGetProductSearch>()

    /** quando vem da pv, ao inserir o produto é passado o id da pv atual.
     * quando é insere comanda, a rota chamada é a de inserir produto na comanda
     */
    const { cameFromPv, insertComanda, comandaId } = route.params
    const navigation = useNavigation()


    // Função para inserir produto na pré-venda
    function scInsertProduct(product: IResGetProductItem) {
        setStatus(FETCH_STATUS.BTN_CLICK)
        getSimpleData(DataKey.CurrentPV).then((currentPv) => {
            const pvId = currentPv as string

            if (insertComanda) {
                let dataPostInsertComandaProduto: IComandaDataInsert = {
                    in_comanda_id: comandaId,
                    in_produto_id: product.Id || '--undefined--',
                }
                handleInsertProdutoComanda({ insertProdutoComanda: dataPostInsertComandaProduto }).then((res) => {
                    setStatus(FETCH_STATUS.SUCCESS)
                    //comandaId === undefined ? navigation.navigate('ComandaLista') : navigation.navigate('DetalheComanda', { comandaId: comandaId })
                    showToast(ToastType.SUCCESS, "Produdo Inserido", "")
                })
            } else {
                handleInsertProductPv(
                    product.CodgProduto!.toString(),
                    false, // is entrega
                    1, // quantidade
                    1, // tipo atendimento
                    pvId ? pvId : undefined, // pv id
                    undefined // conta id
                ).then(() => {
                    setStatus(FETCH_STATUS.SUCCESS)
                    showToast(ToastType.SUCCESS, "Tudo certo!", "Produto adicionado com sucesso!")
                    if (cameFromPv) {
                        navigation.goBack()
                    }
                }).catch((err) => {
                    showToast(ToastType.ERROR, "ERRO", err.response.data.Errors[0])
                    setStatus(FETCH_STATUS.ERROR)
                    return
                })
            }
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0])
            setStatus(FETCH_STATUS.ERROR)
            return
        })
    }

    // Flags para determinar o estado atual do carregamento
    const isLoading = status == FETCH_STATUS.LOADING
    const openModal = status == FETCH_STATUS.MODAL
    const loadingBtnClickItem = status == FETCH_STATUS.BTN_CLICK

    // Função para abrir o modal de filtros
    function handleFilterClick() {
        setStatus(FETCH_STATUS.MODAL)
    }


    // Função para realizar a busca de produtos
    const handleFormSubmitToSearch = (valueToSearch?: any, page?: number) => {
        /** caso a chamada seja feita por paginação, mudar o tipo de loading para manter a paginação mostrando em tela
         * enquanto o usuário estiver vendo uma lista de produto baseado nos filtros dele.
         */

        /** Foi criada a variavel _filterValues para fazermos a busca, porem
         * para mostrar a lista precisamos de um objeto filterValues 
         * que tenha controle de estado a nivel da tela. Por iss foi implementado o useState que
         * guarda o _filterValues, para que possamos usar o filterValues na flat list.
        */

        setStatus(FETCH_STATUS.LOADING)
        const _filterValues: IReqGetProductSearch = {
            cs_page: page || 1,
            /** testa se tem apenas numeros, se sim, preenche o codigo, se nao, preenche a descricao */
            cs_codigo_produto: /^\d+$/.test(valueToSearch) ? valueToSearch : undefined,
            cs_descricao_reduzida: /^\d+$/.test(valueToSearch) ? undefined : valueToSearch,
            cs_is_com_saldo: valueToSearch.isSaldo
        };
        //seta os valores para o filter values que sera enviado na chamada da api
        setProductAtributtesToSearch(_filterValues)

        //chamada da api
        handleSearchProduct(_filterValues!).then((res) => {
            if (res.isOk == false) {
                navigation.navigate('Menu')
                showToast(ToastType.ERROR, "Erro", "Indefinição na resposta do servidor")
            }

            if (res.isOk) {
                setProductList(res.productResponse?.List)
                setPaginationArray(res.pagesArray)
                setStatus(FETCH_STATUS.SUCCESS)
            } else {
                // @ts-ignore
                setStatus(FETCH_STATUS.ERROR)
            }
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0])
            setStatus(FETCH_STATUS.ERROR)
            return
        })
    };

    function handleRefreshList(): void {
        handleFormSubmitToSearch(productAtributtesToSearch?.cs_codigo_produto || productAtributtesToSearch?.cs_descricao_reduzida, productAtributtesToSearch?.cs_page)
    }



    // Renderização da tela
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Suspense fallback={<ActivityIndicator style={[commonStyle.align_centralizar]} size="large" color={ColorStyle.colorPrimary200} />}>
                <View style={{ flexShrink: 0 }}>
                    <CustomSearch
                        placeholder="Pesquisar Produto"
                        onSearchPress={handleFormSubmitToSearch}
                        onFilterClick={handleFilterClick}
                        clickToSearch={true} />
                </View>

                {isLoading ? (
                    <ActivityIndicator style={[commonStyle.align_centralizar, { height: '100%' }]} size="large" color={ColorStyle.colorPrimary200} />
                ) : (
                    <View style={[paginationArray.length > 1 ? { height: "75%" } : { height: "88%" }]}>
                        <FlatList
                            data={productList}
                            refreshing={isLoading}
                            onRefresh={handleRefreshList}
                            keyExtractor={(item) => item.Id!.toString()}
                            ListEmptyComponent={<CustomEmpty text="Nenhum produto encontrado!" />}
                            renderItem={({ item }) => (
                                <CustomProduct
                                    onClickItem={() => { }}
                                    children={<ProductItem product={item} />}
                                    image={<ImageProductItem descProd={item.DescArtigo!} image={item.Imagens?.find((val) => val.IsPadrao)?.URL_Path} />}
                                    rightItem={
                                        <RightItem
                                            loadingClick={loadingBtnClickItem}
                                            scInsertProduct={() => scInsertProduct(item)}
                                        />
                                    }
                                />
                            )}
                        />

                    </View>
                )}
                {paginationArray.length > 1 && (
                    <View >
                        <Custom_Pagination
                            onPagePress={(page) => handleFormSubmitToSearch(productAtributtesToSearch?.cs_descricao_reduzida, page)}
                            paginationArray={paginationArray}
                        />
                    </View>
                )}
                <CustomAlertDialog
                    isVisible={openModal}
                    onDismiss={() => { }}
                    children={<ModalSwitchFilter titles={['Promoção', 'Com Saldo']} search={(filters) => handleFormSubmitToSearch(filters)} close={() => setStatus(FETCH_STATUS.IDLE)} />}
                />
            </Suspense>
        </SafeAreaView>

    );
}

// Componente de exibição da imagem do produto
const ImageProductItem = ({ descProd, image }: { descProd: string, image?: string }) => {
    return (
        <>{image !== undefined && (
            <Image style={commonStyle.productImage}
                source={{ uri: image }} />
        )}

            {image === undefined && (
                <Image style={commonStyle.productImage}
                    source={require("../../../../assets/imgnaodisp.jpg")} />
            )}

        </>
    );
}

// Componente de exibição das informações do produto
const ProductItem = ({ product }: { product: IResGetProductItem }) => {
    return (
        <View style={commonStyle.justify_content_space_btw}>
            <Text style={stylesConsultaProduto.productCode}>{`Código:  ${product.CodgProduto}`}</Text>
            <Text style={stylesConsultaProduto.productDesc}>{`${product.DescArtigo}`}</Text>
            <Text style={stylesConsultaProduto.productPrice}>{`${formatMoneyValue(product.Preco!)}`}</Text>
        </View>
    )
}

// Componente do botão direito para adicionar o produto à pré-venda
const RightItem = ({ scInsertProduct, loadingClick }: { scInsertProduct: () => void, loadingClick: boolean }) => {
    return (
        <View style={stylesConsultaProduto.rightIcons}>
            <Pressable onPress={scInsertProduct}>
                {loadingClick ? <ActivityIndicator size={32} color={"#000"} /> : <CustomIcon icon={ICON_NAME.CARRINHO_CONTORNADO} />}
            </Pressable>
        </View>
    )
}

// Componente do modal de filtros com switches para promoção e saldo
const ModalSwitchFilter = ({ titles, close, search }: { titles: string[], search: (filter: any) => void, close: () => void }) => {
    const [filter, setFilter] = useState({
        isPromo: false,
        isSaldo: false
    })
    return (
        <View style={{ flexDirection: 'column', backgroundColor: "#fff", width: '80%', padding: 8, borderRadius: 32, justifyContent: 'center' }}>
            <CustomIcon icon={ICON_NAME.FECHAR} onPress={close} />
            <CustomSwitch
                title={titles[0]}
                switchValue={filter.isPromo}
                onValueChange={(value) => setFilter({ isPromo: value, isSaldo: filter.isSaldo })}
            />
            <CustomSwitch
                title={titles[1]}
                switchValue={filter.isSaldo}
                onValueChange={(value) => setFilter({ isPromo: filter.isPromo, isSaldo: value })}
            />
            <Pressable style={commonStyle.common_button_style} onPress={() => search(filter)}>
                <Text style={commonStyle.common_text_button_style}>Filtrar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexShrink: 0,
    },
    loading: {
        height: '100%',
    },
    content: {
        flex: 1,
    },
    paginationContainer: {
        flexShrink: 0,
    },
});

export default CS_SC_ConsultaProdutos;