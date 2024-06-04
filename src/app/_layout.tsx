import { Stack } from "expo-router";
import { lazy } from "react";
import { Pressable, Text } from "react-native";
import CustomIcon from "./components/icon/CustomIcon";
import { ICON_NAME } from "./util/IconsName";
import { navigateTo } from "./view_controller/SharedViewController";

const HeaderLogo = lazy(() => import("./components/headers/HeaderLogo"))
const LoggoutTitle = lazy(() => import("./components/headers/LoggoutTitle"))


function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen name="screens/menu/CS_SC_Menu" options={{
                headerRight: () => <HeaderLogo />,
                headerTitleAlign: 'center',
                title: '',
                headerLeft: () => <LoggoutTitle />
            }} />

            <Stack.Screen name="screens/nota/entrega/CS_SC_Entrega" options={{
                headerTitle: "Entrega",
            }} />

            <Stack.Screen name="screens/nota/serie/CS_SC_Serie" options={{
                title: "Serie"
            }} />


            <Stack.Screen name="screens/produtos/consulta/CS_SC_ConsultaProdutos" options={{
                title: "Consulta de Produto"
            }} />

            <Stack.Screen name="screens/bottom-bar/(tabs)" options={{
                title: "Consulta de Produto",
                headerShown: false
            }} />

            <Stack.Screen name="screens/top-bar-slider/(tabs)" options={{
                title: "Consulta de Produto",
                headerTitleAlign: 'center',
                headerTintColor: "#c3c3c3",
                headerStyle: {
                    backgroundColor: "#104765"
                },
                headerLeft: () => <>
                    <Pressable onPress={() => { navigateTo("screens/bottom-bar/(tabs)/prevenda/CS_SC_PreVenda") }}>
                        <CustomIcon icon={ICON_NAME.VOLTAR_CONTORNADO} iconSize={24} iconColor="#c3c3c3" />
                    </Pressable>
                </>
            }} />

        </Stack>
    )
}

export default Layout

