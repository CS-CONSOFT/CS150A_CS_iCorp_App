import React, { lazy, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { commonStyle } from "../../../CommonStyle";
import { ButtonActionSecondary } from "../../../components/button/CustonButtonActionSecondary";
import CustomEmpty from "../../../components/lists/CustomEmpty";
import CustomSearch from "../../../components/search/CustomSearch";
import { IResNotaProdutoItem } from "../../../services/api/interfaces/notas/CS_IResNoteData";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { getNoteSeriesVc, setNewCorSerieVc } from "../../../view_controller/serie/SerieNotaViewController";
import { stylesNotaEntrega } from "../entrega/StylesNotaEntrega";
import { stylesNotaSerie } from "./StylesNotaSerie";

const CustomHeaderInput = lazy(() => import("../components/header/CustomHeaderInput"))
const CustomAlertDialog = lazy(() => import("../../../components/modal/CustomAlertDialog"))



const CS_SC_Serie = () => {

    const [noteTyped, setNoteTyped] = useState("20240100000000108")
    const [products, setProducts] = useState(Object)
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [showPopUp, setShowPopUp] = useState(false)
    const [currentProductSelected, setCurrentProductSelected] = useState<IResNotaProdutoItem>()
    const [errorMessage, setErrorMessage] = useState('');


    async function search(value: string) {
        const note = value;
        setStatus(FETCH_STATUS.LOADING)
        getNoteSeriesVc(note).then((res) => {
            if (res !== undefined && res.Produtos != undefined) {
                setStatus(FETCH_STATUS.SUCCESS)
                setProducts(res.Produtos)
            } else {
                setStatus(FETCH_STATUS.ERROR)
                setErrorMessage("Falha ao buscar a nota")
            }
        })
    }

    async function setNewCorSerie(newSerie: string) {
        const productId = currentProductSelected?.DD060_Id
        const newCorSerie = newSerie;
        setNewCorSerieVc(productId!, newCorSerie).then(() => {
            search('')
            setShowPopUp(false);
        })
    }


    const loadingProducts = status == FETCH_STATUS.LOADING
    const error = status == FETCH_STATUS.ERROR

    if (loadingProducts) return <Text>Carregando produtos...</Text>
    if (error) return <Text>{errorMessage}</Text>


    return <SafeAreaView>
        <CustomSearch
            placeholder="Chave Nota"
            onSearchPress={(value) => search(value)}
            clickToSearch={true}
        />

        <View style={stylesNotaEntrega.productContainer}>
            <FlatList
                data={products}
                ListEmptyComponent={<CustomEmpty text={"Nenhuma entrega encontrada"} />}
                renderItem={({ item }) => (
                    <ProductItem productItemProps={{ product: item, onPress: () => { } }} />
                )}
                keyExtractor={(index) => index.toString()}
            />
        </View>

        <CustomAlertDialog
            isVisible={showPopUp}
            onDismiss={() => setShowPopUp(false)}
            children={<AlertDialog />}
        />

    </SafeAreaView>

}

const AlertDialog = () => {
    return (
        <View style={stylesNotaSerie.dialog}>
            <></>
        </View>
    )
}


/** ITEM DA LISTA */
interface ProductItemProps {
    product: IResNotaProdutoItem;
    onPress: (product: IResNotaProdutoItem) => void;
}

const ProductItem = ({ productItemProps }: { productItemProps: ProductItemProps }) => {
    return (

        <View style={[commonStyle.common_margin_horizontal, commonStyle.card_white_shadow]}>
            <Text style={stylesNotaSerie.titleNota}>{productItemProps.product.DD060_Descricao}</Text>
            <Text style={stylesNotaSerie.text}>Cor Série {productItemProps.product.DD060_Cor_Serie_Merc}</Text>
            <ButtonActionSecondary label={"Alterar cor série"} onPress={() => productItemProps.onPress(productItemProps.product)} />
        </View>

    );
};


export default CS_SC_Serie;