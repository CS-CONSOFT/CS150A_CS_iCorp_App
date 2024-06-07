import { View, Text, Animated } from "react-native";
import CustomSeparator from "../../../../components/lists/CustomSeparator";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomInput from "../../../../components/input/CustomInput";
import CustomIcon from "../../../../components/icon/CustomIcon";
import CustomSwitch from "../../../../components/switch/CustomSwitch";
import CustomButton from "../../../../components/button/CustomButton";
import { useEffect, useState } from "react";
import { IProductItemModel } from "../../../../services/api/interfaces/prevenda/IPreVenda";
import { moneyApplyMask, moneyRemoveMask } from "../../../../util/Masks";
import { common003_01_styles } from "./CommonStyles";
import { handleUpdateProductAmount, handleUpdateProductSwtichs } from "../../../../view_controller/prevenda/PreVendaViewController";
import { ICON_NAME } from "../../../../util/IconsName";

const C_003_01_01_ProductPvListItemEdit = ({ product, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue, downSwipe, setAmountProduct }:
    {
        product: IProductItemModel,
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

        setTablePrice(moneyApplyMask(product.PrecoTabela.toString()));
        setUnityPrice(moneyApplyMask(product.PrecoUnitario.toString()));
        setPercentDiscount(0.0);
        setValueDiscount(moneyApplyMask(product.TotalDesconto.toString()));
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
    function handleMaskAction(inputValue: string, inputField: number, isApply: boolean) {
        /** RECEBE O VALOR DO HANDLE DE MASCARA */
        const tratedValue = isApply ? moneyApplyMask(inputValue) : moneyRemoveMask(inputValue);
        /** se for para aplicar mascara (isApply), o switch verifica qual foi o campo para salvar
         * e envia o valor tratado. A logica funciona da mesma forma para exibir o dado em tela.
         */
        if (isApply) {
            switch (inputField) {
                case 1:
                    /** seta o valor para mostrar em tela */
                    setTablePrice(tratedValue as string);
                    break;
                case 2:
                    setUnityPrice(tratedValue as string)
                    break
                case 3:
                    setValueDiscount(tratedValue as string)
                    break
            }
        } else {
            switch (inputField) {
                case 1:
                    /** pega o valor sem mascara para salvar */
                    saveTablePrice(tratedValue as number, product.Id)
                    break
                case 2:
                    saveUnityPrice(tratedValue as number, product.Id)
                    break
                case 3:
                    saveDiscountValue(tratedValue as number, product.Id)
                    break

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
                <View style={common003_01_styles.extraBottomPriceStyle}>
                    <View>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Tabela</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomInput>
                                <CustomInput.InputAreaHandle
                                    value={tablePrice}
                                    setValue={(text) => applyMaskAndDisplay(text, 1)} width={125} keyboardType='decimal-pad' />
                            </CustomInput>
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => {
                                removeMaskAndSaveData(tablePrice, 1)
                            }} />
                        </View>
                    </View>

                    <View style={{ marginRight: 16 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Unitário</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomInput>
                                <CustomInput.InputAreaHandle
                                    value={unityPrice}
                                    setValue={(text) => applyMaskAndDisplay(text, 2)} width={125} keyboardType='decimal-pad' />
                            </CustomInput>
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => removeMaskAndSaveData(unityPrice, 2)} />
                        </View>

                    </View>
                </View>

                {/** LINHA DE DESCONTO */}
                <Text style={common003_01_styles.extraBottomStyleTitles}>Desconto</Text>

                <CustomSeparator />

                <View style={common003_01_styles.extraBottomPriceStyle}>
                    <View>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>%</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <CustomInput>
                                <CustomInput.InputAreaHandle value={percentDiscount} setValue={setPercentDiscount} width={125} keyboardType='decimal-pad' />
                            </CustomInput>
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveDiscountPercent(percentDiscount, product.Id)} />
                        </View>

                    </View>

                    <View style={{ marginRight: 16 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Valor</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomInput>
                                <CustomInput.InputAreaHandle value={valueDiscount}
                                    setValue={(text) => applyMaskAndDisplay(text, 3)} width={125} keyboardType='decimal-pad' />
                            </CustomInput>
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
                <CustomButton title="Cancelar" onPress={(done) => {
                    downSwipe()
                    done()
                }} buttonStyle={common003_01_styles.extraBottomStyleBtnCancelar} textStyle={common003_01_styles.extraBottomStyleTextButtonCancel} />
            </View>
        </View>
    );
}

export default C_003_01_01_ProductPvListItemEdit;