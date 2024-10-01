import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import CustomCard004 from "../../components/cards/CustomCard_004";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomAlertDialog from "../../components/modal/CustomAlertDialog";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import CustomSearch from "../../components/search/CustomSearch";
import { Csicp_bb012, IResGetListConta } from "../../services/api/interfaces/contas/CS_IResGetListConta";
import { IResAnaliseCliente } from "../../services/api/interfaces/crediario/IResAnaliseCliente";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatMoneyValue } from "../../util/FormatText";
import { getPaginationList } from "../../util/GetPaginationArray";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetListConta } from "../../view_controller/conta/ContaViewController";
import { handleAnaliseCliente, handleGerarCliente } from "../../view_controller/crediario/CrediarioViewController";
import { handleSetClienteToPv } from "../../view_controller/prevenda/PreVendaViewController";
import React from "react";

const CS_SC_009_ListaCliente = ({ route }: { route: any }) => {
    const [clientList, setClientList] = useState<IResGetListConta>()
    const [paginationArray, setPaginationArray] = useState<number[]>()
    const [currentClientSelected, setCurrentClientSelected] = useState<Csicp_bb012>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const navigation = useNavigation()
    const [showPopUp, setShowPopUp] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const { isToInsertPv } = route.params

    useEffect(() => {
        setShowPopUp(false)
    }, [])

    function getClientesList(page: number, searchValue: string) {
        setStatus(FETCH_STATUS.LOADING)
        handleGetListConta({ currentPage: page || 1, pageSize: 10, modRelacaoID: 3, cs_search: searchValue }).then((res) => {
            try {
                if (res !== undefined) {
                    setClientList(res)
                    const pagesArray = getPaginationList(res.PageSize.cs_number_of_pages)
                    setPaginationArray(pagesArray)
                    setStatus(FETCH_STATUS.SUCCESS)
                }
            } catch (error: any) {
                showToast(ToastType.ERROR, "Falha", error)
                setStatus(FETCH_STATUS.SUCCESS)
            }
        }).catch((err) => {
            navigation.navigate('Menu')
            showToast(ToastType.ERROR, err.code, err.response.data.Errors[0])
        })
    }

    function handleClickItem(bb12id: string) {
        //é para alterar o cliente da pv?
        if (isToInsertPv) {
            setStatus(FETCH_STATUS.LOADING)
            handleSetClienteToPv(bb12id).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                navigation.navigate('Pre_Venda_Detalhes_001', {
                    currentPv: ""
                })
            })
        } else {
            navigation.navigate('EditCliente', { bb12id: bb12id })
        }
    }



    function handlePopUp(client: Csicp_bb012) {
        setCurrentClientSelected(client)
        setShowPopUp(!showPopUp)
    }

    const isLoading = status === FETCH_STATUS.LOADING
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomSearch onSearchPress={(searchValue) => {
                setSearchValue(searchValue)
                getClientesList(currentPage, searchValue)
            }} placeholder="Pesquisar" clickToSearch={true} />
            {!isLoading ? <>
                <FlatList
                    ListEmptyComponent={<CustomEmpty text="Nenhum cliente encontrado!" />}
                    refreshing={isLoading}
                    onRefresh={() => getClientesList(currentPage, searchValue)}
                    data={clientList?.Lista_csicp_bb012}
                    keyExtractor={(item, index) => item.csicp_bb012.csicp_bb012.ID}
                    renderItem={({ item }) => <RenderItemCliente handlePopUp={() => handlePopUp(item)} cliente={item} edit={(bb12id) => handleClickItem(bb12id)} />}
                />
            </> : <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />}

            {(paginationArray?.length || [].length) > 1 && (
                <Custom_Pagination
                    paginationArray={paginationArray!}
                    onPagePress={(page) => {
                        setCurrentPage(page)
                        getClientesList(page, searchValue)
                    }}
                />
            )}

            <CustomAlertDialog
                isVisible={showPopUp}
                onDismiss={() => setShowPopUp(false)}
                children={<AlertDialog cliente={currentClientSelected!} onClose={(cliente) => handlePopUp(cliente)} />}
            />

        </SafeAreaView>
    );
}

