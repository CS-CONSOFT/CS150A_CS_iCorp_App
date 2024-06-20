import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CS_SC_003_02_PreVendaDetalheCliente from '../screens/003prevenda/003_02_cliente/CS_SC_003_02_PreVendaDetalheCliente';
import CS_SC_003_01_PreVendaDetalheProduto from '../screens/003prevenda/003_01_produto/CS_SC_003_01_PreVendaDetalheProduto';

const TopTab = createMaterialTopTabNavigator()

export default function TopTab001({ route }: { route: any }) {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name='Produto' component={CS_SC_003_01_PreVendaDetalheProduto} />
            <TopTab.Screen name='Cliente' component={CS_SC_003_02_PreVendaDetalheCliente} />
        </TopTab.Navigator>
    )
}