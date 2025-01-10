import { useNavigation } from "@react-navigation/native";
import React, { Suspense, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import { moneyApplyMask } from "../../util/Masks";
import CustomSeparator from "../../components/lists/CustomSeparator";
const CS_SC_ConsultaProdutos = ({ route }: { route: any }) => {

    const [productList, setProductList] = useState<IResGetProductItem[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);  // Total de itens
    const [productAtributtesToSearch, setProductAtributtesToSearch] = useState<IReqGetProductSearch>();
    const [filter, setFilter] = useState({
        isPromo: false,
        isSaldo: true
    });
    const [lastSaldoValue, setLastSaldoValue] = useState(true)
    const [lastSearch, setLastSearch] = useState("")

    const { cameFromPv, insertComanda, comandaId } = route.params;
    const navigation = useNavigation();

    // Função para inserir produto na pré-venda
    function scInsertProduct(product: IResGetProductItem, saldoId?: string) {
        setStatus(FETCH_STATUS.BTN_CLICK);
        getSimpleData(DataKey.CurrentPV).then((currentPv) => {
            const pvId = currentPv as string;

            if (insertComanda) {
                let dataPostInsertComandaProduto: IComandaDataInsert = {
                    in_comanda_id: comandaId,
                    in_produto_id: product.Id || '--undefined--',
                };
                handleInsertProdutoComanda({ insertProdutoComanda: dataPostInsertComandaProduto }).then(() => {
                    setStatus(FETCH_STATUS.SUCCESS);
                    showToast(ToastType.SUCCESS, "Produto Inserido", "");
                });
            } else {
                handleInsertProductPv(
                    product.CodgProduto!.toString(),
                    false, // is entrega
                    1, // quantidade
                    1, // tipo atendimento
                    pvId ? pvId : undefined, // pv id
                    undefined, // conta id
                    saldoId // saldo id
                ).then(() => {
                    setStatus(FETCH_STATUS.SUCCESS);
                    showToast(ToastType.SUCCESS, "Tudo certo!", "Produto adicionado com sucesso!");
                    if (cameFromPv) {
                        navigation.goBack();
                    }
                }).catch((err) => {
                    showToast(ToastType.ERROR, "ERRO", err.response.data.Errors[0]);
                    setStatus(FETCH_STATUS.ERROR);
                });
            }
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0]);
            setStatus(FETCH_STATUS.ERROR);
        });
    }

    // Flags para determinar o estado atual do carregamento
    const isLoading = status === FETCH_STATUS.LOADING;
    const openModal = status === FETCH_STATUS.MODAL;
    const loadingBtnClickItem = status === FETCH_STATUS.BTN_CLICK;

    // Função para abrir o modal de filtros
    function handleFilterClick() {
        setStatus(FETCH_STATUS.MODAL);
    }

    // Função para realizar a busca de produtos
    const handleFormSubmitToSearch = (valueToSearch?: any, page: number = currentPage) => {

        if (lastSaldoValue != filter.isSaldo) {
            setLastSaldoValue(filter.isSaldo)
            setProductList([])
        }

        /**
         * changePage => caso a pesquisa mude, a pagina deve ser setada para a 1 novamente, porem como o 
         * page recebe como parametro, isso é controlado atraves dessa variavel
         */
        let changePage = false;
        if (lastSearch != valueToSearch) {
            changePage = true
            setCurrentPage(1)
            setProductList([])
            setLastSearch(valueToSearch)
        }

        setStatus(FETCH_STATUS.LOADING);
        const _filterValues: IReqGetProductSearch = {
            cs_page: changePage ? 1 : page,
            cs_codigo_produto: /^\d+$/.test(valueToSearch) ? valueToSearch : undefined,
            cs_descricao_reduzida: /^\d+$/.test(valueToSearch) ? undefined : valueToSearch,
            cs_is_com_saldo: filter.isSaldo
        };




        setProductAtributtesToSearch(_filterValues);

        // Chamada da API para buscar produtos
        handleSearchProduct(_filterValues!).then((res) => {
            if (res.cs_is_ok === false) {
                navigation.navigate('Menu');
                showToast(ToastType.ERROR, "Erro", res.cs_msg || "Erro ao buscar produtos");
            }

            if (res.cs_is_ok) {
                // Atualiza o total de itens disponível
                setTotalCount(res.c_pages_number);


                setProductList((prevList) => [...prevList, ...res.List]);
                setStatus(FETCH_STATUS.SUCCESS);
            } else {
                setStatus(FETCH_STATUS.ERROR);
            }
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0]);
            setStatus(FETCH_STATUS.ERROR);
        }).finally(() => {
            changePage = false;
        })
    };

    // Função de carregar mais produtos na rolagem infinita
    const handleLoadMore = () => {
        // Evita carregar mais se já carregamos todos os itens
        if (currentPage < totalCount) {
            if (isLoading) return; // Evita carregar mais enquanto está carregando

            // Atualiza a página e chama a pesquisa novamente com a nova página
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage); // Atualiza o estado de currentPage
            handleFormSubmitToSearch(productAtributtesToSearch?.cs_codigo_produto || productAtributtesToSearch?.cs_descricao_reduzida, nextPage);
        }
    };

    function search() {
        handleFormSubmitToSearch(productAtributtesToSearch?.cs_codigo_produto || productAtributtesToSearch?.cs_descricao_reduzida, currentPage);

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
                        clickToSearch={true}
                        showCamera={true}
                        previusScreen="Consulta_Produtos"
                    />
                </View>

                <View style={{ height: "85%" }}>
                    <FlatList
                        data={productList}
                        keyExtractor={(item) => item.Id!.toString()}
                        ListEmptyComponent={() => !isLoading && <CustomEmpty text="Nenhum produto encontrado!" />}
                        ListFooterComponent={() => isLoading && <ActivityIndicator color={"#000"} />}
                        renderItem={({ item }) => (
                            <CustomProduct
                                onClickItem={() => { }}
                                children={<ProductItem product={item} />}
                                image={<ImageProductItem descProd={item.DescArtigo!} image={item.Imagens?.find((val) => val.IsPadrao)?.URL_Path} />}
                                rightItem={
                                    <RightItem
                                        loadingClick={loadingBtnClickItem}
                                        scInsertProduct={(saldoId) => scInsertProduct(item, saldoId)}
                                        product={item}
                                    />
                                }
                            />
                        )}
                        refreshing={isLoading}
                        onEndReached={handleLoadMore} // Detecta o final da lista e carrega mais
                        onEndReachedThreshold={0.5} // Carrega mais quando 50% do final da lista for visível
                    />
                </View>

                <CustomAlertDialog
                    isVisible={openModal}
                    onDismiss={() => { }}
                    children={<ModalSwitchFilter titles={['Promoção', 'Com Saldo']} filter={filter} setFilter={setFilter} close={() => {
                        setStatus(FETCH_STATUS.IDLE)
                    }} />}
                />
            </Suspense>
        </SafeAreaView>
    );
};


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
            <Text style={stylesConsultaProduto.productDesc}>{`${product.DescReduzida}`}</Text>
            <Text style={stylesConsultaProduto.productPrice}>{`${formatMoneyValue(product.Preco!)}`}</Text>
        </View>
    )
}

