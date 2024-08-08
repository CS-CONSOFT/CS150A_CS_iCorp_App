
import { Image, StyleSheet, View } from "react-native";
const CustomHeaderLogo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../../assets/logo-extenso.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 280,
        height: 32,
        borderRadius: 4
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8,
    },
})


export default CustomHeaderLogo;

//uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5xAPVQruOIKkTG1yBQwGiOQpLx3Fn3cuNEg7gmDz&s' 