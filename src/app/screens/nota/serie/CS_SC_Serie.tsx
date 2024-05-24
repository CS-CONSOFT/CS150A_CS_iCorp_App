
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";


import CustomButton from "../../../components/button/CustomButton";
import Separator from "../../../components/lists/Separator";
import CustomAlertDialog from "../../../components/modal/CustomAlertDialog";
import CustomHeaderInput from "../components/header/CustomHeaderInput";
import { getUserProperties } from "../../../view_controller/SharedViewController";
import { getNoteSeriesVc, setNewCorSerieVc } from "../../../view_controller/serie/SerieNotaViewController";
import { Produto } from "../../../services/api/interfaces/notas/CS_Response";
import { IGetDelivery, ISetCorSerie } from "../../../services/api/interfaces/notas/CS_INotes";
import { stylesNotaSerie } from "./StylesNotaSerie";




const CS_SC_Serie = () => {

    const [noteTyped, setNoteTyped] = useState("20240100000000108")
    const [products, setProducts] = useState(Object)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [currentProductSelected, setCurrentProductSelected] = useState<Produto>()


    async function search() {
        const note = noteTyped;
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            const iEntregaGet: IGetDelivery = { note, tenant }

            setLoadingProducts(true)
            getNoteSeriesVc(iEntregaGet).then((res) => {
                setProducts(res.Produtos)
                setLoadingProducts(false)
            })
        }
    }


    const showDialog = () => setShowPopUp(true);

    function switchShowPopUp(product: Produto) {
        showDialog()
        setCurrentProductSelected(product)
    }

    async function setNewCorSerie(newSerie: string) {
        const productId = currentProductSelected?.DD060_Id
        const newCorSerie = newSerie;
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            const iSetNewCorSerie: ISetCorSerie = { productId, tenant, newCorSerie }
            setNewCorSerieVc(iSetNewCorSerie).then(() => {
                search()
                setShowPopUp(false);
            })
        }
    }


    return <>
        <SafeAreaView>
            <CustomHeaderInput
                titleText="Chave Nota"
                setValue={setNoteTyped}
                value={noteTyped}
                onPress={search}
                buttonStyle={stylesNotaSerie.buttonStyle}
                textStyle={stylesNotaSerie.textStyle}
            >
            </CustomHeaderInput>
            <Text>Insira uma nota para buscar produtos</Text>

            {products !== undefined && products.length > 0 && (

                <FlatList
                    ItemSeparatorComponent={Separator}
                    data={products}
                    renderItem={({ item }) => (
                        <ProductItem productItemProps={{ product: item, onPress: switchShowPopUp }} />
                    )}
                    keyExtractor={(index) => index.toString()}
                />

            )}

            {loadingProducts === true && (
                <Text>Carregando produtos...</Text>
            )}

        </SafeAreaView>


        <CustomAlertDialog
            isVisible={showPopUp}
            onDismiss={() => setShowPopUp(false)}
            title={currentProductSelected?.DD060_Cor_Serie_Merc || ''}
            onSave={(newSerie) => setNewCorSerie(newSerie)}
            onCloseButton={() => { setShowPopUp(false) }}
        />

    </>
}



/** ITEM DA LISTA */
interface ProductItemProps {
    product: Produto;
    onPress: (product: Produto) => void;
}

const ProductItem = ({ productItemProps }: { productItemProps: ProductItemProps }) => {
    return (

        <View>
            <View style={stylesNotaSerie.container}>
                <Text style={stylesNotaSerie.text}>{productItemProps.product.DD060_Descricao}</Text>
                <Text style={stylesNotaSerie.text}>Cor Série {productItemProps.product.DD060_Cor_Serie_Merc}</Text>
                <CustomButton
                    title="Alterar Cor Série"
                    onPress={() => productItemProps.onPress(productItemProps.product)}
                    buttonStyle={stylesNotaSerie.buttonStyleList}
                    textStyle={stylesNotaSerie.textStyle}></CustomButton>
            </View>
        </View>

    );
};




export default CS_SC_Serie;