import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import CustomButton, { CustomButtonProps } from "../button/CustomButton";
import CustomSearch from "../input/CustomSearch";
import { FormInputType } from "./IForm";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";

interface IFormData {
    // Uma lista de objetos que descrevem os campos de entrada do formulário.
    formInputTypeList: FormInputType[],

    // Propriedades do botão personalizado a serem exibidas no final do formulário.
    customButtonProp: CustomButtonProps,

    // O status do formulário, que pode ser usado para exibir um indicador de carregamento ou mensagem de erro.
    status: string,

    // Um objeto contendo os valores iniciais para os campos do formulário.
    // Cada chave do objeto deve corresponder ao título de um campo de entrada e o valor associado deve ser o valor inicial desejado para esse campo.
    initialFormState?: { [key: string]: any };

    /** Uma função que pode ser usada para manipular o valor de um campo de entrada enquanto ele 
     * está sendo digitado. 
     * Esta função recebe um novo valor como argumento. */
    handleValueOfInput?: (newValue: any) => void,
}

const CustomForm = ({ status, formInputTypeList, customButtonProp, initialFormState = {} }: IFormData) => {
    const [formState, setFormState] = useState<{ [key: string]: any }>();
    useEffect(() => {
        if (initialFormState) {
            setFormState(initialFormState)
        }
    }, [initialFormState])

    /**
     * Função para alterar o valor do item de cada input do formulario
     * @param title a chave que identifica o input do formulario
     * @param value o valor a ser passado
     */
    const handleChangeValue = (title: string, value: any) => {
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
                                handleValueOfInput={(valueTyped) => {
                                    handleChangeValue(item.title, valueTyped)
                                }}
                                securityTextEnter={item.securityTextEnter}
                                initialState={initialFormState[item.title]}
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