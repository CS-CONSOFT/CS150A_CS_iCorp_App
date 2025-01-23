import { ActivityIndicator, FlatList, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { IResGetPv, Requisicoes } from "../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { useEffect, useState } from "react";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { handleCsicp_gg001_Get_List_Almox, handleGetPv, handleRI_CancelaRI, handleRI_ExcluirRI, handleRI_Gerar_OBS_RI, handleRI_Gerar_RI, handleRI_RequisitarRI } from "../../view_controller/prevenda/PreVendaViewController";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomVerticalSeparator from "../../components/lists/CustomVertticalSeparator";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { formatDateToSlashPattern } from "../../util/FormatText";
import { ToastType, showToast } from "../../util/ShowToast";
import { SelectList } from "react-native-dropdown-select-list";
import CustomLoading from "../../components/loading/CustomLoading";
import React from "react";
import CustomAlertDialog from "../../components/modal/CustomAlertDialog";

const CS_SC_010_Requisicao = () => {
    const [pv, setPv] = useState<IResGetPv>()
    const [almoxSelected, setAlmoxSelected] = useState("");
    const [listAmox, setListAlmox] = useState<{ key: string, value: string }[]>();
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [isObsModalVisible, setIsObsModalVisible] = useState(false)

    useEffect(() => {
        getCurrentPv()
    }, [])


    function getCurrentPv() {
        setStatus(FETCH_STATUS.LOADING)
        //pega a pv
        handleGetPv().then((res) => {
            if (res !== undefined) {
                setPv(res)
                setStatus(FETCH_STATUS.SUCCESS)
            }
        })
        handleCsicp_gg001_Get_List_Almox().then((res) => {
            setListAlmox(res)
        })
        setAlmoxSelected('')
    }

    if (status === FETCH_STATUS.LOADING) {
        return <CustomLoading />
    }

    function generateReq() {
        if (almoxSelected !== '') {
            setStatus(FETCH_STATUS.LOADING)
            handleRI_Gerar_RI({ cs_pv_id: (pv?.DD070_Nota.csicp_dd070.DD070_Id || ''), In1_gg001_ID_AlmoxSaida: almoxSelected }).then((res) => {
                if (res.Code_Erro == -1) {
                    showToast(ToastType.ERROR, "Falha", res.Mensagem)
                } else {
                    showToast(ToastType.SUCCESS, "Sucesso", "Requisição gerada com sucesso!")
                }
                setStatus(FETCH_STATUS.SUCCESS)
                getCurrentPv()
                setAlmoxSelected('')
            })
        } else {
            showToast(ToastType.INFO, "Selecione", "Um Almoxarifado")
        }
    }



    const requisicoes = pv?.Requisicao?.Requisicoes?.toReversed() ?? [];
    return (
        <SafeAreaView>
            <View>
                <View style={commonStyle.common_padding_16}>
                    <SelectList
                        placeholder="Escolha um almoxarifado"
                        /** key == a chave do valor que foi selecionada, a chave é mapeada para receber o ID do valor na funcao
                         * getFormaPagamento()
                         */
                        setSelected={(key: string) => {
                            setAlmoxSelected(key)
                        }}
                        data={listAmox || []}
                        save="key"
                    />
                </View>
                <TouchableOpacity style={commonStyle.common_button_style} onPress={() => generateReq()}>
                    <Text style={commonStyle.common_text_button_style}>Gerar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={requisicoes}
                    keyExtractor={(item) => item.csicp_gg071.gg071_Id.toString()}
                    renderItem={({ item }) =>
                        <CustomCard_001
                            title={`${item.csicp_gg071.gg071_ProtocolNumber} - ${item.csicp_status}`}
                            children={<RenderItem refreshSreen={getCurrentPv} isObsModalVisible={isObsModalVisible} setIsObsModalVisible={setIsObsModalVisible} item={item} />}
                            rightChildren={<RightItem item={item} refresh={getCurrentPv} setIsObsModalVisible={setIsObsModalVisible} />}
                            showRightChildren={true}
                        />

                    }
                />
            </View>
        </SafeAreaView>
    );
}

const ObsItem = ({ obsRI, save, dismiss }: { save: (newObs: string) => void, dismiss: () => void, obsRI?: string }) => {
    const [obs, setObs] = useState(obsRI || "")
    const [isLoading, setIsLoading] = useState(false)
    return (
        <View style={commonStyle.modal_common_container}>
            <Text>Observação</Text>
            <TextInput style={{
                margin: 4,
                //borderWidth: 1,
                padding: 25,
                borderRadius: 12,
                paddingHorizontal: 32,
                borderColor: "#B0B0B0",
                backgroundColor: '#d3d3d3'
            }}
                multiline={true}
                onChangeText={setObs}
                value={obs}
            />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl]}>
                <Pressable style={commonStyle.btn_gray} onPress={() => {
                    setIsLoading(true)
                    save(obs)
                }}>
                    {isLoading ? <ActivityIndicator color={"#000"} /> : <Text style={commonStyle.btn_text_gray}>Salvar</Text>}
                </Pressable>
                <Pressable style={commonStyle.btn_gray} onPress={dismiss}>
                    <Text style={commonStyle.btn_cancel_modal}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    )
}


