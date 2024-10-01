import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableHighlight } from "react-native";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import { DataKey } from "../../enum/DataKeys";
import { IPostLoginData } from "../../services/api/interfaces/login/CS_IPostLoginData";
import { storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { useDatabase } from "../../services/storage/useDatabase";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { ToastType, showToast } from "../../util/ShowToast";
import { getUserProperties, storeObjectDataVc } from "../../view_controller/SharedViewController";
import { checkIfUserIsLogged, generalLoginVc, logout } from "../../view_controller/login/LoginViewController";
import React from "react";

const CS_SC001_LoginForm = () => {
    //variaveis
    const [attributesMap, setAttributesMap] = useState<{ [key: string]: string }>({
        Usuário: '',
        Senha: ''
    });
    const { navigate } = useNavigation()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [tenantId, setTenantId] = useState(-1)

    const db = useDatabase();
    //fim variaveis

    function navigateToMenu() {
        navigate('DrawerRoute')
    }


    useFocusEffect(
        useCallback(() => {
            setStatus(FETCH_STATUS.LOADING)
            checkIfUserIsLogged().then((isLogged) => {
                if (isLogged) {
                    getUserProperties().then((res) => {
                        // Despacha a ação que buscará as regras e atualizará o estado
                        navigateToMenu()
                        setStatus(FETCH_STATUS.IDLE)
                    })
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


        if (loginData.user == '') {
            showToast(ToastType.ERROR, "Campo vazio", "Preencha o usuário")
        }

        if (loginData.password == '') {
            showToast(ToastType.ERROR, "Campo vazio", "Preencha a senha")
        }

        try {
            loginData.tenant = tenantId
            const res = await generalLoginVc(loginData)
            setStatus(FETCH_STATUS.SUCCESS)
            if (res.IsOk) {
                const toSaveJson = res.Model
                toSaveJson.TenantId = tenantId
                //salvando dados localmente
                await storeObjectDataVc(DataKey.LoginResponse, toSaveJson)
                navigateToMenu()
            } else {
                showToast(ToastType.ERROR, "Falha ao logar", res.Msg)
            }
        } catch (error) {
            showToast(ToastType.ERROR, "Erro", "Falha ao logar, verifique a URL base")
            setStatus(FETCH_STATUS.ERROR)
            logout(DataKey.LoginResponse).then(() => {
                storeSimpleData(DataKey.MaintainOpenConfig, "true").then(() => {
                    navigate('Config_Ambiente')
                })
            })
        }
    }

    const handleInputTyping = (id: string, value: string) => {
        setAttributesMap((prevAttributesMap) => {
            return { ...prevAttributesMap, [id]: value };
        });
    };

    const isBtnLoading = status === FETCH_STATUS.LOADING

    return (
        <SafeAreaView>
            {!isBtnLoading && (
                <>
                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.margin_8, { fontSize: 18, color: 'white' }]}>Usuário</Text>
                    <TextInput
                        style={[commonStyle.common_input, { backgroundColor: "#fff" }]}
                        onChangeText={(value) => handleInputTyping('Usuário', value)}
                        value={attributesMap.Usuário}
                    />

                    <Text style={[commonStyle.common_fontWeight_600, commonStyle.margin_8, { fontSize: 18, color: 'white' }]}>Senha</Text>
                    <TextInput
                        style={[commonStyle.common_input, { backgroundColor: "#fff" }]}
                        onChangeText={(value) => handleInputTyping('Senha', value)}
                        value={attributesMap.Senha}
                        secureTextEntry={true}
                    /></>
            )}



            <TouchableHighlight
                onPress={() => {
                    isBtnLoading ? {} : onClickLogin()
                }}
                style={[commonStyle.common_button_style, { backgroundColor: ColorStyle.colorPrimary100 }]}
                underlayColor='white'
            >
                {isBtnLoading ? <ActivityIndicator color={"#FFF"} /> : <Text style={commonStyle.common_text_button_style}>Logar</Text>}
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => {
                    storeSimpleData(DataKey.MaintainOpenConfig, "true")
                    navigate('Config_Ambiente')
                }}
                style={[commonStyle.common_button_style, { backgroundColor: ColorStyle.colorPrimary300 }]}
                underlayColor='white'
            >
                <Text style={[commonStyle.common_text_button_style, { color: 'white', }]}>Configuração</Text>
            </TouchableHighlight>
        </SafeAreaView>
    );
}

export default CS_SC001_LoginForm;