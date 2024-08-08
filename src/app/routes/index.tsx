import { NavigationContainer } from '@react-navigation/native'
import StackRoutes from './stack.routes'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

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