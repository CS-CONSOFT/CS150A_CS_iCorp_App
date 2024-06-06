import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomPvBottomMenu_001 from '../components/bottomMenus/CustomPvBottomMenu_001'
import CS_SC_PreVenda from '../screens/prevenda/CS_SC_PreVenda'



const BottomTab = createBottomTabNavigator()

export default function TabRoutes001() {
    return (
        <BottomTab.Navigator tabBar={() => <CustomPvBottomMenu_001 />}>
            <BottomTab.Screen options={{ headerShown: false }} name='PreVendaDetalheProduto' component={CS_SC_PreVenda} />
        </BottomTab.Navigator >
    )
}