import { Animated, Image, Pressable, Text, View } from "react-native";
import CustomIcon from "../../../../components/icon/CustomIcon";
import { formatMoneyValue } from "../../../../util/FormatText";
import { ICON_NAME } from "../../../../util/IconsName";
import { common003_01_styles } from './CommonStyles';
import { useEffect, useState } from "react";
import C_003_01_01_ProductPvListItemEdit from "./C_003_01_01_ProductPvListItemEdit";
import CS_003_01_02_ProductPvItemUltimasVendas from "./CS_003_01_02_ProductPvItemUltimasVendas";
import C_003_01_03_ProductPvItemGarantia from "./C_003_01_03_ProductPvItemGarantia";
import { IResProductItemModel } from "../../../../services/api/interfaces/prevenda/CS_IResProdutosPreVenda";




//Item de produto que aparece na listagem
export const C_003_01_ProductPvItem = ({ product, onDeleteProductClick, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue }:
    {
        product: IResProductItemModel,
        onDeleteProductClick: (productId: string) => void,
        saveTablePrice: (tablePrice: number, productId: string) => void
        saveUnityPrice: (unityPrice: number, productId: string) => void
        saveDiscountPercent: (discountPercent: number, productId: string) => void
        saveDiscountValue: (valueDiscount: number, productId: string) => void
    }) => {

    const [productAmount, setProductAmount] = useState(0.0);

    useEffect(() => {
        setProductAmount(product.Quantidade)
    }, [product])

    const [dragX] = useState(new Animated.Value(0));
    const [dragY] = useState(new Animated.Value(0));

    const [extraIconsRightOpen, setExtraIconsRightOpen] = useState(false);
    const [extraBottomOpenEdit, setExtraBottomOpenEdit] = useState(false);
    const [extraBottomOpenLastSales, setExtraBottomOpenLastSales] = useState(false);
    const [extraBottomOpenGuarantee, setExtraBottomOpenGuarantee] = useState(false);


    function showLastSales(Id: string): void {
        console.log("click");
        downSwipeToLastSales()
    }

    function showGuarantee(Id: string): void {
        downSwipeToGuarantee()
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
        if (extraBottomOpenLastSales) {
            leftSwipe()
        }
    };

    const downSwipeToGuarantee = () => {
        animateDownSwipe(extraBottomOpenGuarantee, dragY);
        setExtraBottomOpenGuarantee(!extraBottomOpenGuarantee);
        if (extraBottomOpenGuarantee) {
            leftSwipe()
        }
    };

    const animatedStyleX = {
        transform: [{ translateX: dragX }]
    };

    const animatedStyleY = {
        transform: [{ translateY: dragY }]
    };
    /** FUNCOES QUE LIDAM COM AS ANIMACOES EM TELA */




    return (
        <Pressable onPress={() => downSwipeToEdit()}>
            <Animated.View style={[common003_01_styles.containerRenderItem, common003_01_styles.boxShadow, animatedStyleX, animatedStyleY, extraIconsRightOpen && common003_01_styles.openContainerX]}>
                {/** IMAGEM */}
                <View style={common003_01_styles.productContainerLeft}>
                    <Image style={common003_01_styles.productImage}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnT98rwKfnZngX2pDhX4EkbW-y0pUOCz9iCg&s' }} />
                </View>
                {/** MEIO DO COMPONENTE, ONDE MOSTRA OS VALORES */}
                <View style={common003_01_styles.productContainerMiddle}>
                    <Text style={common003_01_styles.productName}>N° {product.Codigo}</Text>
                    <Text style={common003_01_styles.productInfo}>{product.Descricao.slice(0, 20)}</Text>
                    <Text style={common003_01_styles.productInfo}>{`Qtd: ${productAmount}`}</Text>
                    <Text style={common003_01_styles.productInfo}>{`Unitário: ${formatMoneyValue(product.PrecoUnitario)}`}</Text>
                    <Text style={common003_01_styles.productInfo}>{`Total: ${formatMoneyValue(product.TotalLiquido)}`}</Text>
                </View>

                {/** CLIQUE DO LADO DIREITO */}
                <Pressable style={common003_01_styles.productContainerArrow} onPress={leftSwipe}>
                    <View>
                        {extraIconsRightOpen ? <CustomIcon icon={ICON_NAME.FLECHA_ESQUERDA} iconSize={18} /> : <CustomIcon icon={ICON_NAME.FLECHA_DIRETA} iconSize={18} />}
                    </View>
                </Pressable>

                {/** CONTEUDO EXIBIDO A DIREITA DE CADA ITEM DA LISTA */}
                {extraIconsRightOpen && (
                    <Pressable style={common003_01_styles.iconsRight}>
                        <CustomIcon icon={ICON_NAME.LIXEIRA} iconSize={22} iconColor="#0A3147" onPress={() => onDeleteProductClick(product.Id)} />
                        <CustomIcon icon={ICON_NAME.PAPEL_LISTA_CONTORNADO} iconSize={22} iconColor="#0A3147" onPress={() => showGuarantee(product.Id)} />
                        <CustomIcon icon={ICON_NAME.CAIXA_ARQUIVO_CONTORNADO} iconSize={22} iconColor="#0A3147" onPress={() => showLastSales(product.Id)} />
                    </Pressable>
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
                    <CS_003_01_02_ProductPvItemUltimasVendas close={() => downSwipeToLastSales()} />
                )}

                {extraBottomOpenGuarantee && (
                    <C_003_01_03_ProductPvItemGarantia close={() => downSwipeToGuarantee()} />
                )}
            </View>
        </Pressable>
    );
};