const RenderItemCliente = ({ cliente, edit, handlePopUp }: { cliente: Csicp_bb012, handlePopUp: (cliente: Csicp_bb012) => void, edit: (id: string) => void }) => {
    return (
        <CustomCard004
            onClickItem={() => edit(cliente.csicp_bb012.csicp_bb012.ID)}
            children={
                <View style={commonStyle.common_columnItem}>
                    <Text style={commonStyle.common_fontWeight_800}>{cliente.csicp_bb012.csicp_bb012.BB012_Codigo}</Text>
                    <Text style={commonStyle.common_fontWeight_800}>{cliente.csicp_bb012.csicp_bb012.BB012_Nome_Cliente}</Text>
                    <Text style={commonStyle.common_fontWeight_800}>{cliente.BB01202.csicp_bb01202.BB012_CPF || cliente.BB01202.csicp_bb01202.BB012_CNPJ}</Text>
                    <Text style={[commonStyle.common_fontWeight_800]}>{cliente.csicp_bb012.csicp_bb012_SitCta.Label}</Text>
                </View>
            } title={cliente.csicp_bb012.csicp_bb012.BB012_Nome_Cliente}
            rightItem={<RightItemCliente cliente={cliente} handlePopUp={handlePopUp} />}
        />
    )
}

const RightItemCliente = ({ cliente, handlePopUp }: { cliente: Csicp_bb012, handlePopUp: (cliente: Csicp_bb012) => void }) => {
    return (
        <View
            style={[commonStyle.common_columnItem,
            { backgroundColor: "#fffafa", flex: 1, padding: 8, paddingVertical: 16, borderTopRightRadius: 16, borderBottomRightRadius: 16 },
            commonStyle.justify_content_space_btw]}
        >
            <CustomIcon icon={ICON_NAME.TRES_PONTOS_VERTICAL} onPress={() => {
                handlePopUp(cliente)
            }} />
        </View>
    )
}

