import { TouchableHighlight, Text } from "react-native";
import { logout } from "../../view_controller/login/LoginViewController";
import { router } from "expo-router";
import { DataKey } from "../../enum/DataKeys";

const LoggoutTitle = () => {
    return (
        <TouchableHighlight
            onPress={() => {
                logout(DataKey.LoginResponse).then(() => {
                    router.replace("/")
                })
            }}
            underlayColor={'white'}
          
        >
            <Text>Sair</Text>
        </TouchableHighlight>
    );
}

export default LoggoutTitle;