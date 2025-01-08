import { DataKey } from "../../enum/DataKeys";
import { ILoginResponse } from "../../screens/001login/ILoginResponse";
import { getAnaliseCredito } from "../../services/api/endpoint/analiseCredito/CS_AnaliseCredito";
import { getObject } from "../../services/storage/AsyncStorageConfig";

// Função para obter dados de uma analise de crédito de uma conta
export async function handleGetAnaliseCredito({
  cs_conta_id,
  cs_calcular_score_clearsale,
}: {
  cs_conta_id: any;
  cs_calcular_score_clearsale: boolean;
}) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Faz uma requisição para obter os dados da analise de credito pelo ID
    // (que recupera o CPF no banckend) e analise é feita via CPF
    const response = await getAnaliseCredito({
      cs_conta_id: cs_conta_id,
      cs_tenant_id: currentUser.TenantId,
      cs_calcular_score_clearsale: cs_calcular_score_clearsale,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
