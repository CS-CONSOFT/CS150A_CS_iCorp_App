import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeaderLogo from "../components/headers/CustomHeaderLogo";
import CustomLoggoutTitle from "../components/headers/CustomLoggoutTitle";
import CS_SC_001_Login from "../screens/001login/CS_SC_001_Login";
import CS_SC_002_Menu from "../screens/002menu/CS_SC_002_Menu";
import CS_SC_Entrega from "../screens/nota/entrega/CS_SC_Entrega";
import CS_SC_Serie from "../screens/nota/serie/CS_SC_Serie";
import CS_SC_ConsultaProdutos from "../screens/produtos/consulta/CS_SC_ConsultaProdutos";
import TabRoutes001 from "./tab-001.routes";
import TabRoutes002 from "./tab-002.routes";
import CS_SC_EnvorimentConfig from "../screens/config/CS_SC_EnvorimentConfig";


const StackNav = createNativeStackNavigator()

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined,
            Menu: undefined,
            Entrega: undefined,
            Serie: undefined,
            Consulta_Produtos: undefined,
            Config_Ambiente: undefined,
            Pre_Venda_Detalhes: { currentPv: string, emissao: string, validade: string, totalLiquido: string },
            Pre_Venda: undefined,
        }
    }
}

export default function StackRoutes() {
    return (
        <StackNav.Navigator>
            <StackNav.Screen name="Login" options={{ headerShown: false }} component={CS_SC_001_Login} />

            <StackNav.Screen name="Menu" component={CS_SC_002_Menu} options={{
                headerRight: () => <CustomHeaderLogo />,
                headerTitleAlign: 'center',
                title: '',
                headerLeft: () => <CustomLoggoutTitle />
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

            <StackNav.Screen name="Config_Ambiente" component={CS_SC_EnvorimentConfig} options={{
                title: "Configuração de Ambiente"
            }} />

            <StackNav.Screen name="Pre_Venda_Detalhes" component={TabRoutes002} options={({ route }: { route: any }) => ({
                title: route.params.currentPv,
                headerTitleAlign: 'center',
                headerTintColor: "#c3c3c3",
                headerStyle: {
                    backgroundColor: "#104765"
                },
                headerBackVisible: true
            })} />

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
