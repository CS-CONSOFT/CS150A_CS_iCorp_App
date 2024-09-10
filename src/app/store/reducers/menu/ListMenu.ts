import { IRegraItem } from "../../../services/api/endpoint/login/CS_LoginGeral";
import { ActionType } from "../../type/ActionsType";

//reducer responsavel por lidar com a lista de botoes disponiveis no menu
interface MenuState {
    listMenuReducer: IRegraItem[];
}

const initialState: MenuState = {
    listMenuReducer: [],
};


function listMenuReducer(state = initialState, action) {
    if (action.type === ActionType.LIST_MENU) {
        return { ...state, listMenuReducer: action.payload }
    }
    return state
}

export default listMenuReducer