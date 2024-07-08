import React from 'react';
import { Pressable, SafeAreaView, Text, StyleSheet, Dimensions, Alert } from "react-native";
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


    const [show, setShow] = useState<Boolean>(false);
    const aquivoPdf: any | undefined = { uri: 'http://docente.ifsc.edu.br/vilson.junior/pi/04_Introducao_JavaScript.pdf' };

   
    const pressShow =  () => {
        setShow(!show)
        console.log("clicado")
    }

    function ShowPdf(){
        return(
            <WebView
                source={aquivoPdf} 
                style={{flex: 1}}
                onNavigationStateChange={navState => 
                navState.url !== aquivoPdf &&
                    setShow(false)
                }
            />         
        )
    }

    return (
        <SafeAreaView style={styles.contanier}>
            <Pressable onPress={() => Alert.alert("Funcionalidade em implementação")} style={{width:"90%"}}>
                <CustomCard_002 icon={ICON_NAME.IMAGE} title="Imagem do projeto" />
            </Pressable>
            <Pressable 
            onPress={ () => {
                pressShow()
            }} 
            style={{width:"90%"}}
            >
                
                <CustomCard_002 
                icon={ICON_NAME.DOCUMENT} 
                title="PDF do projeto"
                />
                {
                    show && (
                        ShowPdf()
                    )
                }
                    
                
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