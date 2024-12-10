import { SafeAreaView } from "react-native";
import Pdf from "react-native-pdf";
/**
 * FUNDO TODO AZUL, UM TEXTO NO MEIO E ICONE AO LADO
 * Ref: OBRA ANEXOS 
 */
const CS_SC_005_04_01_Pdf = ({ pdffile }: any) => {
    const aquivoPdf: any | undefined = { uri: pdffile };


    return (
        <SafeAreaView>
            <Pdf
                source={aquivoPdf}
                onLoadComplete={(numberOfPages, filePath) => {

                }}
                onPageChanged={(page, numberOfPages) => {

                }}
                onError={(error) => {

                }}
                onPressLink={(uri) => {

                }}
                style={{ height: "60%" }}
            />
        </SafeAreaView>
    );
}

export default CS_SC_005_04_01_Pdf;