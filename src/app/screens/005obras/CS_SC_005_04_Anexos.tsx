import React from 'react';
import { Pressable, SafeAreaView, Text, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import CustomCard_002 from "../../components/cards/CustomCard_002";
import { ICON_NAME } from "../../util/IconsName";
import { useEffect, useState } from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';

/**
 * FUNDO TODO AZUL, UM TEXTO NO MEIO E ICONE AO LADO
 * Ref: OBRA ANEXOS 
 */
const CS_SC_005_04_Anexos = () => {

    const api =  axios.create({
        baseURL: "http://docente.ifsc.edu.br/"
    })


    const [show, setShow] = useState<Boolean>(false);
    const [arquivo, setArquivo] = useState<any>();
    const aquivoPdf: any | undefined = { uri: 'http://docente.ifsc.edu.br/vilson.junior/pi/04_Introducao_JavaScript.pdf' };
   
    const pressShow =  () => {
        setShow(!show)
        console.log("clicado")
    }

    function ShowPdf(filePdf: any){
        return(
            <WebView
                source={filePdf} 
                style={{flex: 1}}
                onNavigationStateChange={navState => 
                navState.url !== aquivoPdf &&
                    setShow(false)
                }
            />
                    
        )
    }


    
    const downloadPDF = async () => {
        const pdfUrl: string = 'vilson.junior/pi/04_Introducao_JavaScript.pdf';
      
        try {
            const response = await api.get(`${pdfUrl}`);
            setShow(true)
            setArquivo(response)
            alert('PDF baixado com sucesso!');
        } catch (error) {
            Alert.alert(`Erro ao baixar o PDF:${error}`);
        }
    };
    

    return (
        <SafeAreaView style={styles.contanier}>
            <Pressable onPress={() => Alert.alert("Funcionalidade em implementação")} style={{width:"90%"}}>
                <CustomCard_002 icon={ICON_NAME.IMAGE} title="Imagem do projeto" />
            </Pressable>
            <Pressable 
            onPress={ () => {
                pressShow()
                Alert.alert("PDF baixado com sucesso")
            }} 
            style={{width:"90%"}}
            >   
                {
                    show && (
                        ShowPdf(aquivoPdf)
                    )
                }                
                <CustomCard_002 
                icon={ICON_NAME.DOCUMENT} 
                title="PDF do projeto"
                />
                
            </Pressable>
        </SafeAreaView>
    );
}

export default CS_SC_005_04_Anexos;

const styles = StyleSheet.create({
    contanier:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pdf:{
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    
})