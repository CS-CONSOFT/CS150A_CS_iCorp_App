import { Image, StyleSheet, Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { Chat } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { useEffect, useState } from "react";
import { formatDateToSlashPattern } from "../../util/FormatText";

const CustomChatCard_001 = ({ messageItem, currentUser }: {
    messageItem: Chat
    /** id do usuario atual */
    currentUser: string
}) => {
    const [isSender, setIsSender] = useState(false)

    useEffect(() => {
        setIsSender(messageItem.csicp_dd197.dd197_Usuario === currentUser)
    }, [])

    return (
        <View style={[commonStyle.margin_16, commonStyle.common_rowItem, isSender ? style.sender : style.receiver]}>
            <View style={commonStyle.common_columnItem}>
                <View style={[commonStyle.common_rowItem]}>
                    <Text style={style.username}>{messageItem.csicp_sy001.SY001_Nome}</Text>
                    <View style={[{ alignItems: 'flex-end', marginLeft: 16 }, commonStyle.common_rowItem]}>
                        <Text style={style.message}>{formatDateToSlashPattern(messageItem.csicp_dd197.dd197_Data)}</Text>
                        <Text style={style.message}>{messageItem.csicp_dd197.dd197_Hora}</Text>
                    </View>
                </View>
                <Text style={style.message}>{messageItem.csicp_dd197.dd197_Mensagem}</Text>

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