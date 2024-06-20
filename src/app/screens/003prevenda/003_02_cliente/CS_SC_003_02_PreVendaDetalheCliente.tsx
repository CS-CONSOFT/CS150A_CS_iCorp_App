import { Text, View, TouchableOpacity, ScrollView, Image, Pressable} from "react-native";
import C_003_02_01_HeaderClient from "./components/C_003_02_01_HeaderClient";
import { commonStyle } from "../../../CommonStyle";
import CustomAccordion from "../../../components/accordion/CustomAccordion";
import { ICON_NAME } from "../../../util/IconsName";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ClienteStyles } from "./ClienteStyles";


interface Avatar {
    img?: string;
    name?: string; //? Para teste
}
                                                    //Valor padrão Para teste
const CS_SC_003_02_PreVendaDetalheCliente = ({img: string, name = "Agnaldo"}: Avatar) => {

    const img: string = "";

    function ExtrairIniciais(name: string){
        const nome = name;
        const iniciais = nome.substring(0, 2)
        return iniciais;        
    }


    return (
        <View style={{backgroundColor: "#fff", height:"100%"}}>
            <C_003_02_01_HeaderClient />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginHorizontal: 15}}
            >
                <View style={[commonStyle.common_columnItem, commonStyle.common_margin_vertical, commonStyle.align_spacebetween_row, commonStyle.common_margin_horizontal]}>
                        
                    {
                        img && (img !== "") 
                        ? 
                        <Image source={{uri: img}} style={commonStyle.avatar_Imagem}/> 
                        : 
                        <View style={commonStyle.avatar_nomeIniciais}>
                            <Text style={commonStyle.title_nomeIniciais}>
                                {ExtrairIniciais(name.toUpperCase())}
                            </Text>
                        </View>
                    }
                    
                    <Text style={commonStyle.title_nomeIniciais}>{name}</Text>
                    <Text>{"00001"}</Text>
                    <TouchableOpacity
                        style={[commonStyle.common_rowItem, {width: 60, height:40}, commonStyle.align_centralizar]}
                        onPress={() => ("")}
                    >
                        <Text style={[commonStyle.font_size_16, {textDecorationLine: "underline"}]}>Alterar</Text>
                    </TouchableOpacity>
                </View>

                <View style={[commonStyle.common_rowItem, commonStyle.common_margin_vertical]}>
                    <Ionicons name="location-outline" size={36}/>
                    <Text style={[commonStyle.text_size_20]}>Endereços</Text>
                </View>

                {/** CORRESPONDENCIA */}
                
                    <CustomAccordion 
                        visibleChildren={
                            <VisibleAccordionItem title={"Correspondência"} icon={ICON_NAME.FLECHA_DIRETA} />
                        }
                        hiddenChildren={
                            <EnderecoItem />
                        }
                        
                    />

                    {/** ENTREGA */}
                    <CustomAccordion visibleChildren={
                        <VisibleAccordionItem title={"Entrega"} icon={ICON_NAME.FLECHA_DIRETA} />
                    }
                        hiddenChildren={<EnderecoItem />} />

                    {/** RETIRADA */}
                    <CustomAccordion visibleChildren={
                        <VisibleAccordionItem title={"Retirada"} icon={ICON_NAME.FLECHA_DIRETA} />
                    } hiddenChildren={<EnderecoItem />} />
            </ScrollView>
       
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

const EnderecoItem = () => {
    return (
        <View style={[commonStyle.common_columnItem, { padding: 8 }]}>
            <View style={[commonStyle.common_rowItem]}>
                <Text style={[commonStyle.common_fontWeight_600]}>CEP: </Text>
                <Text>687454-30</Text>
            </View>

            <View style={[commonStyle.common_rowItem]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Logradouro: </Text>
                <Text>Almirante Barroso, 90</Text>
            </View>

            <View style={[commonStyle.common_rowItem]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Bairro: </Text>
                <Text>Marco</Text>
            </View>

            <View style={[commonStyle.common_rowItem]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Cidade: </Text>
                <Text>Belém</Text>
            </View>

            <View style={[commonStyle.common_rowItem, { justifyContent: 'space-between' }, commonStyle.common_margin_right_16]}>
                <View style={[commonStyle.common_rowItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>UF: </Text>
                    <Text>PA</Text>
                </View>

                <View style={[commonStyle.common_rowItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>País: </Text>
                    <Text>Brasil</Text>
                </View>

            </View>
            <Pressable style={[commonStyle.common_columnItem, commonStyle.align_centralizar, ClienteStyles.btn_squad]}>
                <Ionicons name="create-outline" size={24} />
            </Pressable>    
        </View>

    )
}


export default CS_SC_003_02_PreVendaDetalheCliente;