const RenderItem = ({ item, isObsModalVisible, setIsObsModalVisible, refreshSreen }: { refreshSreen: () => void, item: Requisicoes, isObsModalVisible: boolean, setIsObsModalVisible: (visible: boolean) => void }) => {
    return (
        <View>
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl, { margin: 16 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.text_aligment_center]}>Data</Text>
                    <Text style={[commonStyle.text_aligment_center]}>{formatDateToSlashPattern(item.csicp_gg071.gg071_Data_Movimento)}</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Origem</Text>
                    <Text style={[commonStyle.text_aligment_center]}>{15}</Text>
                </View>
            </View>
            <CustomSeparator />
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, { margin: 8 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.text_aligment_center]}>Almoxarifado Destino</Text>
                    <Text style={[commonStyle.text_aligment_center]}>{item.csicp_gg001_Almox_Entrada.GG001_CodigoAlmox} - {item.csicp_gg001_Almox_Entrada.GG001_DescAlmox}</Text>
                </View>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.text_aligment_center]}>Almoxarifado Saída</Text>
                    <Text style={[commonStyle.text_aligment_center]}>{item.csicp_gg001_Almox_Saida.GG001_CodigoAlmox} - {item.csicp_gg001_Almox_Saida.GG001_DescAlmox}</Text>
                </View>
            </View>
            <CustomSeparator />
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl, { margin: 8 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.text_aligment_center]}>Requisitante</Text>
                    <Text style={[commonStyle.text_aligment_center]}>{(item.csicp_sy001_UserProprietario.SY001_Nome || "---")}</Text>
                </View>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.text_aligment_center]}>Atendente</Text>
                    <Text style={[commonStyle.text_aligment_center]}>{(item.csicp_sy001_UserAtendente.SY001_Nome || "---")}</Text>
                </View>
            </View>

            <CustomAlertDialog
                isVisible={isObsModalVisible}
                onDismiss={() => { }}
                children={<ObsItem obsRI={item.csicp_gg071.gg071_Observacao} save={async (newObs) => {
                    try {
                        const res = await handleRI_Gerar_OBS_RI({ In_GG071_ID: item.csicp_gg071.gg071_Id, In_Observacao: newObs })
                        if (res.Code_Erro != "0") {
                            showToast(ToastType.ERROR, "Falha", res.Mensagem)
                        } else {
                            showToast(ToastType.SUCCESS, "Sucesso", res.Mensagem)
                        }

                        refreshSreen()
                    } catch (error) {

                        //@ts-ignore
                        showToast(ToastType.ERROR, "Falha error", error.config.message)
                    } finally {
                        setIsObsModalVisible(false)
                    }
                }} dismiss={() => setIsObsModalVisible(false)} />}
            />
        </View>
    )
}

const RightItem = ({ item, refresh, setIsObsModalVisible }: { item: Requisicoes, refresh: () => void, setIsObsModalVisible: (visible: boolean) => void }) => {
    const [isLoading, setIsLoading] = useState(false)
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={"#FFF"} />
        </View>
    }
    return (
        <View style={[commonStyle.common_columnItem,
        { backgroundColor: "#95B5C7", flex: 1, padding: 8, paddingVertical: 16, borderTopRightRadius: 16, borderBottomRightRadius: 16 },
        commonStyle.justify_content_space_btw]}>
            <CustomIcon icon={ICON_NAME.ENVIAR} onPress={() => {
                setIsLoading(true)
                handleRI_RequisitarRI({ In_GG071_ID: item.csicp_gg071.gg071_Id }).then((res) => {
                    if (res.Code_Erro == -1) {
                        showToast(ToastType.ERROR, "Erro", res.Mensagem)
                    }
                    setIsLoading(false)
                    refresh()
                })
            }} />
            <CustomIcon icon={ICON_NAME.FECHAR} onPress={() => {
                setIsLoading(true)
                handleRI_CancelaRI({ In_GG071_ID: item.csicp_gg071.gg071_Id }).then((res) => {
                    if (res.Code_Erro == -1) {
                        showToast(ToastType.ERROR, "Erro", res.Mensagem)
                    }
                    setIsLoading(false)
                    refresh()
                })
            }} />
            <CustomIcon icon={ICON_NAME.ALERT} onPress={() => {
                setIsObsModalVisible(true)
            }} />
            <CustomIcon icon={ICON_NAME.LIXEIRA} onPress={() => {
                setIsLoading(true)
                handleRI_ExcluirRI({ In_GG071_ID: item.csicp_gg071.gg071_Id, In_GG071_STA_ID: item.csicp_gg071.gg071_StatusId }).then((res) => {
                    if (res.Code_Erro == -1) {
                        showToast(ToastType.ERROR, "Erro", res.Mensagem)
                    }
                    setIsLoading(false)
                    refresh()
                })
            }} />
        </View>
    )
}

export default CS_SC_010_Requisicao;