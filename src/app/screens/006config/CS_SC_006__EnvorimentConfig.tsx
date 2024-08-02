import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { useDatabase } from "../../services/storage/useDatabase";
import { storeSimpleDataVc } from "../../view_controller/SharedViewController";
import { DataKey } from "../../enum/DataKeys";
import api from "../../services/api/axios_config";
import { showToast, ToastType } from "../../util/ShowToast";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import { validaAmbiente } from "../../services/api/endpoint/login/CS_LoginGeral";
import { logout } from "../../view_controller/login/LoginViewController";
import { getSimpleData } from "../../services/storage/AsyncStorageConfig";
import CustomLoading from "../../components/loading/CustomLoading";


// Componente de configuração de ambiente
const CS_SC_006__EnvorimentConfig = ({ route }: { route: any }) => {
    // Estados para gerenciar tenant, URL base, token e se há valores armazenados
    const [tenant, setTenant] = useState('');
    const [urlBase, setUrlBase] = useState('');
    const [token, setToken] = useState('xd');
    const [hasValue, setHasValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { navigate } = useNavigation();
    const db = useDatabase();
    const { doLogout = false } = route.params || {}

    // useEffect para carregar os dados iniciais
    useFocusEffect(
        useCallback(() => {
            if (doLogout) {
                setHasValue(false)
                setIsLoading(false)
            } else {
                get()
            }
        }, [])
    );

    // Função para navegar para o menu
    async function init() {
        setIsLoading(true)
        const isValidado = await getSimpleData(DataKey.IsLoginValidado)
        if (isValidado) {
            navigate('Login');
        } else {
            if (tenant === '' || tenant === undefined || urlBase === '' || urlBase === undefined || token === '' || token === undefined) {
                showToast(ToastType.ERROR, "Dados Insuficientes!", "Preencha os dados corretamente para avançar!")
                setIsLoading(false)
            } else {
                validaAmbiente({ tenant: Number(tenant), token: token }).then((res) => {
                    if (res.Retorno.IsOk) {
                        storeSimpleDataVc(DataKey.IsLoginValidado, "1").then(() => {
                            navigate('Login');
                        })
                    }
                    setIsLoading(false)
                }).catch((res) => {
                    showToast(ToastType.ERROR, "Erro", "Um erro ocorreu, verifique as informações")
                    setIsLoading(false)
                })
            }
        }

    }

    // Função assíncrona para buscar dados do banco de dados
    async function get() {
        try {
            await db.get().then((response) => {
                if (response != null) {
                    // Se houver resposta, atualizar estados e armazenar dados localmente
                    setHasValue(true);
                    setTenant(response!.tenantId.toString());
                    setUrlBase(response!.urlBase);
                    setToken(response!.token);
                    storeSimpleDataVc(DataKey.TenantId, response.tenantId.toString()).then(() => {
                        //configura a url no axios
                        api.defaults.baseURL = response.urlBase;
                        init()
                    });
                } else {
                    // Se não houver resposta, resetar estados
                    setHasValue(false);
                    setTenant('');
                    setUrlBase('');
                    setToken('xd--');
                }
            });
        } catch (error) {
            // Tratar erros (pode ser aprimorado com um alerta ou log)
        }
    }

    // Função assíncrona para criar uma nova entrada no banco de dados
    async function create() {
        setIsLoading(true)
        const id = 501;
        const isValidado = false;
        try {
            await db.create({ id, urlBase, token, tenantId: tenant, isValidado }).then(() => {
                get().then(() => {
                    setIsLoading(false)
                }); // Buscar dados atualizados após a criação
            });
        } catch (error) {
            Alert.alert("Error", "Deu erro, cheque o log");
            setIsLoading(false)
            return
        }
    }

    // Função assíncrona para excluir uma entrada do banco de dados
    async function exclude() {
        setHasValue(false);
    }

    if (isLoading) {
        return <CustomLoading />
    }
    // Renderização do componente
    return (
        <View style={{ flex: 1}}>
            <ImageBackground
                source={require('../../../../assets/loginConf01.png')}
                style={{ flex: 1 }}
            >
                {hasValue && (
                    // Se houver valores, exibir dados e botões de ações
                    <View>
                        <View style={commonStyle.align_centralizar}>
                            <Text style={commonStyle.text_size_20}>{`Tenant: ${tenant}`}</Text>
                            <Text style={commonStyle.text_size_20}>{`URL: ${urlBase}`}</Text>
                            <Text style={commonStyle.text_size_20}>{`Token: ${token}`}</Text>
                        </View>

                        <View style={[commonStyle.justify_content_space_btw, commonStyle.common_rowItem]}>
                            <TouchableHighlight
                                onPress={() => exclude()}
                                style={commonStyle.common_button_style}
                                underlayColor='white'
                            >
                                <Text style={commonStyle.common_text_button_style}>Editar</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={init}
                                style={commonStyle.common_button_style}
                                underlayColor='white'
                            >
                                <Text style={commonStyle.common_text_button_style}>Validar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}

                {!hasValue && (
                    // Se não houver valores, exibir campos de entrada para configuração
                    <View style={[commonStyle.common_margin_top_64, commonStyle.common_margin_horizontal]}>
                        <View style={[commonStyle.common_columnItem]}>
                            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_margin_bottom_8]}>
                                <Text style={[commonStyle.common_fontWeight_600,{color: '#fff', fontSize: 16}]}>Tenant</Text>
                                <CustomIcon icon={ICON_NAME.CAMERA} iconColor="#fff" iconSize={28} onPress={() => {
                                    navigate('Camera', {
                                        previousScreen: 'Config_Ambiente'
                                    })
                                    
                                }} />
                            </View>
                            <TextInput
                                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                                onChangeText={setTenant}
                                placeholder="Digite o tenant"
                                keyboardType='decimal-pad'
                                value={tenant}
                            />

                            <Text style={[commonStyle.common_margin_bottom_8, commonStyle.common_fontWeight_600, {color: '#fff', fontSize: 16}]}>URL</Text>
                            <TextInput
                                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                                onChangeText={setUrlBase}
                                placeholder="Digite a URL"
                                value={urlBase}
                            />

                            <Text style={[commonStyle.common_margin_bottom_8, commonStyle.common_fontWeight_600, {color: '#fff', fontSize: 16}]}>Token</Text>
                            <TextInput
                                style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                                onChangeText={setToken}
                                placeholder="Digite o token, caso nao tenha, preencha com QUALQUER valor"
                                value={token}
                            />

                            <TouchableHighlight
                                onPress={create}
                                style={commonStyle.common_button_style}
                                underlayColor='white'
                            >
                                <Text style={[commonStyle.common_text_button_style]}>Salvar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
            </ImageBackground>
        </View>
    );
}


export const stylesLogin = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 32
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});

export default CS_SC_006__EnvorimentConfig;