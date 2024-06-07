import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/button/CustomButton";
import CustomInput from "../../components/input/CustomInput";
import { getDBEnvorimentConfig, insertUpdateDBEnvorimentConfig } from "../../view_controller/SharedViewController";

const CS_SC_EnvorimentConfig = () => {
    const [tenant, setTenant] = useState<number>(0)
    const [urlBase, setUrlBase] = useState('')
    const [token, setToken] = useState('')
    const { navigate } = useNavigation()

    async function save(done: () => void) {
        await insertUpdateDBEnvorimentConfig({ baseUrl: urlBase, tenantId: tenant!, token: token, isValidado: false })
        /**
         * verificar api pra ver se ta validado
         */
        done()
        navigate('Menu')
    }

    useEffect(() => {
        getDBEnvorimentConfig()
    })


    return (
        <SafeAreaView>
            <CustomInput>
                <CustomInput.InputAreaHandle
                    setValue={setTenant}
                    value={tenant!.toString()}
                />
            </CustomInput>

            <CustomInput>
                <CustomInput.InputAreaHandle
                    setValue={setUrlBase}
                    value={urlBase}
                />
            </CustomInput>

            <CustomInput>
                <CustomInput.InputAreaHandle
                    setValue={setToken}
                    value={token}
                />
            </CustomInput>

            <CustomButton
                title={'Salvar'}
                onPress={(done) => save(done)}
                buttonStyle={stylesLogin.button}
                textStyle={stylesLogin.textButton}
            />
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