/**
 * Formata uma data
 * @param date padrão YYYY-MM-DD
 * @returns DD/MM/YYYY
 */
export function formatDate(date: string): string {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
        throw new Error('Data Inválida. Formato esperado YYYY-MM-DD.');
    }
    const [year, day, month] = date.split('-')
    return `${day}/${month}/${year}`
}

export function formatMoneyValue(value: number): string {
    let formattedValue = value.toFixed(2);
    formattedValue = formattedValue.replace('.', ',');
    return `R$ ${formattedValue}`;
}