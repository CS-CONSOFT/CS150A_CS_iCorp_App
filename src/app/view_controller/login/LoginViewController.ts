import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { checkIfUserTheresRule, generalLogin, getRegrasUsuario } from "../../services/api/endpoint/login/CS_LoginGeral";
import { IPostLoginData } from "../../services/api/interfaces/login/CS_IPostLoginData";
import { removeValueFromStorage, storeObject } from "../../services/storage/AsyncStorageConfig";
import { getObjectDataVc } from "../SharedViewController";



export async function generalLoginVc(loginData: IPostLoginData) {
    try {
        await removeValueFromStorage(DataKey.CurrentPV)
        const result = await generalLogin(loginData);
        const menuList = await getRegrasUsuario({ sy001_id: result.Model.UsuarioId, tenant: result.Model.TenantId })
        // Despacha a ação thunk que buscará as regras e atualizará o estado
        storeObject(DataKey.MenuList, menuList)
        return result;
    } catch (err) {
        throw err;
    }
}

export async function checkIfRuleDD012_ACESSATODASPV_Exists() {
    try {
        const res = await getObjectDataVc(DataKey.LoginResponse) as ILoginResponse;
        const hasRule = await checkIfUserTheresRule({ sy001_id: res.UsuarioId, tenant: res.TenantId, regra: "DD012_ACESSATODASPV" })
        return hasRule
    } catch (err) {
        throw err;
    }
}


export async function checkIfUserIsLogged() {
    try {
        const res = await getObjectDataVc(DataKey.LoginResponse);
        if (res !== null) {
            const result = res as ILoginResponse;
            if (result.TenantId !== undefined) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    } catch (err) {
        throw err;
    }
}



export async function logout(key: string) {
    try {
        await removeValueFromStorage(key);
    } catch (err) {
        throw err;
    }
}

