import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CS_SC_ConsultaProdutos from "../screens/004produtos/CS_SC_004_ConsultaProdutos";
import TopTab001 from "./top-tab001.routes";

const BottomTab = createBottomTabNavigator()



/**
 * Uma top bar dentro ta bottom tab, precisa ter a instancia da top 
 * para entao colocar o componente que encapsula uma rota com top tab.
 * Assim conseguimos aninhar as rotas
 */
export default function TabRoutes002({ route }: { route: any }) {
    const { cameFromPv, insertComanda, comandaId } = route.params;
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
            {/* quando nao for pv */}
            {!cameFromPv && (
                <BottomTab.Screen name='Menu' component={CS_SC_ConsultaProdutos} initialParams={{ cameFromPv, insertComanda, comandaId }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return <Ionicons color={color} size={size} name={"home"} />
                            }
                            return <Ionicons color={color} size={size} name={"home"} />
                        },
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            navigation.navigate("DrawerRoute");
                        },
                    })}
                />
            )}
            {/* quando for pv */}
            {cameFromPv && (
                <BottomTab.Screen name='Produtos' component={CS_SC_ConsultaProdutos} initialParams={{ cameFromPv, insertComanda, comandaId }}
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
            )}

            {cameFromPv && (
                <BottomTab.Screen name='Menu' component={CS_SC_ConsultaProdutos} initialParams={{ cameFromPv, insertComanda, comandaId }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return <Ionicons color={color} size={size} name={"home"} />
                            }
                            return <Ionicons color={color} size={size} name={"home"} />
                        },
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            navigation.navigate("DrawerRoute");
                        },
                    })}
                />
            )}

            {cameFromPv && (
                <BottomTab.Screen name="Pré Venda" options={{
                    tabBarIcon: ({ color, focused }) => {
                        if (focused) {
                            return <Ionicons color={color} size={24} name={"cart"} />
                        }
                        return <Ionicons color={color} size={24} name={"cart"} />
                    },
                }} component={TopTab001} />
            )}

        </BottomTab.Navigator >
    )
}