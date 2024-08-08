import * as Network from 'expo-network';

/** checa se há conexão com a internet */
export async function checkIfTheresNetworkConnection(): Promise<Boolean> {
    return (await Network.getNetworkStateAsync()).isConnected!
}