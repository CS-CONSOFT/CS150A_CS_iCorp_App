import { api_cep } from "../../api_cep.config";
import { IResGetCep } from "../../interfaces/endereco/CS_IResGetCep";

export async function getCep(cep: string): Promise<IResGetCep> {
    try {
        const response = await api_cep.get(`${cep}/json/`)
        return response.data as IResGetCep
    } catch (error) {
        throw error
    }
}
