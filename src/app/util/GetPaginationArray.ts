export function getPaginationList(totalPages: number): number[] {
    let paginatonArray: number[] = []
    if (totalPages) {
        for (let index = 1; index <= totalPages; index++) {
            paginatonArray.push(index)
        }
        return paginatonArray
    } else {
        return paginatonArray!
    }
}