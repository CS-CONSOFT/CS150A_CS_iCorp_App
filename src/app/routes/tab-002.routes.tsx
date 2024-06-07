import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomPvBottomMenu_002 from "../components/bottomMenus/CustomPvBottomMenu_002";
import CS_SC_Serie from "../screens/nota/serie/CS_SC_Serie";
import TopTab001 from "./top-tab001.routes";

const BottomTab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator();


/**
 * Uma top bar dentro ta bottom tab, precisa ter a instancia da top 
 * para entao colocar o componente que encapsula uma rota com top tab.
 * Assim conseguimos aninhar as rotas
 */
export default function TabRoutes002({ route }: { route: any }) {
    const { emissao, validade, totalLiquido } = route.params;
    return (
        <BottomTab.Navigator tabBar={() => <CustomPvBottomMenu_002 />} screenOptions={{ headerShown: false }}>

            <TopTab.Screen name="TopTabPreVendaDetalhes" component={TopTab001} initialParams={{ emissao, validade, totalLiquido }} />

            <BottomTab.Screen name='Produto' component={CS_SC_Serie} />
        </BottomTab.Navigator >
    )
}