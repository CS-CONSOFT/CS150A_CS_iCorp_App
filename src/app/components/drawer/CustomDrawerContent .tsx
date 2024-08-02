import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../view_controller/login/LoginViewController';
import { DataKey } from '../../enum/DataKeys';
import { removeValueFromStorage } from '../../services/storage/AsyncStorageConfig';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const navigation = useNavigation();

    const handleLogout = () => {
        // Chame sua função de logout aqui
        logout(DataKey.LoginResponse).then(() => {
            removeValueFromStorage(DataKey.IsConfigValidada).then(() => {
                navigation.navigate('Login');
            })
        });
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <TouchableHighlight
                onPress={handleLogout}
                underlayColor={'white'}
                style={{ margin: 16, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8 }}
            >
                <Text>Sair</Text>
            </TouchableHighlight>
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
