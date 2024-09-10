import { ActionType } from "../type/ActionsType";

function updateListMenu(newMenuList: string[]) {
    return {
        type: ActionType.LIST_MENU,
        payload: newMenuList
    }
}