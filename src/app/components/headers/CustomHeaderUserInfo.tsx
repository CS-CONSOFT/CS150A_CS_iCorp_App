import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getUserProperties } from "../../view_controller/SharedViewController";
import { IGetUserProperties } from "../../view_controller/interface/IGetUserProperties";
import appConfig from '../../../../app.json';
const CustomHeaderUserInfo = () => {
    const [useProp, setUserProp] = useState<IGetUserProperties>()
    useEffect(() => {
        getUserProperties().then((res) => {
            const defineUser: IGetUserProperties = {
                usuarioId: res.usuarioId || '0',
                userName: res.userName,
                tenantId: res.tenantId,
                estabId: res.estabId,
                estabName: res.estabName
            }
            setUserProp(defineUser)
        })
    }, [useProp]);

    return (
        <View style={styles.container}>
            <Text style={styles.txtEstabName}>{useProp?.estabName}</Text>
            <Text style={styles.txtUsername}>{useProp?.userName}</Text>
            <Text style={{ color: "#FFF" }}>-Versão: {appConfig.expo.version}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 32,
        alignItems: 'center'
    },
    txtEstabName: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '900',
        color: '#FFF',
        elevation: 1,

    },
    txtUsername: {
        textAlign: 'left',
        color: '#FFF',
        elevation: 1
    }
})

export default CustomHeaderUserInfo;