import { type SQLiteDatabase } from 'expo-sqlite'

export async function initDB(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS csloc_config (
            id INTEGER PRIMARY KEY,
            urlBase TEXT NOT NULL,
            tenantId INTEGER NOT NULL,
            token TEXT NOT NULL,
            isValidado BOOLEAN NOT NULL CHECK(isValidado IN (0,1))
        )
    `)
}