import axios from "axios";

export const api_cep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});