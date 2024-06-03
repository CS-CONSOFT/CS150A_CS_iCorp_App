import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';


const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator)


function TopTabBar() {
    return <MaterialTopTabs >
        <MaterialTopTabs.Screen name='prevenda-detalhe/cliente/CS_SC_PreVendaDetalheCliente' options={{ title: 'Produtos' }} />
        <MaterialTopTabs.Screen name='prevenda-detalhe/produto/CS_SC_PreVendaDetalheProduto' options={{ title: 'Cliente' }} />
    </MaterialTopTabs>
}

export default TopTabBar;
