import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../../../CommonStyle";
import CustomIcon from "../../../../components/icon/CustomIcon";
import CustomSeparator from "../../../../components/lists/CustomSeparator";
import CustomSwitch from "../../../../components/switch/CustomSwitch";
import { IResProductItemModel } from "../../../../services/api/interfaces/prevenda/CS_IResProdutosPreVenda";
import { formatMoneyValue } from '../../../../util/FormatText';
import { ICON_NAME } from "../../../../util/IconsName";
import { moneyApplyMask, moneyRemoveMask } from "../../../../util/Masks";
import { handleUpdateProductAmount, handleUpdateProductSwtichs } from "../../../../view_controller/prevenda/PreVendaViewController";
import { common003_01_styles } from "./CommonStyles";

/** componente de edição dos valores do produto */
const C_003_01_01_ProductPvListItemEdit = ({ product, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue, downSwipe, setAmountProduct }:
    {
        product: IResProductItemModel,
        saveTablePrice: (tablePrice: number, productId: string) => void
        saveUnityPrice: (unityPrice: number, productId: string) => void
        saveDiscountPercent: (discountPercent: number, productId: string) => void
        saveDiscountValue: (valueDiscount: number, productId: string) => void
        downSwipe: () => void
        setAmountProduct: (productAmount: number) => void
    }) => {


    const [isEntregar, setIsEntregar] = useState(false);
    const [isMontar, setIsMontar] = useState(false);
    const [isSaldoNegativo, setIsSaldoNegativo] = useState(false);
    const [isRequisitar, setIsRequisitar] = useState(false);
    const [productAmount, setProductAmount] = useState(product.Quantidade);

    const [tablePrice, setTablePrice] = useState('');
    const [unityPrice, setUnityPrice] = useState('');
    const [percentDiscount, setPercentDiscount] = useState(0.0);
    const [valueDiscount, setValueDiscount] = useState('');


    useEffect(() => {
        setIsEntregar(product.IsEntregar)
        setIsMontar(product.IsMontar)
        setIsSaldoNegativo(product.IsSaldoNegativo)
        setIsRequisitar(product.IsRequisitar)

        setTablePrice(formatMoneyValue(product.PrecoTabela));
        setUnityPrice(formatMoneyValue(product.PrecoUnitario));
        setPercentDiscount(0.0);
        setValueDiscount(formatMoneyValue(product.TotalDesconto));
    }, [product])

    /** ALTERA A QUANTIDADE */
    function alterAmount(isIncrement: boolean) {
        const newAmount = isIncrement ? productAmount + 1 : productAmount - 1
        handleUpdateProductAmount(product.Id, { Quantidade: newAmount }).then((res) => {
            if (res.IsOk) {
                setProductAmount(newAmount)
                setAmountProduct(newAmount)
            }
        })
    }


    /**
     * @param inputValue valor escrito no input
     * @param inputField 1= preço tabela || 2= || 3= || 4=
     */
    function applyMaskAndDisplay(inputValue: string, inputField: number) {
        handleMaskAction(inputValue, inputField, true)
    }
    function removeMaskAndSaveData(inputValue: string, inputField: number) {
        handleMaskAction(inputValue, inputField, false)
    }

    /**
     * 
     * @param inputValue valor passado ao digitar um campo
     * @param inputField o campo em si
     * @param isApply se é para aplicar ou nao mascara
     */
    // Função para manipular ações de máscara
    function handleMaskAction(inputValue: string, inputField: number, isApply: boolean) {
        // Recebe o valor do handle de máscara
        const tratedValue = isApply ? moneyApplyMask(moneyRemoveMask(inputValue)) : moneyRemoveMask(inputValue);
        if (isApply) {
            switch (inputField) {
                case 1:
                    {
                        setTablePrice(tratedValue as string);
                    }
                    break;
                case 2:
                    setUnityPrice(tratedValue as string);
                    break;
                case 3:
                    setValueDiscount(tratedValue as string);
                    break;
            }
        } else {
            switch (inputField) {
                case 1:
                    saveTablePrice(tratedValue as number, product.Id);
                    break;
                case 2:
                    saveUnityPrice(tratedValue as number, product.Id);
                    break;
                case 3:
                    saveDiscountValue(tratedValue as number, product.Id);
                    break;
            }
        }
    }


    /** FUNCAO PARA ALTERAR OS VALORES EM SWITCH */
    function handleSwitchChange(value: boolean, currentSwitch: number): void {
        switch (currentSwitch) {
            case 1:
                setIsEntregar(value)
                handleUpdateProductSwtichs(product.Id, { IsEntregar: value });
                break
            case 2:
                setIsRequisitar(value)
                handleUpdateProductSwtichs(product.Id, { IsRequisitar: value });
                break
            case 3:
                setIsSaldoNegativo(value)
                handleUpdateProductSwtichs(product.Id, { IsSaldoNegativo: value });
                break
            case 4:
                setIsMontar(value)
                handleUpdateProductSwtichs(product.Id, { IsMontar: value, });
                break
        }
    }






    return (
        <View style={{ backgroundColor: "#fffafa" }}>
            {/** QUANTIDADE */}
            <View style={{ marginLeft: 32 }}>
                <Text style={common003_01_styles.extraBottomStyleTitles}>Quantidade</Text>
                <CustomSeparator />
                <View style={common003_01_styles.extraBottomStyleAmount}>
                    <Ionicons name={'add-circle-outline'} size={36} onPress={() => alterAmount(true)} />
                    <Text style={common003_01_styles.extraBottomStyleChilds}>{productAmount}</Text>
                    <Ionicons name={'remove-circle-outline'} size={36} onPress={() => alterAmount(false)} />
                </View>
            </View>


            {/** UPDATE DE VALORES E DESCONTOS */}
            <View style={common003_01_styles.extraBottomStyleInputs}>
                <Text style={common003_01_styles.extraBottomStyleTitles}>Preço</Text>

                <CustomSeparator />

                {/** LINHA DE PREÇO */}
                <View style={[common003_01_styles.extraBottomPriceStyle, { flexDirection: 'row', justifyContent: 'space-between', marginRight: 16 }]}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Tabela</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]}
                                onChangeText={(value) => applyMaskAndDisplay(value, 1)}
                                value={tablePrice}
                                keyboardType='decimal-pad'
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => {
                                removeMaskAndSaveData(tablePrice, 1)
                            }} />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Unitário</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]}
                                onChangeText={(value) => applyMaskAndDisplay(value, 2)}
                                value={unityPrice}
                                keyboardType='decimal-pad'
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => removeMaskAndSaveData(unityPrice, 2)} />
                        </View>
                    </View>
                </View>


                {/** LINHA DE DESCONTO */}
                <Text style={common003_01_styles.extraBottomStyleTitles}>Desconto</Text>

                <CustomSeparator />

                <View style={[common003_01_styles.extraBottomPriceStyle, { flexDirection: 'row', justifyContent: 'space-between', marginRight: 16 }]}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>%</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]}
                                onChangeText={(value) => setPercentDiscount(Number(value))}
                                value={percentDiscount.toString()}
                                keyboardType='decimal-pad'
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveDiscountPercent(percentDiscount, product.Id)} />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Valor</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]}
                                onChangeText={(value) => applyMaskAndDisplay(value, 3)}
                                value={valueDiscount}
                                keyboardType='decimal-pad'
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => removeMaskAndSaveData(valueDiscount, 3)} />
                        </View>
                    </View>
                </View>

            </View>

            {/** SWITCHS */}
            <View style={common003_01_styles.extraBottomStyleSwitchs}>
                <View>
                    <CustomSwitch title="Entregar" switchValue={isEntregar} onValueChange={(value: boolean) => handleSwitchChange(value, 1)} />
                    <CustomSwitch title="Requisitar" switchValue={isRequisitar} onValueChange={(value: boolean) => handleSwitchChange(value, 2)} />
                </View>
                <View>
                    <CustomSwitch title="S. Negativo" switchValue={isSaldoNegativo} onValueChange={(value: boolean) => handleSwitchChange(value, 3)} />
                    <CustomSwitch title="Montar" switchValue={isMontar} onValueChange={(value: boolean) => handleSwitchChange(value, 4)} />
                </View>
            </View>

            {/** BOTOES */}
            <View style={[common003_01_styles.extraBottomStyleContainer, common003_01_styles.extraBottomStyleRow, common003_01_styles.extraBottomStyleJustify]}>
                <TouchableHighlight
                    onPress={downSwipe}
                    style={commonStyle.common_button_style}
                    underlayColor='white'
                ><Text style={commonStyle.common_text_button_style}>Cancelar</Text></TouchableHighlight>
            </View>
        </View>
    );
}

export default C_003_01_01_ProductPvListItemEdit;