import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import CustomButton, { CustomButtonProps } from "../button/CustomButton";
import CustomSearch from "../input/CustomSearch";
import { FormInputType } from "./IForm";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";

interface IFormData {
    formInputTypeList: FormInputType[],
    customButtonProp: CustomButtonProps,
    status: string,
    initialFormState?: { [key: string]: any };
}

const CustomForm = ({ status, formInputTypeList, customButtonProp, initialFormState }: IFormData) => {
    const [formState, setFormState] = useState<{ [key: string]: any }>(
        /** o Reduce itera sobre todos os itens da lista
         * @acc -> um acumulador que inicialmente é um objeto vazio
         * Aqui pegamos todas as propriedades de acc copiamos, atribuindo a essa cópia
         * o valor o título de cada campo do formulario, para termos um state de todos.
         * 
         * Ex. lista de form [username, email, password] -> Pegamos cada titulo dela
         * e criamos um objeto novo que seria {username:'', email:'',password:''}
         */

        /**
         * Se initial state tiver definido, usa ele
         */
        initialFormState || formInputTypeList.reduce((acc, field) => ({ ...acc, [field.title]: '' }), {})
    );
    /**
     * Função para alterar o valor do item de cada input do formulario
     * @param title a chave que identifica o input do formulario
     * @param value o valor a ser passado
     */
    const handleChange = (title: string, value: any) => {
        setFormState(prevState => ({ ...prevState, [title]: value }));
    };

    /**
     * Função que utiliza o valor de formState para enviar para a tela que está chamando
     * o componente através das propriedades
     */
    const handleSubmit = () => {
        customButtonProp.onPress(formState);
    };

    const isLoading = status == FETCH_STATUS.LOADING
    return (
        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    data={formInputTypeList}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) =>
                        <CustomSearch>
                            <CustomSearch.IconSearch iconName="" />
                            <CustomSearch.InputHandle
                                titleText={item.title}
                                placeholder={item.placeholder}
                                handleInput={(newValue: any) => handleChange(item.title, newValue)}
                                value={formState[item.title]}
                                securityTextEnter={item.securityTextEnter}
                            />
                        </CustomSearch>
                    }
                />
            </View>

            {isLoading ? <ActivityIndicator /> : <CustomButton
                title={customButtonProp.title}
                onPress={handleSubmit}
                onLongPress={customButtonProp.onLongPress}
                disabled={customButtonProp.disabled}
                buttonStyle={customButtonProp.buttonStyle}
                textStyle={customButtonProp.textStyle}
            />}
        </View>
    );
}

export default CustomForm;