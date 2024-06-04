import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CS_SC_PreVendaDetalheProduto from '../screens/top-bar-slider/(tabs)/produto/CS_SC_PreVendaDetalheProduto'
import CS_SC_PreVendaDetalheCliente from '../screens/top-bar-slider/(tabs)/cliente/CS_SC_PreVendaDetalheCliente'
import CustomPvBottomMenu from "../components/bottomMenus/01CustomPvBottomMenu";

const BottomTab = createBottomTabNavigator()

export default function TabRoutes002() {
    return (
        <BottomTab.Navigator >
            <BottomTab.Screen name='PreVendaDetalheProduto' component={CS_SC_PreVendaDetalheProduto} />
            <BottomTab.Screen name='PreVendaDetalheCliente' component={CS_SC_PreVendaDetalheCliente} />
        </BottomTab.Navigator>
    )
}