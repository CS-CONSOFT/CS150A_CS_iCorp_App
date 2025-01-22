import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { TextInput } from "react-native-gesture-handler";
import { commonStyle } from "../../../../CommonStyle";
import CustomItemIconTitleRoundedBlue from "../../../../components/items/CustomItemIconTitleRoundedBlue";
import CustomAlertDialog from "../../../../components/modal/CustomAlertDialog";
import CustomTopItem from "../../../../components/topItem/CustomTopItem";
import { DD075_Obs } from "../../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { ICON_NAME } from "../../../../util/IconsName";
import { ToastType, showToast } from "../../../../util/ShowToast";
import { handleSaveGlobalDiscount } from "../../../../view_controller/pagamento/CS_PagamentoViewController";
import { handlePatchAtualizaObservacaoContribuintePV, handlePatchAtualizaObservacaoPV } from "../../../../view_controller/prevenda/PreVendaViewController";
import { getSimpleData } from "../../../../services/storage/AsyncStorageConfig";
import { DataKey } from "../../../../enum/DataKeys";

const C_003_01_05_TopHeaderItensProdutosDetalhesPV = ({ refreshSreen, obsContribuinte, isConsulta = false, descontoValor = 0, obsText }: { refreshSreen: () => void, obsContribuinte?: DD075_Obs, isConsulta?: boolean, descontoValor?: number, obsText?: string }) => {
    const { navigate } = useNavigation()
    const [isDiscountModalVisible, setIsDiscountModalVisible] = useState(false)
    const [isObsModalVisible, setIsObsModalVisible] = useState(false)
    const [pvCameFromButtonNavigation, setPvCameFromButtonNavigation] = useState(false)

    useFocusEffect(
        useCallback(() => {
            getSimpleData(DataKey.PV_CAME_FROM_BOTTOM_NAVIGATION).then(cameFromButtonNavigation => {
                /**
                 *Nesse código ele verifica se está setado em memória que os produtos da PV
                 foram acessados por meio do bottom da consulta de produtos ou entrando diretamente em uma PV.

                 Caso seja diretamente da PV, permite a adição do produto. Caso nao, a uma mensagem informativa é passada
                 direcionando como realizar a adição do produto;

                
                 */
                if (cameFromButtonNavigation === "true") {
                    setPvCameFromButtonNavigation(true)
                } else {
                    setPvCameFromButtonNavigation(false)
                }

            })
        }, [])
    )

    function showModalDiscount() {
        setIsDiscountModalVisible(true)
    }

    function showModalObs() {
        setIsObsModalVisible(true)
    }
    return (
        <View>
            {isConsulta && (
                <>
                    <CustomTopItem>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Descontos"}
                                onPress={showModalDiscount}
                                iconName={ICON_NAME.PAPEL_LISTA_CONTORNADO}
                            />
                        </View>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Requisição"}
                                onPress={() => navigate('Requisicao')}
                                iconName={ICON_NAME.DOCUMENT}
                            />
                        </View>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Código"}
                                onPress={() => {
                                    if (pvCameFromButtonNavigation) {
                                        navigate('Consulta_Produtos', { cameFromPv: true, insertComanda: false })
                                    } else {
                                        showToast(ToastType.INFO, "Para inserir um novo produto", "Use o botão inferior para ir para a tela de produtos")
                                    }
                                }}
                                iconName={ICON_NAME.ADICIONAR_CONTORNADO}
                            />
                        </View>
                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Obs"}
                                onPress={showModalObs}
                                iconName={ICON_NAME.OBS}
                            />
                        </View>

                        <View style={styleProdutoPVDetalhe.topHeaderItemStyle}>
                            <CustomItemIconTitleRoundedBlue
                                title={"Obs Contri"}
                                onPress={showModalObs}
                                iconName={ICON_NAME.OBS}
                            />
                        </View>

                    </CustomTopItem>
                    <CustomAlertDialog
                        isVisible={isDiscountModalVisible}
                        onDismiss={() => { }}
                        children={<DescontoItem descontoValor={descontoValor} save={(discountValue) => {
                            handleSaveGlobalDiscount({ cs_valor_percentual: discountValue }).then((res) => {
                                if (res.IsOk) {
                                    showToast(ToastType.SUCCESS, "Sucesso", res.Msg)
                                    refreshSreen()
                                } else {
                                    showToast(ToastType.ERROR, "Erro", res.Msg)
                                }
                                setIsDiscountModalVisible(false)

                            })
                        }} dismiss={() => setIsDiscountModalVisible(false)} />}
                    />

                    <CustomAlertDialog
                        isVisible={isObsModalVisible}
                        onDismiss={() => { }}
                        children={<ObsItem textObs={obsText} save={async (newObs) => {
                            try {
                                const res = await handlePatchAtualizaObservacaoPV({ cs_new_obs: newObs })
                                console.log(newObs);

                                if (!res.Out_IsUpdated) {
                                    refreshSreen()
                                    showToast(ToastType.SUCCESS, "Sucesso", "Observação da nota atualizada!")
                                } else {
                                    showToast(ToastType.ERROR, "Falha", res.Msg)
                                }

                            } catch (error) {
                                console.log(error);

                                //@ts-ignore
                                showToast(ToastType.ERROR, "Falha error", error.config.message)
                            } finally {
                                setIsObsModalVisible(false)
                            }
                        }} dismiss={() => setIsObsModalVisible(false)} />}
                    />

                    <CustomAlertDialog
                        isVisible={isObsModalVisible}
                        onDismiss={() => { }}
                        children={<ObsItemContri dd075={obsContribuinte} save={async (newObs) => {
                            try {
                                const res = await handlePatchAtualizaObservacaoContribuintePV({ DD075_ID: obsContribuinte?.csicp_dd075.DD070_ID || "", DD075_OBS: newObs })
                                console.log(newObs);

                                if (!res.Out_IsUpdated) {
                                    refreshSreen()
                                    showToast(ToastType.SUCCESS, "Sucesso", "Observação da nota atualizada!")
                                } else {
                                    showToast(ToastType.ERROR, "Falha", res.Msg)
                                }
                            } catch (error) {
                                console.log(error);

                                //@ts-ignore
                                showToast(ToastType.ERROR, "Falha error", error.config.message)
                            } finally {
                                setIsObsModalVisible(false)

                            }
                        }} dismiss={() => setIsObsModalVisible(false)} />}
                    />
                </>
            )}
        </View>
    );
}

