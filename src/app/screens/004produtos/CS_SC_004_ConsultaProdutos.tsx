import { useNavigation } from "@react-navigation/native";
import React, { lazy, Suspense, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, Text, ToastAndroid, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomAlertDialog from "../../components/modal/CustomAlertDialog";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import CustomProduct from "../../components/product/CustomProduct";
import CustomSwitch from "../../components/switch/CustomSwitch";
import { DataKey } from "../../enum/DataKeys";
import { IReqGetProductSearch } from "../../services/api/interfaces/produto/CS_IReqGetProdutoSearch";
import { IResGetProductItem } from "../../services/api/interfaces/produto/CS_IResGetProdutoSearch";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatMoneyValue } from "../../util/FormatText";
import { ICON_NAME } from "../../util/IconsName";
import { handleInsertProductPv } from "../../view_controller/prevenda/PreVendaViewController";
import { handleSearchProduct } from "../../view_controller/produto/ProductViewController";
import { stylesConsultaProduto } from "./ConsultaProdutoStyles";

const CustomSearch = lazy(() => import("../../components/search/CustomSearch"))

const CS_SC_ConsultaProdutos = ({ route }: { route: any }) => {
    const [productList, setProductList] = useState<IResGetProductItem[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [paginationArray, setPaginationArray] = useState<number[]>([])
    const [errorMsg, setErrorMsg] = useState();
    const [productAtributtesToSearch, setProductAtributtesToSearch] = useState<IReqGetProductSearch>()
    const { navigate } = useNavigation()




    function showToast(msg: string) {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }

    function scInsertProductPv(product: IResGetProductItem) {
        setStatus(FETCH_STATUS.BTN_CLICK)
        getSimpleData(DataKey.CurrentPV).then((currentPv) => {
            const pvId = currentPv as string
            handleInsertProductPv(
                product.CodgProduto!.toString(),
                false,
                1,
                1,
                pvId || undefined,
                undefined
            ).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                showToast(res.Msg)
            })
        })
    }

    const isLoading = status == FETCH_STATUS.LOADING
    const isError = status == FETCH_STATUS.ERROR
    const openModal = status == FETCH_STATUS.MODAL


    function handleFilterClick() {
        setStatus(FETCH_STATUS.MODAL)
    }

    const handleFormSubmitToSearch = (valueToSearch?: any, page?: number) => {
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

        setStatus(FETCH_STATUS.LOADING)
        const _filterValues: IReqGetProductSearch = {
            cs_page: page || 1,
            cs_codigo_produto: valueToSearch || '',
            cs_descricao_reduzida: valueToSearch || '',
            cs_is_com_saldo: valueToSearch.isSaldo
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


    const loadingBtnClickItem = status == FETCH_STATUS.BTN_CLICK
    //Tela
    return (

        <SafeAreaView style={stylesConsultaProduto.container}>
            <Suspense fallback={<ActivityIndicator />}>
                <View>

                    <CustomSearch
                        placeholder="Pesquisar Produto"
                        onSearchPress={handleFormSubmitToSearch}
                        onFilterClick={handleFilterClick} />

                    {isLoading ? <ActivityIndicator /> :
                        <View>
                            <FlatList
                                data={productList}
                                keyExtractor={(item) => item.Id!}
                                ListEmptyComponent={() => <CustomEmpty text={isError ? errorMsg! : "Nenhum item encontrado"} />}
                                renderItem={({ item }) => (
                                    <CustomProduct
                                        children={<ProductItem product={item} />}
                                        image={<ImageProductItem />}
                                        rightItem={<RightItem loadingClick={loadingBtnClickItem} click={() => scInsertProductPv(item)} />}
                                    />
                                )}
                            />
                        </View>
                    }
                </View>
                <Custom_Pagination
                    onPagePress={(page) => handleFormSubmitToSearch(productAtributtesToSearch, page)}
                    paginationArray={paginationArray} />

                <CustomAlertDialog
                    isVisible={openModal}
                    onDismiss={() => { }}
                    title={"SSS"}
                    children={<ModalSwitchFilter titles={['Promoção', 'Com Saldo']} search={(filters) => {
                        handleFormSubmitToSearch(filters)
                    }} close={() => setStatus(FETCH_STATUS.IDLE)} />}
                />
            </Suspense>
        </SafeAreaView>
    );
}

const ImageProductItem = () => {
    return (
        <Image style={commonStyle.productImage}
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnT98rwKfnZngX2pDhX4EkbW-y0pUOCz9iCg&s' }} />
    );
}

const ProductItem = ({ product }: { product: IResGetProductItem }) => {
    return (
        <View style={commonStyle.justify_content_space_btw}>
            <Text style={stylesConsultaProduto.productCode}>{`N° ${product.CodgProduto}`}</Text>
            <Text style={stylesConsultaProduto.productDesc}>{`${product.DescReduzida}`}</Text>
            <Text style={stylesConsultaProduto.productPrice}>{`${formatMoneyValue(product.Preco!)}`}</Text>
        </View>
    )
}

const RightItem = ({ click, loadingClick }: { click: () => void, loadingClick: boolean }) => {
    return (
        <View style={stylesConsultaProduto.rightIcons}>
            <Pressable onPress={click}>
                {loadingClick ? <ActivityIndicator size={32} color={"#000"} /> : <CustomIcon icon={ICON_NAME.CARRINHO_CONTORNADO} />}
            </Pressable>
        </View>
    )
}

const ModalSwitchFilter = ({ titles, close, search }: { titles: string[], search: (filter: any) => void, close: () => void }) => {
    const [filter, setFilter] = useState({
        isPromo: false,
        isSaldo: false
    })
    return (
        <View style={{ flexDirection: 'column', backgroundColor: "#fff", width: '80%', padding: 8, borderRadius: 32, justifyContent: 'center' }}>
            <CustomIcon icon={ICON_NAME.LIXEIRA} onPress={close} />
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


export default CS_SC_ConsultaProdutos;
