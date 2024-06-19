// Aplica máscara de dinheiro
export function moneyApplyMask(value: number) {
    // Verifica se o valor é um número
    if (isNaN(value)) {
        throw new Error('Valor não é um número válido');
    }

    // Formata o número para valor monetário em reais
    const valorEmReais = (value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return valorEmReais;
}

// Remove máscara de dinheiro
export function moneyRemoveMask(value: string) {
    // Remove o símbolo R$, os pontos e a vírgula
    let cleanedValue = value.replace(/[^0-9,-]+/g, "");

    cleanedValue = cleanedValue.replace(',', '.');

    let numberValue = parseFloat(cleanedValue);

    return Number(numberValue.toFixed(2));
}
