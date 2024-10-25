/**
 * Lida somente com a lista de produto
 */
export interface IResGetProductItem {
    Id?: string;
    CodgProduto?: number;
    DescArtigo?: string;
    DescMarca?: string;
    Referencia?: string;
    Complemento?: string;
    DescReduzida?: string;
    DescGrupo?: string;
    DescClasse?: string;
    SubGrupo?: string;
    Preco?: number;
    PrcPromocional?: number;
    isArredondaUnSec?: boolean;
    isUnSec?: boolean;
    isUnSecFracionado?: boolean;
    isUnFracionado?: boolean;
    UnidadeSecundaria?: string;
    Unidade?: string;
    Saldo?: number
    Imagens?: {
        SeqOrdem: number;
        URL_Path: string;
        IsPadrao?: boolean;
    }[];
    NS_List: NS_List[]
}


export interface NS_List {
    csicp_gg520: Csicp_gg520
    csicp_gg008_Kdx: Csicp_gg008_Kdx
    csicp_gg001: Csicp_gg001
}

export interface Csicp_gg520 {
    Id: string
    GG520_FilialID: string
    GG520_Kardex_ID: string
    GG520_AlmoxID: string
    GG520_CodBarras_ID: string
    GG520_NS_NumeroSaldo: number
    GG520_DescricaoSaldo: string
    GG520_Filial: number
    GG520_CodAlmoxarifado: number
    GG520_Produto: number
    GG520_Saldo: number
    GG520_QtdComprometida: number
    GG520_Qtd_Producao: number
    GG520_Qtd_Empenho: number
    GG520_Qtd_Reserva: number
    GG520_QNPT: number
    GG520_QTNP: number
    GG520_UltInventario: string
    GG520_UltFechamento: string
    GG520_QtdUltFechamento: number
    GG520_Item_em_Contagem: boolean
    GG520_ProxInventario: string
    GG520_UltRecebimento: string
    GG520_QtdUltRecebto: number
    GG520_Ultima_Venda: string
    GG520_Qtde_Ult_Venda: number
    GG520_QtdPedidoCompra: number
    GG520_Lote: string
    GG520_SubLote: string
    GG520_Descricao_Lote: string
    GG520_CompraID: string
    GG520_Codg_Fornecedor: number
    GG520_ContaID: string
    GG520_UsuarioID: string
    GG520_Data_Fabricacao: string
    GG520_Data_Validade: string
    GG520_Dias_Validade: number
    GG520_Docto: number
    GG520_Serie: string
    GG520_CompraEntrada: string
    GG520_GradeLinhaID: string
    GG520_GradeColunaID: string
    GG520_CodgGradeLinha: string
    GG520_CodgGradeColuna: string
    GG520_Estq_Minimo: number
    GG520_EstoqueMaximo: number
    GG520_LocalizacaoWMS: string
    GG520_SuperPromocao: number
    GG520_PeriodicidadeInv: number
    GG520_ExibirEmConsulta: boolean
    GG520_SaldoZeroDesabAutom: boolean
    GG520_PermiteTroca: boolean
    GG520_vBCSTRet: number
    GG520_vICMSSTRet: number
    GG520_IsActive: boolean
    GG520_TimeStamp: string
    gg520_IsPDV: boolean
    gg520_vICMSSubstituto: number
    gg520_VFutura_SaldoID: string
}

