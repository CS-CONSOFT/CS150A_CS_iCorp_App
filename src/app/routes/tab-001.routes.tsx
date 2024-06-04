import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CS_SC_PreVenda from '../screens/bottom-bar/(tabs)/prevenda/CS_SC_PreVenda'
import CustomPvBottomMenu from '../components/bottomMenus/01CustomPvBottomMenu'
import { Text } from 'react-native'



const BottomTab = createBottomTabNavigator()

export default function TabRoutes001() {
    return (
        <BottomTab.Navigator tabBar={() => <CustomPvBottomMenu />}>
            <BottomTab.Screen options={{ headerShown: false }} name='PreVendaDetalheProduto' component={CS_SC_PreVenda} />
        </BottomTab.Navigator>
    )
}