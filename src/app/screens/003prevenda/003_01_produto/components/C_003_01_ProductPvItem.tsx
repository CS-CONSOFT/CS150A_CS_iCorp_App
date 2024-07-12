import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Image, Pressable, Text, View } from "react-native";
import CustomIcon from "../../../../components/icon/CustomIcon";
import { IProdutoItemUltimasVendas } from "../../../../services/api/interfaces/produto/CS_IResGetUltimasVendasProduto";
import { formatMoneyValue } from "../../../../util/FormatText";
import { ICON_NAME } from "../../../../util/IconsName";
import { ToastType, showToast } from "../../../../util/ShowToast";
import { handleGetLastSalesProduct, handleGetProdutoGarantia } from "../../../../view_controller/produto/ProductViewController";
import CS_003_01_02_ProductPvItemUltimasVendas from "./CS_003_01_02_ProductPvItemUltimasVendas";
import C_003_01_01_ProductPvListItemEdit from "./C_003_01_01_ProductPvListItemEdit";
import C_003_01_03_ProductPvItemGarantia from "./C_003_01_03_ProductPvItemGarantia";
import { common003_01_styles } from './CommonStyles';
import { DD080_Produtos } from "../../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { commonStyle } from "../../../../CommonStyle";
import { IResProdutoGarantia } from "../../../../services/api/interfaces/produto/CS_IResGetProdutoGarantia";




//Item de produto que aparece na listagem
export const C_003_01_ProductPvItem = ({ isConsulta = false, product, onDeleteProductClick, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue }:
    {
        isConsulta?: boolean
        product: DD080_Produtos,
        onDeleteProductClick: (productId: string) => void,
        saveTablePrice: (tablePrice: number, productId: string) => void
        saveUnityPrice: (unityPrice: number, productId: string) => void
        saveDiscountPercent: (discountPercent: number, productId: string) => void
        saveDiscountValue: (valueDiscount: number, productId: string) => void
    }) => {

    const [productAmount, setProductAmount] = useState(0.0);
    const [lastSalesProduct, setLastSalesProduct] = useState<IProdutoItemUltimasVendas[]>()
    const [guarantee, setGuarantee] = useState<IResProdutoGarantia>()

    useEffect(() => {
        setProductAmount(product.csicp_dd080.DD080_Quantidade)
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




    return (
        <Pressable onPress={() => {
            if (isConsulta) {
                downSwipeToEdit()
            }
        }
        }>
            <Animated.View style={[common003_01_styles.containerRenderItem, common003_01_styles.boxShadow, animatedStyleX, animatedStyleY, extraIconsRightOpen && common003_01_styles.openContainerX]}>
                {/** IMAGEM */}
                {

                }
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
                    <Text style={common003_01_styles.productInfo}>{`Qtd: ${productAmount}`}</Text>
                    <Text style={common003_01_styles.productInfo}>{`Unitário: ${formatMoneyValue(product.csicp_dd080.DD080_Preco_Unitario)}`}</Text>
                    <Text style={common003_01_styles.productInfo}>{`Total: ${formatMoneyValue(product.csicp_dd080.DD080_Total_Liquido)}`}</Text>
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
                        setAmountProduct={(productAmount) => setProductAmount(productAmount)}
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


