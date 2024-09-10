import { store } from "../../store/store";

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
    const listOfMenu = store.getState().listMenuReducer.listMenuReducer as IMenuItem[]
    return listOfMenu
}