// Componente do botão direito para adicionar o produto à pré-venda
const RightItem = ({ scInsertProduct, loadingClick, product }: { scInsertProduct: (saldoId?: string) => void, loadingClick: boolean, product: IResGetProductItem }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    return (
        <View style={stylesConsultaProduto.rightIcons}>
            <View>
                {loadingClick ? <ActivityIndicator size={32} color="#000" />
                    :
                    <>
                        <View style={{ marginVertical: 24 }}>
                            <Pressable onPress={handlePress}>
                                <CustomIcon icon={ICON_NAME.PRICETAGS} />
                            </Pressable>
                        </View>
                        <CustomSeparator />
                        <View style={{ marginVertical: 24 }}>
                            <Pressable onPress={() => scInsertProduct(undefined)}>
                                <CustomIcon icon={ICON_NAME.CARRINHO_CONTORNADO} />
                            </Pressable>
                        </View>
                    </>
                }


            </View>



            {/* Modal para exibir a lista de produtos */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>


                        <Text style={styles.modalTitle}>Selecione um Saldo</Text>
                        <Text style={styles.modalSubtitle}>
                            Clique em um item da lista para enviar com o saldo correspondente ou use o botão abaixo para enviar sem saldo.
                        </Text>

                        {/* Lista de produtos */}
                        <FlatList
                            data={product.NS_List}
                            keyExtractor={(item) => item.csicp_gg520.Id}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => {
                                    scInsertProduct(item.csicp_gg520.Id);
                                    setModalVisible(false);
                                }} style={styles.productItemContainer}>
                                    <View style={styles.productInfoContainer}>
                                        <Text style={styles.productNumber}>{item.csicp_gg520.GG520_NS_NumeroSaldo}</Text>
                                        <Text style={styles.productBalance}>{moneyApplyMask(item.csicp_gg520.GG520_Saldo || 0)}</Text>
                                        <Text style={styles.productDescription}>{item.csicp_gg520.GG520_DescricaoSaldo}</Text>
                                        <Text style={styles.productWarehouse}>{item.csicp_gg001.GG001_DescAlmox}</Text>
                                    </View>
                                </Pressable>
                            )}
                        />

                        {/* Botão para enviar sem saldo */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    { backgroundColor: pressed ? '#2ecc71' : '#28a745' } // Verde para "Enviar Sem Saldo"
                                ]}
                                onPress={() => {
                                    setModalVisible(false);
                                    scInsertProduct(undefined);
                                }}
                            >

                                <Text style={styles.buttonText}>Enviar Sem Saldo</Text>
                            </Pressable>
                            {/* Botão para fechar o modal */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    { backgroundColor: pressed ? '#e74c3c' : '#c0392b' } // Vermelho para "Cancelar"
                                ]}
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

