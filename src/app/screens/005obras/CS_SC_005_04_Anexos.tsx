import { Alert, Pressable, SafeAreaView } from "react-native";
import CustomCard_002 from "../../components/cards/CustomCard_002";
import { ICON_NAME } from "../../util/IconsName";
import { useNavigation } from "@react-navigation/native";
/**
 * FUNDO TODO AZUL, UM TEXTO NO MEIO E ICONE AO LADO
 * Ref: OBRA ANEXOS 
 */
const CS_SC_005_04_Anexos = () => {
    const navigation = useNavigation;
    const aquivoPdf: any | undefined  = {uri: 'http://docente.ifsc.edu.br/vilson.junior/pi/04_Introducao_JavaScript.pdf'};



    return (
        <SafeAreaView>
            <CustomCard_002 icon={ICON_NAME.IMAGE} title="Imagem do projeto" />
            <Pressable onPress={() => ""}>
                <CustomCard_002 icon={ICON_NAME.DOCUMENT} title="PDF do projeto" />
            </Pressable>
        </SafeAreaView>
    );
}

export default CS_SC_005_04_Anexos;