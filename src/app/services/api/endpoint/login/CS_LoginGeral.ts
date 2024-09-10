
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


/*retorna lista de menus que ja estao setados independente de regra*/
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

    //variavel que armazena os itens de menu que serão setados de acordo com as regras
    let filteredRulesMenuList: IMenuItem[] = listOfAlreadyMenuItems()

    //percorre a lista de regras a serem checadas e verifica a existencia dela na lista que veio da rota de regras de usuario
    for (let index = 0; index < rulesToCheck.length; index++) {
        //recupera se o cidadao tem alguma regra referente a PV
        const _currentRule = list.find((item) => item.Label === rulesToCheck[index])

        //se a role existir na lista, cria um item de menu e seta na lista
        if (_currentRule !== undefined) {
            //caso a regra seja para NÃO HAVER PV, passar para a proxima iteração
            if (_currentRule.Label === "PVMOB_02_NAOACESSSAVENDA") {
                //atribui a variavel que armazena a lista, a propria lista porem filtrada para nao trazer o item que contenha a PV
                filteredRulesMenuList = filteredRulesMenuList.filter((item) => item.title !== "PV")
                continue;
            }
            //cria o item de menu quando há regra que permite isso
            const itemMenu = setMenuItemWhenTheresRule(index) as IMenuItem
            //se houve regra para atribuir item de menu, então insere na lista. A condição é o id ser diferente de -1, chegar a funcao setMenuItemWhenTheresRule para entender
            if (itemMenu.id != -1) {
                filteredRulesMenuList.push(itemMenu)
            }
        }
    }
    return filteredRulesMenuList
}


enum MenuRules {
    ACESSACARGA = 0,
    NAOACESSSAVENDA = 1,
    ACESSAOBRA = 2,
    ACESSASERIE = 3,
    ACESSAENTREGANFe = 4
}


/** seta o item de menu quando há regras */
function setMenuItemWhenTheresRule(index: number) {
    let menuItem: IMenuItem = { id: -1, title: "-1", iconName: "-1" }
    switch (index) {
        case MenuRules.ACESSAOBRA:
            menuItem = {
                id: index,
                title: MenuTitle.OBRAS,
                iconName: "construct-outline"
            }
            break;
        case MenuRules.ACESSASERIE:
            menuItem = {
                id: index,
                title: MenuTitle.SERIE,
                iconName: "barcode-outline"
            }
            break;
        case MenuRules.ACESSAENTREGANFe:
            menuItem = {
                id: index,
                title: MenuTitle.ENTREGA,
                iconName: "bag-check-outline"
            }
            break;
    }
    return menuItem
}



