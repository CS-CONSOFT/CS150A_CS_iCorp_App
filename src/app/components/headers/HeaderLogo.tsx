
import { Image,StyleSheet } from "react-native";
const HeaderLogo = () => {
    return (
        <Image style={styles.image} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5xAPVQruOIKkTG1yBQwGiOQpLx3Fn3cuNEg7gmDz&s' }} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 40,
        borderRadius: 16
    }
})

export default HeaderLogo;