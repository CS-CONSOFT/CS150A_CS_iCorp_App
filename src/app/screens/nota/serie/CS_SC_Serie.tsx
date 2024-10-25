import React, { useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ColorStyle from "../../../ColorStyle";
import { commonStyle } from "../../../CommonStyle";
import CustomCard_001 from "../../../components/cards/CustomCard_001";
import CustomEmpty from "../../../components/lists/CustomEmpty";
import CustomAlertDialog from "../../../components/modal/CustomAlertDialog";
import CustomSearch from "../../../components/search/CustomSearch";
import { IResDadosNota, Produtos } from "../../../services/api/interfaces/notas/CS_IResNoteData";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { ToastType, showToast } from "../../../util/ShowToast";
import { getNoteSeriesVc, setNewCorSerieVc } from "../../../view_controller/serie/SerieNotaViewController";
import { stylesNotaEntrega } from "../entrega/StylesNotaEntrega";
import { stylesNotaSerie } from "./StylesNotaSerie";
import CustomIcon from "../../../components/icon/CustomIcon";
import { ICON_NAME } from "../../../util/IconsName";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const CS_SC_Serie = () => {

    const [nota, setNota] = useState<IResDadosNota>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [showPopUp, setShowPopUp] = useState(false)
    const [currentProductSelected, setCurrentProductSelected] = useState<Produtos>()
    const [currentNoteTyped, setCurrentNoteTyped] = useState('')
    const { navigate } = useNavigation()

    async function search(value: string) {
        const note = value;

        setStatus(FETCH_STATUS.LOADING)
        try {
            getNoteSeriesVc(note).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                setCurrentNoteTyped(value)
                setNota(res)
            }).catch((err) => {
                navigate('Menu')
                showToast(ToastType.ERROR, err.code, err.response.data.Errors[0])
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error)
        }

    }

    function handlePopUp(product?: Produtos) {
        setCurrentProductSelected(product)
        setShowPopUp(!showPopUp)
        if (showPopUp) {
            search(currentNoteTyped)
        }
    }


    const loadingProducts = status == FETCH_STATUS.LOADING

    function handleRefreshList(): void {
        search(currentNoteTyped)
    }

    return <SafeAreaView>
        <CustomSearch
            placeholder="Chave Nota"
            onSearchPress={(value) => search(value)}
            clickToSearch={true}
            keyboartType='numeric'
            showCamera={true}
            previusScreen="Serie"
        />

        {loadingProducts && (
            <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
        )}

        {nota?.Produtos === undefined && (
            <CustomEmpty text={"Pesquise por uma nota"} />
        )}


        {nota?.Produtos !== undefined && nota.Produtos.length === 0 && (
            <CustomEmpty text={"Nota sem produtos"} />
        )}


        <View>
            <FlatList
                data={nota?.Produtos}
                refreshing={loadingProducts}
                onRefresh={handleRefreshList}
                ListEmptyComponent={<CustomEmpty text={"Não encontrado"} />}
                renderItem={({ item }) => (
                    <CustomCard_001 title={item.DD060_Descricao} children={
                        <ProductItem productItemProps={{ product: item, onPress: (product) => handlePopUp(product) }} />
                    } />
                )
                }
                keyExtractor={(item) => item.DD060_Id.toString()}
            />
        </View>

        <CustomAlertDialog
            isVisible={showPopUp}
            onDismiss={() => setShowPopUp(false)}
            children={<AlertDialog item={currentProductSelected!} onClose={(produto) => handlePopUp(produto)} />}
        />


    </SafeAreaView>

}

const AlertDialog = ({ item, onClose }: { item: Produtos, onClose: (produto: Produtos) => void }) => {
    const [isBtnLoading, setIsBtnLoading] = useState(false)
    const [CorSerie, setCorSerie] = useState('')

    async function setNewCorSerie() {
        setIsBtnLoading(true)
        try {
            setNewCorSerieVc(item.DD060_Id, CorSerie).then(() => {
                setIsBtnLoading(false)
                onClose(item)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "ERROR", error)
            onClose(item)
        }
    }


    return (
        <View style={stylesNotaSerie.dialog}>
            <View>
                <CustomIcon icon={ICON_NAME.FECHAR} style={{ marginLeft: 'auto' }} iconSize={32} onPress={onClose} />
            </View>


            <View style={[commonStyle.common_rowItem, commonStyle.align_spacebetween_row, commonStyle.common_margin_left_16, commonStyle.common_padding_08]}>
                <Text style={stylesEntregaCard.tituloCard}></Text>
                <View style={[stylesEntregaCard.contentContanier, commonStyle.common_columnItem]}>
                    <View style={stylesEntregaCard.contentContenierSmall}>
                        <Text style={[stylesEntregaCard.itemCard, commonStyle.font_size_16]}>{item.DD060_Descricao}</Text>
                        <Text style={[stylesEntregaCard.tituloCard, commonStyle.font_size_16]}>Número Cor/Série atual: {item.DD060_Cor_Serie_Merc || '-'}</Text>
                        <TextInput
                            style={commonStyle.common_input}
                            placeholder="Novo Cor/Série --- Ex. 267"
                            keyboardType='number-pad'
                            onChangeText={setCorSerie}
                            value={CorSerie}
                        />
                        <TouchableOpacity style={commonStyle.common_button_style} onPress={() => setNewCorSerie()}>
                            {isBtnLoading ? <ActivityIndicator color={"#0A3147"} /> : <Text style={commonStyle.common_text_button_style}>Salvar</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyle.align_centralizar}>
                </View>
            </View>
        </View>
    )
}


/** ITEM DA LISTA */
interface ProductItemProps {
    product: Produtos;
    onPress: (product: Produtos) => void;
}

const ProductItem = ({ productItemProps }: { productItemProps: ProductItemProps }) => {
    return (
        <View style={[commonStyle.common_rowItem, commonStyle.align_spacebetween_row, commonStyle.common_margin_left_16, commonStyle.common_padding_08]}>
            <Text style={stylesEntregaCard.tituloCard}></Text>
            <View style={[stylesEntregaCard.contentContanier, commonStyle.common_columnItem]}>
                <View style={stylesEntregaCard.contentContenierSmall}>
                    <Text style={[stylesEntregaCard.tituloCard]}>Número Cor/Série</Text>
                </View>
                <Text style={[stylesEntregaCard.tituloCard, commonStyle.font_size_18]}>{productItemProps.product.DD060_Cor_Serie_Merc || '-'}</Text>
            </View>
            <View style={commonStyle.align_centralizar}>
                <CustomIcon icon={ICON_NAME.EDITAR} onPress={() => productItemProps.onPress(productItemProps.product)} />
            </View>
        </View>

    );
};

const stylesEntregaCard = StyleSheet.create({
    contentContanier: {

        height: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10
    },
    contentContenierSmall: {
        alignItems: "center",
        justifyContent: "center"
    },
    tituloCard: {
        fontWeight: "700",
        marginBottom: 8
    },
    itemCard: {
        fontWeight: "700",
        marginBottom: 8,
        color: "#0A3147"
    }
})


export default CS_SC_Serie;