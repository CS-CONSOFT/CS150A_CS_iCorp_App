
import { Image, StyleSheet, View } from "react-native";
const CustomHeaderLogo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../../assets/LogoBrancoVermelho.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 260,
        height: 60,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAtendimentoMobile: {
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 32,
        fontSize: 18
    },
})

export default CustomHeaderLogo;

//uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5xAPVQruOIKkTG1yBQwGiOQpLx3Fn3cuNEg7gmDz&s' 