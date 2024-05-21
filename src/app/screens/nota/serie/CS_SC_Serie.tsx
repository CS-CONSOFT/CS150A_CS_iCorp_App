
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
            setNewCorSerieVc(iSetNewCorSerie).then(()=>{
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
                buttonStyle={styles.buttonStyle}
                textStyle={styles.textStyle}
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
            onCloseButton={()=>{setShowPopUp(false)}}
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
            <View style={styles.container}>
                <Text style={styles.text}>{productItemProps.product.DD060_Descricao}</Text>
                <Text style={styles.text}>Cor Série {productItemProps.product.DD060_Cor_Serie_Merc}</Text>
                <CustomButton
                    title="Alterar Cor Série"
                    onPress={() => productItemProps.onPress(productItemProps.product)}
                    buttonStyle={styles.buttonStyleList}
                    textStyle={styles.textStyle}></CustomButton>
            </View>
        </View>

    );
};



/** ESTILOS */
const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    }, buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 32
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonStyleList: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        margin: 32
    },
});
export default CS_SC_Serie;