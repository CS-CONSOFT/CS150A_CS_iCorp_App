import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { generalLogin, getRegrasUsuario } from "../../services/api/endpoint/login/CS_LoginGeral";
import { IPostLoginData } from "../../services/api/interfaces/login/CS_IPostLoginData";
import { removeValueFromStorage } from "../../services/storage/AsyncStorageConfig";
import { store } from "../../store/store";
import { getObjectDataVc } from "../SharedViewController";



export async function generalLoginVc(loginData: IPostLoginData) {
    try {
        await removeValueFromStorage(DataKey.CurrentPV)
        const result = await generalLogin(loginData);
        // Despacha a ação thunk que buscará as regras e atualizará o estado
        store.dispatch(getRegrasUsuario({ sy001_id: result.Model.UsuarioId, tenant: result.Model.TenantId }));
        return result;
    } catch (err) {
        console.log(err);

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

