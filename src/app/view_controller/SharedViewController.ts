
import { DataKey } from "../enum/DataKeys";
import { ILoginResponse } from "../screens/001login/ILoginResponse";
import { IGetUserProperties } from "./interface/IGetUserProperties";
import { getObject, getSimpleData, storeObject, storeSimpleData } from "../services/storage/AsyncStorageConfig";
import { getConfig, insertOrUpdateConfig, openDatabase } from "../services/storage/sqlite/SQLiteConfig";


export async function storeObjectDataVc(key: string, value: object) {
    try {
        storeObject(key, value)
    } catch (error) {
        return error
    }
}

export async function handleGetSimpleData(key: string) {
    let value: any = ''
    getSimpleData(key).then((res) => {
        value = res
    })
    return value
}

export async function getObjectDataVc(key: string) {
    const result = await getObject(key);
    return result;
}

export async function storeSimpleDataVc(key: string, value: string) {
    try {
        storeSimpleData(key, value)
    } catch (error) {
        return error
    }
}

export async function getUserProperties(): Promise<IGetUserProperties> {
    let userProperties: IGetUserProperties = {
        userId: -1,
        userName: '',
        tenantId: undefined,
        estabId: '',
        estabName: '',
        usuarioId: ''
    };

    try {
        const result = await getObject(DataKey.LoginResponse.toString());
        if (result) {
            const loginResponse = result as ILoginResponse;
            userProperties = {
                userId: loginResponse.UserID,
                userName: loginResponse.NomeUsuario,
                tenantId: loginResponse.TenantId,
                estabId: loginResponse.EstabelecimentoId,
                estabName: loginResponse.NomeEstabelecimento,
                usuarioId: loginResponse.UsuarioId
            }
            return userProperties;
        }
        return userProperties;
    } catch (error) {
        console.error("Error getting object data:", error);
        return userProperties;
    }
}


export function navigateTo(navigate: any, route: string) {
    navigate(route)
}

export function replaceScreen(navigate: any, route: string) {
    navigate(route)
}

export async function insertUpdateDBEnvorimentConfig({ baseUrl, tenantId, token, isValidado }: { baseUrl: string, tenantId: number, token: string, isValidado: boolean }) {
    const db = await openDatabase()
    await insertOrUpdateConfig(db, baseUrl, tenantId, token, isValidado)
}

export async function getDBEnvorimentConfig() {
    const db = await openDatabase()
    const all = await getConfig(db)
    console.log(all);

    return all
}

