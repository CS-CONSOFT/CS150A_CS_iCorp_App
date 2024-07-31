import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from "react-native";
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

const CS_SC_009_ListaCliente = ({ route }: { route: any }) => {
    const [clientList, setClientList] = useState<IResGetListConta>()
    const [paginationArray, setPaginationArray] = useState<number[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const navigation = useNavigation()
    const { isToInsertPv, pvId } = route.params


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
                    renderItem={({ item }) => <RenderItemCliente item={item} edit={(bb12id) => handleClickItem(bb12id)} />}
                />
            </> : <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />}
            <Custom_Pagination
                paginationArray={paginationArray!}
                onPagePress={getClientesList}
            />
        </SafeAreaView>
    );
}

const RenderItemCliente = ({ item, edit }: { item: Csicp_bb012, edit: (id: string) => void }) => {
    return (
        <CustomCard004
            onClickItem={() => edit(item.csicp_bb012.csicp_bb012.ID)}
            children={
                <View style={commonStyle.common_columnItem}>
                    <Text style={commonStyle.common_fontWeight_800}>{item.csicp_bb012.csicp_bb012.BB012_Codigo}</Text>
                    <Text style={commonStyle.common_fontWeight_800}>{item.csicp_bb012.csicp_bb012.BB012_Nome_Cliente}</Text>
                    <Text style={commonStyle.common_fontWeight_800}>{item.BB01202.csicp_bb01202.BB012_CPF || item.BB01202.csicp_bb01202.BB012_CNPJ}</Text>
                    <Text style={[commonStyle.common_fontWeight_800]}>{item.csicp_bb012.csicp_bb012_SitCta.Label}</Text>
                </View>
            } title={item.csicp_bb012.csicp_bb012.BB012_Nome_Cliente} />
    )
}

export default CS_SC_009_ListaCliente;