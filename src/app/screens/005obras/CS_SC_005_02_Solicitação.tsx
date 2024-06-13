import { View, Text, TextInput, SafeAreaView, FlatList, ActivityIndicator, Pressable } from "react-native";
import CustomCard_001 from "../../components/containers/CustomCard_001";
import { commonStyle } from "../../CommonStyle";
import { handleGetObraById } from "../../view_controller/obras/CS_ObrasViewController";
import { useEffect, useMemo, useState } from "react";
import { DD191_Produtos } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { ToastType, showToast } from "../../util/ShowToast";
import CustomEmpty from "../../components/lists/CustomEmpty";
import Custom_Pagination from "../../components/pagination/Custom_Pagination";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";

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
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error.message)
        } finally {
            setStatus(FETCH_STATUS.SUCCESS)
        }

    }

    useEffect(() => {
        getObraById()
    }, [])

    const isLoading = status == FETCH_STATUS.LOADING
    const isSuccess = status == FETCH_STATUS.SUCCESS

    if (isLoading) {
        return <ActivityIndicator size={52} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={obraProdutos}
                keyExtractor={(item) => item.csicp_dd191.dd191_ID.toString()}
                renderItem={({ item }) => (<CustomCard_001
                    title={item.csicp_gg008.GG008_CodgProduto.toString()}
                    children={<BodyCard item={item} />}
                />)}
            />
            <Pressable style={commonStyle.common_button_style}>
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