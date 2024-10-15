
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CS_SC_008_ListaComandas from '../screens/008ListaComandas/CS_SC_008_ListaComandas';
import CustomPvBottomMenu_001 from "../components/bottomMenus/CustomPvBottomMenu_001";
import CustomPvBottomMenu_Comanda from "../components/bottomMenus/CustomPvBottomMenu_Comanda";


const BottomTab = createBottomTabNavigator()

export default function TabRoutes008() {
    return (
        <BottomTab.Navigator tabBar={() => <CustomPvBottomMenu_Comanda />}>

            <BottomTab.Screen
                name='Comanda Lista'
                component={CS_SC_008_ListaComandas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons color={color} size={size} name={"list-outline"} />
                        }
                        return <Ionicons color={color} size={size} name={"list-outline"} />
                    },
                }}
            />
        </BottomTab.Navigator >
    )
}