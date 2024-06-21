import { SafeAreaView, View, FlatList, Text, Alert, Pressable, Image, ActivityIndicator } from "react-native";
import { ButtonLink } from "../../components/button/CustomButtonLink";
//Componentes
import CustomProduct from "../../components/product/CustomProduct";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomIcon from "../../components/icon/CustomIcon";
//Estilo
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";
import { stylesConsultaProduto } from "../004produtos/ConsultaProdutoStyles";
//Icons
import { ICON_NAME } from "../../util/IconsName";
//DataFake
import { DataListaComando, Produto } from "../../util/ListaComandoDataFake";

interface Nota {
    nome: string;
    numero: number;
    data: Date;
}


const CS_SC_008_ListaComandas = ({ nome, numero, data }: Nota) => {



    return <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={[commonStyle.common_columnItem, commonStyle.align_centralizar, commonStyle.common_margin_horizontal, { borderBottomColor: ColorStyle.colorPrimary200, borderBottomWidth: 2, padding: 10 }]}>
            <Text style={commonStyle.title_accordion}>{"CS-Consoft (DFIX)"}</Text>
            <Text>{"Nª 20240000000020"}</Text>
            <Text>{"20/06/24"}</Text>
        </View>
        <View style={[commonStyle.common_rowItem, commonStyle.align_spacebetween_row, commonStyle.common_margin_horizontal]}>
            <Text style={[commonStyle.title_accordion, commonStyle.font_size_18]}>Produtos</Text>
            <ButtonLink onPress={() => ("")} label={"Adicionar"} />
        </View>
        <FlatList
            data={DataListaComando}
            ListEmptyComponent={<CustomEmpty text={"Nenhum produto encontrada"} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <CustomProduct
                    children={
                        <ProductItem
                            product={item}
                        />
                    }
                    image={<ImageProductItem />}
                    rightItem={
                        <RightItem
                            loadingClick={false}
                            click={() => Alert.alert('Em construção')}

                        />
                    }
                />
            }
        />

    </SafeAreaView>
}

export default CS_SC_008_ListaComandas;


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
            <Text style={stylesConsultaProduto.productPrice}>{`Total: ${product.total}`}</Text>
        </View>
    )
}

// Componente do botão direito para adicionar o produto à pré-venda
const RightItem = ({ click, loadingClick }: { click: () => void, loadingClick: boolean }) => {
    return (
        <View style={stylesConsultaProduto.rightIcons}>
            <Pressable onPress={click}>
                {loadingClick ? <ActivityIndicator size={32} color={"#000"} /> : <CustomIcon icon={ICON_NAME.LIXEIRA} />}
            </Pressable>
        </View>
    )
}


