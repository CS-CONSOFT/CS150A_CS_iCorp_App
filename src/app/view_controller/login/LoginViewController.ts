import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { generalLogin } from "../../services/api/endpoint/login/CS_LoginGeral";
import { removeValueFromStorage } from "../../services/storage/AsyncStorageConfig";
import { getObjectDataVc } from "../SharedViewController";



export async function generalLoginVc(loginData: IPostLoginData) {
    try {
        await removeValueFromStorage(DataKey.CurrentPV)
        const result = await generalLogin(loginData);
        return result;
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
        await removeValueFromStorage(DataKey.LoginResponse);
    } catch (err) {
        throw err;
    }
}




