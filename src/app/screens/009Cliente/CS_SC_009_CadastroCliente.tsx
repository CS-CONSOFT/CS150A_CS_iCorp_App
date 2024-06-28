import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import { CS_IReqSave1202 } from "../../services/api/interfaces/contas/CS_IReqSave1202";
import { IReqSaveConta } from "../../services/api/interfaces/contas/CS_IReqSaveConta";
import { ICON_NAME } from "../../util/IconsName";
import { cpfCnpjMask, removeCpfCnpjMask } from "../../util/Masks";
import { ClactaEnum, GruEnum } from "./ListaEnumClasseGrupo";
import { handleSave1201, handleSave1202, handleSaveConta } from "../../view_controller/conta/ContaViewController";
import { IReqSave1201 } from "../../services/api/interfaces/contas/CS_IReqSave1201";


const CS_SC_009_CadastroCliente = () => {
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


    function handleInputTyping(id: string, value: string): void {
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

    function saveCliente() {
        //BB1201
        let reqSaveConta: IReqSaveConta = {}
        let reqSave1202: CS_IReqSave1202 = {}
        let reqSave1201: IReqSave1201 = {}

        reqSaveConta.BB012_Nome_Cliente = attributesMap.username
        reqSaveConta.BB012_Nome_Fantasia = attributesMap.fantasyName
        reqSaveConta.BB012_Codigo = Number(attributesMap.codigo)
        reqSaveConta.BB012_Is_Active = true


        if (documentType === DOCUMENT_TYPE.IS_CPF) {
            reqSave1202.BB012_CPF = removeCpfCnpjMask(attributesMap.CPF_CNPJ)
            reqSave1202.BB012_RG = Number(attributesMap.RG)


            reqSaveConta.BB012_ClasseConta_ID = ClactaEnum.ConsumidorFinal
            reqSaveConta.BB012_Grupoconta_ID = GruEnum.PessoaFisica

        } else if (documentType === DOCUMENT_TYPE.IS_CNPJ) {
            reqSave1202.BB012_CNPJ = removeCpfCnpjMask(attributesMap.CPF_CNPJ)
            reqSave1202.BB012_InscEstadual = Number(attributesMap.INSCES)

            reqSaveConta.BB012_ClasseConta_ID = ClactaEnum.Revendedor
            reqSaveConta.BB012_Grupoconta_ID = GruEnum.Privada
        }

        handleSaveConta(reqSaveConta).then((res) => {
            console.log(res);

            reqSave1202.Id = res.bb012_ID
            reqSave1201.Id = res.bb012_ID

            handleSave1201({ cs_req_save: reqSave1201 }).then(() => {
                handleSave1202({ cs_req_save: reqSave1202 }).then(() => {
                    navigate('Cadastro_002_End', {
                        isPreVendaEditEnd: false
                    })
                })
            })
        })

    }

    return (
        <SafeAreaView>
            <View style={[commonStyle.common_rowItem, commonStyle.align_centralizar, commonStyle.common_margin_top_64, commonStyle.common_margin_bottom_16]}>
                <CustomIcon icon={ICON_NAME.ADICIONAR_PESSOA_CONTORNADO} iconColor="#0A3147" />
                <Text style={[commonStyle.text_size_20, commonStyle.common_fontWeight_800, commonStyle.common_margin_left_16, { color: "#0A3147" }]}>Novo Cliente</Text>
            </View>

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>CPF/CNPJ</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('CPF_CNPJ', value)}
                value={attributesMap.CPF_CNPJ}
                placeholder="CPF/CNPJ"
                keyboardType='numeric'
                maxLength={18}
                onEndEditing={checkLenghtOfDocumentTypeNumber}
            />


            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Nome</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('username', value)}
                value={attributesMap.username}
                placeholder="Nome"
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Nome Fantasia</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('fantasyName', value)}
                value={attributesMap.fantasyName}
                placeholder="Nome Fantasia"
            />

            <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>Código</Text>
            <TextInput
                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                onChangeText={(value) => handleInputTyping('codigo', value)}
                value={attributesMap.codigo}
                placeholder="Codigo"
                keyboardType='numeric'
            />

            {documentType === DOCUMENT_TYPE.IS_CPF && (
                <>
                    <Text style={[commonStyle.text_aligment_left, commonStyle.common_margin_left_16, commonStyle.font_size_16]}>RG</Text>
                    <TextInput
                        style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                        onChangeText={(value) => handleInputTyping('RG', value)}
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
                        onChangeText={(value) => handleInputTyping('INSCES', value)}
                        value={attributesMap.RG}
                        placeholder="Inscrição Estadual"
                        keyboardType='numeric'
                    />
                </>
            )}

            <TouchableHighlight
                onPress={() => saveCliente()}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Continuar</Text></TouchableHighlight>

        </SafeAreaView >
    );
}

export default CS_SC_009_CadastroCliente;