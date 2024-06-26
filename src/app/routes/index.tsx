import { NavigationContainer } from '@react-navigation/native'
import StackRoutes from './stack.routes'
import { SafeAreaView } from 'react-native'

export default function Routes() {
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}