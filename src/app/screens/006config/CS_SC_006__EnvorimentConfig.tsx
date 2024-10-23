import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomLoading from "../../components/loading/CustomLoading";
import { DataKey } from "../../enum/DataKeys";
import api from "../../services/api/axios_config";
import { validaAmbiente } from "../../services/api/endpoint/login/CS_LoginGeral";
import { getSimpleData, storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { useDatabase } from "../../services/storage/useDatabase";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { storeSimpleDataVc } from "../../view_controller/SharedViewController";
import { logout } from "../../view_controller/login/LoginViewController";



// Componente de configuração de ambiente
const CS_SC_006__EnvorimentConfig = ({ route }: { route: any }) => {
    // Estados para gerenciar tenant, URL base, token e se há valores armazenados
    const [tenant, setTenant] = useState('');
    const [urlBase, setUrlBase] = useState('https://###.csicorpnet.com.br');
    const [token, setToken] = useState('-');
    const [nomeCotacao, setNomeCotacao] = useState('');
    const [hasValue, setHasValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isEnviromentValidated, setIsEnviromentValidates] = useState(false)
    const { navigate } = useNavigation();
    const db = useDatabase();

    // useEffect para carregar os dados iniciais
    useFocusEffect(
        useCallback(() => {
            getSimpleData(DataKey.IsConfigValidada).then((res) => {
                if (res == '1') {
                    setIsEnviromentValidates(true)
                }
                get()
            })

        }, [])
    );

    /**
     * 
     * @param existeDados existe daddos de configuracao salvo
     * @param exigirAcaoManualParaLaogar precisa clicar no botao para validar?
     */
    // Função para navegar para o menu
    async function init(_tenant: string, url: string, _token: string) {
        setIsLoading(true)
        if (_tenant === '' || _tenant === undefined || url === '' || url === undefined || _token === '' || _token === undefined) {
            showToast(ToastType.ERROR, "Dados Insuficientes!", "Preencha os dados corretamente para avançar!")
            setIsLoading(false)
        } else {
            setIsLoading(false)
            navigate('Login');
            storeSimpleData(DataKey.MaintainOpenConfig, "false")
        }

    }

    // Função assíncrona para buscar dados do banco de dados
    async function get() {
        setIsLoading(true)
        try {
            await db.get().then((response) => {
                if (response != null) {
                    // Se houver resposta, atualizar estados e armazenar dados localmente
                    storeSimpleDataVc(DataKey.TenantId, response.tenantId.toString()).then(() => {
                        //configura a url no axios
                        api.defaults.baseURL = response.urlBase;
                        api.defaults.timeout = 15000
                        api.defaults.timeoutErrorMessage = "Tempo Limite Atingido!"


                        setHasValue(true);
                        setTenant(response!.tenantId.toString());
                        setUrlBase(response!.urlBase);
                        setToken(response!.token);

                        getSimpleData(DataKey.MaintainOpenConfig).then((res) => {
                            if (res === "false") {
                                init(response.tenantId!, response.urlBase, response.token)
                            }
                        })
                        setIsLoading(false)
                    });
                } else {
                    // Se não houver resposta, resetar estados
                    setHasValue(false);
                    setTenant('');
                    setUrlBase('');
                    setToken('-');
                    setNomeCotacao('-');
                    setIsLoading(false)
                }
            });

        } catch (error) {
            // Tratar erros (pode ser aprimorado com um alerta ou log)
            setIsLoading(false)
        }
    }

    // Função assíncrona para criar uma nova entrada no banco de dados
    async function create() {
        setIsLoading(true)
        const id = 501;
        const isValidado = false;
        try {
            await db.create({ id, urlBase, token, tenantId: tenant, isValidado }).then(() => {

                storeSimpleData(DataKey.NomeCotacao, nomeCotacao).then(() => {
                    get().then(() => {
                        setIsLoading(false)
                    }); // Buscar dados atualizados após a criação
                })
            });
        } catch (error) {
            Alert.alert("Error", "Deu erro, cheque o log");
            setIsLoading(false)
            return
        }
    }

    function cancelEdit() {
        setHasValue(true)
    }

    // Função assíncrona para excluir uma entrada do banco de dados
    async function exclude() {
        setHasValue(false);
    }

    if (isLoading) {
        return <CustomLoading />
    }

    function validate(tenant: string, urlBase: string, token: string): void {
        validaAmbiente({ tenant: Number(tenant), token: token }).then((res) => {
            if (res.Retorno.IsOk) {
                storeSimpleDataVc(DataKey.IsConfigValidada, "1").then(() => {
                    storeSimpleData(DataKey.MaintainOpenConfig, "false")
                    setIsEnviromentValidates(true)
                })
            } else {
                showToast(ToastType.ERROR, "Erro", res.Retorno.Msg)
                storeSimpleDataVc(DataKey.IsConfigValidada, "0").then(() => {
                    storeSimpleData(DataKey.MaintainOpenConfig, "true")
                    setIsEnviromentValidates(false)
                })
            }
        }).catch((err) => {
            showToast(ToastType.ERROR, "Erro", err.response.data.Errors[0])
        })
    }

    // Renderização do componente
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/loginConf01.jpg')}
                style={{ flex: 1 }}
            >
                {hasValue && (
                    // Se houver valores, exibir dados e botões de ações
                    <View style={[commonStyle.align_centralizar, commonStyle.margin_16]}>
                        <View style={commonStyle.align_centralizar}>
                            <Text style={[commonStyle.text_size_20, { color: "#FFF" }]}>{`Tenant: ${tenant}`}</Text>
                            <Text style={[commonStyle.text_size_20, { color: "#FFF" }]}>{`URL: ${urlBase}`}</Text>
                            <Text style={[commonStyle.text_size_20, { color: "#FFF" }]}>{`Token: ${token}`}</Text>
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
                                onPress={() => validate(tenant, urlBase, token)}
                                style={commonStyle.common_button_style}
                                underlayColor='white'
                            >
                                <View style={commonStyle.common_rowItem}>
                                    <Text style={commonStyle.common_text_button_style}>Validar</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={[commonStyle.align_centralizar, commonStyle.common_rowItem]}>
                            <Text style={[commonStyle.text_size_20, { color: "#FFF" }]}>{`Status: ${isEnviromentValidated ? 'Validado' : 'Nao validado'}`}</Text>
                            {isEnviromentValidated ? <CustomIcon iconColor="#00FF00" icon={ICON_NAME.SUCCESS} /> : <CustomIcon iconColor="#F44336" icon={ICON_NAME.TRISTE} />}
                        </View>

                        {isEnviromentValidated && (
                            <TouchableHighlight
                                onPress={() => {
                                    logout(DataKey.LoginResponse)
                                    init(tenant, urlBase, token)
                                }}
                                style={commonStyle.common_button_style}
                                underlayColor='white'
                            >
                                <Text style={commonStyle.common_text_button_style}>Ir para Login</Text>
                            </TouchableHighlight>
                        )}

                    </View>
                )
                }

                {
                    !hasValue && (
                        // Se não houver valores, exibir campos de entrada para configuração
                        <View style={[commonStyle.common_margin_top_64, commonStyle.common_margin_horizontal]}>
                            <ScrollView style={[commonStyle.common_columnItem]}>

                                <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, commonStyle.common_margin_bottom_8]}>
                                    <Text style={[commonStyle.common_fontWeight_600, { color: '#fff', fontSize: 16 }]}>Tenant</Text>
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

                                <Text style={[commonStyle.common_margin_bottom_8, commonStyle.common_fontWeight_600, { color: '#fff', fontSize: 16 }]}>URL</Text>
                                <TextInput
                                    style={[commonStyle.common_input, { marginBottom: 1 }]}
                                    onChangeText={setUrlBase}
                                    placeholder="Digite a URL"
                                    value={urlBase}
                                />
                                <Text style={[commonStyle.common_fontWeight_600, { marginLeft: 16, marginBottom: 16, color: '#fff', fontSize: 14, fontStyle: 'italic' }]}>https://###.csicorpnet.com.br </Text>


                                <Text style={[commonStyle.common_margin_bottom_8, commonStyle.common_fontWeight_600, { color: '#fff', fontSize: 16 }]}>Token</Text>

                                <TextInput
                                    style={[commonStyle.common_input, commonStyle.common_margin_bottom_16]}
                                    onChangeText={setToken}
                                    placeholder="Digite o token, caso nao tenha, preencha com QUALQUER valor"
                                    value={token}
                                />

                                <Text style={[commonStyle.common_margin_bottom_8, commonStyle.common_fontWeight_600, { color: '#fff', fontSize: 16 }]}>Modelo impressão cotação</Text>

                                <TextInput
                                    style={[commonStyle.common_input, { marginBottom: 1 }]}
                                    onChangeText={setNomeCotacao}
                                    placeholder="Modelo impressão cotação"
                                    value={nomeCotacao}
                                />
                                <Text style={[commonStyle.common_fontWeight_600, { marginLeft: 16, color: '#fff', fontSize: 14, fontStyle: 'italic' }]}>Ex: CSCOTACAO0010 </Text>

                                <TouchableHighlight
                                    onPress={create}
                                    style={commonStyle.common_button_style}
                                    underlayColor='white'
                                >
                                    <Text style={[commonStyle.common_text_button_style]}>Salvar</Text>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={cancelEdit}
                                    style={commonStyle.common_button_style}
                                    underlayColor='white'
                                >
                                    <Text style={[commonStyle.common_text_button_style]}>Cancelar</Text>
                                </TouchableHighlight>
                            </ScrollView>
                        </View>
                    )
                }
            </ImageBackground >
        </View >
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