import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CS_SC_008_ListaComandas from '../screens/008ListaComandas/CS_SC_008_ListaComandas'
import CS_SC_008_NovaComanda from '../screens/008ListaComandas/CS_SC_008_NovaComanda'
import CS_SC_009_ListaCliente from '../screens/009Cliente/CS_SC_009_ListaCliente'
import CS_SC_009_CadastroCliente from '../screens/009Cliente/CS_SC_009_CadastroCliente'
import CustomIcon from '../components/icon/CustomIcon'
import { ICON_NAME } from '../util/IconsName'




const BottomTab = createBottomTabNavigator()

export default function TabRoutes009() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, focused }) => {
                    if (focused) {
                        return <CustomIcon icon={ICON_NAME.LISTA_CONTORNADO} iconColor={color} />
                    }
                    return <CustomIcon icon={ICON_NAME.LISTA_CONTORNADO} />
                }
            }} name='Lista de Clientes' component={CS_SC_009_ListaCliente} />
            <BottomTab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, focused }) => {
                    if (focused) {
                        return <CustomIcon icon={ICON_NAME.ADICIONAR_CONTORNADO} iconColor={color} />
                    }
                    return <CustomIcon icon={ICON_NAME.ADICIONAR_CONTORNADO} />
                }
            }} name='Cadastro Cliente' component={CS_SC_009_CadastroCliente} />
        </BottomTab.Navigator >
    )
}