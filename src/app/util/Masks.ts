export function moneyApplyMask(value: string) {
    // Remove todos os caracteres que não são dígitos
    let cleanedValue = value.replace(/\D/g, "");

    // Adiciona os zeros necessários se o valor não tiver pelo menos 3 dígitos
    while (cleanedValue.length < 3) {
        cleanedValue = "0" + cleanedValue;
    }

    const integerPart = cleanedValue.slice(0, -2);
    const decimalPart = cleanedValue.slice(-2);

    const withThousandSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedValue = `R$ ${withThousandSeparators},${decimalPart}`;

    return formattedValue;
}

export function moneyRemoveMask(value: string) {
    // Remove o símbolo R$, os pontos e a vírgula
    let cleanedValue = value.replace(/[^0-9,-]+/g, "");

    cleanedValue = cleanedValue.replace(',', '.');

    let numberValue = parseFloat(cleanedValue);

    return Number(numberValue.toFixed(1));
}
