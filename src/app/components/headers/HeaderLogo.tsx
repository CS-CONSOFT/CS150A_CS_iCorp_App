
import { Image, StyleSheet, View } from "react-native";
const HeaderLogo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5xAPVQruOIKkTG1yBQwGiOQpLx3Fn3cuNEg7gmDz&s' }} />

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 40,
        borderRadius: 16,
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

export default HeaderLogo;