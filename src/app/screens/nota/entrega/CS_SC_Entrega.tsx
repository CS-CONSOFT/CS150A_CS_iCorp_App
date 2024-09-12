import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { ILoginResponse } from "../../001login/ILoginResponse";
import { DataKey } from "../../../enum/DataKeys";
import { getObjectDataVc, getUserProperties } from "../../../view_controller/SharedViewController";
import { getEntrgNotaVc, setEntrNotaVc } from "../../../view_controller/entrega/EntregaViewController";
import { stylesNotaEntrega } from "./StylesNotaEntrega";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { IReqSetDelivery } from "../../../services/api/interfaces/notas/CS_IReqSetDelivery";
import { IReqGetDelivery } from "../../../services/api/interfaces/notas/CS_IReqGetDelivery";
import CustomEmpty from "../../../components/lists/CustomEmpty";

import ColorStyle from "../../../ColorStyle";

//Componentes
import CustomSearch from "../../../components/search/CustomSearch";
import ButtonActionBlue from "../../../components/button/CustomButtonActionBlue";
import CustomCard_001 from "../../../components/cards/CustomCard_001";
import { CustomBottomContanier } from "../../../components/bottomItem/CustomBottomContanier";
import { commonStyle } from "../../../CommonStyle";
import { Info_Nota, Produtos } from "../../../services/api/interfaces/notas/CS_IResNoteData";
import { useNavigation } from "@react-navigation/native";
import { ToastType, showToast } from "../../../util/ShowToast";


const CS_SC_Entrega = () => {

    const [noteTyped, setNoteTyped] = useState("")
    const [products, setProducts] = useState<Produtos[]>()
    const [noteInfo, setNoteInfo] = useState<Info_Nota>()
    const [messageList, setMessageList] = useState('')
    const [userId, setUserId] = useState('')
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [errorMessage, setErrorMessage] = useState('');
    const [isBtnLoading, setIsBtnLoading] = useState(false)
    const { navigate } = useNavigation()

    useEffect(() => {
        setIsBtnLoading(false)
        getObjectDataVc(DataKey.LoginResponse).then((res) => {
            const result = res as ILoginResponse
            setUserId(result.UsuarioId.toString())
        })
    }, [])


    //funcao para pesquisar nota
    async function searchNote(value: string) {
        try {
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
                }).catch((err) => {
                    navigate('Menu')
                    showToast(ToastType.ERROR, err.code, "Indefinição na resposta do servidor")
                })
            }
        } catch (error) {
            navigate('Menu')
            showToast(ToastType.ERROR, "Erro", "Erro")

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
                setMessageList('')
                break;
        }
    }

    //funcao para confirmar entrega dos produtos da nota
    async function confirmDelivery() {
        setIsBtnLoading(true)
        const dd40id = noteInfo?.dd040_id;
        const tenant = (await getUserProperties()).tenantId;
        const userIdentifier = userId;
        if (tenant != undefined) {
            const iSetEntrega: IReqSetDelivery = { dd40id, tenant, userIdentifier }
            setEntrNotaVc(iSetEntrega).then((ok) => {
                if (ok) {
                    setIsBtnLoading(false)
                    searchNote(noteTyped)
                }
            })
        }
    }

    const loadingProducts = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS
    const error = status == FETCH_STATUS.ERROR

    if (error) return <Text style={stylesNotaEntrega.loadingText}>{errorMessage}</Text>



    function handleRefreshList(): void {
        searchNote(noteTyped)
    }

    return <SafeAreaView style={[stylesNotaEntrega.modalContainer, { height: "100%" }]}>
        <CustomSearch
            placeholder="Pesquisar Nota"
            onSearchPress={(value) => searchNote(value)}
            clickToSearch={true}
            keyboartType='numeric'
        />

        {loadingProducts && (
            <>
                <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
            </>
        )}

        {messageList !== '' && products?.length === undefined && (
            <CustomEmpty text={messageList} />
        )}


        {messageList === '' && products?.length === undefined && (
            <CustomEmpty text={"Pesquise por uma nota"} />
        )}



        {isSuccess && (
            <View style={stylesNotaEntrega.productContainer}>
                <FlatList
                    refreshing={loadingProducts}
                    onRefresh={handleRefreshList}
                    data={products}
                    ListEmptyComponent={products !== undefined ? <CustomEmpty text={"Nenhuma entrega encontrada"} /> : <></>}
                    renderItem={({ item }) => <CustomCard_001 title={item.DD060_Descricao} children={
                        <EntregaCardLeft modo={item.DD060_mod_Entrega} quantidade={item.DD060_Quantidade} />
                    } />}
                    keyExtractor={(item) => item.DD060_Id.toString()}
                />

                {products !== undefined && (
                    <View style={styles.btnContenier}>
                        {isBtnLoading ? <ActivityIndicator /> : <ButtonActionBlue text={"Confirmar entrega!"} onPress={() => confirmDelivery()} />}
                    </View>
                )}

            </View>
        )}

        {/*************************************************************/}
    </SafeAreaView>
}


export default CS_SC_Entrega;

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