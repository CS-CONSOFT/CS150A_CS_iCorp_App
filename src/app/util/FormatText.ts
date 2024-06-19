/**
 * Formata uma data
 * @param date padrão YYYY-MM-DD
 * @returns DD/MM/YYYY
 */
export function formatDateToSlashPattern(date: string): string {
    const dateValid = testFormatDate(date, /^\d{4}-\d{2}-\d{2}$/)
    if (!dateValid) {
        throw new Error('Data Inválida. Formato esperado YYYY-MM-DD.');
    }
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
}

export function testFormatDate(date: string, regex: RegExp): boolean {
    return regex.test(date)
}

/**
 * Formata uma data
 * @param date padrão DD/MM/YYYY
 * @returns YYYY-MM-DD
 */
export function formatDateToTracePattern(date: string): string {
    const dateValid = testFormatDate(date, /^\d{2}\/\d{2}\/\d{4}$/)
    if (!dateValid) {
        throw new Error('Data Inválida. Formato esperado DD/MM/YYYY.');
    }
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
}

/** formata um decimal para valor monetario
 * ex. 1.9 = R$ 1,90
 */
export function formatMoneyValue(value: number): string {
    let formattedValue = value.toFixed(2);
    formattedValue = formattedValue.replace('.', ',');
    return `R$ ${formattedValue}`;
}