export interface IResSimulacaoCrediario {
    datahora: string
    limite: Limite
    propostas: Propostas[]
    orgaosprotecaocredito: Orgaosprotecaocredito
    desenvolvedor: Desenvolvedor
    guid: string
}

export interface Limite {
    valor: number
    totalabertodocliente: number
    saldo: number
    risco: string
    acaoSugerida: string
    tipocliente: string
    MotivoSaldoZero: string
}

export interface Propostas {
    id: string
    plano: string
    valorentrada: number
    valorfinanciado: number
    valorCapitalfinanciado: number
    quantidadeparcelas: number
    primeirovencimento: string
    creditscore: Creditscore
    politicacredito: string[]
    politicacreditocompleto: Politicacreditocompleto[]
}

export interface Creditscore {
    cor: string
    corfonte: string
    risco: string
    acaoSugerida: string
    descritivo: string
}

export interface Politicacreditocompleto {
    id: string
    nome: string
    acao: string
    risco: string
}

export interface Orgaosprotecaocredito {
    dataHoraConsultaSpc: string
    link: string
    situacao: string
    cliente: Cliente
    negativacoes: Negativacoes
    negativacoescheque: Negativacoescheque
    consultasanteriores: Consultasanteriores
    alertadocumentos: Alertadocumentos
    chequespredatados: Chequespredatados
}

export interface Cliente {
    cpf: string
    nome: string
    situacaoDocumento: string
    dataReceitaFederal: string
    sexo: string
    rg: string
    dataNascimento: string
    estadoCivil: string
    nomePai: string
    nomeMae: string
    nacionalidade: string
    endereco: Endereco
    contatos: Contatos[]
}

export interface Endereco {
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
}

export interface Contatos {
    tipo: string
    valor: string
}

export interface Negativacoes {
    resumo: Resumo
}

export interface Resumo {
    quantidade: number
    dataultimanegativacao: string
    valortotalnegativado: number
}

export interface Negativacoescheque {
    resumo: Resumo2
}

export interface Resumo2 {
    quantidade: number
    dataultimanegativacao: string
    valortotalnegativado: number
}

export interface Consultasanteriores {
    resumo: Resumo2
    detalhamento: Detalhamento[]
}

export interface Resumo2 {
    quantidade: number
    quantidadeultimos30dias: number
    dataultimaconsulta: string
}

export interface Detalhamento {
    data: string
    associado: Associado
}

export interface Associado {
    nomefantasia: string
    municipio: string
    telefone: string
}

export interface Alertadocumentos {
    resumo: Resumo2
}

export interface Resumo2 {
    quantidade: number
    dataultimanegativacao: string
    valortotalnegativado: number
}

export interface Chequespredatados {
    resumo: Resumo2
}

export interface Resumo2 {
    quantidade: number
    ultimocheque: string
    valortotal: number
}

export interface Desenvolvedor {
    tempoprocessamentomilisegundos: number
}