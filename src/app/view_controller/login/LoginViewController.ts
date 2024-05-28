import { ILoginResponse } from "../../screens/login/ILoginResponse";
import { generalLogin } from "../../services/api/endpoint/login/CS_LoginGeral";
import { removeValueFromStorage } from "../../services/storage/AsyncStorageConfig";
import { getObjectDataVc } from "../SharedViewController";



export async function generalLoginVc(loginData: ILoginData) {
    try {
        const result = await generalLogin(loginData);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function checkIfUserIsLogged(): Promise<boolean> {
    try {
        let isLogged: boolean = false
        getObjectDataVc("LoginResponse").then((res) => {
            if (res !== null) {
                const result = res as ILoginResponse
                if (result.TenantId !== undefined) {
                    isLogged = true
                }
            }
        })
        return isLogged
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




