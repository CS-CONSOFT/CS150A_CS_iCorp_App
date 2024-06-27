import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomIcon from "../../components/icon/CustomIcon";
import { Csicp_gg073, DD199_RecProdutos } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatDateToSlashPattern } from "../../util/FormatText";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetObraById } from "../../view_controller/obras/CS_ObrasViewController";
import CustomEmpty from "../../components/lists/CustomEmpty";
import ColorStyle from "../../ColorStyle";

const CS_SC_005_03_Requisição = ({ route }: { route: any }) => {
    const { obraId } = route.params
    const [products, setProductsList] = useState<DD199_RecProdutos[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    function getObraById() {
        setStatus(FETCH_STATUS.LOADING)
        try {
            handleGetObraById({ cs_obra_id: obraId }).then((res) => {
                if (res !== undefined) {
                    setProductsList(res.DD199_RecProdutos)
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
                    data={products}
                    keyExtractor={(item) => item.csicp_gg073.gg073_Id.toString()}
                    ListEmptyComponent={<CustomEmpty text="Nenhuma requisição encontrada" />}
                    renderItem={({ item }) => (<CustomCard_001
                        title={item.csicp_gg073.gg073_ProtocoloNro}
                        children={<RenderItem recProduto={item} />}
                    />)}
                />

                <Pressable style={commonStyle.common_button_style}>
                    <Text style={commonStyle.common_text_button_style}>Requisitar</Text>
                </Pressable>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const RenderItem = ({ recProduto }: { recProduto: DD199_RecProdutos }) => {
    return (
        <CustomCard_001
            title="2024"
            children={<RenderItemChildren gg037={recProduto.csicp_gg073} />}
            showRightChildren={true}
            rightChildren={<RenderItemRightChildren />}
        />
    )
}

const RenderItemChildren = ({ gg037 }: { gg037: Csicp_gg073 }) => {
    return (
        <View style={[commonStyle.common_columnItem, commonStyle.margin_16]}>
            <View style={commonStyle.common_rowItem}>
                <Text>C.Custo: </Text>
                <Text>400</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>Data: </Text>
                <Text>{formatDateToSlashPattern(gg037.gg073_Data_Movimento)}</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>C.Custo: </Text>
                <Text>{gg037.gg073_ID_ORIG}</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>C.Custo: </Text>
                <Text>400</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>C.Custo: </Text>
                <Text>400</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>C.Custo: </Text>
                <Text>400</Text>
            </View>

            <View style={commonStyle.common_rowItem}>
                <Text>{gg037.gg073_tMovimento}</Text>
                <Text>400</Text>
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