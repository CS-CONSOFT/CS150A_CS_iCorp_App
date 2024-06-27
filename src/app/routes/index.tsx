import { NavigationContainer } from '@react-navigation/native'
import StackRoutes from './stack.routes'

import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Routes() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}