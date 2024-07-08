import { FlatList, SafeAreaView } from "react-native";
import CustomChatCard_001 from "../../components/cards/CustomChatCard_001";
import { useEffect, useState } from "react";
import { Chat } from "../../services/api/interfaces/obras/CS_IResGetListObras";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { handleGetObraById, handleSendMessage } from "../../view_controller/obras/CS_ObrasViewController";
import { ToastType, showToast } from "../../util/ShowToast";
import CustomEmpty from "../../components/lists/CustomEmpty";
import { getObject } from "../../services/storage/AsyncStorageConfig";
import { ILoginResponse } from "../001login/ILoginResponse";
import { DataKey } from "../../enum/DataKeys";
import CustomLoading from "../../components/loading/CustomLoading";
import CustomSendChat from "../../components/chat/CustomSendChat";

const CS_CS_005_05_Chat = ({ route }: { route: any }) => {
    const { obraId } = route.params
    const [obraChat, setObraChat] = useState<Chat[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [currentUser, setCurrentUser] = useState('')


    async function getObraById() {
        setStatus(FETCH_STATUS.LOADING)
        try {
            const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse
            setCurrentUser(currentUser.UsuarioId)
            handleGetObraById({ cs_obra_id: obraId }).then((res) => {
                if (res !== undefined) {
                    setObraChat(res.Chat.toReversed())
                    setStatus(FETCH_STATUS.SUCCESS)
                }
            })
        } catch (error: any) {
            showToast(ToastType.ERROR, "Error", error.message)
        }
    }

    useEffect(() => {
        getObraById()
    }, [])

    if (status === FETCH_STATUS.LOADING) {
        return <CustomLoading />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={obraChat}
                keyExtractor={(item) => item.csicp_dd197.dd197_Id.toString()}
                ListEmptyComponent={<CustomEmpty text="Sem chat ainda! Envie uma mensagem" />}
                renderItem={({ item }) => <CustomChatCard_001 messageItem={item} currentUser={currentUser} />}
            />
            <CustomSendChat onSend={(value) => {
                handleSendMessage({ message: value, cs_obra_id: obraId }).then(() => {
                    getObraById()
                })
            }} />
        </SafeAreaView>
    );
}

export default CS_CS_005_05_Chat;