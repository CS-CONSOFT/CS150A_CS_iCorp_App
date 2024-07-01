import { View, Text } from "react-native";
import { ButtonActionSecondary } from "../button/CustonButtonActionSecondary";
import { commonStyle } from "../../CommonStyle";
import { stylesNotaSerie } from "../../screens/nota/serie/StylesNotaSerie";


export interface SerieProduct {
    id?: number,
    descricao?: string,
    cor?: string,
}


const SerieItem = ({id, descricao, cor}: SerieProduct) => {


    return(

        <View style={[commonStyle.common_margin_horizontal, commonStyle.card_white_shadow]}>
                <Text style={stylesNotaSerie.titleNota}>{descricao}</Text>
                <Text style={stylesNotaSerie.text}>Cor Série {cor}</Text>
                <ButtonActionSecondary label={"Alterar cor série"} onPress={() => ""}/>
        </View>
    );
    
};

export default SerieItem;