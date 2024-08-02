import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput } from "react-native";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import CustomCard004 from "../../components/cards/CustomCard_004";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import CustomSearch from "../../components/search/CustomSearch";
import { Csicp_bb012, IResGetListConta } from "../../services/api/interfaces/contas/CS_IResGetListConta";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { getPaginationList } from "../../util/GetPaginationArray";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetListConta } from "../../view_controller/conta/ContaViewController";
import { handleSetClienteToPv } from "../../view_controller/prevenda/PreVendaViewController";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import CustomAlertDialog from "../../components/modal/CustomAlertDialog";

const CS_SC_009_ListaCliente = ({ route }: { route: any }) => {
    const [clientList, setClientList] = useState<IResGetListConta>()
    const [paginationArray, setPaginationArray] = useState<number[]>()
    const [currentClientSelected, setCurrentClientSelected] = useState<Csicp_bb012>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const navigation = useNavigation()
    const [showPopUp, setShowPopUp] = useState(false)
    const { isToInsertPv } = route.params

    useEffect(() => {
        setShowPopUp(false)
    }, [])

    function getClientesList(page?: number, searchValue?: string) {
        setStatus(FETCH_STATUS.LOADING)
        handleGetListConta({ currentPage: page || 1, pageSize: 10, modRelacaoID: 3, cs_search: searchValue === undefined ? undefined : searchValue }).then((res) => {
            try {
                if (res !== undefined) {
                    setClientList(res)
                    const pagesArray = getPaginationList(res.PageSize.cs_list_total_itens)
                    setPaginationArray(pagesArray)
                    setStatus(FETCH_STATUS.SUCCESS)
                }
            } catch (error: any) {
                showToast(ToastType.ERROR, "Falha", error)
                setStatus(FETCH_STATUS.SUCCESS)
            }
        }).catch((err) => {
            navigation.navigate('Menu')
            showToast(ToastType.ERROR, err.code, "Indefinição na resposta do servidor, provável erro de domínio")
        })
    }



    useEffect(() => {
        getClientesList(1)
    }, [])

    function handleClickItem(bb12id: string) {
        //é para alterar o cliente da pv?
        if (isToInsertPv) {
            setStatus(FETCH_STATUS.LOADING)
            handleSetClienteToPv(bb12id).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                navigation.navigate('Pre_Venda_Detalhes_002', {
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
            <CustomSearch onSearchPress={(searchValue) => { getClientesList(undefined, searchValue) }} placeholder="Pesquisar" clickToSearch={true} />
            {!isLoading ? <>
                <FlatList
                    refreshing={isLoading}
                    onRefresh={getClientesList}
                    data={clientList?.csicp_bb012}
                    keyExtractor={(item, index) => item.csicp_bb012.csicp_bb012.ID}
                    renderItem={({ item }) => <RenderItemCliente handlePopUp={() => handlePopUp(item)} cliente={item} edit={(bb12id) => handleClickItem(bb12id)} />}
                />
            </> : <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />}
            <Custom_Pagination
                paginationArray={paginationArray!}
                onPagePress={getClientesList}
            />
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
    return (
        <View style={stylesEntregaCard.dialog}>
            <View>
                <Text>{cliente.csicp_bb012.csicp_bb012.BB012_Nome_Cliente}</Text>
                <CustomIcon icon={ICON_NAME.FECHAR} style={{ marginLeft: 'auto' }} iconSize={32} onPress={onClose} />
            </View>


            <View style={[commonStyle.common_rowItem, commonStyle.align_spacebetween_row, commonStyle.common_margin_left_16, commonStyle.common_padding_08]}>
                <View style={[stylesEntregaCard.contentContanier, commonStyle.common_columnItem]}>
                    <View style={stylesEntregaCard.contentContenierSmall}>
                        <TouchableOpacity style={commonStyle.common_button_style} onPress={() => { }}>
                            {isBtnLoading ? <ActivityIndicator color={"#0A3147"} /> : <Text style={commonStyle.common_text_button_style}>Cadastrar Cliente</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={commonStyle.common_button_style} onPress={() => { }}>
                            {isBtnLoading ? <ActivityIndicator color={"#0A3147"} /> : <Text style={commonStyle.common_text_button_style}>Efetuar Análise de Cliente</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={commonStyle.common_button_style} onPress={() => { }}>
                            {isBtnLoading ? <ActivityIndicator color={"#0A3147"} /> : <Text style={commonStyle.common_text_button_style}>Simulador de Crédito</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyle.align_centralizar}>
                </View>
            </View>
        </View>
    )
}


const stylesEntregaCard = StyleSheet.create({
    dialog: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20
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