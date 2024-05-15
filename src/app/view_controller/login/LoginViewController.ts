import { generalLogin } from "../../../services/api/endpoint/login/CS_LoginGeral";
import { removeValueFromStorage } from "../../../services/storage/AsyncStorageConfig";


export async function generalLoginVc(loginData: ILoginData) {
    try {
        const result = await generalLogin(loginData);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function logout(key:string) {
    try {
        await removeValueFromStorage(key);
    } catch (err) {
        throw err;
    }
}




