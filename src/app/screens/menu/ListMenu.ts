import { router } from "expo-router"
import { navigateTo } from "../../view_controller/SharedViewController"
function goToSerie() {
    router.push("/screens/nota/serie/CS_SC_Serie")
}


export const data =[
    { 
        id: 1, 
        title: "Entrega", 
        onPress: () => { navigateTo("/screens/nota/entrega/CS_SC_Entrega") }, 
        iconName: "receipt-outline"
    },
    { 
        id: 2, 
        title: "Série Produto", 
        onPress: () => { navigateTo("/screens/nota/serie/CS_SC_Serie") }, 
        iconName: "albums-outline"
    },
    { 
        id: 3, 
        title: "Consulta Produtos", 
        onPress: () => { navigateTo("/screens/produtos/consulta/CS_SC_ConsultaProdutos") }, 
        iconName: "list-outline"
    },
    { 
        id: 4, 
        title: "Obras", 
        onPress: () => { goToSerie() }, 
        iconName: "construct-outline"
    },
    { 
        id: 5, 
        title: "Consulta Preços", 
        onPress: () => { goToSerie() }, 
        iconName: "cash-outline"
    },
    { 
        id: 6, 
        title: "Cadastro Cliente", 
        onPress: () => { goToSerie() }, 
        iconName: "person-add-outline"
    },
    { 
        id: 7, 
        title: "Pré-Venda", 
        onPress: () => { goToSerie() }, 
        iconName: "cart-outline"
    },
    { 
        id: 8, 
        title: "Lista Comanda", 
        onPress: () => { goToSerie() }, 
        iconName: "clipboard-outline"
    }
]