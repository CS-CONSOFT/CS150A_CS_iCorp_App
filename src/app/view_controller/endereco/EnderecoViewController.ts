import { getCep } from "../../services/api/endpoint/endereco/CS_Enderecamento";

export async function handleGetCep(cep: string) {
    try {
        const response = await getCep(cep)
        return response
    } catch (error) {
        throw error
    }
}