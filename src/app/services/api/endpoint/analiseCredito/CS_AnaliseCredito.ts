import api from "../../axios_config";
import { CS_IResGetAnaliseCredito } from "../../interfaces/analiseCredito/_IResGetAnaliseCredito";

export async function getAnaliseCredito({
  cs_tenant_id,
  cs_conta_id,
  cs_calcular_score_clearsale,
}: {
  cs_tenant_id: number;
  cs_conta_id: string;
  cs_calcular_score_clearsale: boolean;
}): Promise<CS_IResGetAnaliseCredito> {
  try {
    const data = {
      Tenant_id: cs_tenant_id,
      In_BB012_ID: cs_conta_id,
      In_CalcularScoreClearsale: cs_calcular_score_clearsale,
    };

    const response = await api.get(
      "/CSR_BB100_ClienteFor_IS/rest/CS_AnaliseCredito/CS_AnaliseCredito",
      { headers: data }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}
