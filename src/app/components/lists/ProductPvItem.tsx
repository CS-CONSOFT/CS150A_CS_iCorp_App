import { useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IProductItemModel } from "../../services/api/interfaces/prevenda/IPreVenda";
import { ICON_NAME } from "../../util/IconsName";
import CustomButton from "../button/CustomButton";
import CustomIcon from "../icon/CustomIcon";
import CustomInput from "../input/CustomInput";
import CustomSwitch from "../switch/CustomSwitch";
import { formatMoneyValue } from "../../util/FormatText";

//Item de produto que aparece na listagem
export const ProductPvItem = ({ product, onProductClick, onDeleteProductClick }:
    {
        product: IProductItemModel,
        onProductClick: (product: IProductItemModel) => void,
        onDeleteProductClick: (productId: string) => void
    }) => {

    const [dragX] = useState(new Animated.Value(0));
    const [dragY] = useState(new Animated.Value(0));

    const [extraIconsRightOpen, setExtraIconsRightOpen] = useState(false);
    const [extraBottomOpen, setExtraBottomOpen] = useState(false);

    const leftSwipe = () => {
        if (!extraBottomOpen) {
            const toValue = extraIconsRightOpen ? 0 : -5;
            Animated.timing(dragX, {
                toValue,
                duration: 150,
                useNativeDriver: true,
            }).start();
            setExtraIconsRightOpen(!extraIconsRightOpen);
        }
    };

    const downSwipe = () => {
        if (!extraIconsRightOpen) {
            const toValue = extraBottomOpen ? 0 : -15;
            Animated.timing(dragY, {
                toValue,
                duration: 150,
                useNativeDriver: false,
            }).start();
            setExtraBottomOpen(!extraBottomOpen);
        }
    };

    function itemProductClick(product: IProductItemModel) {
        onProductClick(product)
        downSwipe()
    }

    const animatedStyleX = {
        transform: [{ translateX: dragX }]
    };

    const animatedStyleY = {
        transform: [{ translateY: dragY }]
    };

    return (
        <Pressable onPress={() => itemProductClick(product)}>
            <Animated.View style={[styles.containerRenderItem, animatedStyleX, animatedStyleY, extraIconsRightOpen && styles.openContainerX]}>
                <View style={styles.productContainerLeft}>
                    <Image style={styles.productImage} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnT98rwKfnZngX2pDhX4EkbW-y0pUOCz9iCg&s' }} />
                </View>
                <View style={styles.productContainerRight}>
                    <Text style={styles.productName}>N° {product.Codigo}</Text>
                    <Text style={styles.productInfo}>{product.Descricao.slice(0, 20)}</Text>
                    <Text style={styles.productInfo}>{`Qtd: ${product.Quantidade}`}</Text>
                    <Text style={styles.productInfo}>{`Unitário: ${formatMoneyValue(product.PrecoUnitario)}`}</Text>
                    <Text style={styles.productInfo}>{`Total: ${formatMoneyValue(product.TotalLiquido)}`}</Text>
                </View>

                <Pressable style={styles.productContainerArrow} onPress={leftSwipe}>
                    <View>
                        {extraIconsRightOpen ? <CustomIcon icon={ICON_NAME.FLECHA_ESQUERDA} iconSize={18} /> : <CustomIcon icon={ICON_NAME.FLECHA_DIRETA} iconSize={18} />}
                    </View>
                </Pressable>

                {/** CONTEUDO EXIBIDO A DIREITA DE CADA ITEM DA LISTA */}
                {extraIconsRightOpen && (
                    <Pressable style={styles.iconsRight} onPress={() => onDeleteProductClick(product.Id)}>
                        <CustomIcon icon={ICON_NAME.LIXEIRA} iconSize={22} iconColor="#0A3147" />
                        <CustomIcon icon={ICON_NAME.PAPEL_LISTA_CONTORNADO} iconSize={22} iconColor="#0A3147" />
                        <CustomIcon icon={ICON_NAME.CAIXA_ARQUIVO_CONTORNADO} iconSize={22} iconColor="#0A3147" />
                    </Pressable>
                )}
            </Animated.View>

            {/** CONTEUDO EXIBIDO ABAIXO DE CADA ITEM DA LISTA */}
            {extraBottomOpen && (
                <View>
                    <View style={styles.extraBottomStyleSwitchs}>
                        <View>
                            <CustomSwitch title="Entregar" />
                            <CustomSwitch title="Requisitar" />
                        </View>
                        <View>
                            <CustomSwitch title="S. Negativo" />
                            <CustomSwitch title="Montar" />
                        </View>
                    </View>



                    <View style={styles.extraBottomStyleInputs}>
                        <Text style={styles.extraBottomStylePrecoVenda}>Preço Venda</Text>
                        <CustomInput>
                            <CustomInput.InputFormsAreaHandle textTitleIdentifier="precovenda" valueOfInput={product.TotalBruto.toString()} handleValueOfInput={() => { }} />
                        </CustomInput>
                    </View>



                    <View style={styles.extraBottomStyleInputs}>
                        <Text style={styles.extraBottomStylePrecoVenda}>Desconto</Text>
                        <CustomInput>
                            <CustomInput.InputFormsAreaHandle textTitleIdentifier="desconto" valueOfInput={product.TotalDesconto.toString()} handleValueOfInput={() => { }} />
                        </CustomInput>
                    </View>

                    <View style={[styles.extraBottomStyleContainer, styles.extraBottomStyleRow, styles.extraBottomStyleJustify]}>
                        <CustomButton title="Salvar" onPress={(done) => { done() }} buttonStyle={styles.extraBottomStyleBtnSalvar} textStyle={styles.extraBottomStyleTextButtonSave} />
                        <CustomButton title="Cancelar" onPress={(done) => { done() }} buttonStyle={styles.extraBottomStyleBtnCancelar} textStyle={styles.extraBottomStyleTextButtonCancel} />
                    </View>

                </View>
            )}
        </Pressable>
    );
};


const styles = StyleSheet.create({
    containerRenderItem: {
        borderRadius: 12,
        flexDirection: 'row',
        margin: 8,
        elevation: 4,
        height: 110
    },
    productContainerLeft: {
        width: 111,
        height: 'auto',
        backgroundColor: '#A3C5D9',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    productContainerRight: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#FFF',
        paddingLeft: 8
    },
    productImage: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333'
    },
    productInfo: {
        fontSize: 16,
        color: '#000'
    },
    btnNewSearch: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 16
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    leftSwipeAction: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    productContainerArrow: {
        width: 30,
        height: 'auto',
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12
    },
    openContainerX: {
        backgroundColor: '#95B5C7'
    },
    iconsRight: {
        backgroundColor: '#95B5C7',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    extraBottomStyleSwitchs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    extraBottomStylePrecoVenda: {
        color: "#0A3147",
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 21,
        marginLeft: 8
    },
    extraBottomStyleInputs: {
        marginLeft: 32,
        marginBottom: 8
    },
    extraBottomStyleBtnSalvar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#E3E3E3',
    },
    extraBottomStyleBtnCancelar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        backgroundColor: '#FFF',
    },
    extraBottomStyleTextButtonSave: {
        fontWeight: '600',
        fontSize: 16
    },
    extraBottomStyleTextButtonCancel: {
        fontWeight: '600',
        fontSize: 16,
        color: "#1068EB"
    },
    extraBottomStyleRow: {
        flexDirection: 'row'
    },
    extraBottomStyleJustify: {
        justifyContent: 'space-evenly'
    },
    extraBottomStyleContainer: {
        padding: 16
    }
});

