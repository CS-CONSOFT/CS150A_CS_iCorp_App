import { useEffect, useState } from "react";
import * as Print from 'expo-print';
import WebView from "react-native-webview";
import { shareAsync } from 'expo-sharing';
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../CommonStyle";
import { showToast, ToastType } from "../util/ShowToast";
import React from "react";

const PDF = ({ route }: { route: any }) => {
    const [htmlResponse, setHtmlResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setHtmlResponse(route.params.htmlContent)
    }, [])

    const printToFile = async (html: string) => {
        setIsLoading(true)
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        Print.printToFileAsync({ html: html }).then((res) => {
            shareAsync(res.uri, { UTI: '.pdf', mimeType: 'application/pdf' }).then((res) => {
                setIsLoading(false)

            }).catch((err) => {
                showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0])
                setIsLoading(false)
            });
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0])
            setIsLoading(false)
        });
    };

    return (
        <>
            <WebView
                source={{ html: htmlResponse }}
            >
            </WebView>
            <TouchableHighlight onPress={() => printToFile(htmlResponse)} style={commonStyle.common_button_style}>
                {isLoading ? <ActivityIndicator color={"#FFF"} /> : <Text style={commonStyle.common_text_button_style}>Compartilhar PDF</Text>}
            </TouchableHighlight>
        </>
    );
}

export default PDF;