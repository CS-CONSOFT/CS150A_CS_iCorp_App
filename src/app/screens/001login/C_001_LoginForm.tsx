import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, TextInput, Text, TouchableHighlight, ActivityIndicator } from "react-native";
import { DataKey } from "../../enum/DataKeys";
import { storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc, logout } from "../../view_controller/login/LoginViewController";
import { stylesLogin } from "./StylesLogin";
import { commonStyle } from "../../CommonStyle";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import CustomLoading from "../../components/loading/CustomLoading";
import { useDatabase } from "../../services/storage/useDatabase";
import { ToastType, showToast } from "../../util/ShowToast";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";


const CS_SC001_LoginForm = () => {
    //variaveis
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        Domínio: 'Comercial',
        Usuário: 'Barros',
        Senha: 'ba'
    });
    const { navigate } = useNavigation()
    const [isBtnLoading, setIsBtnLoading] = useState(false)
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [tenantId, setTenantId] = useState(-1)

    const db = useDatabase();
    //fim variaveis

    function navigateToMenu() {
        navigate('DrawerRoute')
    }


    useFocusEffect(
        useCallback(() => {
            setIsBtnLoading(false)
            checkIfUserIsLogged().then((isLogged) => {
                if (isLogged) {
                    navigate('DrawerRoute')
                    setStatus(FETCH_STATUS.IDLE)
                } else {
                    db.get().then((res) => {
                        setTenantId(Number(res?.tenantId))
                    })
                }
                setStatus(FETCH_STATUS.IDLE)
            })
        }, [])
    );




    async function onClickLogin(): Promise<void> {
        setStatus(FETCH_STATUS.LOADING)
        const loginData: IPostLoginData = {
            tenant: 0,
            user: attributesMap.Usuário,
            password: attributesMap.Senha
        }
        try {
            loginData.tenant = tenantId
            generalLoginVc(loginData).then((res) => {
                setStatus(FETCH_STATUS.SUCCESS)
                if (res.IsOk) {
                    console.log(res.Model.Estab_Img);
                    const toSaveJson = res.Model
                    toSaveJson.TenantId = tenantId
                    //salvando dados localmente
                    storeObjectDataVc(DataKey.LoginResponse, toSaveJson)
                    navigateToMenu()
                }
            }).catch((res) => {
                if (res.StatusCode === undefined) {
                    showToast(ToastType.ERROR, "Erro", "Falha ao logar, verifique a URL")
                    setStatus(FETCH_STATUS.ERROR)
                    logout(DataKey.LoginResponse).then(() => {
                        navigate('Config_Ambiente')
                    })
                }
            })
        } catch (error) {
            Alert.alert(error as string)
        }
    }

    const handleInputTyping = (id: string, value: string) => {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    };

    if (status === FETCH_STATUS.LOADING) {
        return <ActivityIndicator style={{ backgroundColor: "#c3c3c3", borderRadius: 32 }} color={"#fff"} size={64} />
    }

    return (
        <SafeAreaView>
            <Text style={[commonStyle.common_fontWeight_800, { fontSize: 18 }]}>Usuário</Text>
            <TextInput
                style={[commonStyle.common_input, { backgroundColor: "#fff" }]}
                onChangeText={(value) => handleInputTyping('Usuário', value)}
                value={attributesMap.Usuário}
            />

            <Text style={[commonStyle.common_fontWeight_800, { fontSize: 18 }]}>Senha</Text>
            <TextInput
                style={[commonStyle.common_input, { backgroundColor: "#fff" }]}
                onChangeText={(value) => handleInputTyping('Senha', value)}
                value={attributesMap.Senha}
                secureTextEntry={true}
            />


            <TouchableHighlight
                onPress={() => {
                    isBtnLoading ? {} : onClickLogin()
                }}
                style={commonStyle.common_button_style}
                underlayColor='white'
            >
                {isBtnLoading ? <ActivityIndicator /> : <Text style={commonStyle.common_text_button_style}>Logar</Text>}
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => {
                    navigate('Config_Ambiente')
                }}
                style={commonStyle.common_button_style}
                underlayColor='white'
            >
                <Text style={commonStyle.common_text_button_style}>Configuração</Text>
            </TouchableHighlight>
        </SafeAreaView>
    );
}

export default CS_SC001_LoginForm;