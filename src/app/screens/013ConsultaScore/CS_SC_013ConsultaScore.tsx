import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import * as Progress from "react-native-progress";
import { ToastType, showToast } from "../../util/ShowToast";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { handleGetAnaliseCredito } from "../../view_controller/analiseCredito/AnaliseCreditoViewController";
import {
  CS_IResGetAnaliseCredito,
  CreditProData,
  Score,
} from "../../services/api/interfaces/analiseCredito/_IResGetAnaliseCredito";

const COLORS = {
  white: "#ffffff",
  background: "#1E1E1E",
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

const CS_SC_013ConsultaScore = ({ route }: { route: any }) => {
  const { bb12id } = route.params;

  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const [calcularScoreClearsale, setCalcularScore] = useState<boolean>(false);
  const [creditoData, setCreditoData] = useState<CS_IResGetAnaliseCredito>();
  const [jsonCreditProParsed, setJsonParsed] = useState<CreditProData>();
  const [scoreValue, setScoreValue] = useState<number>(0);
  const [valuePersonaPagamento, setValuePersona] = useState<number>(0);
  const [valuePresencaDigital, setValuePresenca] = useState<number>(0);
  const [valuePersonaBanco, setValueBanco] = useState<number>(0);
  const [nameCategoriaCartao, setNameCategoriaCartao] = useState<string>("");
  const [valuePotencialGeral, setValuePotencial] = useState<number>(0);
  const [valuePotencialMaximo, setValuePotencialMax] = useState<Score>();
  const [error, setError] = useState<string | null>(null);

  // Variáveis para CPF e data formatados
  const [cpfFormatado, setCpfFormatado] = useState<string>("");
  const [dataFormatada, setDataFormatada] = useState<string>("");

  // Estado para controlar o índice do card
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define texto e cor dinamicamente com base no valor do score
  const getScoreDetails = (score: number) => {
    if (score < 200) return { text: "Muito Baixo", color: "#FF0000" };
    if (score < 400) return { text: "Baixo", color: "#FFA500" };
    if (score < 600) return { text: "Médio", color: "#FFFF00" };
    if (score < 800) return { text: "Alto", color: "#00AAFF" };
    return { text: "Muito Alto", color: "#4CAF50" };
  };

  // Formata o CPF para exibição
  const formatCPF = (cpf: string) => {
    if (!cpf) return "";
    return cpf
      .replace(/\D/g, "") // remove todos os caracteres não numéricos
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // formata o CPF
  };

  // Formata a data para o formato DD/MM/AAAA
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month, day] = date.split("T")[0].split("-"); // Extrai AAAA-MM-DD antes do 'T'
    return `${day}/${month}/${year}`;
  };

  // Função para ir para o próximo card
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Função para ir para o card anterior
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Explicações baseadas no nível de persona de pagamento
  const explanationsPersona = [
    "Ausência de histórico bancário e produtos de crédito no digital",
    "Possui relação bancária, mas sem uso de produtos de crédito digital",
    "Possui algum relacionamento bancário com pouca utilização de produtos de crédito no digital",
    "Possui relacionamento bancário com média utilização de produtos de crédito no digital",
    "Possui relacionamento bancário e de crédito e opta por pagamento à vista no digital",
    "Possui relacionamento bancário e de crédito e opta por pagamento parcelado no digital",
  ];

  // Função para retornar a explicação com base no nível de persona
  const getExplanationForLevelPersona = (level: number): string => {
    return explanationsPersona[level] ?? "Sem descrição";
  };

  // Função para retornar explicação com base no nível da persona de pagamento
  const explanationsPresenca = [
    "Sem presença digital",
    "Baixa presença digital sem consumo",
    "Baixa presença digital com baixo consumo",
    "Média presença digital com baixo consumo",
    "Média presença digital com médio consumo",
    "Alta presença digital com médio consumo",
    "Alta presença digital com alto consumo",
  ];

  const getExplanationForLevelPresenca = (level: number): string => {
    return explanationsPresenca[level] ?? "Sem descrição";
  };

  // Dados dos cards
  const cards = [
    {
      id: 1,
      title: "Persona Pagamento",
      nivel: "Nível " + valuePersonaPagamento,
      content: getExplanationForLevelPersona(valuePersonaPagamento),
    },
    {
      id: 2,
      title: "Presença Digital",
      nivel: "Nível " + valuePresencaDigital,
      content: getExplanationForLevelPresenca(valuePresencaDigital),
    },
    {
      id: 3,
      title: "Principalidade Bancária",
      nivel: "O banco principal é do segmento",
      content: valuePersonaBanco,
    },
    {
      id: 4,
      title: "Insights Potencial de Consumo",
      nivel: "Consumo observado dos últimos 12 meses em relação a base Brasil",
      content: valuePotencialGeral,
      contentComplementar: valuePotencialMaximo,
    },
  ];

  // Função para determinar o estilo com base na categoria
  const getColorStyle = (nameCategoriaCartao: string) => {
    const categoria = nameCategoriaCartao?.toLowerCase() || "";
    switch (categoria) {
      case "platinum":
        return styles.cardPlatinum;
      case "beneficios":
        return styles.cardGold;
      case "intermediario":
        return styles.cardSilver;
      default:
        return styles.cardDefault;
    }
  };

  const SomeComponent = ({ nameCategoriaCartao }) => {
    // You can use getColorStyle here if needed
  };

  const handleCallRecalcularScore = () => {
    setCalcularScore(true);
    handleScoreCalculation();
  };

  const handleScoreCalculation = async () => {
    try {
      setStatus(FETCH_STATUS.LOADING);

      const response = await handleGetAnaliseCredito({
        cs_conta_id: bb12id,
        cs_calcular_score_clearsale: true,
      });

      // Verifica se o campo JSON_CreditPro existe e tenta desserializar
      if (response.AnaliseCredito.csicp_bb01210?.JSON_CreditPro) {
        try {
          const parsed = JSON.parse(
            response.AnaliseCredito.csicp_bb01210.JSON_CreditPro
          );
          setJsonParsed(parsed);

          // Buscar o valor do score
          const scoreV3 = parsed.scores.find(
            (score) => score.name === "Score v3"
          );
          setScoreValue(Number(scoreV3?.value));

          // Buscar o valor da persona pagamento
          const personaPagamento = parsed.scores.find(
            (personaPagto) => personaPagto.name === "Persona Bancarizada"
          );
          setValuePersona(personaPagamento.value);

          // Buscar o valor da presença digital
          const presencaDigital = parsed.scores.find(
            (presencaDigital) =>
              presencaDigital.name === "Persona Presenca Digital"
          );
          setValuePresenca(presencaDigital.value);

          // Buscar o segmento do banco
          const personaBanco = parsed.scores.find(
            (personaBanco) => personaBanco.name === "Persona Banco"
          );
          setValueBanco(personaBanco.value);

          // Buscar a categoria do cartão mais utilizado
          const nameCategoriaCartao = parsed.scores.find(
            (categoriaCartao) =>
              categoriaCartao.name === "Persona Categoria cartao"
          );
          setNameCategoriaCartao(nameCategoriaCartao.value);

          // Buscar o potencial de consumo geral
          const potencialGeral = parsed.scores.find(
            (potencialGeral) =>
              potencialGeral.name === "Potencial de consumo - Geral"
          );
          setValuePotencial(potencialGeral.value);

          // Filtrar os objetos cujo campo "name" contém "Potencial de consumo"
          const potenciaisConsumo = parsed.scores.filter((score) =>
            score.name.includes("Potencial de consumo")
          );
          // Encontrar o objeto com o maior valor no campo "value"
          const maiorPotencial = potenciaisConsumo.reduce((maior, atual) =>
            Number(atual.value) > Number(maior.value) ? atual : maior
          );
          setValuePotencialMax({
            value: Number(maiorPotencial.value).toString(),
            name: maiorPotencial.name,
          });
        } catch (error) {
          console.error("Erro ao desserializar JSON_CreditPro:", error);
        }
      }
      // Formata o CPF e a data para exibição
      const cpf =
        response.AnaliseCredito.csicp_bb01202?.BB012_CPF.toString() || "";
      const data = jsonCreditProParsed?.creationDateUtc || "";

      setCpfFormatado(formatCPF(cpf));
      setDataFormatada(formatDate(data));

      setCreditoData(response);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (err: any) {
      showToast(ToastType.ERROR, "Falha", err.response.data.Errors[0]);
      setStatus(FETCH_STATUS.ERROR);
    }
  };

  // Chama a função handleGetAnaliseCredito quando a tela é carregada
  useEffect(() => {
    const fetchCreditoData = async () => {
      try {
        setStatus(FETCH_STATUS.LOADING);

        const response = await handleGetAnaliseCredito({
          cs_conta_id: bb12id,
          cs_calcular_score_clearsale: calcularScoreClearsale,
        });

        // Verifica se o campo JSON_CreditPro existe e tenta desserializar
        if (response.AnaliseCredito.csicp_bb01210?.JSON_CreditPro) {
          try {
            const parsed = JSON.parse(
              response.AnaliseCredito.csicp_bb01210.JSON_CreditPro
            );
            setJsonParsed(parsed);

            // Buscar o valor do score
            const scoreV3 = parsed.scores.find(
              (score) => score.name === "Score v3"
            );
            setScoreValue(Number(scoreV3?.value));

            // Buscar o valor da persona pagamento
            const personaPagamento = parsed.scores.find(
              (personaPagto) => personaPagto.name === "Persona Bancarizada"
            );
            setValuePersona(personaPagamento.value);

            // Buscar o valor da presença digital
            const presencaDigital = parsed.scores.find(
              (presencaDigital) =>
                presencaDigital.name === "Persona Presenca Digital"
            );
            setValuePresenca(presencaDigital.value);

            // Buscar o segmento do banco
            const personaBanco = parsed.scores.find(
              (personaBanco) => personaBanco.name === "Persona Banco"
            );
            setValueBanco(personaBanco.value);

            // Buscar a categoria do cartão mais utilizado
            const nameCategoriaCartao = parsed.scores.find(
              (categoriaCartao) =>
                categoriaCartao.name === "Persona Categoria cartao"
            );
            setNameCategoriaCartao(nameCategoriaCartao.value);

            // Buscar o potencial de consumo geral
            const potencialGeral = parsed.scores.find(
              (potencialGeral) =>
                potencialGeral.name === "Potencial de consumo - Geral"
            );
            setValuePotencial(potencialGeral.value);

            // Filtrar os objetos cujo campo "name" contém "Potencial de consumo"
            const potenciaisConsumo = parsed.scores.filter((score) =>
              score.name.includes("Potencial de consumo")
            );
            // Encontrar o objeto com o maior valor no campo "value"
            const maiorPotencial = potenciaisConsumo.reduce((maior, atual) =>
              Number(atual.value) > Number(maior.value) ? atual : maior
            );
            setValuePotencialMax({
              value: Number(maiorPotencial.value).toString(),
              name: maiorPotencial.name,
            });
          } catch (error) {
            console.error("Erro ao desserializar JSON_CreditPro:", error);
          }
        }
        // Formata o CPF e a data para exibição
        const cpf =
          response.AnaliseCredito.csicp_bb01202?.BB012_CPF.toString() || "";
        const data = jsonCreditProParsed?.creationDateUtc || "";

        setCpfFormatado(formatCPF(cpf));
        setDataFormatada(formatDate(data));

        setCreditoData(response);
        setStatus(FETCH_STATUS.SUCCESS);
      } catch (err: any) {
        showToast(ToastType.ERROR, "Falha", err.response.data.Errors[0]);
        setStatus(FETCH_STATUS.ERROR);
      }
    };

    fetchCreditoData();
  }, [bb12id]);

  // Obtém os detalhes do score dinamicamente
  const { text: scoreText, color: progressColor } = getScoreDetails(scoreValue);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.header}>
          <Text style={styles.title}>Análise de Crédito</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCallRecalcularScore}
          >
            <CustomIcon
              icon={ICON_NAME.RELOAD}
              style={{ marginLeft: "auto" }}
              iconSize={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      {status === FETCH_STATUS.LOADING && (
        <Text style={{ color: COLORS.white }}>Carregando...</Text>
      )}

      {status === FETCH_STATUS.ERROR && (
        <Text style={{ color: COLORS.error }}>{error}</Text>
      )}

      {status === FETCH_STATUS.SUCCESS && creditoData && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Resultado da Consulta</Text>

            <View style={styles.row}>
              <Text style={styles.label}>CPF Consultado:</Text>
              <Text style={styles.value}>{cpfFormatado}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Data Consulta:</Text>
              <Text style={styles.value}>{dataFormatada}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Renda Atual:</Text>
              <Text style={styles.value}>
                R${" "}
                {creditoData.AnaliseCredito.csicp_bb01202.BB012_ValorRemuneracao.toFixed(
                  2
                )}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Limite de Crédito:</Text>
              <Text style={styles.value}>
                R${" "}
                {creditoData.AnaliseCredito.csicp_bb01201.BB012_LimiteCredito.toFixed(
                  2
                )}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crédito Com Score:</Text>
              <Text style={styles.value}>
                R${" "}
                {creditoData.AnaliseCredito.csicp_bb01210.bb01210_vCredComScore.toFixed(
                  2
                )}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crédito Médio:</Text>
              <Text style={styles.value}>
                R${" "}
                {creditoData.AnaliseCredito.csicp_bb01210.bb01210_vCredMedia.toFixed(
                  2
                )}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crédito Sem Score:</Text>
              <Text style={styles.value}>
                R${" "}
                {creditoData.AnaliseCredito.csicp_bb01210.bb01210_vCredSemScore.toFixed(
                  2
                )}
              </Text>
            </View>
          </View>

          {/* Credit Score */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Credit Score 3.0</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>O nível do score é:</Text>
              <Text style={[styles.scoreLevel, { color: progressColor }]}>
                {scoreText}
              </Text>

              <View style={styles.progressContainer}>
                <Progress.Bar
                  progress={scoreValue / 1000}
                  width={220}
                  height={12}
                  color={progressColor}
                  unfilledColor="#e0e0e0"
                ></Progress.Bar>

                <Text style={styles.progressValue}>Score: {scoreValue}</Text>
              </View>
            </View>
            <View style={styles.legend}>
              <Text style={[styles.legendItem, { color: "#FF0000" }]}>
                Muito baixo (0-199)
              </Text>
              <Text style={[styles.legendItem, { color: "#FFA500" }]}>
                Baixo (200-399)
              </Text>
              <Text style={[styles.legendItem, { color: "#FFFF00" }]}>
                Médio (400-599)
              </Text>
              <Text style={[styles.legendItem, { color: "#00AAFF" }]}>
                Alto (600-799)
              </Text>
              <Text style={[styles.legendItem, { color: "#4CAF50" }]}>
                Muito alto (800-999)
              </Text>
            </View>
          </View>

          {/* Cartão */}
          <View style={styles.cardCartao}>
            <View style={styles.containerTitleCartao}>
              <Text style={styles.cardTitle}>Cartão</Text>
              <Text style={styles.cardLevel}>
                Categoria do cartão mais utilizado
              </Text>
            </View>
            <View style={styles.containerCartao}>
              <View
                style={[styles.creditCard, getColorStyle(nameCategoriaCartao)]}
              >
                <View style={styles.chipEIcone}>
                  <Text style={styles.iconeContato}>
                    <CustomIcon
                      icon={ICON_NAME.PAYMENT}
                      style={{
                        marginLeft: "auto",
                        color: COLORS.white,
                        transform: [{ rotate: "180deg" }],
                      }}
                      iconSize={24}
                    />
                  </Text>
                  <Text style={styles.tituloCartao}>
                    {" "}
                    Cartão {nameCategoriaCartao}
                  </Text>
                </View>
                <Text style={styles.numeroCartao}>0000 0000 0000 0000</Text>
                <View style={styles.linhaInferior}>
                  <Text style={styles.nomeCartao}>NOME</Text>
                  <Text style={styles.validadeCartao}>00/00</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Área de carrossel */}
          <View style={styles.containerCarrossel}>
            <View style={styles.cardCarrossel}>
              <Text style={styles.cardTitle}>{cards[currentIndex].title}</Text>
              <Text style={styles.cardLevel}>{cards[currentIndex].nivel}</Text>

              {/* Verificação para exibir barra de progresso, ícone ou novo caso */}
              {(() => {
                const currentCard = cards[currentIndex];
                const { id, nivel, content, contentComplementar } = currentCard;

                if (id === 3) {
                  // Exibe ícone caso o ID seja 3
                  return (
                    <CustomIcon
                      icon={ICON_NAME.CASH}
                      iconSize={48}
                      style={{ color: COLORS.white }}
                    />
                  );
                } else if (id === 1 || id === 2) {
                  // Exibe barra de progresso caso o ID seja 1 ou 2
                  const nivelNumber =
                    parseInt(nivel.replace(/\D/g, ""), 10) || 0; // Extrai o número
                  const totalSteps = id === 1 ? 5 : 6; // Define o número de etapas dinamicamente

                  return (
                    <View style={styles.progressBar}>
                      {Array.from({ length: totalSteps }, (_, index) => (
                        <View
                          key={index}
                          style={[
                            styles.step,
                            index < nivelNumber ? styles.filled : styles.empty,
                          ]}
                        />
                      ))}
                    </View>
                  );
                } else if (id === 4) {
                  // Caso ID seja 4, exibe 2 barras de progresso
                  const valorPotencialGeral = Number(content) || 0;
                  const valorPotencialMaximo = contentComplementar?.value || 0;
                  const nomePotencialMaximo = contentComplementar?.name || "";

                  return (
                    <View>
                      {/* Título acima da primeira barra */}
                      <Text style={[styles.barTitle]}>
                        Potencial de consumo geral - {valorPotencialGeral}%
                      </Text>

                      <Progress.Bar
                        progress={valorPotencialGeral / 100}
                        width={260}
                        height={12}
                        color="#4caf50"
                        unfilledColor="#e0e0e0"
                      />
                      {/* Subtítulos abaixo da primeira barra */}
                      <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>Baixo Consumo</Text>
                        <Text style={styles.subtitle}>Alto Consumo</Text>
                      </View>

                      {/* Título acima da segunda barra */}
                      <Text style={[styles.barTitle, { marginTop: 12 }]}>
                        Segmento com maior consumo - {valorPotencialMaximo}%
                      </Text>
                      <Text style={{ color: "#FFF", marginBottom: 2 }}>
                        {nomePotencialMaximo}
                      </Text>
                      <Progress.Bar
                        progress={Number(valorPotencialMaximo) / 100}
                        width={260}
                        height={12}
                        color="#4caf50"
                        unfilledColor="#e0e0e0"
                      />
                      {/* Subtítulos abaixo da segunda barra */}
                      <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>Baixo Consumo</Text>
                        <Text style={styles.subtitle}>Alto Consumo</Text>
                      </View>
                    </View>
                  );
                }

                return null; // Caso nenhum dos IDs corresponda
              })()}

              {cards[currentIndex].id !== 4 && (
                <Text style={[styles.cardContent, { marginTop: 12 }]}>
                  {cards[currentIndex].content}
                </Text>
              )}
            </View>
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
                  currentIndex === cards.length - 1 && styles.disabledButton,
                ]}
                onPress={handleNext}
                disabled={currentIndex === cards.length - 1}
              >
                <Text style={styles.buttonTextCarrossel}>Próximo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
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
    color: COLORS.white,
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
    color: COLORS.white,
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
    color: COLORS.white,
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

export default CS_SC_013ConsultaScore;