const DescontoItem = ({ descontoValor, save, dismiss }: { descontoValor?: number, save: (discountValue: number) => void, dismiss: () => void }) => {
    const [desc1, setDesc1] = useState(descontoValor || 0)
    const [isLoading, setIsLoading] = useState(false)
    return (
        <View style={commonStyle.modal_common_container}>
            <Text>1° Desconto</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CurrencyInput
                    value={desc1}
                    onChangeValue={(number) => {
                        setDesc1(number || 0)
                    }}
                    //@ts-ignore
                    renderTextInput={textInputProps => <TextInput
                        style={[
                            commonStyle.common_input,
                            { height: 40, flex: 1, padding: 10 }
                        ]}
                        {...textInputProps}
                    />}
                    prefix=""
                    delimiter="."
                    separator="."
                    precision={2}
                    maxValue={99.99}
                />
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl]}>
                <Pressable style={commonStyle.btn_gray} onPress={() => {
                    setIsLoading(true)
                    save(Number(desc1))
                }}>
                    {isLoading ? <ActivityIndicator color={"#000"} /> : <Text style={commonStyle.btn_text_gray}>Salvar</Text>}

                </Pressable>
                <Pressable style={styleProdutoPVDetalhe.btn_cancel_desconto} onPress={dismiss}>
                    <Text style={styleProdutoPVDetalhe.btn_text_cancel_desconto}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    )
}
const ObsItem = ({ textObs, dd075, save, dismiss }: { textObs?: string, save: (newObs: string) => void, dismiss: () => void, dd075?: DD075_Obs }) => {
    const [obs, setObs] = useState(textObs || dd075?.csicp_dd075.DD075_Descricao_Compl || "")
    const [isLoading, setIsLoading] = useState(false)
    return (
        <View style={commonStyle.modal_common_container}>
            <Text>Observação</Text>
            <TextInput style={commonStyle.common_input}
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
                <Pressable style={styleProdutoPVDetalhe.btn_cancel_desconto} onPress={dismiss}>
                    <Text style={styleProdutoPVDetalhe.btn_text_cancel_desconto}>Cancelar</Text>
                </Pressable>
                <Pressable style={styleProdutoPVDetalhe.btn_cancel_desconto} onPress={() => setObs("")}>
                    <Text style={styleProdutoPVDetalhe.btn_text_limpar}>Limpar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const ObsItemContri = ({ textObs, dd075, save, dismiss }: { textObs?: string, save: (newObs: string) => void, dismiss: () => void, dd075?: DD075_Obs }) => {
    const [obs, setObs] = useState(textObs || dd075?.csicp_dd075.DD075_Descricao_Compl || "")
    const [isLoading, setIsLoading] = useState(false)
    return (
        <View style={commonStyle.modal_common_container}>
            <Text>Observação</Text>
            <TextInput style={commonStyle.common_input}
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
                <Pressable style={styleProdutoPVDetalhe.btn_cancel_desconto} onPress={dismiss}>
                    <Text style={styleProdutoPVDetalhe.btn_text_cancel_desconto}>Cancelar</Text>
                </Pressable>
                <Pressable style={styleProdutoPVDetalhe.btn_cancel_desconto} onPress={() => setObs("")}>
                    <Text style={styleProdutoPVDetalhe.btn_text_limpar}>Limpar</Text>
                </Pressable>
            </View>
        </View>
    )
}



export const styleProdutoPVDetalhe = StyleSheet.create({
    textProduct: {
        fontWeight: '600',
        margin: 16,
        fontSize: 16
    },
    topHeaderStyle: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    topHeaderItemStyle: {
        elevation: 1,
        width: '20%'
    },
    btn_apply_desconto: {
        backgroundColor: '#E3E3E3',
        paddingHorizontal: 32,
        paddingVertical: 8,
        marginVertical: 8,
        borderRadius: 32,
        elevation: 3
    },
    btn_text_apply_desconto: {
        color: '#000',
        fontWeight: '600',
        alignSelf: 'center'
    },
    btn_cancel_desconto: {
        fontWeight: '600',
        alignSelf: 'center'
    },
    btn_text_cancel_desconto: {
        color: '#1068EB',
        fontWeight: '600',
        alignSelf: 'center'
    },
    btn_text_limpar: {
        color: 'red',
        fontWeight: '600',
        alignSelf: 'center'
    }
});

export default C_003_01_05_TopHeaderItensProdutosDetalhesPV;