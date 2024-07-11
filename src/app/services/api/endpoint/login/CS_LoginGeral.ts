import { DataKey } from "../../../../enum/DataKeys";
import { storeSimpleDataVc } from "../../../../view_controller/SharedViewController";
import api from "../../axios_config";


export async function generalLogin(loginData: IPostLoginData) {
    try {
        const data = {
            Tenant: loginData.tenant,
            Usuario: loginData.user,
            Senha: loginData.password
        }

        const response = await api.post('/cs_At_40_LogicoService/rest/CSAuth_Login/LoginGeral', data);

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}


export interface IReturnValida {
    Retorno: Retorno
    Dominio: string
}

export interface Retorno {
    IsOk: boolean
    Msg: string
}

export async function validaAmbiente({ tenant, token }: { tenant: number, token: string }): Promise<IReturnValida> {
    try {
        const response = await api.get('/cs_At_40_LogicoService/rest/CS_ValidaAmbiente/Valida', {
            headers: {
                Tenant_id: tenant,
                Token: token
            }
        });
        console.log(response.data);
        storeSimpleDataVc(DataKey.DominioValorString, response.data.Dominio);
        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}


