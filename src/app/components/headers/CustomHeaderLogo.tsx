
import { Image, Text, StyleSheet, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { useFocusEffect } from "@react-navigation/native";
import { checkIfTheresNetworkConnection } from "../../util/CheckConnection";
import { useState } from "react";
import CustomIcon from "../icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
const CustomHeaderLogo = () => {

    const [isNetworkConnected, setIsNetworkConnected] = useState(true)
    useFocusEffect(() => {
        checkIfTheresNetworkConnection().then((res) => {
            if (res == true) {
                setIsNetworkConnected(true)
            } else {
                setIsNetworkConnected(false)
            }
        })
    })

    return (
        <View style={[styles.container, commonStyle.common_rowItem]}>
            <Image style={styles.image} source={require('../../../../assets/icon.png')} />
            <Text style={[commonStyle.common_margin_left_16, commonStyle.common_margin_right_16]}>CS-Consoft</Text>
            <CustomIcon icon={ICON_NAME.WIFI} iconColor={isNetworkConnected ? "green" : "red"} />

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 32,
        height: 32,
        borderRadius: 4
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: '5%',

    },
})


export default CustomHeaderLogo;

//uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5xAPVQruOIKkTG1yBQwGiOQpLx3Fn3cuNEg7gmDz&s' 