const AlertDialog = ({ cliente, onClose }: { cliente: Csicp_bb012, onClose: (cliente: Csicp_bb012) => void }) => {
    const [isBtnLoading, setIsBtnLoading] = useState(false)
    const { navigate } = useNavigation()
    const [resultOfAnalysis, setResultOfAnalysis] = useState<IResAnaliseCliente>()
    const [resultOfCreatingUser, setResultOfCreatingUser] = useState('')

    useEffect(() => {
        if (resultOfCreatingUser !== '') {
            setTimeout(() => {
                setResultOfCreatingUser('')
            }, 5000)
        }
    }, [resultOfCreatingUser, resultOfAnalysis])


    return (
        <View style={stylesEntregaCard.dialog}>
            <View>
                <Text>{cliente.csicp_bb012.csicp_bb012.BB012_Nome_Cliente}</Text>
                <CustomIcon icon={ICON_NAME.FECHAR} style={{ marginLeft: 'auto' }} iconSize={32} onPress={onClose} />
            </View>

            {isBtnLoading && (
                <ActivityIndicator />
            )}

            {!isBtnLoading && (
                <View style={[stylesEntregaCard.contentContanier, commonStyle.common_columnItem]}>
                    <View style={[{ width: '95%' }]}>

                        <TouchableOpacity onPress={() => {
                            /** CADASTRANDO NO CREDIARO */
                            setIsBtnLoading(true)
                            handleGerarCliente({ cs_conta_id: cliente.csicp_bb012.csicp_bb012.ID }).then(() => {
                                setResultOfCreatingUser("Usuário cadastrado com sucesso!")
                                setIsBtnLoading(false)
                            }).catch((err) => {
                                setResultOfCreatingUser("Falha ao cadastrar usuário!")
                                showToast(ToastType.ERROR, "Falha", err)
                                setIsBtnLoading(false)
                            })
                        }}>
                            <View style={[commonStyle.common_rowItem, commonStyle.margin_16]}>
                                <View style={{ backgroundColor: "#0A3147", padding: 8, borderRadius: 8, marginRight: 8 }}>
                                    <CustomIcon icon={ICON_NAME.ADICIONAR_PESSOA_CONTORNADO} iconColor="#FFF" />
                                </View>
                                <View style={[commonStyle.align_centralizar]}>
                                    <Text style={[commonStyle.common_text_button_style]}>Cadastre no meu crediário clicando aqui!</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            /** ANALISE DE CREDITO */
                            setIsBtnLoading(true)
                            handleAnaliseCliente({ cs_conta_id: cliente.csicp_bb012.csicp_bb012.ID }).then((res) => {
                                showToast(ToastType.SUCCESS, "Análise Feita", "!!!")
                                setResultOfAnalysis(res)
                                setIsBtnLoading(false)
                            }).catch((err) => {
                                showToast(ToastType.ERROR, "Falha", err.response.data.Errors[0])
                                setIsBtnLoading(false)
                            })
                        }}>
                            <View style={[commonStyle.common_rowItem, commonStyle.margin_16]}>
                                <View style={{ backgroundColor: "#0A3147", padding: 8, borderRadius: 8, marginRight: 8 }}>
                                    <CustomIcon icon={ICON_NAME.ADICIONAR_PESSOA_CONTORNADO} iconColor="#FFF" />
                                </View>
                                <View style={[commonStyle.align_centralizar]}>
                                    <Text style={[commonStyle.common_text_button_style]}>Efetue análise de crédito clicando aqui!</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigate('SimulacaoCrediario', {
                                contaCodigo: cliente.csicp_bb012.csicp_bb012.BB012_Codigo
                            })
                        }}>
                            <View style={[commonStyle.common_rowItem, commonStyle.margin_16]}>
                                <View style={{ backgroundColor: "#0A3147", padding: 8, borderRadius: 8, marginRight: 8 }}>
                                    <CustomIcon icon={ICON_NAME.ESTATISTICA_CONTORNADO} iconColor="#FFF" />
                                </View>
                                <View style={[commonStyle.align_centralizar]}>
                                    <Text style={[commonStyle.common_text_button_style]}>Efetue uma simulação de venda do cliente</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <CustomSeparator />

                        {/** SE USUÁRIO FOR CADASTRADO */}
                        {resultOfCreatingUser !== '' && resultOfAnalysis === undefined && (
                            <View style={[commonStyle.align_centralizar]}>
                                <Text style={[commonStyle.common_text_button_style, { color: 'green' }]}>{resultOfCreatingUser}</Text>
                            </View>
                        )}

                        {/** SE USUÁRIO FOR ANÁLISE DE CRÉDITO */}
                        {resultOfCreatingUser === '' && resultOfAnalysis !== undefined && (
                            <View style={[commonStyle.align_centralizar, commonStyle.common_rowItem]}>
                                <View style={commonStyle.common_columnItem}>
                                    <Text style={[commonStyle.common_text_button_style]}>Limite de Crédito: {formatMoneyValue(resultOfAnalysis.limite.saldo)}</Text>
                                    <Text style={[commonStyle.common_text_button_style]}>Tipo de Cliente: {resultOfAnalysis.limite.tipocliente}</Text>
                                    <Text style={[commonStyle.common_text_button_style]}>Risco: {resultOfAnalysis.limite.risco}</Text>
                                    <Text style={[commonStyle.common_text_button_style]}>Ação Sugerida: {resultOfAnalysis.limite.acaoSugerida}</Text>
                                </View>
                                <CustomIcon icon={ICON_NAME.FECHAR} style={{ marginLeft: 'auto' }} iconSize={32} onPress={onClose} />
                            </View>
                        )}
                    </View>
                </View>
            )}

        </View>
    )
}


const stylesEntregaCard = StyleSheet.create({
    dialog: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 16
    },
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


export default CS_SC_009_ListaCliente;