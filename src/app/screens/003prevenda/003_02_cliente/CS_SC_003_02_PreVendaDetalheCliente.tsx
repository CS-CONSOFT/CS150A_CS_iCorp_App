import { Text, View, TouchableOpacity, ScrollView, Image, Pressable, FlatList, ActivityIndicator } from "react-native";
import C_003_02_01_HeaderClient from "./components/C_003_02_01_HeaderClient";
import { commonStyle } from "../../../CommonStyle";
import CustomAccordion from "../../../components/accordion/CustomAccordion";
import { ICON_NAME } from "../../../util/IconsName";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ClienteStyles } from "./ClienteStyles";
import { ButtonLink } from "../../../components/button/CustomButtonLink";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { DD071_Enderecos, IResGetPv } from "../../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { FETCH_STATUS } from "../../../util/FETCH_STATUS";
import { handleGetPv } from "../../../view_controller/prevenda/PreVendaViewController";
import ColorStyle from "../../../ColorStyle";
import CustomLoading from "../../../components/loading/CustomLoading";


interface Avatar {
    img?: string;
    name?: string; //? Para teste
}
//Valor padrão Para teste
const CS_SC_003_02_PreVendaDetalheCliente = ({ img: string, name = "Agnaldo" }: Avatar) => {

    const img: string = "";

    function ExtrairIniciais(name: string) {
        const nome = name;
        const iniciais = nome.substring(0, 2)
        return iniciais;
    }


    const [pv, setPv] = useState<IResGetPv>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { navigate } = useNavigation()

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
    }


    if (status === FETCH_STATUS.LOADING) {
        return <CustomLoading />
    }

    return (
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
            <C_003_02_01_HeaderClient />

            <View style={[commonStyle.common_columnItem, commonStyle.common_margin_vertical, commonStyle.align_spacebetween_row, commonStyle.common_margin_horizontal, commonStyle.common_padding_16]}>
                {
                    img && (img !== "")
                        ?
                        <Image source={{ uri: img }} style={commonStyle.avatar_Imagem} />
                        :
                        <View style={commonStyle.avatar_nomeIniciais}>
                            <Text style={commonStyle.title_nomeIniciais}>
                                {ExtrairIniciais((pv?.DD070_Nota.csicp_bb012.BB012_Nome_Cliente || "").toUpperCase())}
                            </Text>
                        </View>
                }

                <Text style={commonStyle.title_nomeIniciais}>{pv?.DD070_Nota.csicp_bb012.BB012_Nome_Cliente || ""}</Text>
                <Text>{pv?.DD070_Nota.csicp_bb012.BB012_Codigo}</Text>
                <Pressable onPress={() => navigate('ListaCliente', { isToInsertPv: true, pvId: (pv?.DD070_Nota.csicp_dd070.DD070_Id || 'zzz') })}>
                    <Text style={commonStyle.btn_text_transparente}>Alterar</Text>
                </Pressable>
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.common_margin_vertical]}>
                <Ionicons name="location-outline" size={30} />
                <Text style={[commonStyle.text_size_20, { fontWeight: "600" }]}>Endereços</Text>
            </View>

            <FlatList
                data={pv?.DD071_Enderecos}
                keyExtractor={(item) => item.csicp_dd071.DD071_Id}
                renderItem={({ item }) =>
                    <CustomAccordion
                        visibleChildren={
                            <VisibleAccordionItem title={
                                item.csicp_dd071.DD071_Tipo === 1 ? 'Correspondencia' :
                                    item.csicp_dd071.DD071_Tipo === 2 ? 'Entrega' :
                                        item.csicp_dd071.DD071_Tipo === 3 ? 'Transportadora' : ''
                            } icon={ICON_NAME.FLECHA_DIRETA} />
                        }
                        hiddenChildren={
                            <EnderecoItem item={item} isConsulta={pv?.DD070_Nota.csicp_dd070_Sit.Label === 'Consulta'} />
                        }
                    />
                }


            />
        </View>
    );
}

const VisibleAccordionItem = ({ title, icon }: { title: string, icon: any }) => {
    return (
        <View style={[commonStyle.common_rowItem, { justifyContent: 'space-between', padding: 8 }]}>
            <Text style={commonStyle.title_accordion}>{title}</Text>
            <Ionicons name={icon} style={{ alignSelf: 'center' }} size={18} />
        </View>
    );
}

const EnderecoItem = ({ item, isConsulta = false }: { item: DD071_Enderecos, isConsulta?: boolean }) => {
    const { navigate } = useNavigation()
    function editEndereco(): void {
        navigate('PreVendaEnd', {
            enderecoId: item.csicp_dd071.DD070_ID
        })
    }

    return (
        <View style={[commonStyle.common_columnItem, { padding: 8 }]}>
            <View style={[commonStyle.common_rowItem, commonStyle.common_margin_bottom_8]}>
                <Text style={[commonStyle.common_fontWeight_600]}>CEP: </Text>
                <Text>{item.csicp_dd071.DD071_CEP}</Text>
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.common_margin_bottom_8]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Logradouro: </Text>
                <Text>{item.csicp_dd071.DD071_Logradouro}</Text>
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.common_margin_bottom_8]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Bairro: </Text>
                <Text>{item.csicp_dd071.DD071_NomeBairro}</Text>
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.common_margin_bottom_8]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Cidade: </Text>
                <Text>{item.csicp_aa028.AA028_Cidade}</Text>
            </View>

            <View style={[commonStyle.common_rowItem, { justifyContent: 'space-between' }, commonStyle.common_margin_right_16, commonStyle.common_margin_bottom_8]}>
                <View style={[commonStyle.common_rowItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>UF: </Text>
                    <Text>{item.csicp_aa027.AA027_Sigla}</Text>
                </View>

                <View style={[commonStyle.common_rowItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>País: </Text>
                    <Text>{item.csicp_aa025.AA025_Descricao}</Text>
                </View>

            </View>
            {isConsulta && (
                <Pressable onPress={() => editEndereco()} style={[commonStyle.common_columnItem, commonStyle.align_centralizar, ClienteStyles.btn_squad]}>
                    <Ionicons name="create-outline" size={24} />
                </Pressable>
            )}
        </View>

    )
}


export default CS_SC_003_02_PreVendaDetalheCliente;
