import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyle } from "../../CommonStyle";
import { useDatabase } from "../../services/storage/useDatabase";

const CS_SC_EnvorimentConfig = () => {
    const [_tenant, setTenant] = useState('')
    const [urlBase, setUrlBase] = useState('')
    const [token, setToken] = useState('')
    const [hasValue, setHasValue] = useState(false)
    const { navigate } = useNavigation()
    const db = useDatabase()



    async function get() {
        try {
            await db.get().then((response) => {
                setHasValue(true)
                setTenant(String(response!.tenant))
                setUrlBase(response!.urlBase)
                setToken(response!.token)
            })


        } catch (error) {

        }
    }

    async function create() {
        const id = 501
        const isValidado = false
        try {
            const num = Number(_tenant)
            db.create({ id, urlBase, token, tenant: num, isValidado })
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Deu erro, cheque o log")
        }
    }



    async function exclude() {
        try {
            db.exclude()
        } catch (error) {

        }
    }

    return (
        <SafeAreaView>

            <Text>Tenant</Text>
            <TextInput
                style={[commonStyle.common_input]}
                onChangeText={setTenant}
                value={_tenant}

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
                onPress={get}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Buscar</Text></TouchableHighlight>

            <TouchableHighlight
                onPress={create}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Salvar</Text></TouchableHighlight>

            <TouchableHighlight
                onPress={exclude}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Deletar</Text></TouchableHighlight>


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