import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomHeaderLogo from '../components/headers/CustomHeaderLogo';
import CS_SC_002_Menu from '../screens/002menu/CS_SC_002_Menu';
import CS_SC_006__EnvorimentConfig from '../screens/006config/CS_SC_006__EnvorimentConfig';
import CustomDrawerContent from '../components/drawer/CustomDrawerContent ';

const Drawer = createDrawerNavigator();

export default function DrawerRoute001() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Menu" component={CS_SC_002_Menu} options={{
                headerRight: () => <CustomHeaderLogo />,
                headerTitleAlign: 'center',
                title: 'Menu',
            }} />
            <Drawer.Screen name="Configuração" component={CS_SC_006__EnvorimentConfig} initialParams={{ doLogout: true }} />

        </Drawer.Navigator>
    );
}