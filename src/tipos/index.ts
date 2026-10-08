// Tipos do DECIDA (seção 6 do SDD)

// Os 5 resultados possíveis, na ordem do espectro
export type LadoId =
  | 'esquerda'
  | 'centro-esquerda'
  | 'centro'
  | 'centro-direita'
  | 'direita';

// Os 3 blocos do teste
export type Bloco = 'economia' | 'sociedade' | 'internacional';

// Para qual lado a pessoa se aproxima ao CONCORDAR com a afirmação
export type Direcao = 'esquerda' | 'direita';

// Valor bruto da resposta: discordo totalmente (-2) até concordo totalmente (+2)
export type ValorResposta = -2 | -1 | 0 | 1 | 2;

export interface Pergunta {
  id: number; // 1 a 18
  bloco: Bloco;
  texto: string;
  direcao: Direcao;
}

// Respostas do usuário: chave = id da pergunta
export type Respostas = Record<number, ValorResposta>;

export interface Resultado {
  economia: number; // -12 a +12
  sociedade: number; // -12 a +12
  internacional: number; // -12 a +12
  total: number; // -36 a +36
  lado: LadoId;
  tendenciaEconomia: LadoId;
  tendenciaSociedade: LadoId;
  tendenciaInternacional: LadoId;
  perfilMisto: boolean;
}

export type TipoFonte = 'academica' | 'institucional' | 'jornalistica' | 'checagem';

export interface Fonte {
  titulo: string;
  veiculo: string; // quem publicou
  tipo: TipoFonte;
  url: string;
  acessadoEm: string; // formato AAAA-MM-DD
}

// Um texto único sustentado por fontes
export interface TextoComFontes {
  texto: string;
  fontes: Fonte[];
  pendente?: boolean; // true enquanto o conteúdo não foi entregue
}

// Uma lista de itens sustentada pelo mesmo conjunto de fontes
export interface BlocoComFontes {
  itens: string[];
  fontes: Fonte[];
  pendente?: boolean;
}

// Autor cujas ideias ajudam a entender um lado
export interface Pensador {
  nome: string;
  quemFoi: string; // uma linha: "economista brasileiro (1920–2004)"
  relacao: TextoComFontes; // a obra e a ideia que o ligam a este lado
}

export interface Lado {
  id: LadoId;
  nome: string; // "Centro-esquerda"
  nomeComArtigo: string; // "da centro-esquerda", "do centro"
  resumo: string; // "Em resumo": 2 a 3 frases; coberto pelas fontes de ideiasCentrais
  ideiasCentrais: BlocoComFontes; // "No que acredita": 4 itens
  modeloEconomico: TextoComFontes; // "Como vê a economia"
  argumentosDefensores: BlocoComFontes; // "O que dizem seus defensores": 4 itens
  argumentosCriticos: BlocoComFontes; // "O que dizem seus críticos": 4 itens
  pensadores: Pensador[]; // "Pensadores de referência": 2 pessoas
}

// Política já aplicada no Brasil, mostrada no bloco "Na prática" de um tema
export interface EpisodioHistorico {
  titulo: string; // "Venda das empresas de telefonia (1998)"
  oQueFoi: string; // a política e o período, sem nomear governantes
  defensores: string; // o que destacam os defensores
  criticos: string; // o que destacam os críticos
  fontes: Fonte[];
  pendente?: boolean;
}

export type TemaId =
  | 'papel-do-estado'
  | 'impostos'
  | 'programas-sociais'
  | 'privatizacoes'
  | 'seguranca'
  | 'costumes'
  | 'comercio-exterior'
  | 'politica-externa';

export interface PosicaoNoTema {
  lado: LadoId;
  valor: 1 | 2 | 3 | 4 | 5; // posição na escala do tema (seção 6.3)
  posicao: string; // o que este lado defende
  argumento: string; // principal argumento a favor
  criticaComum: string; // crítica mais comum que recebe
}

export interface Tema {
  id: TemaId;
  nome: string;
  posicoes: PosicaoNoTema[]; // exatamente 5, uma por lado
  fontes: Fonte[];
  naPratica: EpisodioHistorico; // um episódio por tema (seção 6.5)
  pendente?: boolean;
}

// Termo do glossário, ligado a um trecho de uma afirmação (seção 6.4)
export interface TermoGlossario {
  id: string;
  perguntaId: number;
  trecho: string; // precisa existir exatamente no texto da afirmação
  termo: string; // nome exibido
  definicao: TextoComFontes;
}
