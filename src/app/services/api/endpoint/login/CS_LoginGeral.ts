
import { Dispatch } from "@reduxjs/toolkit";
import { DataKey } from "../../../../enum/DataKeys";
import { ActionType } from "../../../../store/type/ActionsType";
import { storeSimpleDataVc } from "../../../../view_controller/SharedViewController";
import api from "../../axios_config";
import { IMenuItem, IPostLoginData, IRegraItem, MenuTitle } from "../../interfaces/login/CS_IPostLoginData";


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
        storeSimpleDataVc(DataKey.DominioValorString, response.data.Dominio);
        return response.data;
    } catch (err) {
        throw err; // Re-throwing the error to handle it in the calling code if needed
    }
}




/**retorna as regras de usuario para definir quais botoes aparecerao no menu e salva no estado*/
export const getRegrasUsuario = ({ sy001_id, tenant }: { tenant: number, sy001_id: string }) => {
    return async (dispatch: Dispatch<{ type: ActionType.LIST_MENU; payload: IMenuItem[] }>) => {
        try {
            const params = {
                In_UsuarioID: sy001_id,
                In_Tenant: tenant
            };

            const response = await api.get('/csr_aa100_Gestao_BL/rest/GestaoUsuario/Get_ListaRegraUsuario', {
                params: params
            });

            const filteredList = await getListOfAllowedButtons(response.data);
            dispatch({
                type: ActionType.LIST_MENU,
                payload: filteredList,
            });
        } catch (err) {
            throw err;
        }
    };
};


/*retorna lista de menus que ja estao setados*/
function listOfAlreadyMenuItems(): IMenuItem[] {
    const preVendaListMenu: IMenuItem[] = [{
        id: 999,
        title: MenuTitle.PV,
        iconName: "cart-outline"
    },
    {
        id: 998,
        title: MenuTitle.COMANDA,
        iconName: "newspaper-outline"
    },
    {
        id: 997,
        title: MenuTitle.PRODUTO,
        iconName: "search-outline"

    },
    {
        id: 996,
        title: MenuTitle.CLIENTE,
        iconName: "person-add-outline"
    },
    ]
    return preVendaListMenu
}

/**filtra da lista de regras as regras responsaveis pelos botoes na PV*/
async function getListOfAllowedButtons(list: IRegraItem[]): Promise<IMenuItem[]> {

    //regras que precisam ser checadas se existem
    const rulesToCheck = ['PVMOB_01_ACESSACARGA', 'PVMOB_02_NAOACESSSAVENDA', 'PVMOB_03_ACESSAOBRA', 'PVMOB_04_ACESSASERIE', 'PVMOB_05_ACESSAENTREGANFe']



    //inicia a lista com a prevenda
    let filteredRules: IMenuItem[] = listOfAlreadyMenuItems()


    //pre venda item de menu que é usado para remover do index
    const preVendaItemMenu: IMenuItem = {
        id: 999,
        title: MenuTitle.PV,
        iconName: "cart-outline"
    }

    //percorre a lista de regras a serem checadas e verifica a existencia dela na lista que veio da rota de regras de usuario
    for (let index = 0; index < rulesToCheck.length; index++) {
        //checa se NAO ACESSA VENDA, nao insere na lista
        if (rulesToCheck[index] === 'PVMOB_02_NAOACESSSAVENDA') {
            //se nao puder acessar a PV, remove ela da lista e passa para a proxima iteração
            const indexToRemove = filteredRules.indexOf(preVendaItemMenu)
            filteredRules.splice(indexToRemove)
            continue;
        }
        //recupera se o cidadao tem a regra
        const _currentRule = list.find((item) => item.Label === rulesToCheck[index])

        //se a role existir na lista, cria um item de menu e seta na lista
        if (_currentRule !== undefined) {
            filteredRules.push(setMenuItem(index) as IMenuItem)
        }
    }

    return filteredRules
}


enum MenuRules {
    ACESSACARGA = 0,
    NAOACESSSAVENDA = 1,
    ACESSAOBRA = 2,
    ACESSASERIE = 3,
    ACESSAENTREGANFe = 4
}


function setMenuItem(index: number) {
    switch (index) {
        case MenuRules.ACESSAOBRA:
            return {
                id: index,
                title: MenuTitle.OBRAS,
                iconName: "construct-outline"
            }
        case MenuRules.ACESSASERIE:
            return {
                id: index,
                title: MenuTitle.SERIE,
                iconName: "barcode-outline"
            }
        case MenuRules.ACESSAENTREGANFe:
            return {
                id: index,
                title: MenuTitle.ENTREGA,
                iconName: "bag-check-outline"
            }
    }
}



