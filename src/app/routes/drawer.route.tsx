import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/drawer/CustomDrawerContent ';
import CS_SC_002_Menu from '../screens/002menu/CS_SC_002_Menu';
import CS_SC_006__EnvorimentConfig from '../screens/006config/CS_SC_006__EnvorimentConfig';

const Drawer = createDrawerNavigator();

export default function DrawerRoute001() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Menu" component={CS_SC_002_Menu} options={{
                //headerRight: () => <CustomHeaderLogo />,
                headerTitleAlign: 'center',
                title: 'Menu',
            }} />


            <Drawer.Screen name="Configuração" component={CS_SC_006__EnvorimentConfig} initialParams={{ doLogout: true }} />
        </Drawer.Navigator>
    );
    //
}