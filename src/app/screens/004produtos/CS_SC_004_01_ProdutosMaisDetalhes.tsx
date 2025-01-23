import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IResGetProductItem } from "../../services/api/interfaces/produto/CS_IResGetProdutoSearch";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const CS_SC_004_01_ProdutosMaisDetalhes = ({ route }: { route: any }) => {
    //ISSO NAO É USADO PQ POR ALGUMA RAZAO TAVA SENDO LIDO COMO UNDEFINED EM TELA
    const currentProduct: IResGetProductItem = route.params;
    //ISSO NAO É USADO PQ POR ALGUMA RAZAO TAVA SENDO LIDO COMO UNDEFINED EM TELA

    const images = route.params.currentProduct.Imagens;
    const caracteristica = route.params.currentProduct.Caracteristica;
    const fichaTecnica = route.params.currentProduct.FichaTecnica;
    const descReduz = route.params.currentProduct.DescReduzida;
    const codigo = route.params.currentProduct.CodgProduto;




    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Código - Descrição Reduzida</Text>
                <Text style={styles.cardContent}>{codigo} - {descReduz || "Não informado"}</Text>
            </View>
            <View style={styles.containerCarrossel}>

                {images.length > 0 ? (
                    <Image
                        style={styles.imageCarrossel}
                        source={{ uri: images[currentIndex].URL_Path }} // Use currentIndex here!
                        resizeMode="contain" // Important for proper image display
                    />
                ) : (
                    <Text style={styles.noImageText}>Nenhuma imagem disponível</Text>
                )}

            </View>

            {/* Botões de navegação */}
            <View style={styles.containerControls}>
                <View style={styles.controls}>
                    <TouchableOpacity
                        style={[
                            styles.buttonCarrossel,
                            currentIndex === 0 && styles.disabledButton,
                        ]}
                        onPress={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        <Text style={styles.buttonTextCarrossel}>Anterior</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.buttonCarrossel,
                            currentIndex === images.length - 1 && styles.disabledButton,
                        ]}
                        onPress={handleNext}
                        disabled={currentIndex === images.length - 1}
                    >
                        <Text style={styles.buttonTextCarrossel}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Características</Text>
                {/* <Text style={styles.cardContent}>{caracteristica || "Não informado"}</Text> */}
                <RenderHtml
                    contentWidth={250}
                    source={{ html: caracteristica }}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Ficha Técnica</Text>
                <RenderHtml
                    contentWidth={250}
                    source={{ html: fichaTecnica }}
                />
            </View>
        </ScrollView>
    );
};

const COLORS = {
    white: "#ffffff",
    background: "#fff",
    primary: "#4CAF50",
    error: "#FF0000",
    warning: "#FFA500",
    info: "#00AAFF",
    success: "#4CAF50",
};


const FONT_SIZES = {
    small: 12,
    medium: 16,
    large: 18,
    xlarge: 24,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 16,
    },
    imageCarrossel: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    noImageText: {
        color: "#000",
        fontSize: FONT_SIZES.medium,
    },
    containerHeader: {
        flex: 1,
        paddingBottom: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: "bold",
    },
    title: {
        fontSize: FONT_SIZES.xlarge,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 16,
    },
    card: {
        backgroundColor: COLORS.background,
        padding: 16,
        borderWidth: 0.1, // Espessura da borda
        borderColor: "#D3D3D3", // Cor da borda
        borderRadius: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    label: {
        color: "#A9A9A9",
        fontSize: FONT_SIZES.small,
    },
    value: {
        color: COLORS.white,
        fontSize: FONT_SIZES.small,
    },
    scoreContainer: {
        alignItems: "center",
        marginVertical: 16,
    },
    scoreText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.white,
    },
    scoreLevel: {
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        color: COLORS.warning,
        marginVertical: 8,
    },
    scoreValue: {
        fontSize: 36,
        fontWeight: "bold",
        color: COLORS.warning,
    },
    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    progressTextContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    progressLabel: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        textAlign: "center",
    },
    progressSubLabel: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        textAlign: "center",
    },
    progressValue: {
        color: COLORS.white,
        fontSize: FONT_SIZES.xlarge,
        fontWeight: "bold",
        textAlign: "center",
    },
    legend: {
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    legendItem: {
        fontSize: FONT_SIZES.small,
        marginBottom: 4,
        marginHorizontal: 8,
    },
    progressText: {
        fontSize: FONT_SIZES.large,
        color: COLORS.white,
    },
    loadingText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
    },
    containerCarrossel: {
        height: 250,
        backgroundColor: COLORS.background,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
        borderWidth: 0.1, // Espessura da borda
        borderColor: "#D3D3D3", // Cor da borda
    },
    cardCarrossel: {
        alignItems: "center",
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 8,
    },
    cardLevel: {
        fontSize: FONT_SIZES.medium,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 12,
    },
    cardContent: {
        fontSize: FONT_SIZES.medium,
        color: "#000",
    },
    containerControls: {
        paddingTop: 6,
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        width: "60%",
    },
    buttonCarrossel: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#007bff",
    },
    disabledButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
    },
    buttonTextCarrossel: {
        color: COLORS.white,
        fontWeight: "bold",
    },
    progressBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginVertical: 10,
    },
    step: {
        flex: 1,
        height: 12,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    filled: {
        backgroundColor: "#0a5f28", // Cor preenchida
    },
    empty: {
        backgroundColor: "#dcdcdc", // Cor vazia
    },
    cardCartao: {
        backgroundColor: COLORS.background,
        padding: 16,
        borderWidth: 0.1, // Espessura da borda
        borderColor: "#D3D3D3", // Cor da borda
        borderRadius: 8,
        marginBottom: 20,
    },
    containerTitleCartao: {
        alignItems: "flex-start",
    },
    containerCartao: {
        alignItems: "center",
        marginVertical: 20, // Espaçamento do cartão na tela
    },
    creditCard: {
        height: 180,
        borderRadius: 15,
        padding: 20,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        borderWidth: 0.1, // Espessura da borda
        borderColor: "#D3D3D3", // Cor da borda
    },
    // Estilo padrão
    cardDefault: {
        backgroundColor: "#2c2c2c",
        borderRadius: 5,
    },
    // Estilo Platinum
    cardPlatinum: {
        backgroundColor: "#e5e5e5",
    },
    // Estilo Gold
    cardGold: {
        backgroundColor: "#ffd700",
    },
    // Estilo Silver
    cardSilver: {
        backgroundColor: "#c0c0c0",
    },
    chipEIcone: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconeContato: {
        marginTop: 10,
        fontSize: 20,
        color: "#000",
    },
    tituloCartao: {
        textAlign: "right",
        textTransform: "uppercase",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
    },
    numeroCartao: {
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center",
        marginVertical: 22,
        letterSpacing: 2, // Espaçamento entre números
    },
    linhaInferior: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nomeCartao: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    validadeCartao: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    barTitle: {
        fontSize: 14,
        color: "FFF",
        fontWeight: "bold",
    },
    subtitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 260,
        marginTop: 4,
    },
    subtitle: {
        fontSize: 10,
        color: "#9e9e9e",
    },
});


export default CS_SC_004_01_ProdutosMaisDetalhes;