import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyle } from "../../CommonStyle";
import { useDatabase } from "../../services/storage/useDatabase";
import { storeSimpleDataVc } from "../../view_controller/SharedViewController";
import { DataKey } from "../../enum/DataKeys";
import api from "../../services/api/axios_config";
import { showToast, ToastType } from "../../util/ShowToast";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";


// Componente de configuração de ambiente
const CS_SC_006__EnvorimentConfig = () => {
    // Estados para gerenciar tenant, URL base, token e se há valores armazenados
    const [tenant, setTenant] = useState('');
    const [urlBase, setUrlBase] = useState('');
    const [token, setToken] = useState('xd--');
    const [hasValue, setHasValue] = useState(false);
    const { navigate } = useNavigation();
    const db = useDatabase();

    // useEffect para carregar os dados iniciais
    useEffect(() => {
        get();
    }, []);

    // Função para navegar para o menu
    function init() {
        if (tenant === '' || tenant === undefined || urlBase === '' || urlBase === undefined || token === '' || token === undefined) {
            showToast(ToastType.ERROR, "Dados Insuficientes!", "Preencha os dados corretamente para avançar!")
        } else {
            navigate('Login');
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
                    storeSimpleDataVc(DataKey.TenantId, response.tenantId.toString());

                    //configura a url no axios
                    api.defaults.baseURL = response.urlBase;

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
        const id = 501;
        const isValidado = false;
        try {
            await db.create({ id, urlBase, token, tenantId: tenant, isValidado }).then(() => {
                get(); // Buscar dados atualizados após a criação
            });
        } catch (error) {
            Alert.alert("Error", "Deu erro, cheque o log");
        }
    }

    // Função assíncrona para excluir uma entrada do banco de dados
    async function exclude() {
        setHasValue(false);
        /**
        try {
            await db.exclude().then(() => {
                get(); // Buscar dados atualizados após a exclusão
            });
        } catch (error) {
            // Tratar erros (pode ser aprimorado com um alerta ou log)
        }
             */
    }

    // Renderização do componente
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
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
                            onPress={exclude}
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
                            <Text style={commonStyle.common_text_button_style}>Iniciar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )}

            {!hasValue && (
                // Se não houver valores, exibir campos de entrada para configuração
                <View>
                    <View style={commonStyle.common_columnItem}>
                        <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw]}>
                            <Text>Tenant</Text>
                            <CustomIcon icon={ICON_NAME.CAMERA} onPress={() => {
                                navigate('Camera', {
                                    previousScreen: 'Config_Ambiente'
                                })
                            }} />
                        </View>
                        <TextInput
                            style={[commonStyle.common_input]}
                            onChangeText={setTenant}
                            value={tenant}
                        />

                        <Text>URL</Text>
                        <TextInput
                            style={[commonStyle.common_input]}
                            onChangeText={setUrlBase}
                            value={urlBase}
                        />

                        <Text>TOKEN</Text>
                        <TextInput
                            style={[commonStyle.common_input]}
                            onChangeText={setToken}
                            value={token}
                        />

                        <TouchableHighlight
                            onPress={create}
                            style={commonStyle.common_button_style}
                            underlayColor='white'
                        >
                            <Text style={commonStyle.common_text_button_style}>Salvar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )}
        </SafeAreaView>
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