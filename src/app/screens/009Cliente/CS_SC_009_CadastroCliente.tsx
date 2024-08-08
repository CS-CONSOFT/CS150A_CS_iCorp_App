import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { CS_IReqSave1202 } from "../../services/api/interfaces/contas/CS_IReqSave1202";
import { IReqSaveConta } from "../../services/api/interfaces/contas/CS_IReqSaveConta";
import { ICON_NAME } from "../../util/IconsName";
import { cpfCnpjMask, removeCpfCnpjMask } from "../../util/Masks";
import { ClactaEnum, GruEnum } from "./ListaEnumClasseGrupo";
import { handleGetClaId, handleGetContaById, handleGetGruId, handleSave1201, handleSave1202, handleSaveConta } from "../../view_controller/conta/ContaViewController";
import { IReqSave1201 } from "../../services/api/interfaces/contas/CS_IReqSave1201";
import { ToastType, showToast } from "../../util/ShowToast";
import ColorStyle from "../../ColorStyle";
import { IResGetContaById } from "../../services/api/interfaces/contas/CS_IResGetContaById";


const CS_SC_009_CadastroCliente = ({ route }: { route: any }) => {
    const { navigate } = useNavigation()
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        username: '',
        fantasyName: '',
        CPF_CNPJ: '',
        RG: '',
        codigo: '',
        //inscricao estadual
        INSCES: '',
    });

    const DOCUMENT_TYPE = {
        IS_CPF: 0,
        IS_CNPJ: 1,
        NO_ONE: -1
    }
    const [documentType, setDocumentType] = useState(DOCUMENT_TYPE.NO_ONE)
    const [isSavingLoading, setIsSavingLoading] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userToEdit, setUserToEdit] = useState<IResGetContaById>()
    /**
     * ID da bb012 id, so tem valor quando a conta é pra ser editada
     */
    const bb012id_when_edit_cliente = route?.params?.bb12id || undefined;


    function resetForm() {
        setAttributesMap({
            username: '',
            fantasyName: '',
            CPF_CNPJ: '',
            RG: '',
            codigo: '',
            INSCES: '',
        });
        setIsSavingLoading(false)
        setDocumentType(DOCUMENT_TYPE.NO_ONE);
    }

    useEffect(() => {
        resetForm()
        if (bb012id_when_edit_cliente) {
            setIsLoadingData(true)
            getContaByIdToEdit(bb012id_when_edit_cliente)
        }
    }, [bb012id_when_edit_cliente])

    function getContaByIdToEdit(bb012_id: string) {
        handleGetContaById({ cs_conta_id: bb012_id }).then((res) => {
            //seta o usuario para editar
            setUserToEdit(res)
            //se for cpf
            if (res.BB01202.csicp_bb01202.BB012_CPF !== undefined) {
                setDocumentType(DOCUMENT_TYPE.IS_CPF)
                saveValuesToObjectForm('CPF_CNPJ', (res.BB01202.csicp_bb01202.BB012_CPF || 0).toString())
                saveValuesToObjectForm('RG', (res.BB01202.csicp_bb01202.BB012_RG || 0).toString())
            } else {
                setDocumentType(DOCUMENT_TYPE.IS_CNPJ)
                saveValuesToObjectForm('CPF_CNPJ', (res.BB01202.csicp_bb01202.BB012_CNPJ || 0).toString())
                saveValuesToObjectForm('INSCES', (res.BB01202.csicp_bb01202.BB012_InscEstadual || 0).toString())
            }
            saveValuesToObjectForm('username', res.csicp_bb012.csicp_bb012.BB012_Nome_Cliente)
            saveValuesToObjectForm('fantasyName', res.csicp_bb012.csicp_bb012.BB012_Nome_Fantasia)
            saveValuesToObjectForm('codigo', (res.csicp_bb012.csicp_bb012.BB012_Codigo || 0).toString())

            setIsLoadingData(false)
        })
    }

    function saveValuesToObjectForm(id: string, value: string): void {
        if (id === 'CPF_CNPJ') {
            setAttributesMap((prev) => {
                return { ...prev, [id]: cpfCnpjMask(value) }
            })

        } else {
            setAttributesMap((prev) => {
                return { ...prev, [id]: value }
            })
        }
    }


    function checkLenghtOfDocumentTypeNumber(): void {
        //se for CNPJ - 18 caracteres devido aos 14 dos digitos + os valores de mascara, como pontos e barras
        if (attributesMap.CPF_CNPJ.length === 18) {
            setDocumentType(DOCUMENT_TYPE.IS_CNPJ)
        } else if (attributesMap.CPF_CNPJ.length === 14) {
            setDocumentType(DOCUMENT_TYPE.IS_CPF)
        } else {
            setDocumentType(DOCUMENT_TYPE.NO_ONE)
        }
    }

    async function saveCliente() {
        setIsSavingLoading(true)
        //BB1201
        let reqSaveConta: IReqSaveConta = userToEdit?.csicp_bb012.csicp_bb012 || {}
        let reqSave1202: CS_IReqSave1202 = {}
        let reqSave1201: IReqSave1201 = {}

        reqSaveConta.BB012_Nome_Cliente = attributesMap.username
        reqSaveConta.BB012_Nome_Fantasia = attributesMap.fantasyName
        reqSaveConta.BB012_Is_Active = true

        if (reqSaveConta.BB012_Nome_Cliente === undefined || reqSaveConta.BB012_Nome_Cliente === "") {
            showToast(ToastType.ERROR, "Nome do Cliente!", "Precisa ser preenchido")
            return
        }

        if (reqSaveConta.BB012_Nome_Fantasia === undefined || reqSaveConta.BB012_Nome_Fantasia === "") {
            showToast(ToastType.ERROR, "Nome Fantasia!", "Precisa ser preenchido")
            return
        }


        if (documentType === DOCUMENT_TYPE.NO_ONE) {
            showToast(ToastType.ERROR, "CPF-CNPJ", "Precisa ser preenchido")
            return
        }


        if (documentType === DOCUMENT_TYPE.IS_CPF) {
            /** teste de campos */
            reqSave1202.BB012_CPF = removeCpfCnpjMask(attributesMap.CPF_CNPJ)
            reqSave1202.BB012_RG = Number(attributesMap.RG)

            if (reqSave1202.BB012_CPF === undefined || reqSave1202.BB012_CPF === 0) {
                showToast(ToastType.ERROR, "CPF!", "Precisa ser preenchido")
                return
            }

            if (reqSave1202.BB012_RG === undefined || reqSave1202.BB012_RG === 0) {
                showToast(ToastType.ERROR, "RG!", "Precisa ser preenchido")
                return
            }


            reqSaveConta.BB012_ClasseConta_ID = await handleGetClaId(ClactaEnum.ConsumidorFinal)
            reqSaveConta.BB012_Grupoconta_ID = await handleGetGruId(GruEnum.PessoaFisica)

        } else if (documentType === DOCUMENT_TYPE.IS_CNPJ) {
            /** teste de campos */
            reqSave1202.BB012_CNPJ = removeCpfCnpjMask(attributesMap.CPF_CNPJ)
            reqSave1202.BB012_InscEstadual = Number(attributesMap.INSCES)

            if (reqSave1202.BB012_CNPJ === undefined || reqSave1202.BB012_InscEstadual === 0) {
                showToast(ToastType.ERROR, "CNPJ!", "Precisa ser preenchido")
                return
            }

            if (reqSave1202.BB012_InscEstadual === undefined || reqSave1202.BB012_InscEstadual === 0) {
                showToast(ToastType.ERROR, "Inscrição Estadual!", "Precisa ser preenchido")
                return
            }

            /** recuperando id de classe e grupo */
            reqSaveConta.BB012_ClasseConta_ID = await handleGetClaId(ClactaEnum.Revendedor)
            reqSaveConta.BB012_Grupoconta_ID = await handleGetGruId(GruEnum.Privada)
        }


        /** funcao para salvar a conta */
        handleSaveConta(reqSaveConta).then((res) => {
            /** se der erro */
            if (res.Str_ReturnErro.Out_IsSuccess === undefined || res.bb012_ID === undefined) {
                showToast(ToastType.ERROR, "Erro", res.Str_ReturnErro.Out_Message)
                setIsSavingLoading(false)
                return
            }
            /** setado os ids  */
            reqSave1202.Id = bb012id_when_edit_cliente || res.bb012_ID
            reqSave1201.Id = bb012id_when_edit_cliente || res.bb012_ID

            /** salvando a 1201 */
            handleSave1201({ cs_req_save: reqSave1201 }).then(() => {
                handleSave1202({ cs_req_save: reqSave1202 }).then(() => {


                    //cliente editando
                    if (bb012id_when_edit_cliente !== undefined) {
                        setIsSavingLoading(false)
                    } else {
                        resetForm()
                        navigate('Cadastro_002_End', {
                            bb12id: bb012id_when_edit_cliente || res.bb012_ID,
                            isEdit: bb012id_when_edit_cliente ? true : false
                        })
                    }
                })
            })
        }).catch((res) => {
            showToast(ToastType.ERROR, "Erro", "Um erro ocorreu")
            setIsSavingLoading(false)
            return
        })
    }

    if (isLoadingData) {
        return <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[commonStyle.common_rowItem, commonStyle.align_centralizar, commonStyle.common_margin_top_64, commonStyle.common_margin_bottom_16]}>
                    <CustomIcon icon={ICON_NAME.ADICIONAR_PESSOA_CONTORNADO} iconColor="#0A3147" />
                    <Text style={[commonStyle.text_size_20, commonStyle.common_fontWeight_800, commonStyle.common_margin_left_16, { color: "#0A3147" }]}>Novo Cliente</Text>
                </View>

                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>CPF/CNPJ</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => saveValuesToObjectForm('CPF_CNPJ', value)}
                    value={attributesMap.CPF_CNPJ}
                    placeholder="CPF/CNPJ"
                    keyboardType='numeric'
                    maxLength={18}
                    onEndEditing={checkLenghtOfDocumentTypeNumber}
                />


                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Nome</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => saveValuesToObjectForm('username', value)}
                    value={attributesMap.username}
                    maxLength={150}
                    placeholder="Nome"
                />

                <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Nome Fantasia</Text>
                <TextInput
                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                    onChangeText={(value) => saveValuesToObjectForm('fantasyName', value)}
                    value={attributesMap.fantasyName}
                    maxLength={100}
                    placeholder="Nome Fantasia"
                />

                {documentType === DOCUMENT_TYPE.IS_CPF && (
                    <>
                        <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>RG</Text>
                        <TextInput
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                            onChangeText={(value) => saveValuesToObjectForm('RG', value)}
                            value={attributesMap.RG}
                            placeholder="RG"
                            keyboardType='numeric'
                        />
                    </>
                )}

                {documentType === DOCUMENT_TYPE.IS_CNPJ && (
                    <>
                        <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Inscrição Estadual</Text>
                        <TextInput
                            style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                            onChangeText={(value) => saveValuesToObjectForm('INSCES', value)}
                            value={attributesMap.INSCES}
                            placeholder="Inscrição Estadual"
                            keyboardType='numeric'
                        />
                    </>
                )}

                <TouchableHighlight
                    onPress={() => isSavingLoading ? showToast(ToastType.INFO, "Carregando!", "Aguarde") : saveCliente()}
                    style={commonStyle.common_button_style}
                    underlayColor='white'
                >
                    {isSavingLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={commonStyle.common_text_button_style}>Salvar</Text>}
                </TouchableHighlight>

                {/** quando for edit */}
                {bb012id_when_edit_cliente && (
                    <TouchableHighlight
                        onPress={() => navigate('Cadastro_002_End', {
                            bb12id: bb012id_when_edit_cliente || undefined,
                            isEdit: bb012id_when_edit_cliente ? true : false
                        })}
                        style={commonStyle.common_button_style}
                        underlayColor='white'
                    >
                        {isSavingLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={commonStyle.common_text_button_style}>Ir Para Endereçamento</Text>}
                    </TouchableHighlight>
                )}

            </ScrollView>
        </SafeAreaView >
    );
}

export default CS_SC_009_CadastroCliente;