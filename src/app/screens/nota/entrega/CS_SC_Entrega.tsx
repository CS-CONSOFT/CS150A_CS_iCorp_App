import { FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ILoginResponse } from "../../001login/ILoginResponse";
import { DataKey } from "../../../enum/DataKeys";
import { getObjectDataVc, getUserProperties } from "../../../view_controller/SharedViewController";
import { getEntrgNotaVc, setEntrNotaVc } from "../../../view_controller/entrega/EntregaViewController";
import { stylesNotaEntrega } from "./StylesNotaEntrega";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { IResInfoNota, IResNotaProdutoItem } from "../../../services/api/interfaces/notas/CS_IResNoteData";
import { IReqSetDelivery } from "../../../services/api/interfaces/notas/CS_IReqSetDelivery";
import { IReqGetDelivery } from "../../../services/api/interfaces/notas/CS_IReqGetDelivery";
import CustomEmpty from "../../../components/lists/CustomEmpty";

import ColorStyle from "../../../ColorStyle";

//Componentes
import CustomSearch from "../../../components/search/CustomSearch";
import ButtonActionBlue from "../../../components/button/CustomButtonActionBlue";
import CustomCard_001 from "../../../components/cards/CustomCard_001";
import { CustomBottomContanier } from "../../../components/bottomItem/CustomBottomContanier";

const CS_SC_Entrega = () => {

    const [noteTyped, setNoteTyped] = useState("20240100000000108")
    const [products, setProducts] = useState<IResNotaProdutoItem[] | null>(null)
    const [noteInfo, setNoteInfo] = useState<IResInfoNota | null>(null)
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
    async function searchNote(value: string) {
        //criando objeto para enviar
        setNoteTyped(value)


        const tenant = (await getUserProperties()).tenantId;
        if (tenant != undefined) {
            //enviando o objeto
            const iEntregaGet: IReqGetDelivery = { note: noteTyped, tenant }
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
            const iSetEntrega: IReqSetDelivery = { dd40id, tenant, userIdentifier }
            setEntrNotaVc(iSetEntrega).then((ok) => {
                if (ok) {
                    searchNote(noteTyped)
                }
            })
        }
    }

    const loadingProducts = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS
    const error = status == FETCH_STATUS.ERROR

    if (loadingProducts) return <Text style={stylesNotaEntrega.loadingText}>Carregando produtos...</Text>
    if (error) return <Text style={stylesNotaEntrega.loadingText}>{errorMessage}</Text>



    return <SafeAreaView style={[stylesNotaEntrega.modalContainer, {height: "100%"}]}>
        <CustomSearch
            placeholder="Pesquisar Nota"
            onSearchPress={(value) => searchNote(value)}
            clickToSearch={true}
        />


        {isSuccess && products && products.length > 0 && (
            <View style={stylesNotaEntrega.productContainer}>
                <FlatList
                    data={products}
                    ListEmptyComponent={<CustomEmpty text={"Nenhuma entrega encontrada"} />}
                    renderItem={(product: any) => <CustomCard_001 title={product.DD060_Descricao} children={
                        <EntregaCardLeft modo={"Balcão"} quantidade={1} />
                    } />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <CustomBottomContanier
                    show={false}
                    text={"Confirmar entrega"}
                    onPress={confirmDelivery}
            
                />
            </View>
        )}

        {isSuccess && (messageList !== '') && (
            <View style={stylesEntregaCard.contentContanier}>
                <Text style={styles.messageNot}>{messageList}</Text>
            </View>
        )}
        {/* RETIRAR!! SO PARA VISUALIZAR ENQUANTO NAO POPULA OS DADOS */}
        <CustomCard_001
            title={"exemplo"}
            children={<EntregaCardLeft modo={"Balcão"} quantidade={1} />}
        />
            
        <View style={styles.btnContenier}>
            <ButtonActionBlue text={"Confirmar entrega!"} onPress={confirmDelivery} />
        </View>
        {/*************************************************************/}
    </SafeAreaView>
}


export default CS_SC_Entrega;

const ProductItem = ({ product }: { product: any }) => {
    return (
        <View style={stylesNotaEntrega.container}>
            <Text style={stylesNotaEntrega.productName}>{product.DD060_Descricao}</Text>
        </View>
    );
};


const EntregaCardLeft = ({ modo, quantidade }: { modo: string, quantidade: number }) => {
    return (
        <View style={stylesEntregaCard.contentContanier}>
            <View style={stylesEntregaCard.contentContenierSmall}>
                <Text style={stylesEntregaCard.tituloCard}>Modo Entrega</Text>
                <Text>{modo}</Text>
            </View>
            <View style={stylesEntregaCard.contentContenierSmall}>
                <Text style={stylesEntregaCard.tituloCard}>Quantidade</Text>
                <Text>{quantidade}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    btnContenier: {
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#CCCCCC",
        height: "12%",
        width: "100%",

    },
    centerContenie: {
        width: "100%",
        height: "80%",
        flexDirection: "column",
    },
    messageNot: {
        color: ColorStyle.colorneutrais400,
        fontSize: 16,
        fontWeight: "600"
    }
})

const stylesEntregaCard = StyleSheet.create({
    contentContanier: {
        width: "100%",
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
    }
})