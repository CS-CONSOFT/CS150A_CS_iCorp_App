import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackRoutes from './stack.routes';

export default function Routes() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style='auto' />
                <StackRoutes />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}