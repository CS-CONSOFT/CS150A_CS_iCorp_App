import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import CustomIcon from "../components/icon/CustomIcon";
import { ICON_NAME } from "../util/IconsName";
import HeaderLogo from "../components/headers/HeaderLogo";
import LoggoutTitle from "../components/headers/LoggoutTitle";
import CS_SC_Menu from "../screens/menu/CS_SC_Menu";
import CS_SC_Entrega from "../screens/nota/entrega/CS_SC_Entrega";
import CS_SC_Serie from "../screens/nota/serie/CS_SC_Serie";
import CS_SC_ConsultaProdutos from "../screens/produtos/consulta/CS_SC_ConsultaProdutos";
import TabRoutes001 from "./tab-001.routes";
import TabRoutes002 from "./tab-002.routes";
import CS_SC_Login from "../screens/login/CS_SC_Login";
import { useNavigation } from "@react-navigation/native";


const StackNav = createNativeStackNavigator()

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined,
            Menu: undefined,
            Entrega: undefined,
            Serie: undefined,
            Consulta_Produtos: undefined,
            Pre_Venda_Detalhes: undefined,
            Pre_Venda: undefined,
        }
    }
}

export default function StackRoutes() {
    return (
        <StackNav.Navigator>
            <StackNav.Screen name="Login" options={{ headerShown: false }} component={CS_SC_Login} />

            <StackNav.Screen name="Menu" component={CS_SC_Menu} options={{
                headerRight: () => <HeaderLogo />,
                headerTitleAlign: 'center',
                title: '',
                headerLeft: () => <LoggoutTitle />
            }} />

            <StackNav.Screen name="Entrega" component={CS_SC_Entrega} options={{
                headerTitle: "Entrega",
            }} />

            <StackNav.Screen name="Serie" component={CS_SC_Serie} options={{
                title: "Serie"
            }} />


            <StackNav.Screen name="Consulta_Produtos" component={CS_SC_ConsultaProdutos} options={{
                title: "Consulta de Produto"
            }} />

            <StackNav.Screen name="Pre_Venda_Detalhes" component={TabRoutes001} />

            <StackNav.Screen name="Pre_Venda" component={TabRoutes001} options={{
                title: "Pré Venda",
                headerTitleAlign: 'center',
                headerTintColor: "#c3c3c3",
                headerStyle: {
                    backgroundColor: "#104765"
                },
                headerBackVisible: true
            }} />
        </StackNav.Navigator>
    )
}