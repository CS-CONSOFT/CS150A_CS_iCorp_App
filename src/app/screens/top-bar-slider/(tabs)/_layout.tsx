import { Tabs } from 'expo-router';
import CustomPvBottomMenu from '../../../components/bottomMenus/01CustomPvBottomMenu';

function BottomTabLayoutPreVendaDetalhe() {
    return (
        <Tabs>
            <Tabs.Screen
                name="produto/CS_SC_PreVendaDetalheProduto"
                options={{
                    title: 'Produto',
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="cliente/CS_SC_PreVendaDetalheCliente"
                options={{
                    title: 'Cliente',
                    headerShown: false
                }}
            />
        </Tabs>
    );
}

export default BottomTabLayoutPreVendaDetalhe;
