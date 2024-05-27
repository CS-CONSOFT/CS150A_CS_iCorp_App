
import { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import CustomButton from "../../../components/button/CustomButton";
import Separator from "../../../components/lists/Separator";
import CustomAlertDialog from "../../../components/modal/CustomAlertDialog";
import { IGetDelivery, ISetCorSerie } from "../../../services/api/interfaces/notas/CS_INotes";
import { Produto } from "../../../services/api/interfaces/notas/CS_Response";
import { getUserProperties } from "../../../view_controller/SharedViewController";
import { getNoteSeriesVc, setNewCorSerieVc } from "../../../view_controller/serie/SerieNotaViewController";
import CustomHeaderInput from "../components/header/CustomHeaderInput";
import { stylesNotaSerie } from "./StylesNotaSerie";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";




const CS_SC_Serie = () => {

    const [noteTyped, setNoteTyped] = useState("20240100000000108")
    const [products, setProducts] = useState(Object)
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [showPopUp, setShowPopUp] = useState(false)
    const [currentProductSelected, setCurrentProductSelected] = useState<Produto>()
    const [errorMessage, setErrorMessage] = useState('');


    async function search() {
        const note = noteTyped;
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            const iEntregaGet: IGetDelivery = { note, tenant }
            setStatus(FETCH_STATUS.LOADING)
            getNoteSeriesVc(iEntregaGet).then((res) => {
                if (res.Produtos != undefined) {
                    setStatus(FETCH_STATUS.SUCCESS)
                    setProducts(res.Produtos)
                } else {
                    setStatus(FETCH_STATUS.ERROR)
                    setErrorMessage("Falha ao buscar a nota")
                }
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


    const loadingProducts = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS
    const error = status == FETCH_STATUS.ERROR

    if (loadingProducts) return <Text>Carregando produtos...</Text>
    if (error) return <Text>{errorMessage}</Text>


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

            {isSuccess && products.length > 0 && (
                <FlatList
                    ItemSeparatorComponent={Separator}
                    data={products}
                    renderItem={({ item }) => (
                        <ProductItem productItemProps={{ product: item, onPress: switchShowPopUp }} />
                    )}
                    keyExtractor={(index) => index.toString()}
                />

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