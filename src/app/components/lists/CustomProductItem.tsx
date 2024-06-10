import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { IResGetProductItem } from "../../services/api/interfaces/produto/CS_IResGetProdutoSearch";

//Item de produto que aparece na listagem
export const CustomProductItem = ({ product, onClick }: { product: IResGetProductItem, onClick: (product: IResGetProductItem) => void }) => {
    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: product.Imagens?.find(img => img.IsPadrao)?.URL_Path }} />
            <Text style={styles.productName}>{product.DescMarca}</Text>
            <Text style={styles.productInfo}>{`R$: ${product.DescGrupo}`}</Text>
            <Text style={styles.productInfo}>{`R$: ${product.Saldo}`}</Text>
            <Text style={styles.productInfo}>{`Qtd: ${product.Preco}`}</Text>

            <TouchableHighlight
                onPress={() => onClick(product)}
                style={commonStyle.common_button_style}
                underlayColor='white'
            ><Text style={commonStyle.common_text_button_style}>Adicionar Produto</Text></TouchableHighlight>

        </View>
    );
};


const styles = StyleSheet.create({
    productContainer: {
        height: 'auto',
        backgroundColor: '#A3C5D9',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        margin: 12
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    productInfo: {
        fontSize: 16,
        color: '#666',
        marginBottom: 3,
    },
    btnNewSearch: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 16
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

