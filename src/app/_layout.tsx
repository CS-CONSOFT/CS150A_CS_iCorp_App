import { Stack } from "expo-router";
import { lazy } from "react";

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
                }
            }} />

        </Stack>
    )
}

export default Layout

