
/**
 * funcao que realiza o mapeando de uma lista comum para uma lista de objeto chave-valor
 * necessario para usar com o componente de dropdown
 * @param list lista comum
 * @returns a lista mapeada
 */
export function mapList<T>(list: T[]) {
    return list.map((item) => ({
        key: item,
        value: item
    }));
}