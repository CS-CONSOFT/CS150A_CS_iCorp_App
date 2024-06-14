import { Image, StyleSheet, Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";

const CustomChatCard_001 = ({ username, message, image, isSender }: { username: string, message: string, image: string, isSender: boolean }) => {
    return (
        <View style={[commonStyle.margin_16, commonStyle.common_rowItem, isSender ? style.sender : style.receiver]}>
            <Image source={{ uri: image }} />
            <View style={commonStyle.common_columnItem}>
                <Text style={style.username}>{username}</Text>
                <Text style={style.message}>{message}</Text>
            </View>
        </View >
    );
}

const style = StyleSheet.create({
    sender: {
        backgroundColor: '#95B5C7', borderRadius: 12, paddingLeft: 16, marginLeft: 54
    },
    receiver: {
        backgroundColor: '#e3e3e3', borderRadius: 12, paddingLeft: 16, marginRight: 54
    },
    username: {
        color: '#1E1E1E', fontWeight: '500', fontSize: 18, padding: 4
    },
    message: {
        color: '#1E1E1E', fontWeight: '400', fontSize: 16, padding: 4
    }
})

export default CustomChatCard_001;