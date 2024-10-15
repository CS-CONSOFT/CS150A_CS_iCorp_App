import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Image, Pressable, Text, View } from "react-native";
import { commonStyle } from "../../../../CommonStyle";
import CustomIcon from "../../../../components/icon/CustomIcon";
import { DD080_Produtos } from "../../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { IResProdutoGarantia } from "../../../../services/api/interfaces/produto/CS_IResGetProdutoGarantia";
import { IProdutoItemUltimasVendas } from "../../../../services/api/interfaces/produto/CS_IResGetUltimasVendasProduto";
import { formatMoneyValue } from "../../../../util/FormatText";
import { ICON_NAME } from "../../../../util/IconsName";
import { ToastType, showToast } from "../../../../util/ShowToast";
import { handleGetPv } from "../../../../view_controller/prevenda/PreVendaViewController";
import { handleGetLastSalesProduct, handleGetProdutoGarantia } from "../../../../view_controller/produto/ProductViewController";
import CS_003_01_02_ProductPvItemUltimasVendas from "./CS_003_01_02_ProductPvItemUltimasVendas";
import C_003_01_01_ProductPvListItemEdit from "./C_003_01_01_ProductPvListItemEdit";
import C_003_01_03_ProductPvItemGarantia from "./C_003_01_03_ProductPvItemGarantia";
import { common003_01_styles } from './CommonStyles';
import React from "react";




