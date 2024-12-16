import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import { commonStyle } from "../../../../CommonStyle";
import CustomIcon from "../../../../components/icon/CustomIcon";
import CustomSeparator from "../../../../components/lists/CustomSeparator";
import CustomSwitch from "../../../../components/switch/CustomSwitch";
import { DD080_Produtos } from '../../../../services/api/interfaces/prevenda/CS_IResPreVendaLista';
import { IReqUpdateProdutItens } from '../../../../services/api/interfaces/produto/CS_IReqUpdateProdutoItens';
import { ICON_NAME } from "../../../../util/IconsName";
import { handleListaPrecoTabela, handlePostPrecoTabelaNovoLista, handleUpdateProductAmount, handleUpdateProductSwtichs } from "../../../../view_controller/prevenda/PreVendaViewController";
import { common003_01_styles } from "./CommonStyles";
import { showToast, ToastType } from '../../../../util/ShowToast';
import CustomAlertDialog from '../../../../components/modal/CustomAlertDialog';
import { FlatList } from 'react-native-gesture-handler';
import { formatMoneyValue } from '../../../../util/FormatText';
import { useNavigation } from '@react-navigation/native';
import { FETCH_STATUS } from '../../../../util/FETCH_STATUS';
import React from 'react';


//lista de preço tabela
interface TablePrice {
    price: number,
    num: number
}
/** componente de edição dos valores do produto */
const C_003_01_01_ProductPvListItemEdit = ({ product, saveTablePrice, saveUnityPrice, saveDiscountPercent, saveDiscountValue, downSwipe, fcnSetAmountProduct, refreshScreen }:
    {
        product: DD080_Produtos,
        saveTablePrice: (tablePrice: number, productId: string) => void
        saveUnityPrice: (unityPrice: number, productId: string) => void
        saveDiscountPercent: (discountPercent: number, productId: string) => void
        saveDiscountValue: (valueDiscount: number, productId: string) => void
        downSwipe: () => void
        fcnSetAmountProduct: (productAmount: number) => void,
        refreshScreen: () => void
    }) => {

    const [isEntregar, setIsEntregar] = useState(false);
    const [isClienteRetira, setIsClienteRetira] = useState(false);
    const [isMontar, setIsMontar] = useState(false);
    const [isSaldoNegativo, setIsSaldoNegativo] = useState(false);
    const [isRequisitar, setIsRequisitar] = useState(false);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    //se tiver conversão, usa a quantidade secundaria
    const [productAmount, setProductAmount] = useState(product.csicp_dd080.DD080_Un_Sec_TipoConv_ID === 0 ? product.csicp_dd080.DD080_Quantidade : product.csicp_dd080.DD080_Un_Sec_Qtde);
    const [tablePrice, setTablePrice] = useState(0);
    const [unityPrice, setUnityPrice] = useState(0);
    const [percentDiscount2, setPercentDiscount2] = useState(0);
    const [valueDiscount, setValueDiscount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const [showLoadingupdateDataFromSwitch, setUpdateDataFromSwitchs] = useState(false)

    const [showPopup, setShowPopUp] = useState(false)
    const [loadingBtnPopup, setLoadingBtnPopup] = useState(false)


    const [tablePriceList, setTablePriceList] = useState<TablePrice[]>()

    //editar a quantidade
    const [showEditAmount, setShowEditAmount] = useState(false);


    useEffect(() => {
        setIsClienteRetira(product.csicp_dd110_mod.Label === "Cliente Retira")
        setIsEntregar(product.csicp_dd080.DD080_Entregar)
        setIsMontar(product.csicp_dd080.DD080_IsMontar)
        setIsSaldoNegativo(product.csicp_dd080.DD080_Solicita_NS_Negativa)
        setIsRequisitar(product.csicp_dd080.DD080_Gera_Requisicao)
        setTablePrice(product.csicp_dd080.DD080_Preco_Tabela || 0);
        setUnityPrice(product.csicp_dd080.DD080_Preco_Unitario || 0);
        setValueDiscount(product.csicp_dd080.DD080_Valor_DescProduto || 0);
        setTotalDiscount(product.csicp_dd080.DD080_Total_Desconto || 0);
        var percentDiscount = 100 * (product.csicp_dd080.DD080_Valor_DescProduto / (product.csicp_dd080.DD080_Preco_Tabela * product.csicp_dd080.DD080_Quantidade))
        setPercentDiscount2(percentDiscount);
    }, [])

    /** ALTERA A QUANTIDADE */
    async function alterAmount(isIncrement: boolean) {
        setStatus(FETCH_STATUS.LOADING)
        const newAmount = isIncrement ? productAmount + 1 : productAmount - 1
        try {
            const res = await handleUpdateProductAmount(product.csicp_dd080.DD080_Id, { Quantidade: newAmount })
            if (res.IsOk) {
                setProductAmount(newAmount)
                fcnSetAmountProduct(newAmount)
            }
        } catch (error) {
            showToast(ToastType.ERROR, "ERRO", "Falha ao atualizar quantidade")
        } finally {
            setStatus(FETCH_STATUS.IDLE)
        }
    }

    async function alterAmountQtd(qtd: number) {
        setStatus(FETCH_STATUS.LOADING)
        try {
            const res = await handleUpdateProductAmount(product.csicp_dd080.DD080_Id, { Quantidade: qtd })
            if (res.IsOk) {
                setProductAmount(qtd)
                fcnSetAmountProduct(qtd)
            }
        } catch (error) {
            showToast(ToastType.ERROR, "ERRO", "Falha ao atualizar quantidade")
        } finally {
            setShowEditAmount(false)
            setStatus(FETCH_STATUS.IDLE)
        }
    }

    /** FUNCAO PARA ALTERAR OS VALORES EM SWITCH */
    function handleSwitchChange(value: boolean, currentSwitch: number): void {
        switch (currentSwitch) {
            case 1:
                setIsEntregar(value)
                if (value) {
                    setIsClienteRetira(false)
                }
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
            case 5:
                setIsClienteRetira(value)
                if (value) {
                    setIsEntregar(false)
                }
                break
        }
    }

    //funcao que lista preço tabela para mudar via popup
    async function scGetListPrecoTabela() {
        setLoadingBtnPopup(true)
        try {
            const result = await handleListaPrecoTabela({ cs_pdt_kdx: product.csicp_gg520.GG520_Kardex_ID })

            let _listTablePrice: TablePrice[] = []
            for (let i = 1; i <= 9; i++) {
                //@ts-ignore
                const _listItem = createItemToListOfTablePrice(result[`PrecoVenda${i}`], i);
                _listTablePrice.push(_listItem)
            }

            setTablePriceList(_listTablePrice)
            setLoadingBtnPopup(false)
            setShowPopUp(true)
        } catch (error: any) {
            setLoadingBtnPopup(false)
            showToast(ToastType.ERROR, "Falha ao recuperar lista", error)
        }
    }

    //funcao que cria UM ITEM para popular a lista de preco tabela
    function createItemToListOfTablePrice(price: number, num: number): TablePrice {
        let _tablePriceItem: TablePrice = {
            price: price,
            num: num
        }
        return _tablePriceItem
    }



    return (
        <View style={{ backgroundColor: "#fffafa" }}>
            {/** QUANTIDADE */}
            <View style={{ marginLeft: 32 }}>
                <Text style={common003_01_styles.extraBottomStyleTitles}>Quantidade</Text>
                <CustomSeparator />
                <View style={common003_01_styles.extraBottomStyleAmount}>
                    {status === FETCH_STATUS.LOADING && (
                        <ActivityIndicator color={"#000"} />
                    )}
                    {status !== FETCH_STATUS.LOADING && (
                        <>
                            {showEditAmount ?
                                <>
                                    <TextInput
                                        onChangeText={(val) => setProductAmount(Number(val))}
                                        style={styles.input}
                                        keyboardType="numeric"
                                        placeholder="Digite a quantidade"
                                        defaultValue={String(productAmount)}
                                    />
                                    <TouchableOpacity style={styles.okButton} onPress={() => alterAmountQtd(productAmount)}>
                                        <Text style={styles.okButtonText}>OK</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <Ionicons name={'remove-circle-outline'} size={36} onPress={() => alterAmount(false)} />
                                    <TouchableOpacity onPress={() => setShowEditAmount(true)}>
                                        <Text style={[common003_01_styles.extraBottomStyleChilds, { textDecorationLine: 'underline' }]}>{productAmount}</Text>
                                    </TouchableOpacity>
                                    <Ionicons name={'add-circle-outline'} size={36} onPress={() => alterAmount(true)} />
                                </>

                            }
                        </>
                    )}

                </View>
            </View>


            {/** UPDATE DE VALORES E DESCONTOS */}
            <View style={common003_01_styles.extraBottomStyleInputs}>
                <Text style={common003_01_styles.extraBottomStyleTitles}>Preço</Text>

                <CustomSeparator />

                {/** LINHA DE PREÇO */}
                <View style={[common003_01_styles.extraBottomPriceStyle, { flexDirection: 'row', justifyContent: 'space-between', marginRight: 16 }]}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <View style={commonStyle.common_rowItem}>
                            <Text style={common003_01_styles.extraBottomStyleChilds}>Tabela</Text>
                            {loadingBtnPopup && !showPopup && (
                                <ActivityIndicator color={"#000"} />
                            )}

                            {!loadingBtnPopup && !showPopup && (
                                <CustomIcon icon={ICON_NAME.LISTA_CONTORNADO} onPress={() => {
                                    scGetListPrecoTabela()
                                }} />
                            )}

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CurrencyInput
                                value={tablePrice}
                                onChangeValue={(number) => setTablePrice(number || 0)}
                                renderTextInput={textInputProps => <TextInput style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]} {...textInputProps} />}
                                prefix="R$ "
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


                                prefix="R$ "
                                delimiter="."
                                separator=","
                                precision={2}
                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveUnityPrice(unityPrice, product.csicp_dd080.DD080_Id)} />
                        </View>
                    </View>
                </View>

                {/* POPUP PREÇO TABELA */}
                {!loadingBtnPopup && showPopup && (
                    <CustomAlertDialog
                        isVisible={showPopup}
                        onDismiss={() => {
                            setShowPopUp(false)
                        }}
                        children={<AlertDialogNovoPrecoTabela cs_atendimento_prod_id={product.csicp_dd080.DD080_Id} listTablePrice={tablePriceList || []} refreshScreen={() => {
                            setShowPopUp(false)
                            refreshScreen()
                        }} />}
                    />
                )}


                {/* FIM POPUP PREÇO TABELA */}


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
                                renderTextInput={textInputProps => <TextInput
                                    style={[
                                        commonStyle.common_input,
                                        { height: 40, flex: 1, padding: 10 }
                                    ]}
                                    {...textInputProps}
                                />}
                                prefix=""
                                delimiter="."
                                separator="."
                                precision={2}
                                maxValue={99.99}
                            />

                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveDiscountPercent(Number(percentDiscount2), product.csicp_dd080.DD080_Id)} />
                        </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={common003_01_styles.extraBottomStyleChilds}>Valor Unitário</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CurrencyInput
                                value={valueDiscount}
                                onChangeValue={(number) => setValueDiscount(number || 0)}
                                renderTextInput={textInputProps => <TextInput style={[
                                    commonStyle.common_input,
                                    { height: 40, flex: 1, padding: 10 }
                                ]} {...textInputProps} />}
                                prefix="R$ "
                                delimiter="."
                                separator=","
                                precision={2}

                            />
                            <CustomIcon icon={ICON_NAME.CHECK} onPress={() => saveDiscountValue(valueDiscount, product.csicp_dd080.DD080_Id)} />
                        </View>
                    </View>
                </View>
                <Text style={{ marginLeft: 8, fontWeight: 600 }}>Total Desconto: {formatMoneyValue(totalDiscount)}</Text>

            </View>

            {/** SWITCHS */}
            <View>
                <View style={[commonStyle.common_rowItem, { justifyContent: 'space-evenly' }]}>
                    <CustomSwitch title="Entregar" switchValue={isEntregar} onValueChange={(value: boolean) => handleSwitchChange(value, 1)} />
                    <CustomSwitch title="Cliente Retira" switchValue={isClienteRetira} onValueChange={(value: boolean) => handleSwitchChange(value, 5)} />
                </View>
                <View style={[commonStyle.common_rowItem, { justifyContent: 'space-evenly' }]}>
                    <CustomSwitch title="Requisitar" switchValue={isRequisitar} onValueChange={(value: boolean) => handleSwitchChange(value, 2)} />
                    <CustomSwitch title="Montar" switchValue={isMontar} onValueChange={(value: boolean) => handleSwitchChange(value, 4)} />
                </View>
                <View style={[commonStyle.common_rowItem, { justifyContent: 'space-around' }]}>
                    <CustomSwitch title="S. Negativo" switchValue={isSaldoNegativo} onValueChange={(value: boolean) => handleSwitchChange(value, 3)} />
                    {showLoadingupdateDataFromSwitch ? <ActivityIndicator /> : <CustomIcon icon={ICON_NAME.CHECK} onPress={async () => {
                        setUpdateDataFromSwitchs(true)
                        const updateData: IReqUpdateProdutItens = {
                            IsEntregar: isEntregar,
                            IsMontar: isMontar,
                            IsRequisitar: isRequisitar,
                            IsSaldoNegativo: isSaldoNegativo,
                            IsClienteRetira: isClienteRetira
                        }
                        const res = await handleUpdateProductSwtichs(product.csicp_dd080.DD080_Id, updateData)
                        if (res.IsOk) {
                            showToast(ToastType.SUCCESS, "Sucesso", "Item atualizado!")
                            refreshScreen()
                        } else {
                            showToast(ToastType.SUCCESS, "Erro", "Falha ao atualizar item!")
                        }
                        setUpdateDataFromSwitchs(false)
                    }} />}
                </View>
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


