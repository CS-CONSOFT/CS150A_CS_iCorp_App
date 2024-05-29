import { Tabs } from 'expo-router';
import CustomPvBottomMenu from '../../../components/bottomMenus/01CustomPvBottomMenu';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}
            tabBar={CustomPvBottomMenu}>
            <Tabs.Screen
                name="prevenda/CS_SC_PreVenda"
                options={{
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
