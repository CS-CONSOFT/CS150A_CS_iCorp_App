import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CS_SC_008_ListaComandas from '../screens/008ListaComandas/CS_SC_008_ListaComandas'
import CS_SC_008_NovaComanda from '../screens/008ListaComandas/CS_SC_008_NovaComanda'
import CS_SC_009_ListaCliente from '../screens/009Cliente/CS_SC_009_ListaCliente'
import CS_SC_009_CadastroCliente from '../screens/009Cliente/CS_SC_009_CadastroCliente'




const BottomTab = createBottomTabNavigator()

export default function TabRoutes009() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen options={{ headerShown: false }} name='ListaCliente' component={CS_SC_009_ListaCliente} />
            <BottomTab.Screen options={{ headerShown: false }} name='CadastroCliente' component={CS_SC_009_CadastroCliente} />
        </BottomTab.Navigator >
    )
}