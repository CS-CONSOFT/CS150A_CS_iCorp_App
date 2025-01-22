import {
  ClactaEnum,
  GruEnum,
} from "./../../screens/009Cliente/ListaEnumClasseGrupo";
// Importa enum para acessar chaves de dados específicas
import { DataKey } from "../../enum/DataKeys";

// Importa interface de resposta de login
import { ILoginResponse } from "../../screens/001login/ILoginResponse";

// Importa funções da API relacionadas a contas
import {
  deleteConta,
  getContaById,
  getListConta,
  get_csicp_bbs,
  save1201,
  save1202,
  save1206,
  saveConta,
} from "../../services/api/endpoint/conta/CS_Contas";

// Importa função da API para obter dados estáticos
import { getEstaticasBB012 } from "../../services/api/endpoint/estaticas/CS_Estaticas";

// Importa interfaces comuns de requisição
import { ICommonReq } from "../../services/api/interfaces/CS_ICommonResponse";
import { IReqSave1201 } from "../../services/api/interfaces/contas/CS_IReqSave1201";
import { CS_IReqSave1202 } from "../../services/api/interfaces/contas/CS_IReqSave1202";
import { IReqSaveConta } from "../../services/api/interfaces/contas/CS_IReqSaveConta";
import { CS_IReqSaveEndereco } from "../../services/api/interfaces/contas/CS_IReqSaveEndereco";

// Importa funções de armazenamento assíncrono
import {
  getObject,
  getSimpleData,
} from "../../services/storage/AsyncStorageConfig";

// Função para obter dados de uma conta pelo ID
export async function handleGetContaById({
  cs_conta_id,
}: {
  cs_conta_id: any;
}) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Faz uma requisição para obter os dados da conta pelo ID
    const response = await getContaById({
      cs_conta_id: cs_conta_id,
      cs_tenant_id: currentUser.TenantId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Função para obter a lista de contas com paginação e filtro
export async function handleGetListConta({
  currentPage,
  pageSize,
  cs_search,
  modRelacaoID,
  cs_codigoConta
}: {
  currentPage: number;
  pageSize: number;
  modRelacaoID: number;
  cs_search?: string;
  cs_codigoConta?: number;
}) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Cria um objeto de requisição comum
    const commonReq: ICommonReq = {
      Tenant_id: currentUser.TenantId,
      In_IsActive: true,
      In_IsCount: false ? 0 : 1,
      in_currentPage: currentPage,
      in_pageSize: pageSize,
      in_search: cs_search,
      In_CodgConta: cs_codigoConta
    };

    // Faz uma requisição para obter a lista de contas com os parâmetros fornecidos
    const response = await getListConta({
      commonReq: commonReq,
      cs_mod_relacao_id: modRelacaoID,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Enum para tipos de modalidades de relacionamento
enum MREL_TYPE {
  ADQUIRE = "Cliente",
  FORNECE = "Fornecedor",
  ADQUIRE_FORNECE = "Cliente/Fornecedor",
}

/**
 * Retorna o ID do tipo da modalidade de Relacionamento.
 * @param mRelType -> o tipo da modalidade que se quer retornar o ID
 */
async function getTypeMRel(mRelType: MREL_TYPE): Promise<number> {
  // Seta a variável vazia
  let idType = -1;

  try {
    // Obtém dados estáticos da API
    const res = await getEstaticasBB012();

    // Filtra o ID do tipo de relacionamento baseado no label fornecido
    const idFiltered = res.csicp_bb012_MRel.find(
      (item) => item.Label === mRelType
    )?.Id;

    // Se o ID filtrado não for indefinido, atualiza a variável idType
    if (idFiltered !== undefined) {
      idType = idFiltered;
    }
  } catch (error) {
    console.error("Erro ao obter as estaticas:", error);
  }

  return idType;
}

// Função para salvar os dados de uma conta
export async function handleSaveConta(cs_save_conta: IReqSaveConta) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Obtém o ID do tipo de relacionamento de maneira assíncrona
    const idMRel = await getTypeMRel(MREL_TYPE.ADQUIRE);

    // Seta os IDs de estabelecimento e de modalidade de relacionamento na conta
    cs_save_conta.bb012_EstabCadID = currentUser.EstabelecimentoId;
    cs_save_conta.BB012_ModRelacao_ID = idMRel;

    // Faz uma requisição para salvar a conta com os dados fornecidos
    const response = await saveConta({
      cs_save_conta: cs_save_conta,
      cs_tenant_id: currentUser.TenantId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Função para deletar uma conta pelo ID
export async function handleDeleteConta() {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;
    let currentContaId: any = "";

    // Obtém o ID da conta atual do armazenamento
    await getSimpleData(DataKey.CurrentContaId).then((res) => {
      currentContaId = res;
    });

    // Faz uma requisição para deletar a conta pelo ID
    const response = await deleteConta({
      cs_conta_id: currentContaId,
      cs_tenant_id: currentUser.TenantId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Função para salvar dados de tipo 1202
export async function handleSave1202({
  cs_req_save,
}: {
  cs_req_save: CS_IReqSave1202;
}) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Faz uma requisição para salvar os dados de tipo 1202
    const response = await save1202({
      cs_req_save: cs_req_save,
      cs_tenant_id: currentUser.TenantId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Função para salvar dados de tipo 1201
export async function handleSave1201({
  cs_req_save,
}: {
  cs_req_save: IReqSave1201;
}) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Faz uma requisição para salvar os dados de tipo 1201
    const response = await save1201({
      cs_req_save: cs_req_save,
      cs_tenant_id: currentUser.TenantId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Função para salvar dados de endereço
export async function handleSave1206({
  cs_req_save,
}: {
  cs_req_save: CS_IReqSaveEndereco;
}) {
  try {
    // Obtém o usuário atual do armazenamento
    const currentUser = (await getObject(
      DataKey.LoginResponse
    )) as ILoginResponse;

    // Faz uma requisição para salvar os dados de endereço
    const response = await save1206({
      cs_req_save: cs_req_save,
      cs_tenant_id: currentUser.TenantId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * @param claEnum classe
 * @returns  retorna o id da classe passada no parametro
 */
export async function handleGetClaId(claEnum: ClactaEnum): Promise<number> {
  try {
    const list = await get_csicp_bbs();
    const currentItem = list.csicp_bb12_clacta.find(
      (item) => item.Label == claEnum
    );
    return currentItem?.Id || -1;
  } catch (error) {
    throw error;
  }
}

/**
 * @param gruEnum classe
 * @returns  retorna o id da classe passada no parametro
 */
export async function handleGetGruId(gruEnum: GruEnum): Promise<number> {
  try {
    const list = await get_csicp_bbs();
    const currentItem = list.csicp_bb12_gructa.find(
      (item) => item.Label == gruEnum
    );
    return currentItem?.Id || -1;
  } catch (error) {
    throw error;
  }
}
