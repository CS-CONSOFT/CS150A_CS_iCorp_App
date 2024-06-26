import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CS_SC_008_ListaComandas from '../screens/008ListaComandas/CS_SC_008_ListaComandas'
import CS_SC_008_NovaComanda from '../screens/008ListaComandas/CS_SC_008_NovaComanda'




const BottomTab = createBottomTabNavigator()

export default function TabRoutes008() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen options={{ headerShown: false }} name='ComandaLista' component={CS_SC_008_ListaComandas} />
            <BottomTab.Screen options={{ headerShown: false }} name='NovaComanda' component={CS_SC_008_NovaComanda} />
        </BottomTab.Navigator >
    )
}