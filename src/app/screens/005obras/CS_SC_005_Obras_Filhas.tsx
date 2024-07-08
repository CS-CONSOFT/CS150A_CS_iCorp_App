import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomVerticalSeparator from "../../components/lists/CustomVertticalSeparator";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import { Obra_Filhas } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetObraById, handleGetPagesArray } from "../../view_controller/obras/CS_ObrasViewController";

const CS_SC_005_Obras_Filhas = ({ route }: { route: any }) => {
    const [listObrasFilhas, setListObrasFilhas] = useState<Obra_Filhas[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [currentPage, setCurrentPage] = useState(1)
    const { obraId } = route.params

    useEffect(() => {
        getListObras()
    }, [])

    function getListObras(page?: number) {
        setCurrentPage(page || 1)
        setStatus(FETCH_STATUS.LOADING)
        try {
            handleGetObraById({ cs_obra_id: obraId }).then(async (res) => {
                if (res === undefined) {
                    return
                }
                setListObrasFilhas(res.Obra_Filhas)
                setStatus(FETCH_STATUS.SUCCESS)
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error)
        }
    }

    const isLoading = status === FETCH_STATUS.LOADING

    return (
        <View style={{ flex: 1 }}>
            {isLoading && (
                <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
            )}
            <FlatList
                data={listObrasFilhas}
                refreshing={isLoading}
                onRefresh={() => getListObras(currentPage)}
                keyExtractor={(item) => item.csicp_dd190.dd190_Id.toString()}
                ListEmptyComponent={<CustomEmpty text={"Nenhuma obra encontrada!"} />}
                renderItem={({ item }) => <RenderItem item={item} />}
            />
        </View>
    );
}

const RenderItem = ({ item }: { item: Obra_Filhas }) => {
    const [extraIconsRightOpen, setExtraIconsRightOpen] = useState(false);
    const leftSwipe = () => {
        setExtraIconsRightOpen(!extraIconsRightOpen);
    };
    return (
        <View>
            <CustomCard_001
                title={item.csicp_dd190.dd190_Descricao}
                children={<CustomCardObraChildren leftSwipe={leftSwipe} isRightChildrenOpen={extraIconsRightOpen} item={item} />}
                rightChildren={<RightItem obraId={item.csicp_dd190.dd190_Id} />}
                showRightChildren={extraIconsRightOpen}
            />
        </View>
    )
}

const RightItem = ({ obraId }: { obraId: number }) => {
    const { navigate } = useNavigation()
    return (
        <View style={[commonStyle.common_columnItem,
        { backgroundColor: "#95B5C7", flex: 1, padding: 8, paddingVertical: 16, borderTopRightRadius: 16, borderBottomRightRadius: 16 },
        commonStyle.justify_content_space_btw]}>
            <CustomIcon icon={ICON_NAME.ENVIAR} onPress={() => {
                navigate('Obras_Solicitacao', { obraId: obraId })
            }} />
            <CustomIcon icon={ICON_NAME.CHAT} onPress={() => { navigate('Obras_Chat') }} />
            <CustomIcon icon={ICON_NAME.PAPEL_LISTA_CONTORNADO} onPress={() => {
                navigate('Obras_Requisicao', { obraId: obraId })
            }} />
            <CustomIcon icon={ICON_NAME.ANEXO} onPress={() => { navigate('Obras_Anexos') }} />
        </View>
    )
}

const CustomCardObraChildren = ({ leftSwipe, isRightChildrenOpen, item }: { leftSwipe: () => void, isRightChildrenOpen: boolean, item: Obra_Filhas }) => {
    return (
        <View>
            <View style={[commonStyle.common_columnItem, { alignSelf: 'center', padding: 4 }]}>
                <View style={commonStyle.common_rowItem}>
                    <Text style={[commonStyle.common_fontWeight_600]}>PPTR: </Text>
                    <Text>{item.csicp_dd190.dd190_ProtocolNumber}</Text>
                </View>
            </View>

            <CustomSeparator />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, { margin: 16 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Data Movimento</Text>
                    <Text>{item.csicp_dd190.dd190_dMovto}</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Inicio Exec</Text>
                    <Text>{item.csicp_dd190.dd190_dInicioExec}</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Fim Exec</Text>
                    <Text>{item.csicp_dd190.dd190_dFinalExec}</Text>
                </View>
            </View>
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl]}>
                <Text style={{ marginLeft: 32 }}></Text>
                <Pressable style={[commonStyle.btn_transparente]} onPress={() => { }}>
                    <Text style={commonStyle.common_text_button_style}></Text>
                </Pressable>
                {isRightChildrenOpen ? <CustomIcon icon={ICON_NAME.FLECHA_ESQUERDA} onPress={leftSwipe} /> : <CustomIcon icon={ICON_NAME.FLECHA_DIRETA} onPress={leftSwipe} />}

            </View>
            <CustomSeparator />

        </View>
    )
}

export default CS_SC_005_Obras_Filhas;