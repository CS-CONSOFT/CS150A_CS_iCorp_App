interface IGetProductSearch {
    cs_tenant_id: number,
    cs_estab_id: string
    cs_codigo_produto?: string,
    cs_codigo_marca?: string,
    cs_codigo_artigo?: string,
    cs_codigo_referencia?: string,
    cs_is_saldo?: boolean,
    cs_is_promotion?:boolean
}

interface IResProductSearch {
    Id?: string;
    GG008_Referencia?: string;
    GG007_Unidade?: string;
    GG007_FormaVenda_ID?: number;
    GG007_Sec_Unidade?: string;
    GG015_SubGrupo?: string;
    GG006_DescMarca?: string;
    GG004_DescClasse?: string;
    Qtd_Arred?: number;
    PrecoInserido?: number;
    GG008_FilialID?: string;
    GG008_KardexID?: string;
    GG003_DescGrupo?: string;
    GG008_DescReduzida?: string;
    GG008_CodgProduto?: number;
    Qtd?: number;
    GG520_SaldoSum?: number;
    Qtd_Sec?: number;
    GG008_Prc_VendaVarejo?: number;
    GG005_DescArtigo?: string;
    GG007_Sec_FormaVenda_ID?: number;
}