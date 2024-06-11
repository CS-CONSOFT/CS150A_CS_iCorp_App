import { useSQLiteContext } from "expo-sqlite"

export type ConfigDB = {
    id: number,
    tenantId: string,
    urlBase: string,
    token: string,
    isValidado: boolean
}
export function useDatabase() {
    const database = useSQLiteContext()
    async function create(data: ConfigDB) {
        const statement = await database.prepareAsync(
            "INSERT OR REPLACE INTO csloc_config_env (id, urlBase, tenantId, token, isValidado) VALUES ($id, $urlBase, $tenantId, $token, $isValidado)"
        )
        try {
            await statement.executeAsync({
                $id: data.id,
                $urlBase: data.urlBase,
                $tenantId: data.tenantId,
                $token: data.token,
                $isValidado: data.isValidado
            })
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function get() {
        try {
            const query = "SELECT * FROM csloc_config_env WHERE id=501"
            const response = await database.getFirstAsync<ConfigDB>(query)
            return response
        } catch (error) {
            throw error
        }
    }

    async function exclude() {
        try {
            const query = "DELETE FROM csloc_config_env WHERE id=501"
            await database.execAsync(query)
        } catch (error) {
            throw error
        }
    }



    return { create, get, exclude }
}