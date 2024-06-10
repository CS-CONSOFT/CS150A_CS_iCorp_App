import api from "../../axios_config";


export async function generalLogin(loginData: IPostLoginData) {
    try {
        const data = {
            Dominio: loginData.domain,
            Usuario: loginData.user,
            Senha: loginData.password
        }

        const response = await api.post('cs_At_40_LogicoService/rest/CS_PDV_API/LoginGeral', data);

        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}


export async function doLogout() {
    try {

    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}
