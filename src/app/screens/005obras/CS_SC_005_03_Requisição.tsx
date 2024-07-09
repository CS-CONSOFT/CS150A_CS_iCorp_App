import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomIcon from "../../components/icon/CustomIcon";
import { Csicp_gg073, DD199_RecProdutos, Requisicao } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatDateToSlashPattern } from "../../util/FormatText";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetObraById } from "../../view_controller/obras/CS_ObrasViewController";
import CustomEmpty from "../../components/lists/CustomEmpty";
import ColorStyle from "../../ColorStyle";
import CustomSearch from "../../components/search/CustomSearch";

const CS_SC_005_03_Requisição = ({ route }: { route: any }) => {
    const { obraId } = route.params
    const [reqList, setReqList] = useState<Requisicao[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    function getObraById() {
        setStatus(FETCH_STATUS.LOADING)
        try {
            handleGetObraById({ cs_obra_id: obraId }).then((res) => {
                if (res !== undefined) {
                    setReqList(res.Requisicao)
                    setStatus(FETCH_STATUS.SUCCESS)
                } else {
                    showToast(ToastType.ERROR, "Error", "Undefined")
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error.message)
        }
    }
    useEffect(() => {
        getObraById()
    }, [])

    const isLoading = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS

    if (isLoading) {
        return <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView >
                <FlatList
                    data={reqList}
                    keyExtractor={(item) => item.csicp_gg073.gg073_Id.toString()}
                    ListEmptyComponent={<CustomEmpty text="Nenhuma requisição encontrada" />}
                    renderItem={({ item }) => (<RenderItem recProduto={item} />)}
                />

                <Pressable style={commonStyle.common_button_style}>
                    <Text style={commonStyle.common_text_button_style}>Requisitar</Text>
                </Pressable>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const RenderItem = ({ recProduto }: { recProduto: Requisicao }) => {
    return (
        <CustomCard_001
            title={recProduto.csicp_gg073.gg073_ProtocoloNro}
            children={<RenderItemChildren req={recProduto} />}
            showRightChildren={false}
        />
    )
}

const RenderItemChildren = ({ req }: { req: Requisicao }) => {
    return (
        <View style={[commonStyle.common_columnItem, commonStyle.margin_16]}>
            <View style={commonStyle.common_rowItem}>
                <Text>Data Movimento: </Text>
                <Text>{formatDateToSlashPattern(req.csicp_gg073.gg073_Data_Movimento)}</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>Responsável: </Text>
                <Text>{req.csicp_sy001.SY001_Nome}</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>Tipo Movimento: </Text>
                <Text>{(req.csicp_gg073_tmov || {}).Label || 'Sem Dados de Tipo Movimento'}</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>{req.csicp_gg073_stat.Label}</Text>
            </View>
        </View>
    )
}

const RenderItemRightChildren = () => {
    return (
        <View style={[commonStyle.common_columnItem, commonStyle.border_right_radius_16, { justifyContent: 'center', flex: 1, backgroundColor: "#95B5C7" }]}>
            <CustomIcon icon={ICON_NAME.FLECHA_DIRETA} />
        </View>
    )
}

export default CS_SC_005_03_Requisição;