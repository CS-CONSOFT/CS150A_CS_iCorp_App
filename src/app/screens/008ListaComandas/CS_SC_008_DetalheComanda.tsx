import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, Text, View } from "react-native";
//Componentes
import { ButtonActionTransparent } from "../../components/button/CustomButtonAcyionTransparent";
import { ButtonLink } from "../../components/button/CustomButtonLink";
import { ButtonActionSecondary } from "../../components/button/CustonButtonActionSecondary";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
//Estilo
import { commonStyle } from "../../CommonStyle";
import { stylesConsultaProduto } from "../004produtos/ConsultaProdutoStyles";
//Icons
import { ICON_NAME } from "../../util/IconsName";
//DataFake
//Navegação
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//Interface
import React from "react";
import BottomContanier from "../../components/BottomContanier/bottomContanier";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomLoading from "../../components/loading/CustomLoading";
import { IReqUpdateQtdComanda } from "../../services/api/interfaces/comanda/CS_IReqUpdateQtdComandaProd";
import { CS_IResComandaById, Produtos_comanda } from "../../services/api/interfaces/comanda/CS_IResComandaById";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatMoneyValue } from "../../util/FormatText";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleDeleteProdutoComanda, handleGetComanda, handleUpdateQuantidadeProdutoComanda } from "../../view_controller/comanda/CS_ComandaViewController";
import { common003_01_styles } from "../003prevenda/003_01_produto/components/CommonStyles";



const CS_SC_008_DetalheComanda = ({ route }: { route: any }) => {
    const navigation = useNavigation();

    const [comanda, setComanda] = useState<CS_IResComandaById>()
    const [somaComanda, setSomaComanda] = useState<number>(0);

    const { comandaId } = route.params
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)



    function getListComanda() {
        setStatus(FETCH_STATUS.LOADING)
        handleGetComanda({ comandaId: comandaId }).then((res) => {
            setComanda(res)
            setStatus(FETCH_STATUS.SUCCESS)
        }).catch((err) => {
            navigation.navigate('Menu')
            showToast(ToastType.ERROR, err.code, err.response.data.Errors[0])
        })
    }

    useFocusEffect(
        useCallback(() => {
            getListComanda()
        }, [])
    )

    if (status === FETCH_STATUS.LOADING) {
        return <CustomLoading />
    }
    return <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={[commonStyle.common_rowItem, commonStyle.align_spacebetween_row, commonStyle.common_margin_horizontal]}>
            <Text style={[commonStyle.title_accordion, commonStyle.font_size_18]}>Produtos</Text>
            <ButtonLink
                onPress={
                    () => navigation.navigate("Consulta_Produtos", { cameFromPv: false, insertComanda: true, comandaId: comandaId })
                }
                label={"Adicionar"}
            />
        </View>
        <FlatList
            data={comanda?.produtos_comanda || []}
            ListEmptyComponent={<CustomEmpty text={"Nenhum produto encontrada"} />}
            keyExtractor={(item) => item.csicp_gg008.Id}
            renderItem={({ item }) =>
                <BottomContanier
                    children={
                        <ProductItem
                            product={item}
                        />
                    }
                    image={<ImageProductItem img={item.Imagens[0].gg008c_Path} />}
                    rightItem={
                        <RightItem
                            click={() => {
                                setStatus(FETCH_STATUS.LOADING)
                                handleDeleteProdutoComanda({ tt011id: item.csicp_tt011.tt011_Id }).then(() => {
                                    getListComanda()
                                }).catch(() => {
                                    setStatus(FETCH_STATUS.IDLE)
                                })
                            }}
                        />
                    }

                    bottomItem={
                        /* Container que abre embaixo ao pressionar o componente */
                        <BottomQuatidade refresh={getListComanda} item={item} />
                    }
                />
            }

        />
    </SafeAreaView>
}

export default CS_SC_008_DetalheComanda;


// Componente de exibição da imagem do produto
const ImageProductItem = ({ img }: { img?: string }) => {
    return (
        <>
            {img === undefined && (
                <Image style={commonStyle.productImage}
                    source={require("../../../../assets/imgnaodisp.jpg")} />
            )}

            {img !== undefined && (
                <Image style={commonStyle.productImage}
                    source={{ uri: img }} />
            )}
        </>

    );
}

// Componente de exibição das informações do produto
const ProductItem = ({ product }: { product: Produtos_comanda }) => {
    return (
        <View style={commonStyle.justify_content_space_btw}>
            <Text style={stylesConsultaProduto.productCode}>{`Nº ${product.csicp_gg008.GG008_CodgProduto}`}</Text>
            <Text>{product.csicp_gg008.GG008_DescReduzida}</Text>
            <Text>{formatMoneyValue(product.csicp_tt011.tt011_pVenda || 0)}</Text>
            <Text>Qtd: {product.csicp_tt011.tt011_qVendida}</Text>
        </View>
    )
}

// Componente do botão direito para adicionar o produto à pré-venda
const RightItem = ({ click }: { click: () => void }) => {
    return (
        <View style={stylesConsultaProduto.rightIcons}>
            <Pressable onPress={click}>
                <CustomIcon icon={ICON_NAME.LIXEIRA} />
            </Pressable>
        </View>
    )
}

/*
({item}) => <CardQuantidade product={item}/>
*/

const BottomQuatidade = ({ item, refresh }: { item: Produtos_comanda, refresh: () => void }) => {

    const [qtd, setQtd] = useState(item.csicp_tt011.tt011_qVendida)
    const [isLoading, setIsLoading] = useState(false)

    function updateQtd() {
        setIsLoading(true)
        const dataUpdate: IReqUpdateQtdComanda = {
            in_qtd: qtd,
            tt010_id: item.csicp_tt011.tt010_id,
            tt011_id: item.csicp_tt011.tt011_Id,
            tt011_p_venda: item.csicp_tt011.tt011_pVenda,
            tt011_saldo_id: item.csicp_tt011.tt011_SaldoID,
            tt011qVendida: item.csicp_tt011.tt011_qVendida
        }
        handleUpdateQuantidadeProdutoComanda({ cs_update_qtd: dataUpdate }).then(() => {
            setIsLoading(false)
            refresh()
        })
    }

    return (
        <View>
            <View>
                <Text style={[common003_01_styles.extraBottomStyleTitles, commonStyle.common_margin_bottom_8]}>Quantidade</Text>
                <CustomSeparator />
                <View style={[common003_01_styles.extraBottomStyleAmount, commonStyle.common_margin_vertical]}>
                    <CustomIcon icon={'add-circle-outline'} iconSize={36} onPress={() => setQtd(qtd + 1)} />
                    <Text style={common003_01_styles.extraBottomStyleChilds}>{qtd}</Text>
                    <CustomIcon icon={'remove-circle-outline'} iconSize={36} onPress={() => setQtd(qtd - 1)} />
                </View>
            </View>
            <>
                {isLoading && (
                    <ActivityIndicator />
                )}
            </>

            {!isLoading && (
                <View style={[commonStyle.common_rowItem, commonStyle.align_start_spaceAround_center]}>
                    <ButtonActionSecondary label={"Salvar"} onPress={() => updateQtd()} />
                    <ButtonActionTransparent label={"Cancela"} onPress={() => ""} />
                </View>
            )}

        </View>
    )
}