const AlertDialogNovoPrecoTabela = ({ cs_atendimento_prod_id, listTablePrice, refreshScreen }: { cs_atendimento_prod_id: string, listTablePrice: TablePrice[], refreshScreen: () => void }) => {
    const [isLoading, setIsLoading] = useState(false)


    async function scPostPrecoTabelaItem(precoSelecionado: TablePrice) {
        setIsLoading(true)
        const response = await handlePostPrecoTabelaNovoLista({
            cs_atendimento_prod_id: cs_atendimento_prod_id,
            cs_num_preco: precoSelecionado.num,
            cs_valor: precoSelecionado.price
        })

        //se falhar
        if (!response.IsOk) {

            //@ts-ignore
            showToast(ToastType.ERROR, "Falha", response.Msg)
            setIsLoading(false)
            return
        } else {
            setIsLoading(false)
            refreshScreen()
        }
    }


    if (isLoading) {
        return <ActivityIndicator color={"#000"} />
    }
    return (
        <View style={commonStyle.modal_common_container}>
            {listTablePrice.length === 0 && (
                <Text style={commonStyle.btn_text_gray}>Nenhum dado na lista!</Text>
            )}

            <Text style={commonStyle.btn_text_gray}>Selecione preço tabela</Text>
            {listTablePrice.length > 0 && (
                <FlatList
                    data={listTablePrice}
                    keyExtractor={(item) => item.num.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => scPostPrecoTabelaItem(item)}>
                            <View style={[commonStyle.align_centralizar, commonStyle.common_padding_08]}>
                                <Text style={commonStyle.common_text_button_style}>{item.num} - {formatMoneyValue(item.price)}</Text>
                            </View>
                            <CustomSeparator />
                        </TouchableOpacity>}
                />
            )}


            <View style={[commonStyle.common_columnItem, commonStyle.justify_content_space_evl]}>
                <TouchableOpacity style={commonStyle.btn_gray} onPress={refreshScreen}>
                    <Text style={commonStyle.btn_text_gray}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 16,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: 100,
        textAlign: 'center',
    },
    okButton: {
        marginLeft: 16,
        backgroundColor: '#2E2E2E',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    okButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default C_003_01_01_ProductPvListItemEdit;