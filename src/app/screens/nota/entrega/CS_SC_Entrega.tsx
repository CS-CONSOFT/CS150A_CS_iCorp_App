import { Button, FlatList, SafeAreaView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CustomHeaderInput from "../components/header/CustomHeaderInput";
import { ILoginResponse } from "../../login/ILoginResponse";
import { DataKey } from "../../../enum/DataKeys";
import { IGetDelivery, ISetEntrega } from "../../../services/api/interfaces/notas/CS_INotes";
import { InfoNota, Produto } from "../../../services/api/interfaces/notas/CS_Response";
import { getObjectDataVc, getUserProperties } from "../../../view_controller/SharedViewController";
import { getEntrgNotaVc, setEntrNotaVc } from "../../../view_controller/entrega/EntregaViewController";
import { stylesNotaEntrega } from "./StylesNotaEntrega";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";


const CS_SC_Entrega = () => {

    const [noteTyped, setNoteTyped] = useState("20240100000000108")
    const [products, setProducts] = useState<Produto[] | null>(null)
    const [noteInfo, setNoteInfo] = useState<InfoNota | null>(null)
    const [messageList, setMessageList] = useState('')
    const [userId, setUserId] = useState('')
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [errorMessage, setErrorMessage] = useState('');


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
            setStatus(FETCH_STATUS.LOADING)
            //buscando notas
            getEntrgNotaVc(iEntregaGet).then((res) => {
                if (res.info_Nota.dd040_id !== '') {
                    setStatus(FETCH_STATUS.SUCCESS)
                    setProducts(res.Produtos)
                    setNoteInfo(res.info_Nota)

                    if (res.info_Nota.result != '0') {
                        //definindo mensagem quando o result nao trouxer produtos da nota
                        setMessageWhenNoteIsAlreadyDelivered(res.info_Nota.result)
                    }

                } else {
                    setStatus(FETCH_STATUS.ERROR)
                    setErrorMessage("Falha ao buscar a nota")
                }
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
            setStatus(FETCH_STATUS.LOADING)
            const iSetEntrega: ISetEntrega = { dd40id, tenant, userIdentifier }
            setEntrNotaVc(iSetEntrega).then((ok) => {
                if (ok) {
                    searchNote()
                }
            })
        }
    }

    const loadingProducts = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS
    const error = status == FETCH_STATUS.ERROR

    if (loadingProducts) return <Text style={stylesNotaEntrega.loadingText}>Carregando produtos...</Text>
    if (error) return <Text style={stylesNotaEntrega.loadingText}>{errorMessage}</Text>


    return <>
        <SafeAreaView style={stylesNotaEntrega.modalContainer}>
            <CustomHeaderInput
                titleText="Chave Nota - Entrega Produtos"
                setValue={setNoteTyped}
                value={noteTyped}
                onPress={searchNote}
                buttonStyle={stylesNotaEntrega.button}
                textStyle={stylesNotaEntrega.text}

            />
        </SafeAreaView>

        <SafeAreaView style={stylesNotaEntrega.container}>
            {isSuccess && products && products.length > 0 && (
                <View style={stylesNotaEntrega.productContainer}>
                    <Button title="Confirmar Entrega" onPress={confirmDelivery} />
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductItem product={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}

            {isSuccess && (messageList !== '') && (
                <View style={stylesNotaEntrega.messageContainer}>
                    <Text style={stylesNotaEntrega.messageText}>{messageList}</Text>
                </View>
            )}
        </SafeAreaView>

    </>
}



const ProductItem = ({ product }: { product: any }) => {
    return (
        <View style={stylesNotaEntrega.container}>
            <Text style={stylesNotaEntrega.productName}>{product.DD060_Descricao}</Text>
        </View>
    );
};






export default CS_SC_Entrega;