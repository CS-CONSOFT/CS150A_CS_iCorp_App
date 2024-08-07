import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../../../CommonStyle";
import CustomIcon from "../../../../components/icon/CustomIcon";
import CustomSeparator from "../../../../components/lists/CustomSeparator";
import CustomSwitch from "../../../../components/switch/CustomSwitch";
import { DD080_Produtos } from '../../../../services/api/interfaces/prevenda/CS_IResPreVendaLista';
import { FETCH_STATUS } from '../../../../util/FETCH_STATUS';
import { ICON_NAME } from "../../../../util/IconsName";
import { formatPercentInput, moneyApplyMask, moneyRemoveMask } from "../../../../util/Masks";
import { handleUpdateProductAmount, handleUpdateProductSwtichs } from "../../../../view_controller/prevenda/PreVendaViewController";
import { common003_01_styles } from "./CommonStyles";
import { formatMoneyValue } from '../../../../util/FormatText';
import { IReqUpdateProdutItens } from '../../../../services/api/interfaces/produto/CS_IReqUpdateProdutoItens';
import CurrencyInput from 'react-native-currency-input';

/** componente de edição dos valores do produto */
const C_003_01_01_ProductPvListItemEdit = ({ product, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue, downSwipe, setAmountProduct }:
    {
        product: DD080_Produtos,
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
    const [productAmount, setProductAmount] = useState(product.csicp_dd080.DD080_Quantidade);

    const [tablePrice, setTablePrice] = useState(0);
    const [unityPrice, setUnityPrice] = useState(0);
    const [percentDiscount2, setPercentDiscount2] = useState(0);
    const [valueDiscount, setValueDiscount] = useState(0);

    const [updateDataFromSwitch, setUpdateDataFromSwitchs] = useState(false)


    useEffect(() => {
        setIsEntregar(product.csicp_dd080.DD080_Entregar)
        setIsMontar(product.csicp_dd080.DD080_IsMontar)
        setIsSaldoNegativo(product.csicp_dd080.DD080_Solicita_NS_Negativa)
        setIsRequisitar(product.csicp_dd080.DD080_Gera_Requisicao)
        setTablePrice(product.csicp_dd080.DD080_Preco_Tabela || 0);
        setUnityPrice(product.csicp_dd080.DD080_Preco_Unitario || 0);
        setValueDiscount(product.csicp_dd080.DD080_Total_Desconto || 0);
    }, [])

    /** ALTERA A QUANTIDADE */
    function alterAmount(isIncrement: boolean) {
        const newAmount = isIncrement ? productAmount + 1 : productAmount - 1
        handleUpdateProductAmount(product.csicp_dd080.DD080_Id, { Quantidade: newAmount }).then((res) => {
            if (res.IsOk) {
                setProductAmount(newAmount)
                setAmountProduct(newAmount)
            }
        })
    }

    /** FUNCAO PARA ALTERAR OS VALORES EM SWITCH */
    function handleSwitchChange(value: boolean, currentSwitch: number): void {
        /** a chamada da api foi comentada para refatoração, primeiro iremos montar toda a estrutura e entao enviar para a api */
        switch (currentSwitch) {
            case 1:
                setIsEntregar(value)
                break
            case 2:
                setIsRequisitar(value)
                break
            case 3:
                setIsSaldoNegativo(value)
                break
            case 4:
                setIsMontar(value)
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
                    <Ionicons name={'remove-circle-outline'} size={36} onPress={() => alterAmount(false)} />
                    <Text style={common003_01_styles.extraBottomStyleChilds}>{productAmount}</Text>
                    <Ionicons name={'add-circle-outline'} size={36} onPress={() => alterAmount(true)} />
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
                            <CurrencyInput
                                value={tablePrice}
                                onChangeValue={(number) => setTablePrice(number || 0)}
                                renderTextInput={textInputProps => <TextInput style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]} {...textInputProps} />}
                                prefix="R$"
                                delimiter="."
                                separator=","
                                precision={2}
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => {
                                saveTablePrice(tablePrice, product.csicp_dd080.DD080_Id)
                            }} />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Unitário</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CurrencyInput
                                value={unityPrice}
                                onChangeValue={(number) => setUnityPrice(number || 0)}

                                renderTextInput={textInputProps =>
                                    <TextInput style={[
                                        commonStyle.common_input,
                                        { height: 40, flex: 1, padding: 10 }
                                    ]} {...textInputProps} />}


                                prefix="R$"
                                delimiter="."
                                separator=","
                                precision={2}
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveUnityPrice(unityPrice, product.csicp_dd080.DD080_Id)} />
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
                            <CurrencyInput
                                value={percentDiscount2}
                                onChangeValue={(number) => {
                                    setPercentDiscount2(number || 0)
                                }}
                                renderTextInput={textInputProps => <TextInput style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]} {...textInputProps} />}
                                prefix=""
                                delimiter="."
                                separator="."
                                precision={2}
                                maxValue={0.99}
                            />

                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveDiscountPercent(Number(percentDiscount2) * 100, product.csicp_dd080.DD080_Id)} />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Valor Desconto</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CurrencyInput
                                value={valueDiscount}
                                onChangeValue={(number) => setValueDiscount(number || 0)}
                                renderTextInput={textInputProps => <TextInput style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]} {...textInputProps} />}
                                prefix="R$"
                                delimiter="."
                                separator=","
                                precision={2}

                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveDiscountValue(valueDiscount, product.csicp_dd080.DD080_Id)} />
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

                {updateDataFromSwitch ? <ActivityIndicator /> : <CustomIcon icon={ICON_NAME.CHECK} onPress={() => {
                    setUpdateDataFromSwitchs(true)
                    const updateData: IReqUpdateProdutItens = {
                        IsEntregar: isEntregar,
                        IsMontar: isMontar,
                        IsRequisitar: isRequisitar,
                        IsSaldoNegativo: isSaldoNegativo
                    }
                    handleUpdateProductSwtichs(product.csicp_dd080.DD080_Id, updateData).then(() => {
                        setUpdateDataFromSwitchs(false)
                    })
                }} />}


            </View>

            {/** BOTOES */}
            <View style={[common003_01_styles.extraBottomStyleContainer, common003_01_styles.extraBottomStyleRow, common003_01_styles.extraBottomStyleJustify]}>
                <TouchableHighlight
                    onPress={downSwipe}
                    style={commonStyle.btn_transparente}
                    underlayColor='white'
                ><Text style={commonStyle.btn_text_transparente}>Sair</Text></TouchableHighlight>
            </View>
        </View>
    );
}

export default C_003_01_01_ProductPvListItemEdit;