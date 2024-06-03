import { Tabs } from 'expo-router';
import CustomPvBottomMenu from '../../../components/bottomMenus/01CustomPvBottomMenu';

function BottomTabLayout() {
    return (
        <Tabs
            tabBar={CustomPvBottomMenu}>
            <Tabs.Screen
                name="prevenda/CS_SC_PreVenda"
                options={{
                    title: 'Pré Vendas'
                }}
            />
        </Tabs>
    );
}

export default BottomTabLayout;
