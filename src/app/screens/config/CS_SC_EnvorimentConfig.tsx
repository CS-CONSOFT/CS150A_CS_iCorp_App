import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyle } from "../../CommonStyle";
import { useDatabase } from "../../services/storage/useDatabase";
import { storeSimpleDataVc } from "../../view_controller/SharedViewController";
import { DataKey } from "../../enum/DataKeys";

const CS_SC_EnvorimentConfig = () => {
    const [tenant, setTenant] = useState('')
    const [urlBase, setUrlBase] = useState('')
    const [token, setToken] = useState('')
    const [hasValue, setHasValue] = useState(false)
    const { navigate } = useNavigation()
    const db = useDatabase()

    useEffect(() => {
        get()
    }, [])



    function init() {
        navigate('Menu')
    }


    async function get() {
        try {
            await db.get().then((response) => {
                if (response != null) {
                    setHasValue(true)
                    setTenant(response!.tenantId)
                    setUrlBase(response!.urlBase)
                    setToken(response!.token)
                    storeSimpleDataVc(DataKey.TenantId, response.tenantId.toString())
                    storeSimpleDataVc(DataKey.URL_Base, response.urlBase)
                } else {
                    setHasValue(false)
                    setTenant('')
                    setUrlBase('')
                    setToken('')
                }
            })
        } catch (error) {

        }
    }

    async function create() {
        const id = 501
        const isValidado = false
        try {
            db.create({ id, urlBase, token, tenantId: tenant, isValidado }).then(() => {
                get()
            })
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Deu erro, cheque o log")
        }
    }



    async function exclude() {
        try {
            db.exclude().then(() => {
                get()
            })
        } catch (error) {

        }
    }

    return (
        <SafeAreaView>
            {hasValue && (
                <View>
                    <Text>{`Tenant: ${tenant}`}</Text>
                    <Text>{`URL: ${urlBase}`}</Text>
                    <Text>{`Token: ${token}`}</Text>
                    <TouchableHighlight
                        onPress={get}
                        style={commonStyle.common_button_style}
                        underlayColor='white'
                    ><Text style={commonStyle.common_text_button_style}>Buscar</Text></TouchableHighlight>

                    <TouchableHighlight
                        onPress={exclude}
                        style={commonStyle.common_button_style}
                        underlayColor='white'
                    ><Text style={commonStyle.common_text_button_style}>Deletar</Text></TouchableHighlight>

                    <TouchableHighlight
                        onPress={init}
                        style={commonStyle.common_button_style}
                        underlayColor='white'
                    ><Text style={commonStyle.common_text_button_style}>Iniciar</Text></TouchableHighlight>
                </View>
            )}

            {!hasValue && (
                <View>
                    <Text>Tenant</Text>
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
                    ><Text style={commonStyle.common_text_button_style}>Salvar</Text></TouchableHighlight>
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

export default CS_SC_EnvorimentConfig;