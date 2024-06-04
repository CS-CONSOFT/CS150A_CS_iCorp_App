import { Tabs } from 'expo-router';

function BottomTabLayoutPreVendaDetalhe() {
    return (
        <Tabs>
            <Tabs.Screen
                name="produto/CS_SC_PreVendaDetalheProduto"
                options={{
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="cliente/CS_SC_PreVendaDetalheCliente"
                options={{
                    headerShown: false
                }}
            />
        </Tabs>
    );
}

export default BottomTabLayoutPreVendaDetalhe;
