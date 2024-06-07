import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CS_SC_003_02_PreVendaDetalheCliente from '../screens/prevenda/cliente/CS_SC_003_02_PreVendaDetalheCliente';
import CS_SC_003_01_PreVendaDetalheProduto from '../screens/prevenda/produto/CS_SC_003_01_PreVendaDetalheProduto';
const TopTab = createMaterialTopTabNavigator()

export default function TopTab001({ route }: { route: any }) {
    const { emissao, validade, totalLiquido } = route.params
    return (
        <TopTab.Navigator>
            <TopTab.Screen name='Produto' component={CS_SC_003_01_PreVendaDetalheProduto} initialParams={{ emissao, validade, totalLiquido }} />
            <TopTab.Screen name='Cliente' component={CS_SC_003_02_PreVendaDetalheCliente} />
        </TopTab.Navigator>
    )
}