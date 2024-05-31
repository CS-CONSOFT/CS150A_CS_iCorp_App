import { router } from "expo-router";

import { DataKey } from "../enum/DataKeys";
import { ILoginResponse } from "../screens/login/ILoginResponse";
import { IGetUserProperties } from "./interface/IGetUserProperties";
import { getObject, storeObject, storeSimpleData } from "../services/storage/AsyncStorageConfig";


export async function storeObjectDataVc(key: string, value: object) {
    try {
        storeObject(key, value)
    } catch (error) {
        return error
    }
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


export function navigateTo(route: string) {
    router.push(route)
}

export function replaceScreen(route: string) {
    router.replace(route)
}

