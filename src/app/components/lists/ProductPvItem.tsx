import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IProductItemModel } from "../../services/api/interfaces/prevenda/IPreVenda";
import CustomButton from "../button/CustomButton";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

//Item de produto que aparece na listagem
export const ProductPvItem = ({ product, onClick }: { product: IProductItemModel, onClick: (product: IProductItemModel, done: () => void) => void }) => {

    const leftSwipe = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity onPress={() => { }} activeOpacity={0.6}>
                <View>
                    <Animated.Text style={{ transform: [{ scale: scale }] }}>
                        Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <GestureHandlerRootView>
            <Swipeable
                overshootRight={false}
                renderRightActions={leftSwipe}>
                <View style={styles.productContainer}>
                    <Text style={styles.productName}>{product.Descricao}</Text>
                    <Text style={styles.productInfo}>{`R$: ${product.Quantidade}`}</Text>
                    <Text style={styles.productInfo}>{`R$: ${product.PrecoTabela}`}</Text>
                    <Text style={styles.productInfo}>{`Qtd: ${product.PrecoUnitario}`}</Text>
                    <CustomButton
                        title="Adicionar Produto"
                        onPress={(done) => { onClick(product, done) }}
                        buttonStyle={styles.btnNewSearch}
                        textStyle={styles.searchButtonText}
                    />
                </View>
            </Swipeable>
        </GestureHandlerRootView>
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
    },
    leftSwipeAction: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
});

