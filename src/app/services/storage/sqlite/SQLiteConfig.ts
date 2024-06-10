import * as SQLite from 'expo-sqlite';


interface ConfigRow {
    id: number;
    baseUrl: string;
    tenantId: number;
    token: string;
    isValidated: boolean;
}

let dbInstance: any = null;
export async function openDatabase() {
    if (!dbInstance) {
        dbInstance = await SQLite.openDatabaseAsync('databaseName');
        await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS csloc_config (
        id INTEGER PRIMARY KEY NOT NULL,
        baseUrl TEXT NOT NULL,
        tenantId INTEGER NOT NULL,
        token TEXT NOT NULL,
        isValidated INTEGER NOT NULL
      );
    `);
    }
    return dbInstance;
}

export async function insertOrUpdateConfig(db: any, baseUrl: string, tenantId: number, token: string, isValidated: boolean) {
    const existingConfig = await getConfig(db);
    if (existingConfig) {
        await db.runAsync('UPDATE csloc_config SET baseUrl = ?, tenantId = ?, token = ?, isValidated = ? WHERE id = ?', baseUrl, tenantId, token, isValidated ? 1 : 0, existingConfig.at(0)?.id);
        console.log('Updated config.');
    } else {
        await db.runAsync('INSERT INTO csloc_config (id, baseUrl, tenantId, token, isValidated) VALUES (?, ?, ?, ?, ?)', 1, baseUrl, tenantId, token, isValidated ? 1 : 0);
        console.log('Inserted config.');
    }
}

export async function getConfig(db: any): Promise<ConfigRow[]> {
    const allRows = await db.getAllAsync('SELECT * FROM csloc_config');
    console.log('All configurations:', allRows);
    return allRows;
}
