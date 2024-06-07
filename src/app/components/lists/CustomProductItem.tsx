import { View, StyleSheet, Text, Image } from "react-native";
import CustomButton from "../button/CustomButton";
import { IResProductSearch } from "../../services/api/interfaces/produto/IProduct";

//Item de produto que aparece na listagem
export const CustomProductItem = ({ product, onClick }: { product: IResProductSearch, onClick: (product: IResProductSearch, done: () => void) => void }) => {
    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: product.Imagens?.find(img => img.IsPadrao)?.URL_Path }} />
            <Text style={styles.productName}>{product.DescMarca}</Text>
            <Text style={styles.productInfo}>{`R$: ${product.DescGrupo}`}</Text>
            <Text style={styles.productInfo}>{`R$: ${product.Saldo}`}</Text>
            <Text style={styles.productInfo}>{`Qtd: ${product.Preco}`}</Text>
            <CustomButton
                title="Adicionar Produto"
                onPress={(done) => { onClick(product, done) }}
                buttonStyle={styles.btnNewSearch}
                textStyle={styles.searchButtonText}
            />
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