// Componente do modal de filtros com switches para promoção e saldo
const ModalSwitchFilter = ({ titles, close, filter, setFilter }: { titles: string[], close: () => void, filter, setFilter }) => {

    return (
        <View style={{ flexDirection: 'column', backgroundColor: "#fff", width: '80%', padding: 8, borderRadius: 32, justifyContent: 'center' }}>
            <CustomIcon icon={ICON_NAME.FECHAR} onPress={close} />
            {/*   <CustomSwitch
                title={titles[0]}
                switchValue={filter.isPromo}
                onValueChange={(value) => {
                    setFilter({ isPromo: value, isSaldo: filter.isSaldo })
                    //close()
                }}
            /> */}
            <CustomSwitch
                title={titles[1]}
                switchValue={filter.isSaldo}
                onValueChange={(value) => {
                    setFilter({ isPromo: filter.isPromo, isSaldo: value })
                    // close()
                }}
            />
            <Pressable style={commonStyle.common_button_style} onPress={() => close()}>
                <Text style={commonStyle.common_text_button_style}>Inserir Filtro</Text>
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
    rightIcons: {
        // Estilo para o container do botão direito
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItem: {
        padding: 10,
        borderBottomColor: '#ccc',
    },
    productItemContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    productInfoContainer: {
        flexDirection: 'column',
    },
    productNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productBalance: {
        fontSize: 14,
        color: '#000',
        marginTop: 5,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    productWarehouse: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'column', // Alinha os botões lado a lado
        justifyContent: 'space-between', // Espaça os botões
        marginTop: 20, // Espaço acima dos botões
    },
    button: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 5, // Espaço entre os botões
        alignItems: 'center', // Centraliza o texto no botão
    },
    buttonText: {
        color: '#fff', // Cor do texto em branco
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        marginVertical: 10,
        textAlign: 'center', // Centraliza o texto
    },
});

export default CS_SC_ConsultaProdutos;