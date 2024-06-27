import { SafeAreaView } from "react-native";
import CustomCard_002 from "../../components/cards/CustomCard_002";
import { ICON_NAME } from "../../util/IconsName";

/**
 * FUNDO TODO AZUL, UM TEXTO NO MEIO E ICONE AO LADO
 * Ref: OBRA ANEXOS 
 */
const CS_SC_005_04_Anexos = () => {
    return (
        <SafeAreaView>
            <CustomCard_002 icon={ICON_NAME.IMAGE} title="Imagem do projeto" />
            <CustomCard_002 icon={ICON_NAME.DOCUMENT} title="PDF do projeto" />
        </SafeAreaView>
    );
}

export default CS_SC_005_04_Anexos;