
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CS_SC_008_ListaComandas from '../screens/008ListaComandas/CS_SC_008_ListaComandas';
import CS_SC_008_NovaComanda from '../screens/008ListaComandas/CS_SC_008_NovaComanda';
import { Ionicons } from "@expo/vector-icons";


const BottomTab = createBottomTabNavigator()

export default function TabRoutes008() {
    return (
        <BottomTab.Navigator>

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


            <BottomTab.Screen
                name='Nova Comanda'
                component={CS_SC_008_NovaComanda}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons color={color} size={size} name={"document-outline"} />
                        }
                        return <Ionicons color={color} size={size} name={"document-outline"} />
                    },

                }}
            />


        </BottomTab.Navigator >
    )
}