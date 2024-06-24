import { useState } from "react";
import {View, Text } from "react-native";
import { handleUpdateProductAmount } from "../../../view_controller/prevenda/PreVendaViewController";

import { common003_01_styles } from "../../003prevenda/003_01_produto/components/CommonStyles";
import CustomSeparator from "../../../components/lists/CustomSeparator";
import Ionicons from '@expo/vector-icons/Ionicons';
import { IResProductItemModel } from "../../../services/api/interfaces/prevenda/CS_IResProdutosPreVenda";



export const CardQuantidade = ({product}: {product: IResProductItemModel}) => {
    const [productAmount, setProductAmount] = useState(product.Quantidade);

    /** ALTERA A QUANTIDADE */
    function alterAmount(isIncrement: boolean) {
        const newAmount = isIncrement ? productAmount + 1 : productAmount - 1
        handleUpdateProductAmount(product.Id, { Quantidade: newAmount }).then((res) => {
            if (res.IsOk) {
                setProductAmount(newAmount)
                //setAmountProduct(newAmount)
            }
        })
    }

    return <View style={{ marginLeft: 32 }}>
        <Text style={common003_01_styles.extraBottomStyleTitles}>Quantidade</Text>
        <CustomSeparator/>
        <View style={common003_01_styles.extraBottomStyleAmount}>
            <Ionicons name={'add-circle-outline'} size={36} onPress={() => alterAmount(true)} />
            <Text style={common003_01_styles.extraBottomStyleChilds}>{productAmount}</Text>
            <Ionicons name={'remove-circle-outline'} size={36} onPress={() => alterAmount(false)} />
        </View>
    </View>
   
}