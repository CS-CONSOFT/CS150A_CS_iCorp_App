import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";

import { IGetDelivery, ISetEntrega } from "../../../../services/api/interfaces/notas/CS_INotes";

import CustomHeaderInput from "../components/header/CustomHeaderInput";

import { ILoginResponse } from "../../login/ILoginResponse";

import { InfoNota, Produto } from "../../../../services/api/interfaces/notas/CS_Response";
import { getObjectDataVc, getUserProperties } from "../../../view_controller/SharedViewController";
import { getEntrgNotaVc, setEntrNotaVc } from "../../../view_controller/entrega/EntregaViewController";
import { IGetUserProperties } from "../../../view_controller/interface/IGetUserProperties";
import { DataKey } from "../../../enum/DataKeys";


const CS_SC_Entrega = () => {

    const [noteTyped, setNoteTyped] = useState("20240100000000108")
    const [products, setProducts] = useState<Produto[] | null>(null)
    const [noteInfo, setNoteInfo] = useState<InfoNota | null>(null)
    const [messageList, setMessageList] = useState('')
    const [userId, setUserId] = useState('')
    const [loadingProducts, setLoadingList] = useState(false)


    useEffect(() => {
        getObjectDataVc(DataKey.LoginResponse).then((res) => {
            const result = res as ILoginResponse
            setUserId(result.UserID.toString())
        })
    }, [])


    //funcao para pesquisar nota
    async function searchNote() {
        //criando objeto para enviar
        const note = noteTyped;
        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            //enviando o objeto
            const iEntregaGet: IGetDelivery = { note, tenant }
            //setando loading
            setLoadingList(true)
            //buscando notas
            getEntrgNotaVc(iEntregaGet).then((res) => {
                setLoadingList(false)

                setProducts(res.Produtos)
                setNoteInfo(res.info_Nota)

                //definindo mensagem quando o result nao trouxer produtos da nota
                setMessageWhenNoteIsAlreadyDelivered(res.info_Nota.result)
            })
        }
    }

    //funcao para setar a mensagem quando nao houver produtos na nota
    function setMessageWhenNoteIsAlreadyDelivered(result: string) {
        switch (result) {
            case '-1':
                setMessageList("Todos os produtos desta nota foram entregues.")
                break;
            case '-2':
                setMessageList("Nota ainda não foi faturada.")
                break;
            case '-3':
                setMessageList("Esta Nota está Cancelada.")
                break;
            case '-4':
                setMessageList("Nota não encontrada.")
                break;
            default:
                break;
        }
    }

    //funcao para confirmar entrega dos produtos da nota
    async function confirmDelivery() {

        const dd40id = noteInfo?.dd040_id;
        const tenant = (await getUserProperties()).tenantId;
        const userIdentifier = userId;
        if (tenant != undefined) {
            const iSetEntrega: ISetEntrega = { dd40id, tenant, userIdentifier }
            setEntrNotaVc(iSetEntrega).then((ok) => {
                if (ok) {
                    searchNote()
                }
            })
        }
    }

    return <>
        <SafeAreaView style={styles.modalContainer}>
            <CustomHeaderInput
                titleText="Chave Nota - Entrega Produtos"
                setValue={setNoteTyped}
                value={noteTyped}
                onPress={searchNote}
                buttonStyle={styles.button}
                textStyle={styles.text}

            />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
            {loadingProducts && <Text style={styles.loadingText}>Carregando produtos...</Text>}

            {loadingProducts === false && products && products.length > 0 && (
                <View style={styles.productContainer}>
                    <Button title="Confirmar Entrega" onPress={confirmDelivery} />
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductItem product={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}

            {loadingProducts === false && (messageList !== '0') && (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{messageList}</Text>
                </View>
            )}
        </SafeAreaView>

    </>
}



const ProductItem = ({ product }: { product: any }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.productName}>{product.DD060_Descricao}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
    productContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    productItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    productText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    messageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 16,
        color: '#FF5733',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 32
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});




export default CS_SC_Entrega;