export interface Csicp_gg008_Kdx {
    GG008_KardexID: string
    GG008_FilialID: string
    GG008_ProdutoID: string
    GG008_CodAlmoxPadrao: number
    GG008_CodAlmTransf: number
    GG008_AlmoxPadraoID: string
    GG008_AlmoxTransfID: string
    GG008_Unidade: string
    GG008_UnidSecundaria: string
    GG008_UNVendaVarejoID: string
    GG008_UNCompraVarejoID: string
    GG008_UNVendaAtacadoID: string
    GG008_Fator_Conversao: number
    GG008_Aliquota_IPI: number
    GG008_Aliquota_ICMS: number
    GG008_Aliq_ICMS_Reduzida_PDV: number
    GG008_Aliquota_ISS: number
    GG008_MargemLucroSai: number
    GG008_MargemLucroEnt: number
    GG008_Calcula_IRRF: number
    GG008_Calcula_INSS: number
    GG008_Perc_CSLL: number
    GG008_Perc_COFINS: number
    GG008_Perc_PIS: number
    GG008_ICMS_Pauta: number
    GG008_IPI_Pauta: number
    GG008_QtdPedidoCompra: number
    GG008_Estoque_Minimo: number
    GG008_Estoque_Maximo: number
    GG008_Tempo_Reposicao: number
    GG008_Ponto_Pedido: number
    GG008_Lote_Economico: number
    GG008_Grau_Atendimento: number
    GG008_Perc_Tolerancia: number
    GG008_ABC: string
    GG008_Perc_Comissao: number
    GG008_Data_Fabricacao: string
    GG008_Data_Validade: string
    GG008_Dias_Validade: number
    GG008_Custo_Medio: number
    GG008_Preco_Reposicao: number
    GG008_Perc_Desc_Item: number
    GG008_PrcPromocional: number
    GG008_Qtd_Promocional: number
    GG008_Fator_Lucro: number
    GG008_Prc_VendaVarejo: number
    GG008_Prc_Vnd_mercado: number
    GG008_UltReajPrcVenda: string
    GG008_Preco_Venda_Liq: number
    GG008_VlrMargemLucro: number
    GG008_AlteraPrcVenda: number
    GG008_Preco_Custo: number
    GG008_UltReajPrcCusto: string
    GG008_Preco_Custo_Real: number
    GG008_Centro_Custo: number
    GG008_CCustoID: string
    GG008_Conta_Contabil: string
    GG008_Classe_Contabil: string
    GG008_Fornecedor_Canal: number
    GG008_FornecedorPadrao: number
    GG008_ContaID: string
    GG008_PeriodicidadeInv: number
    GG008_Controla_Saldo: number
    GG008_Controle_Lote: number
    GG008_Controle_Grade: number
    GG008_Anuente: number
    GG008_Restricao: number
    GG008_GrupoComprasID: string
    GG008_PermSldNegativo: number
    GG008_MinutaAutomatica: number
    GG008_RequisAutomatica: number
    GG008_Data_Desativacao: string
    GG008_LocalizFixa: string
    GG008_Diversos: string
    GG008_Aliq_Dif_PIS: number
    GG008_Aliq_Dif_COFINS: number
    GG008_EAN_Tributavel: number
    GG008_UNTributavelID: string
    GG008_Fator_Unidade: number
    GG008_Valor_PIS: number
    GG008_Valor_COFINS: number
    GG008_Is_Active: boolean
    GG008_Tipo_Conversao_ID: number
    GG008_TipoPrazo_ID: number
    GG008_Tp_Contribuicao_ID: number
    GG008_RI_ControleQualidade: boolean
    GG008_Aliquota_IRPJ: number
    GG008_Retencao_Aliq_INSS: number
    GG008_Retencao_Aliq_IRRF: number
    GG008_Desconto_SUFRAMA: number
    GG008_TimeStamp: string
    GG008_pLucro: number
    gg008_isCtrl_Gondola: boolean
    gg008_qMediaConsumo: number
    gg008_vMediaConsumo: number
    gg008_DtUltProcLE: string
    gg008_vUNCompra_CMedio: number
    gg008_vUNCompra_Reposicao: number
    gg008_vUNCompra_PrcVenda: number
    gg008_vUNCompra_PrcMercado: number
    gg008_vUNCompra_PrcCusto: number
    gg008_vUNCompra_CustoReal: number
    gg008_vUNCompra_VlrMargLucro: number
    gg008_MoedaID: string
    gg008_vMoeda: number
    GG008_PrcEcommerce: number
    GG008_AuditaSN: number
    gg008_PossuiSaldo: number
    GG008_UltRecebimento: string
    GG008_QtdUltRecebto: number
    GG008_Ultima_Venda: string
    GG008_Qtde_Ult_Venda: number
    gg008_tpCBarraTrib_ID: number
}

export interface Csicp_gg001 {
    Id: string
    GG001_Filial: number
    GG001_FilialID: string
    GG001_CodigoAlmox: number
    GG001_DescAlmox: string
    GG001_IsActive: boolean
    GG001_TipoAlmoxarifado: number
    GG001_RI_ControleQualidade: boolean
    GG001_CapArmaz: number
    GG001_DescNSPadrao: string
}

/**
 * Lida com toda a estrutura de retorno, as mensagens +  a lista
 */
export interface IResProdutoSearch {
    cs_is_ok: boolean,
    cs_total_count: number,
    c_pages_number: number,
    cs_msg?: string
    List: IResGetProductItem[]
}
