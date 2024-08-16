import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";

const PDF = ({ route }: { route: any }) => {
    const [htmlResponse, setHtmlResponse] = useState('')
    useEffect(() => {
        setHtmlResponse(route.params.htmlContent)

    }, [])
    return (
        <WebView
            style={{ height: '100%', width: '100%' }}
            source={{ html: htmlResponse }}
        />
    );
}

export default PDF;