import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomPvBottomMenu_001 from '../components/bottomMenus/CustomPvBottomMenu_001'
import CS_SC_008_ListaComandas from '../screens/008ListaComandas/CS_SC_008_ListaComandas'




const BottomTab = createBottomTabNavigator()

export default function TabRoutes008() {
    return (
        <BottomTab.Navigator tabBar={() => ""}>
            <BottomTab.Screen options={{ headerShown: false }} name='ComandaLista' component={CS_SC_008_ListaComandas} />
        </BottomTab.Navigator >
    )
}