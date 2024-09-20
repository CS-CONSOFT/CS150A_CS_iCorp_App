import { DataKey } from "../../enum/DataKeys";
import { getObject } from "../../services/storage/AsyncStorageConfig";

interface IMenuItem {
    id: number,
    title: string,
    iconName: string
}




/**
 * configura os itens mostrados no menu de acordo com as regras do usuario
 */
export async function configureMenuByRule() {
    //recupera o menu do state
    const listOfMenu = await getObject(DataKey.MenuList) as IMenuItem[]
    return listOfMenu
}