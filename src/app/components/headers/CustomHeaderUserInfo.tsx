import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getUserProperties } from "../../view_controller/SharedViewController";
import { IGetUserProperties } from "../../view_controller/interface/IGetUserProperties";

const CustomHeaderUserInfo = () => {
    const [useProp, setUserProp] = useState<IGetUserProperties>()
    useEffect(() => {
        getUserProperties().then((res) => {
            const defineUser: IGetUserProperties = {
                userId: res.userId,
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 32,
        marginTop: 12,
        alignContent: 'center'
    },
    txtEstabName: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '900'
    },
    txtUsername: {
        textAlign: 'left'
    }
})

export default CustomHeaderUserInfo;