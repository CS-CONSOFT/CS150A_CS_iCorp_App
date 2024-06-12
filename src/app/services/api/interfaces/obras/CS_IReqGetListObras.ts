export interface IReqGetListObras {
    cs_tenant_id: number,
    /**Retorna somente o contador da Tabela. */
    cs_isCount: boolean,
    /**Valor que define a página atual que desejamos mostrar */
    cs_currentPage: number,
    /**Valor que define o número de linhas por página */
    cs_pageSize: number,
    cs_DataInicio: string,
    cs_DataFinal: string
}