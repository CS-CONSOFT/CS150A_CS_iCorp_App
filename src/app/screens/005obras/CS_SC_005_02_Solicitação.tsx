import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import { DD191_Produtos } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { ToastType, showToast } from "../../util/ShowToast";
import { handleGetObraById } from "../../view_controller/obras/CS_ObrasViewController";
import CustomEmpty from "../../components/lists/CustomEmpty";
import ColorStyle from "../../ColorStyle";

const CS_SC_005_02_Solicitação = ({ route }: { route: any }) => {
    const { obraId } = route.params
    const [obraProdutos, setObraProdutos] = useState<DD191_Produtos[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)


    function getObraById() {
        setStatus(FETCH_STATUS.LOADING)
        try {
            handleGetObraById({ cs_obra_id: obraId }).then((res) => {
                if (res !== undefined) {
                    setObraProdutos(res.DD191_Produtos)
                    setStatus(FETCH_STATUS.SUCCESS)
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error.message)
        }
    }

    useEffect(() => {
        getObraById()
    }, [])

    function requestProducts() {
        showToast(ToastType.ERROR, "Estamos trabalhando!", "Esta funcionalidade ainda não foi implementada!")
    }

    const isLoading = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS

    if (isLoading) {
        return <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={obraProdutos}
                keyExtractor={(item) => item.csicp_dd191.dd191_ID.toString()}
                ListEmptyComponent={<CustomEmpty text="Nenhuma solicitação encontrada" />}
                renderItem={({ item }) => (<CustomCard_001
                    title={item.csicp_gg008.GG008_CodgProduto.toString()}
                    children={<BodyCard item={item} />}
                />)}
            />
            <Pressable style={commonStyle.common_button_style} onPress={requestProducts}>
                <Text style={commonStyle.common_text_button_style}>Solicitar</Text>
            </Pressable>
        </SafeAreaView>

    );
}

const BodyCard = ({ item }: { item: DD191_Produtos }) => {
    return (
        <View style={[commonStyle.common_columnItem]}>
            <Text style={[commonStyle.common_fontWeight_600,
            commonStyle.text_size_20,
            { textAlign: 'left', paddingHorizontal: 32, paddingVertical: 16 }]}>
                {item.csicp_gg008.GG008_DescReduzida}
            </Text>


            <View style={[commonStyle.common_rowItem,
            commonStyle.justify_content_space_btw,
            { paddingVertical: 8, paddingHorizontal: 32 }]}>


                <Text style={[commonStyle.text_size_16]}>Qt Entregue</Text>

                <Text style={[commonStyle.text_size_16]}>Qt Solicitada</Text>

            </View>

            <View style={[commonStyle.common_rowItem,
            commonStyle.justify_content_space_btw,
            { paddingBottom: 16, paddingHorizontal: 32 }]}>
                <Text style={[commonStyle.text_size_16, { alignSelf: 'center' }]}>{item.csicp_dd191.dd191_QtdContratada}</Text>

                <TextInput
                    style={[commonStyle.common_input, { width: 150 }]}
                    onChangeText={() => { }}
                    value={(item.csicp_dd191.dd191_QtdSolicitada || 0).toString()}
                    keyboardType='decimal-pad'
                />
            </View>
        </View>
    )
}

export default CS_SC_005_02_Solicitação;