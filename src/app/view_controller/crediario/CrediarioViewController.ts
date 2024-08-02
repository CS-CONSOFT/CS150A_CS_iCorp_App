import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { analiseCliente, cadastroCliente, simulacaoCrediario } from "../../services/api/endpoint/crediario/CS_MeuCrediario";
import { getObject } from "../../services/storage/AsyncStorageConfig";

export async function handleAnaliseCliente({ cs_conta_id }: { cs_conta_id: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para obter os dados da conta pelo ID
        const response = await analiseCliente({ cs_conta_id: cs_conta_id, cs_tenant_id: currentUser.TenantId, cs_estab_id: currentUser.EstabelecimentoId });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function handleGerarCliente({ cs_conta_id }: { cs_conta_id: string }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para obter os dados da conta pelo ID
        const response = await cadastroCliente({ cs_conta_id: cs_conta_id, cs_tenant_id: currentUser.TenantId, cs_estab_id: currentUser.EstabelecimentoId });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function handleSimulacaoCrediario({ cs_conta_codigo, cs_condicoes_lista, cs_valor_financiado }: { cs_conta_codigo: string, cs_condicoes_lista: string, cs_valor_financiado: number }) {
    try {
        // Obtém o usuário atual do armazenamento
        const currentUser = await getObject(DataKey.LoginResponse) as ILoginResponse;

        // Faz uma requisição para obter os dados da conta pelo ID
        const response = await simulacaoCrediario({ cs_tenant_id: currentUser.TenantId, cs_conta_codigo: cs_conta_codigo, cs_condicoes_lista: cs_condicoes_lista, cs_valor_financiado: cs_valor_financiado });
        return response;
    } catch (error) {
        throw error;
    }
}