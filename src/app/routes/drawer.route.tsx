import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/drawer/CustomDrawerContent ';
import CS_SC_002_Menu from '../screens/002menu/CS_SC_002_Menu';
import CustomHeaderLogo from '../components/headers/CustomHeaderLogo';

const Drawer = createDrawerNavigator();

export default function DrawerRoute001() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Menu" component={CS_SC_002_Menu} options={{
                headerBackground: () => <CustomHeaderLogo />,
                headerTitleAlign: 'center',
                headerTitle: "",
                title: 'Menu'
            }} />
        </Drawer.Navigator>
    );
    //
}