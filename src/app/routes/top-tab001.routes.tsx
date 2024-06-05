import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CS_SC_PreVendaDetalheCliente from '../screens/prevenda/cliente/CS_SC_PreVendaDetalheCliente';
import CS_SC_PreVendaDetalheProduto from '../screens/prevenda/produto/CS_SC_PreVendaDetalheProduto';
const TopTab = createMaterialTopTabNavigator()

export default function TopTab001({ route }: { route: any }) {
    const { emissao, validade, totalLiquido } = route.params
    return (
        <TopTab.Navigator>
            <TopTab.Screen name='Produto' component={CS_SC_PreVendaDetalheProduto} initialParams={{ emissao, validade, totalLiquido }} />
            <TopTab.Screen name='Cliente' component={CS_SC_PreVendaDetalheCliente} />
        </TopTab.Navigator>
    )
}