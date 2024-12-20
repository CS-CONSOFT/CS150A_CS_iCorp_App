import api from "../../axios_config";
import { IResAnaliseCliente } from "../../interfaces/crediario/IResAnaliseCliente";
import { IResSimulacaoCrediario } from "../../interfaces/crediario/IResSimulacaoCrediario";

export async function analiseCliente({
  cs_tenant_id,
  cs_conta_id,
  cs_estab_id,
}: {
  cs_tenant_id: number;
  cs_conta_id: string;
  cs_estab_id: string;
}): Promise<IResAnaliseCliente> {
  try {
    const response = await api.post(
      "/csr_ic313_meucrediario_API/rest/CS_MeuCrediario/CS_Rest_Analise_Cliente",
      {
        In_Tenant_ID: cs_tenant_id,
        In_EstabId: cs_estab_id,
        Prm_bb012_id: cs_conta_id,
        In_EnviaContratos: false,
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function cadastroCliente({
  cs_tenant_id,
  cs_conta_id,
  cs_estab_id,
}: {
  cs_tenant_id: number;
  cs_conta_id: string;
  cs_estab_id: string;
}): Promise<number> {
  try {
    const response = await api.post(
      "/csr_ic313_meucrediario_API/rest/CS_MeuCrediario/CS_Rest_Cadastro_Cliente",
      {
        In_Tenant_ID: cs_tenant_id,
        In_EstabId: cs_estab_id,
        Prm_bb012_ID: cs_conta_id,
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function simulacaoCrediario({
  cs_tenant_id,
  cs_conta_codigo,
  cs_condicoes_lista,
  cs_valor_financiado,
}: {
  cs_tenant_id: number;
  cs_conta_codigo: string;
  cs_condicoes_lista: string;
  cs_valor_financiado: number;
}): Promise<IResSimulacaoCrediario> {
  try {
    const response = await api.post(
      "/csr_ic313_meucrediario_API/rest/CS_MeuCrediario/CS_Rest_SimulacaoCrediario",
      {
        In_Tenant_ID: cs_tenant_id,
        In_CondicoesLista: cs_condicoes_lista,
        In_CodigoCliente: cs_conta_codigo,
        In_ValorFinanciado: cs_valor_financiado,
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}
