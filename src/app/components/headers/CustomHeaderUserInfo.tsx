import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getUserProperties } from "../../view_controller/SharedViewController";
import { IGetUserProperties } from "../../view_controller/interface/IGetUserProperties";
import { checkIfTheresNetworkConnection } from "../../util/CheckConnection";
import { useFocusEffect } from "@react-navigation/native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";

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
            //
        })
    }, []);


    return (
        <View style={styles.container}>
            <View style={commonStyle.common_rowItem}>
                <Text style={styles.txtEstabName}>{useProp?.estabName}</Text>
            </View>
            <Text style={styles.txtUsername}>{useProp?.userName}</Text>
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
        marginRight: 4

    },
    txtUsername: {
        textAlign: 'left',
        color: '#FFF',
        elevation: 1
    }
})

export default CustomHeaderUserInfo;