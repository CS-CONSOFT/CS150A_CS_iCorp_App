import { SafeAreaView } from "react-native";
import CustomChatCard_001 from "../../components/cards/CustomChatCard_001";

const CS_CS_005_05_Chat = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomChatCard_001 username="Valter" message={"Ixi"} image="asd" isSender={true} />
            <CustomChatCard_001 username="Valter" message={"Ixi"} image="asd" isSender={false} />
        </SafeAreaView>
    );
}

export default CS_CS_005_05_Chat;