//Item de produto que aparece na listagem
//hidebottom é uma funcao de callback que controla se o bottom da pagina deve sumir ou nao
export const C_003_01_ProductPvItem = ({ isConsulta = false, product, onDeleteProductClick, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue, hideBottom, refreshScreen }:
    {
        isConsulta?: boolean
        product: DD080_Produtos,
        onDeleteProductClick: (productId: string) => void,
        saveTablePrice: (tablePrice: number, productId: string) => void
        saveUnityPrice: (unityPrice: number, productId: string) => void
        saveDiscountPercent: (discountPercent: number, productId: string) => void
        saveDiscountValue: (valueDiscount: number, productId: string) => void,
        hideBottom: (hide: boolean) => void,
        refreshScreen: () => void
    }) => {

    const navigation = useNavigation()
    const [productAmount, setProductAmount] = useState(0.0);
    const [currentTotalPrice, setCurrentTotalPrice] = useState(0.0);
    const [lastSalesProduct, setLastSalesProduct] = useState<IProdutoItemUltimasVendas[]>()
    const [guarantee, setGuarantee] = useState<IResProdutoGarantia>()


    useEffect(() => {
        //quando o fator de conversao for diferente de 0, significa que a alteração deve ser feita na unidade secundária
        setProductAmount(product.csicp_dd080.DD080_Un_Sec_TipoConv_ID === 0 ? product.csicp_dd080.DD080_Quantidade : product.csicp_dd080.DD080_Un_Sec_Qtde)
        setCurrentTotalPrice(product.csicp_dd080.DD080_TotLiqProduto)
    }, [product])

    const [dragX] = useState(new Animated.Value(0));
    const [dragY] = useState(new Animated.Value(0));

    const [extraIconsRightOpen, setExtraIconsRightOpen] = useState(false);
    const [extraBottomOpenEdit, setExtraBottomOpenEdit] = useState(false);
    const [extraBottomOpenLastSales, setExtraBottomOpenLastSales] = useState(false);
    const [extraBottomOpenGuarantee, setExtraBottomOpenGuarantee] = useState(false);
    const [loadingRightItens, setLoadingRightItens] = useState(false)


    function showLastSales(Id: string) {
        setLoadingRightItens(true)
        handleGetLastSalesProduct({ cs_produto_id: Id }).then((res) => {
            if (res.IsOk) {
                setLastSalesProduct(res.UltimasVendas)
                downSwipeToLastSales()
            } else {
                showToast(ToastType.ERROR, "Error", "Um erro ocorreu!")
            }
            setLoadingRightItens(false)
        })
    }

    //o refresh so ocorre ao comprar ou remover uma garantia, quando faz isso, nao deve fechar o drop swipe
    function showGuarantee(produtoId: string, produtoAtendimentoId: string, isRefresh: boolean): void {
        setLoadingRightItens(true)
        handleGetProdutoGarantia({ cs_produto_id: produtoId, cs_atendimento_produto_id: produtoAtendimentoId }).then((res) => {
            setGuarantee(res)
            if (!isRefresh) {
                downSwipeToGuarantee()
            }
            setLoadingRightItens(false)
        })
    }

    /** FUNCOES QUE LIDAM COM AS ANIMACOES EM TELA */
    const leftSwipe = () => {

        if (!extraIconsRightOpen) {
            hideBottom(true)
        } else {
            hideBottom(false)
        }

        if (!extraBottomOpenEdit) {
            const toValue = extraIconsRightOpen ? 0 : -5;
            Animated.timing(dragX, {
                toValue,
                duration: 150,
                useNativeDriver: true,
            }).start();
            setExtraIconsRightOpen(!extraIconsRightOpen);
        }
    };

    function animateDownSwipe(extraBottomOpen: boolean, dragY: Animated.Value) {
        const toValue = extraBottomOpen ? 0 : -15;
        Animated.timing(dragY, {
            toValue,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }

    const downSwipeToEdit = () => {
        if (!extraBottomOpenEdit) {
            hideBottom(true)
        } else {
            hideBottom(false)
        }
        if (!extraIconsRightOpen) {
            animateDownSwipe(extraBottomOpenEdit, dragY)
            setExtraBottomOpenEdit(!extraBottomOpenEdit);
        }
    };

    const downSwipeToLastSales = () => {
        animateDownSwipe(extraBottomOpenLastSales, dragY);
        setExtraBottomOpenLastSales(!extraBottomOpenLastSales);
    };

    const downSwipeToGuarantee = () => {
        animateDownSwipe(extraBottomOpenGuarantee, dragY);
        setExtraBottomOpenGuarantee(!extraBottomOpenGuarantee);
    };

    const animatedStyleX = {
        transform: [{ translateX: dragX }]
    };

    const animatedStyleY = {
        transform: [{ translateY: dragY }]
    };
    /** FUNCOES QUE LIDAM COM AS ANIMACOES EM TELA */


    //atualizando preço do produto quando a quantidade tbm é atualizada
    async function scHandleUpdateAmount(amount: number) {
        try {
            const res = await handleGetPv()
            if (res !== undefined) {
                setProductAmount(amount)
                const currentProd = res.DD080_Produtos.find((item) => item.csicp_dd080.DD080_Id == product.csicp_dd080.DD080_Id)
                setCurrentTotalPrice(currentProd?.csicp_dd080.DD080_TotLiqProduto || 0)
                showToast(ToastType.SUCCESS, "Quantidade atualizada", "")
            }
        } catch (error) {
            navigation.goBack()
            showToast(ToastType.ERROR, "Erro", "Nenhuma PV Ativa no momento")
        }
    }



    return (
        <Pressable onPress={() => {
            if (isConsulta) {
                downSwipeToEdit()
            }
        }
        }>
            <Animated.View style={[common003_01_styles.containerRenderItem, common003_01_styles.boxShadow, animatedStyleX, animatedStyleY, extraIconsRightOpen && common003_01_styles.openContainerX]}>

                <View style={common003_01_styles.productContainerLeft}>
                    {product.csicp_gg008c_Imagens.find((item) => item.GG008c_IsPadrao)?.gg008c_Path !== undefined && (
                        <Image style={common003_01_styles.productImage}
                            source={{ uri: product.csicp_gg008c_Imagens.find((item) => item.GG008c_IsPadrao)?.gg008c_Path }} />
                    )}

                    {product.csicp_gg008c_Imagens.find((item) => item.GG008c_IsPadrao)?.gg008c_Path === undefined && (
                        <Image style={common003_01_styles.productImage}
                            source={require('../../../../../../assets/imgnaodisp.jpg')} />
                    )}

                </View>



                {/** MEIO DO COMPONENTE, ONDE MOSTRA OS VALORES */}
                <View style={common003_01_styles.productContainerMiddle}>
                    <Text style={common003_01_styles.productName}>N° {product.csicp_dd080.DD080_Codigo_Produto}</Text>
                    <Text style={common003_01_styles.productInfo}>{product.csicp_dd080.DD080_DescProduto.slice(0, 20)}</Text>


                    {/* QUANDO O TIPO DE CONVERSAO ID FOR IGUAL A 0, O VALOR QUE SERÁ REFLETIDO EM TELA SERÁ O DA UNIDADE PRIMARIA  */}
                    {product.csicp_dd080.DD080_Un_Sec_TipoConv_ID === 0 && (
                        <>
                            <Text style={common003_01_styles.productInfo}>{`Qtd: ${productAmount} - ${product.csicp_gg007.GG007_Unidade}`}</Text>
                            {product.csicp_dd080.DD080_Un_Sec_Qtde.toString() && (
                                <Text style={common003_01_styles.productInfo}>{`Unidade Sec: ${product.csicp_dd080.DD080_Un_Sec_Qtde} (${product.csicp_gg007_Un_Sec.GG007_Unidade} / ${product.csicp_dd080.DD080_Un_Sec_FatorConv})`}</Text>
                            )}
                        </>
                    )}

                    {/* QUANDO O TIPO DE CONVERSAO ID FOR IGUAL A 1, O VALOR QUE SERÁ REFLETIDO EM TELA SERÁ O DA UNIDADE SECUNDÁRIA  */}
                    {product.csicp_dd080.DD080_Un_Sec_TipoConv_ID === 1 && (
                        <>
                            <Text style={common003_01_styles.productInfo}>{`Qtd: ${product.csicp_dd080.DD080_Quantidade} - ${product.csicp_gg007.GG007_Unidade}`}</Text>
                            {product.csicp_dd080.DD080_Un_Sec_Qtde.toString() && (
                                <Text style={common003_01_styles.productInfo}>{`Unidade Sec: ${productAmount} (${product.csicp_gg007_Un_Sec.GG007_Unidade} / ${product.csicp_dd080.DD080_Un_Sec_FatorConv})`}</Text>
                            )}
                        </>
                    )}




                    <View style={commonStyle.common_rowItem}>
                        <Text style={common003_01_styles.productInfo}>{`Unitário: ${formatMoneyValue(product.csicp_dd080.DD080_Preco_Unitario)}`}</Text>
                        {product.csicp_dd080.dd080_NroPrcTabela > 0 && (
                            <Text style={common003_01_styles.productInfo}>{` (${product.csicp_dd080.dd080_NroPrcTabela})`}</Text>
                        )}
                    </View>

                    <Text style={common003_01_styles.productInfo}>{`Total: ${formatMoneyValue(currentTotalPrice)}`}</Text>
                </View>
                {isConsulta && (
                    <>
                        {/** CLIQUE DO LADO DIREITO */}
                        <Pressable style={common003_01_styles.productContainerArrow} onPress={leftSwipe}>
                            <View>
                                {extraIconsRightOpen ? <CustomIcon icon={ICON_NAME.FLECHA_ESQUERDA} iconSize={18} /> : <CustomIcon icon={ICON_NAME.FLECHA_DIRETA} iconSize={18} />}
                            </View>
                        </Pressable>

                        {/** CONTEUDO EXIBIDO A DIREITA DE CADA ITEM DA LISTA */}
                        {extraIconsRightOpen && (
                            <View style={common003_01_styles.iconsRight}>
                                {loadingRightItens ? <ActivityIndicator color={"#fff"} style={commonStyle.align_centralizar} /> : <>
                                    <CustomIcon icon={ICON_NAME.LIXEIRA} iconSize={22} iconColor="#0A3147" onPress={() => onDeleteProductClick(product.csicp_dd080.DD080_Id)} />
                                    <CustomIcon icon={ICON_NAME.PAPEL_LISTA_CONTORNADO} iconSize={22} iconColor="#0A3147" onPress={() => showGuarantee(product.csicp_gg008.Id, product.csicp_dd080.DD080_Id, false)} />
                                    <CustomIcon icon={ICON_NAME.CAIXA_ARQUIVO_CONTORNADO} iconSize={22} iconColor="#0A3147" onPress={() => showLastSales(product.csicp_gg008.Id)} />
                                </>}

                            </View>
                        )}
                    </>
                )}
            </Animated.View>


            {/** CONTEUDO EXIBIDO ABAIXO DE CADA ITEM DA LISTA */}
            <View>
                {extraBottomOpenEdit && (
                    <C_003_01_01_ProductPvListItemEdit
                        product={product}
                        saveDiscountPercent={saveDiscountPercent}
                        saveDiscountValue={saveDiscountValue}
                        saveTablePrice={saveTablePrice}
                        saveUnityPrice={saveUnityPrice}
                        downSwipe={downSwipeToEdit}
                        fcnSetAmountProduct={(productAmount: number) => {
                            scHandleUpdateAmount(productAmount)
                        }}
                        refreshScreen={() => {
                            refreshScreen()
                        }}
                    />
                )}
                {extraBottomOpenLastSales && (
                    <CS_003_01_02_ProductPvItemUltimasVendas close={() => downSwipeToLastSales()} lastSales={lastSalesProduct!} />
                )}

                {extraBottomOpenGuarantee && (
                    <C_003_01_03_ProductPvItemGarantia produtoAtendimentoId={product.csicp_dd080.DD080_Id} close={() => downSwipeToGuarantee()} guarantee={guarantee!} refresh={() => showGuarantee(product.csicp_gg008.Id, product.csicp_dd080.DD080_Id, true)} />
                )}
            </View>
        </Pressable>
    );
};


