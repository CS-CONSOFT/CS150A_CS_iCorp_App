import { SafeAreaView, View, FlatList, Text, Alert, Pressable, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState } from "react";
//Rota

//Componentes
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomIcon from "../../components/icon/CustomIcon";
 
//Estilo
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";
import { stylesPreVenda } from "../003prevenda/PreVendaStyles";
import { stylesConsultaProduto } from "../004produtos/ConsultaProdutoStyles";
//Icons
import { ICON_NAME } from "../../util/IconsName";
//DataFake
import { DataListaComanda, Comanda } from "./ListaComanda";
//Navegação
import { useNavigation } from "@react-navigation/native";
import { ButtonActionSecondary } from "../../components/button/CustonButtonActionSecondary";
//Interface



const CS_SC_008_ListaComandas = () => {

    const navigation = useNavigation();
    const isLoading: boolean = false;

    return <SafeAreaView style={{ backgroundColor: "#fff", height: "100%", paddingVertical: 10 }}>
        
        {isLoading
            ? 
            <ActivityIndicator style={[commonStyle.align_centralizar, {height: "100%"}]} size="large" color={ColorStyle.colorPrimary200}/>
            :
            <>
            
            
                <FlatList
                    data={DataListaComanda}
                    ListEmptyComponent={<CustomEmpty text={"Nenhuma comanda encontrada"} />}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <ComandaItem 
                            item={item}
                            onPress={() => Alert.alert("Em construção")}
                        />
                    }
                    
                />
                
            </>
            
        }
    </SafeAreaView>
}

export default CS_SC_008_ListaComandas;


// Componente de exibição da imagem do produto
function ComandaItem({item, onPress}: { item: Comanda, onPress: () => void }) {
    //const [year, month, day] = item.Data_Emissao.split('-')
    return (
        <Pressable onPress={onPress} style={[stylesPreVenda.containerRenderItem]}>
  

                <View style={stylesPreVenda.containerRenderItemLeft}>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{"05"}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{"Jun"}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{"2024"}</Text>
                </View>


                <View style={[stylesPreVenda.containerRenderItemRight, commonStyle.common_rowItem]}>
                    <View style={[{width: "85%"}, commonStyle.align_start_spaceAround_collumn]}>

                        <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.protocolo}</Text>
                        <Text style={stylesPreVenda.containerRenderItemRightPriceText}>{item.total}</Text>
                        <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>
                            {
                                item.status
                                ?
                                "Aberto"
                                :
                                "Fechado"
                            }
                        </Text>
                    </View>
                    <Pressable onPress={onPress} style={[stylesConsultaProduto.rightIcons]}>
                    
                        <CustomIcon icon={ICON_NAME.ENVIAR} />
                    </Pressable>    
                </View>
                
                
        </Pressable>
            
        
    )
}


