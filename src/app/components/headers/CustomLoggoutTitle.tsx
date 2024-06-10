import { TouchableHighlight, Text } from "react-native";
import { logout } from "../../view_controller/login/LoginViewController";
import { DataKey } from "../../enum/DataKeys";
import { useNavigation } from "@react-navigation/native";

const CustomLoggoutTitle = () => {
    const { navigate } = useNavigation()
    return (
        <TouchableHighlight
            onPress={() => {
                logout(DataKey.LoginResponse).then(() => {
                    navigate('Login')
                })
            }}
            underlayColor={'white'}

        >
            <Text>Sair</Text>
        </TouchableHighlight>
    );
}

export default CustomLoggoutTitle;