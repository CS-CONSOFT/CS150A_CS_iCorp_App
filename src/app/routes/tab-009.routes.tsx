import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomIcon from '../components/icon/CustomIcon'
import CS_SC_009_CadastroCliente from '../screens/009Cliente/CS_SC_009_CadastroCliente'
import CS_SC_009_ListaCliente from '../screens/009Cliente/CS_SC_009_ListaCliente'
import { ICON_NAME } from '../util/IconsName'
import CS_SC_002_Menu from '../screens/002menu/CS_SC_002_Menu'




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
            }} name='Lista de Clientes' initialParams={{ isToInsertPv: false }} component={CS_SC_009_ListaCliente} />
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