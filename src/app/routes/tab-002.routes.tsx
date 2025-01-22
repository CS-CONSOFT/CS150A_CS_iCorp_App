import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CS_SC_ConsultaProdutos from "../screens/004produtos/CS_SC_004_ConsultaProdutos";
import TopTab001 from "./top-tab001.routes";
import React, { useEffect, useState } from "react";
import { getSimpleData, storeSimpleData } from "../services/storage/AsyncStorageConfig";
import { DataKey } from "../enum/DataKeys";
import { StyleSheet, Text, View } from "react-native";


const BottomTab = createBottomTabNavigator()


/**
 * Uma top bar dentro ta bottom tab, precisa ter a instancia da top 
 * para entao colocar o componente que encapsula uma rota com top tab.
 * Assim conseguimos aninhar as rotas
 */
export default function TabRoutes002({ route }: { route: any }) {
    const [currentCountOfProduct, setCurrentCountOfProduct] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSimpleData(DataKey.COUNT_PRODUCT_CURRENT_PV);
            setCurrentCountOfProduct(Number(data) || 0);
            console.log('currentCountOfProduct:', data);
        };

        storeSimpleData(DataKey.PV_CAME_FROM_BOTTOM_NAVIGATION, "true");

        fetchData();
    }, [currentCountOfProduct]);



    const { cameFromPv, insertComanda, comandaId } = route.params;


    const styles = StyleSheet.create({
        iconContainer: {
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            right: -6,
            top: -6,
            backgroundColor: 'red',
            borderRadius: 8,
            width: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        badgeText: {
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
        },
    });

    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
            {/* quando nao for pv */}

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

            {/* {cameFromPv && (
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
            )} */}

            <BottomTab.Screen
                name="Pré Venda"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.iconContainer}>
                            <Ionicons color={color} size={24} name={"cart"} />
                            {currentCountOfProduct > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{currentCountOfProduct}</Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
                component={TopTab001}
            />

        </BottomTab.Navigator >


    )
}