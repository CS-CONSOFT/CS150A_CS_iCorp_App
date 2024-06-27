import { SafeAreaView, View, FlatList, Text, Alert, Pressable, Image } from "react-native";
import { useState } from "react";
//Rota

//Componentes
import { ButtonLink } from "../../components/button/CustomButtonLink";
import CustomProduct from "../../components/product/CustomProduct";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomIcon from "../../components/icon/CustomIcon";
import { CustomBottomContanier } from "../../components/bottomItem/CustomBottomContanier";
import { ButtonActionSecondary } from "../../components/button/CustonButtonActionSecondary";
import { ButtonActionTransparent } from "../../components/button/CustomButtonAcyionTransparent";
//Estilo
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";
import { stylesConsultaProduto } from "../004produtos/ConsultaProdutoStyles";
//Icons
import { ICON_NAME } from "../../util/IconsName";
//DataFake
import { DataListaComando, Produto } from "../../util/ListaComandoDataFake";
//Navegação
import { useNavigation } from "@react-navigation/native";
//Interface
import { ContainerQuantidade } from "../../components/Quantidade/containerQuantidade";
import BottomContanier from "../../components/BottomContanier/bottomContanier";


                                    
const CS_SC_008_NovaComanda = () => {
    const id = 1;

    const navigation = useNavigation();

    const [products, setProducts] = useState<Produto[]>(DataListaComando)
    const [somaComanda, setSomaComanda] = useState<number>(0);
    const [btnQuantidade, setBtnQuantidade] = useState<boolean>(false);

    const SomaTotal = () => {
        let totalLiquido: number = 0;
        products.forEach((product: any) => {
          totalLiquido += product.total;
        });
        setSomaComanda(totalLiquido);
    };



    return <SafeAreaView style={{ backgroundColor: "#fff", height:"100%"}}>
        <View style={[commonStyle.common_columnItem, commonStyle.align_centralizar, commonStyle.common_margin_horizontal, { borderBottomColor: ColorStyle.colorPrimary200, borderBottomWidth: 2, padding: 10 }]}>
            {
                id 
                ?
                    <>
                        <Text style={commonStyle.title_accordion}>{"CS-Consoft (DFIX)"}</Text>
                        <Text>{"Nª 20240000000020"}</Text>
                        <Text>{"20/06/24"}</Text>
                    </>
                :
                    <Text>Nota</Text>
            }
        </View>
        <View style={[commonStyle.common_rowItem, commonStyle.align_spacebetween_row, commonStyle.common_margin_horizontal]}>
            <Text style={[commonStyle.title_accordion, commonStyle.font_size_18]}>Produtos</Text>
            <ButtonLink 
                onPress={
                    () => navigation.navigate("Consulta_Produtos", { cameFromPv: false })
                } 
                label={"Adicionar"} 
            />
        </View>
        <FlatList
            data={DataListaComando}
            ListEmptyComponent={<CustomEmpty text={"Nenhum produto encontrada"} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <BottomContanier
                    children={
                        <ProductItem
                            product={item}
                        />
                    }
                    image={<ImageProductItem />}
                    rightItem={
                        <RightItem
                            click={
                                () => Alert.alert('Em construção')
                            }
                        />
                    }
                    bottomItem={
                        <BottomQuatidade/>
                    }
                />
            }
                
        />
        <CustomBottomContanier
            total={somaComanda}
            show={true}
            text={"Salvar"}
            onPress={() => ""}
        />
    

    </SafeAreaView>
}

export default CS_SC_008_NovaComanda;


// Componente de exibição da imagem do produto
const ImageProductItem = () => {
    return (
        <Image style={commonStyle.productImage}
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnT98rwKfnZngX2pDhX4EkbW-y0pUOCz9iCg&s' }} />
    );
}

// Componente de exibição das informações do produto
const ProductItem = ({ product }: { product: Produto }) => {
    return (
        <View style={commonStyle.justify_content_space_btw}>
            <Text style={stylesConsultaProduto.productCode}>{`Nº ${product.numero}`}</Text>
            <Text>{"Kit Facil Everyday L’oreal"}</Text>
            <Text>{`Quant.: ${product.quantidade}`}</Text>
            <Text style={stylesConsultaProduto.productDesc}>{`Unitário: ${product.unitario}`}</Text>
            <Text style={stylesConsultaProduto.productPrice}>{`Total: ${product.total.toFixed(2)}`}</Text>
        </View>
    )
}

// Componente do botão direito para adicionar o produto à pré-venda
const RightItem = ({ click }: { click: () => void}) => {
    return (
        <View style={stylesConsultaProduto.rightIcons}>
            <Pressable onPress={click}>
                <CustomIcon icon={ICON_NAME.LIXEIRA} />
            </Pressable>
        </View>
    )
}

/*
({item}) => <CardQuantidade product={item}/>
*/

const BottomQuatidade = () => {
    return(
        <View>
            <ContainerQuantidade/>
            <View style={[commonStyle.common_rowItem, commonStyle.align_start_spaceAround_center]}>
                <ButtonActionSecondary label={"Salvar"} onPress={() => ""}/>
                <ButtonActionTransparent label={"Cancela"} onPress={() => ""}/>
            </View>
        </View>
    )
}

