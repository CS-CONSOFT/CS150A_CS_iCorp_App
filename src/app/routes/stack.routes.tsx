import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeaderLogo from "../components/headers/CustomHeaderLogo";
import CustomLoggoutTitle from "../components/headers/CustomLoggoutTitle";
import CS_SC_001_Login from "../screens/001login/CS_SC_001_Login";
import CS_SC_002_Menu from "../screens/002menu/CS_SC_002_Menu";
import CS_SC_Entrega from "../screens/nota/entrega/CS_SC_Entrega";
import TabRoutes001 from "./tab-001.routes";
import TabRoutes002 from "./tab-002.routes";
import CS_SC_006__EnvorimentConfig from "../screens/006config/CS_SC_006__EnvorimentConfig";
import CS_SC_Serie from "../screens/nota/serie/CS_SC_Serie";
import CS_SC_ConsultaProdutos from "../screens/004produtos/CS_SC_004_ConsultaProdutos";
import CS_SC_005_Obras from "../screens/005obras/CS_SC_005_Obras";
import CS_SC_005_02_Solicitação from "../screens/005obras/CS_SC_005_02_Solicitação";
import CS_SC_005_03_Requisição from "../screens/005obras/CS_SC_005_03_Requisição";


const StackNav = createNativeStackNavigator()

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined,
            Menu: undefined,
            Entrega: undefined,
            Serie: undefined,
            Consulta_Produtos: { cameFromPv: boolean },
            Config_Ambiente: undefined,
            Pre_Venda_Detalhes: { currentPv: string, emissao: string, validade: string, totalLiquido: string },
            Pre_Venda: undefined,
            Obras: undefined,
            Obras_Solicitacao: { obraId: number }
            Obras_Requisicao: { obraId: number }
        }
    }
}

export default function StackRoutes() {
    return (
        <StackNav.Navigator initialRouteName="Config_Ambiente">
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

            <StackNav.Screen name="Config_Ambiente" component={CS_SC_006__EnvorimentConfig} options={{
                title: "Configuração de Ambiente"
            }} />

            <StackNav.Screen name="Obras" component={CS_SC_005_Obras} options={{
                title: "Obras",
                headerTitleAlign: 'center',
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#0A3147"
                },
                headerBackVisible: true,
            }} />

            <StackNav.Screen name="Obras_Solicitacao" component={CS_SC_005_02_Solicitação} options={({ route }: { route: any }) => ({
                title: String(route.params.obraId),
                headerTitleAlign: 'center',
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#0A3147"
                },
                headerBackVisible: true,
            })} />

            <StackNav.Screen name="Obras_Requisicao" component={CS_SC_005_03_Requisição} options={({ route }: { route: any }) => ({
                title: String(route.params.obraId),
                headerTitleAlign: 'center',
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#0A3147"
                },
                headerBackVisible: true,
            })} />

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
