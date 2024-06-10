import { Text, View } from "react-native";
import C_003_02_01_HeaderClient from "./components/C_003_02_01_HeaderClient";
import { commonStyle } from "../../../CommonStyle";
import CustomAccordion from "../../../components/accordion/CustomAccordion";
import { ICON_NAME } from "../../../util/IconsName";
import Ionicons from '@expo/vector-icons/Ionicons'

const CS_SC_003_02_PreVendaDetalheCliente = () => {
    return (
        <View>
            <C_003_02_01_HeaderClient />
            <View style={[commonStyle.common_rowItem]}>
                <Text>Endereço</Text>
            </View>

            {/** CORRESPONDENCIA */}
            <CustomAccordion visibleChildren={
                <VisibleAccordionItem title={"Correspondência"} icon={ICON_NAME.FLECHA_DIRETA} />
            }
                hiddenChildren={
                    <EnderecoItem />
                } />

            {/** ENTREGA */}
            <CustomAccordion visibleChildren={
                <VisibleAccordionItem title={"Entrega"} icon={ICON_NAME.FLECHA_DIRETA} />
            }
                hiddenChildren={<EnderecoItem />} />

            {/** RETIRADA */}
            <CustomAccordion visibleChildren={
                <VisibleAccordionItem title={"Retirada"} icon={ICON_NAME.FLECHA_DIRETA} />
            } hiddenChildren={<EnderecoItem />} />
        </View>
    );
}

const VisibleAccordionItem = ({ title, icon }: { title: string, icon: any }) => {
    return (
        <View style={[commonStyle.common_rowItem, { justifyContent: 'space-between', padding: 8 }]}>
            <Text>{title}</Text>
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
            <Ionicons name="create-outline" size={24} style={{ alignSelf: 'flex-end' }} />
        </View>

    )
}


export default CS_SC_003_02_PreVendaDetalheCliente;