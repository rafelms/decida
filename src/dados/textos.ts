import type { Bloco, TipoFonte, ValorResposta } from '../tipos';

// Textos fixos do site (seção 9 do SDD e rótulos de interface).
// Os textos aprovados estão copiados exatamente como no documento.

// Um parágrafo de aviso: trecho em negrito seguido do restante
interface Paragrafo {
  negrito?: string;
  texto?: string;
}

export interface TextoAviso {
  titulo: string;
  paragrafos: Paragrafo[];
}

// Data da última atualização do conteúdo (AAAA-MM-DD)
export const dataConteudo = '2026-10-07';

// ---------- Navegação (seção 5) ----------

export interface Secao {
  numero: string;
  ancora: string;
  titulo: string;
}

export const secoes: Secao[] = [
  { numero: '01', ancora: 'inicio', titulo: 'Abertura' },
  { numero: '02', ancora: 'como-funciona', titulo: 'Como funciona' },
  { numero: '03', ancora: 'teste', titulo: 'Questionário' },
  { numero: '04', ancora: 'resultado', titulo: 'Resultado' },
  { numero: '05', ancora: 'lados', titulo: 'Os 5 lados' },
  { numero: '06', ancora: 'comparacao', titulo: 'Comparação' },
  { numero: '07', ancora: 'metodologia', titulo: 'Metodologia e fontes' },
  { numero: '08', ancora: 'aviso-final', titulo: 'Aviso final' },
];

// Busca uma seção pela âncora (usado pelos componentes de seção)
export function secaoPorAncora(ancora: string): Secao {
  const secao = secoes.find((s) => s.ancora === ancora);
  if (!secao) throw new Error(`Seção não encontrada: ${ancora}`);
  return secao;
}

export const textosCabecalho = {
  marca: 'DECIDA',
  menu: 'MENU',
  fechar: 'FECHAR',
  tituloMenu: 'Seções do site',
  pularConteudo: 'Pular a animação e ir para o conteúdo',
  ativarTemaEscuro: 'Ativar tema escuro',
  ativarTemaClaro: 'Ativar tema claro',
};

// ---------- Painel "Sobre" (botão de perfil no cabeçalho) ----------

// Links do autor. Se apoio ou qrCodePix forem null, o painel mostra "EM BREVE" no lugar.
export const linksAutor = {
  github: 'https://github.com/rafelms',
  portfolio: 'https://rafaelmenezes.dev.br',
  email: 'rafaelm3nezesantana@gmail.com', // recebe as mensagens do formulário "Fale comigo"
  usuarioGithub: '@rafelms',
  apoio: 'https://linkspix.app/decida' as string | null, // página de pagamento por Pix
  qrCodePix: '/qrcode-pix.svg' as string | null, // QR code do link acima, em public/
};

export const textosSobre = {
  rotuloBotao: 'Sobre o DECIDA e quem faz',
  avatarAlt: 'Avatar de @rafelms: um gato em pixel art',
  titulo: 'Sobre',
  abaSobre: 'O PROJETO',
  abaQuemFaz: 'QUEM FAZ',

  // Aba "O projeto"
  oQueE: {
    titulo: 'O que é',
    texto:
      'O DECIDA é um site gratuito que ajuda você a entender de qual lado do espectro político as suas ideias se aproximam e a conhecer o que cada lado defende, sempre com fontes. Você responde 18 afirmações e recebe uma tendência, não um rótulo.',
  },
  porQue: {
    titulo: 'Por que isso existe',
    texto:
      'Muita gente se afasta da política por achar o assunto confuso, chato ou agressivo. Só que é ela que define o preço da comida, a escola e a segurança da rua. O DECIDA quer ser um ponto de partida: levar as pessoas a buscar conhecimento sobre os temas que moldam a sociedade, entender quais ideais cada lado tem e por que seus defensores os defendem.',
  },
  neutralidade: {
    titulo: 'Como o site se mantém neutro',
    itens: [
      'Os 5 lados recebem a mesma estrutura, a mesma quantidade de conteúdo e o mesmo tom.',
      'Nenhum lado tem cor própria, para não lembrar partidos.',
      'Todo conteúdo tem pelo menos 3 fontes, de veículos e tipos diferentes.',
      'Não há políticos em atividade, partidos ou candidatos no site.',
    ],
  },
  semFinsLucrativos: {
    titulo: 'Sem fins lucrativos',
    texto:
      'O DECIDA não vende nada, não exibe anúncios e não coleta dados. Suas respostas ficam só no seu navegador: nada é gravado nem enviado, e não há rastreamento.',
  },

  // Aba "O projeto": perguntas frequentes, agrupadas por assunto.
  // As respostas descrevem regras do SDD e do código (pontuação, privacidade,
  // fontes); se uma regra mudar, revise a resposta correspondente.
  faq: {
    titulo: 'Perguntas frequentes',
    grupos: [
      {
        nome: 'O teste',
        perguntas: [
          {
            pergunta: 'O teste diz em quem eu devo votar?',
            resposta:
              'Não. O DECIDA mostra de qual lado do espectro político as suas respostas se aproximam. Não há partidos, candidatos ou políticos em nenhuma parte do site, e o resultado não aponta em quem votar.',
          },
          {
            pergunta: 'Como o resultado é calculado?',
            resposta:
              'São 18 afirmações, em três blocos de 6: economia, sociedade, e comércio e relações internacionais. Cada resposta vale de −2 a +2 pontos, e a soma total vai de −36 a +36. Essa soma cai em uma de cinco faixas: esquerda, centro-esquerda, centro, centro-direita ou direita. A seção Metodologia e fontes explica os detalhes.',
          },
          {
            pergunta: 'Se eu concordar com quase tudo, sou empurrado para um lado?',
            resposta:
              'Não. Em cada bloco, 3 afirmações aproximam da esquerda e 3 aproximam da direita quando você concorda. Quem concorda com tudo, ou discorda de tudo, soma zero.',
          },
          {
            pergunta: 'Por que 5 lados, e não só esquerda e direita?',
            resposta:
              'Para dar espaço às posições moderadas. Muita gente não se reconhece em nenhum dos extremos, e as faixas de centro-esquerda, centro e centro-direita mostram isso.',
          },
          {
            pergunta: 'O que é um perfil misto?',
            resposta:
              'É quando seus blocos apontam claramente para lados opostos: por exemplo, mais à esquerda na economia e mais à direita em temas de sociedade. Isso é comum, e por isso o resultado mostra os três blocos separados.',
          },
          {
            pergunta: 'Meu resultado pode mudar?',
            resposta:
              'Pode. Ele mostra uma tendência a partir das suas respostas de hoje. Conforme você se informa, sua posição pode mudar, e você pode refazer o teste quando quiser.',
          },
        ],
      },
      {
        nome: 'Privacidade',
        perguntas: [
          {
            pergunta: 'Minhas respostas ficam salvas em algum lugar?',
            resposta:
              'Não. Elas ficam só na memória do seu navegador enquanto a página está aberta. Nada é gravado nem enviado, não há cookies e não há rastreamento. Se você recarregar a página, o teste recomeça.',
          },
          {
            pergunta: 'Alguém consegue ver o meu resultado?',
            resposta:
              'Não. O cálculo é feito no seu próprio aparelho, e o resultado nunca sai dele.',
          },
          {
            pergunta: 'O site coleta métricas ou repassa meus dados para alguém?',
            resposta:
              'Não. O DECIDA existe só para mostrar de qual lado as suas respostas se aproximam. Ele não usa ferramentas de métricas nem de estatísticas de visita, não exibe anúncios e não envia nenhuma informação sua para outros serviços. Como em qualquer site, a empresa que hospeda a página registra os acessos técnicos a ela, mas suas respostas e seu resultado nunca saem do seu aparelho.',
          },
        ],
      },
      {
        nome: 'Conteúdo e neutralidade',
        perguntas: [
          {
            pergunta: 'De onde vêm as informações?',
            resposta:
              'Cada bloco das fichas e da comparação tem pelo menos 3 fontes, de veículos e tipos diferentes: acadêmicas, institucionais, jornalísticas e de checagem. As definições do glossário usam a lei em vigor ou uma fonte de referência. Todas as fontes estão listadas na seção Metodologia e fontes, com a data em que foram consultadas.',
          },
          {
            pergunta: 'Por que os lados não têm cores?',
            resposta:
              'Porque vermelho, azul, verde e amarelo lembram partidos. Os 5 lados usam as mesmas cores e se diferenciam pelo nome, pela posição e pelas etiquetas.',
          },
          {
            pergunta: 'Como as posições de centro foram definidas na comparação?',
            resposta:
              'Os estudos descrevem principalmente os dois polos, esquerda e direita. As posições de centro-esquerda, centro e centro-direita são gradações entre eles, escritas a partir dessas fontes.',
          },
          {
            pergunta: 'Encontrei um erro. O que faço?',
            resposta:
              'Confira a fonte original, que está ao lado de cada conteúdo, e desconfie também deste site. Se o erro for nosso, conte pelo GitHub do projeto, na aba Quem faz.',
          },
        ],
      },
      {
        nome: 'O projeto',
        perguntas: [
          {
            pergunta: 'O DECIDA é ligado a algum partido, governo ou candidato?',
            resposta:
              'Não. É um projeto independente, sem investidor, agência, partido ou campanha por trás. Saiba mais na aba Quem faz.',
          },
          {
            pergunta: 'O site cobra alguma coisa?',
            resposta:
              'Não. O DECIDA é gratuito e não exibe anúncios. Quem quiser pode apoiar com qualquer valor, de forma voluntária. O apoio não é doação eleitoral nem apoio partidário.',
          },
        ],
      },
    ],
    naoAchou: 'Não encontrou sua resposta?',
    falarComigo: 'VER QUEM FAZ',
  },

  // Aba "Quem faz"
  quemFaz: {
    titulo: 'Quem faz',
    paragrafos: [
      'O DECIDA é um projeto independente: não tem investidor, agência, partido ou campanha por trás. É desenvolvido por uma única pessoa, por conta própria.',
      // A confirmar com o autor
      'Não recebo dinheiro de partido, de candidato, de campanha nem de órgão público, e não trabalho para nenhum deles.',
    ],
    github: 'VER NO GITHUB',
    portfolio: 'VER PORTFÓLIO',
  },
  // Formulário "Fale comigo": o site não envia nada. Ao enviar, abre o
  // aplicativo de e-mail da pessoa com a mensagem pronta (link mailto).
  contato: {
    titulo: 'Fale comigo',
    texto:
      'Tem uma dica, sugestão, reclamação ou elogio? Achou um erro em alguma fonte? Escreva abaixo. Toda mensagem é lida.',
    rotuloTipo: 'Sobre o que é a sua mensagem?',
    tipos: ['Dica', 'Sugestão', 'Reclamação', 'Elogio', 'Erro no conteúdo', 'Outro'],
    rotuloMensagem: 'Sua mensagem',
    ajudaMensagem: 'Não precisa contar o seu resultado do teste nem dados pessoais.',
    erroMensagem: 'Escreva a sua mensagem antes de enviar.',
    enviar: 'ENVIAR POR E-MAIL',
    comoFunciona:
      'Ao enviar, o seu aplicativo de e-mail abre com a mensagem pronta para você revisar e mandar. Nada é enviado pelo site.',
    semAplicativo: 'Não abriu nada? Copie o endereço e escreva pelo seu e-mail:',
    copiar: 'COPIAR',
    copiado: 'COPIADO',
    assunto: (tipo: string) => `[DECIDA] ${tipo}`,
  },
  apoio: {
    titulo: 'Apoie o projeto',
    texto:
      'Se o DECIDA te ajudou, considere apoiar o projeto com qualquer valor. Sua contribuição ajuda a pagar infraestrutura, servidores e a manter a ferramenta gratuita para todo mundo.',
    formas: 'Pix • Qualquer valor ajuda',
    botao: 'APOIAR COM PIX',
    emBreve: 'EM BREVE',
    qrCode: 'QR code Pix',
    qrCodeAlt: 'QR code para apoiar o DECIDA via Pix',
    aviso:
      'Não é doação eleitoral nem apoio partidário. O apoio é destinado exclusivamente ao DECIDA.',
  },
  abreEmNovaAba: '(abre em nova aba)',
};

// ---------- Abertura (seção 10) ----------

export const textosAbertura = {
  palavraInicial: 'TALVEZ',
  palavraFinal: 'ENTENDI',
  titulo: 'DECIDA',
  tagline: 'Saiba onde você está.',
  botao: 'COMEÇAR',
  // Dica do rodapé (a seta é desenhada à parte). No celular, depois que o muro cai,
  // o texto troca para "continuar" e a dica fica até o botão aparecer.
  dica: 'Role para descer do muro',
  dicaContinuar: 'Continue rolando',
};

// Etiquetas de indecisão que aparecem em volta do bloco.
// d = posição no computador, m = no celular (null = não aparece no celular)
// x, y: fração da largura/altura em relação ao centro do bloco
// folga: distância mínima ('bloco' | 'muro' | 'nenhuma'); r: rotação em graus
export interface PosicaoEtiqueta {
  x: number;
  y: number;
  folga: 'bloco' | 'muro' | 'nenhuma';
  r: number;
}

export const etiquetasAbertura: { texto: string; d: PosicaoEtiqueta; m: PosicaoEtiqueta | null }[] = [
  { texto: 'DEPENDE', d: { x: -0.27, y: -0.22, folga: 'bloco', r: -3 }, m: { x: -0.2, y: -0.27, folga: 'nenhuma', r: -3 } },
  { texto: 'TANTO FAZ', d: { x: 0.25, y: -0.26, folga: 'bloco', r: 2.5 }, m: { x: 0.18, y: -0.18, folga: 'nenhuma', r: 2.5 } },
  { texto: 'VAMOS VER', d: { x: -0.31, y: 0.04, folga: 'bloco', r: 2 }, m: { x: -0.2, y: 0.12, folga: 'muro', r: 2 } },
  { texto: 'QUEM SABE', d: { x: 0.3, y: -0.03, folga: 'bloco', r: -2 }, m: { x: 0.2, y: 0.22, folga: 'muro', r: -2 } },
  { texto: 'MAIS OU MENOS', d: { x: -0.18, y: 0.21, folga: 'muro', r: -1.5 }, m: null },
  { texto: 'DEPOIS EU VEJO', d: { x: 0.19, y: 0.18, folga: 'muro', r: 3 }, m: null },
  { texto: 'ACHO CHATO', d: { x: -0.37, y: -0.09, folga: 'bloco', r: 1.5 }, m: null },
  { texto: 'NÃO TENHO TEMPO PRA ISSO', d: { x: 0.0001, y: -0.34, folga: 'nenhuma', r: -1.5 }, m: null },
];

// ---------- Seção 02 — Como funciona ----------

export const passosComoFunciona: string[] = [
  'Responda 18 afirmações.',
  'Veja de qual lado suas respostas se aproximam.',
  'Compare os lados e confira as fontes.',
];

// Seção 9.2
export const avisoAntesDeComecar: TextoAviso = {
  titulo: 'ANTES DE COMEÇAR',
  paragrafos: [
    {
      negrito: 'Este teste não decide nada sobre você.',
      texto:
        'São 18 afirmações. O resultado mostra uma tendência a partir das suas respostas de hoje e serve como ponto de partida para você se aprofundar.',
    },
    {
      negrito: 'Nenhum lado é o correto.',
      texto: 'Todos têm pontos positivos, pontos negativos e um histórico de acertos e erros.',
    },
    {
      negrito: 'Não existe resposta certa.',
      texto: 'Responda o que você pensa, e não o que acha que deveria pensar.',
    },
    { texto: 'Suas respostas ficam apenas no seu navegador.' },
  ],
};

export const botaoComecar = 'COMEÇAR';

// Aviso sobre o glossário, mostrado junto aos passos
export const dicaGlossario = {
  titulo: 'PALAVRA DIFÍCIL?',
  texto:
    'Nas afirmações, as palavras sublinhadas têm explicação. No celular, toque no botão com "i" logo abaixo da afirmação. No computador, as explicações aparecem ao lado.',
};

// ---------- Glossário do questionário ----------

export const textosGlossario = {
  rotulo: 'O que significa',
  rotuloBotao: (termo: string) => `O que significa: ${termo}`,
};

// ---------- Seção 03 — Questionário ----------

export const opcoesResposta: { valor: ValorResposta; rotulo: string }[] = [
  { valor: 2, rotulo: 'Concordo totalmente' },
  { valor: 1, rotulo: 'Concordo' },
  { valor: 0, rotulo: 'Neutro / não sei' },
  { valor: -1, rotulo: 'Discordo' },
  { valor: -2, rotulo: 'Discordo totalmente' },
];

export const textosQuestionario = {
  voltar: 'VOLTAR',
  verResultado: 'VER RESULTADO',
  afirmacao: 'Afirmação',
  rotuloBloco: 'Bloco',
  rotuloProgresso: 'Progresso do teste',
};

// Nome de cada bloco, mostrado na etiqueta acima da afirmação (seção 5.3)
export const nomesBloco: Record<Bloco, string> = {
  economia: 'ECONOMIA',
  sociedade: 'SOCIEDADE',
  internacional: 'COMÉRCIO E RELAÇÕES INTERNACIONAIS',
};

// ---------- Seção 04 — Resultado ----------

// Seção 9.3
export const avisoAntesDoResultado: TextoAviso = {
  titulo: 'LEIA ANTES DE VER O RESULTADO',
  paragrafos: [
    {
      negrito: 'Isto é um ponto de partida.',
      texto:
        'Dezoito respostas não resumem uma pessoa, e sua posição pode mudar conforme você se informa.',
    },
    {
      negrito: 'O lado que apareceu não é melhor nem pior que os outros.',
      texto:
        'Abaixo você encontra o que dizem os defensores e os críticos de cada lado, inclusive do seu, e exemplos de políticas que já foram aplicadas no Brasil.',
    },
    {
      negrito: 'Conheça o que os outros defendem.',
      texto: 'Entender uma ideia não obriga ninguém a concordar com ela.',
    },
  ],
};

export const textosResultado = {
  semResultado: 'Responda as 18 afirmações para ver seu resultado.',
  irParaTeste: 'IR PARA O TESTE',
  rotuloResultado: 'Seu resultado',
  frasePrincipal: (nomeComArtigo: string) => `Suas respostas se aproximam ${nomeComArtigo}.`,
  fraseEconomia: (nomeComArtigo: string) =>
    `Na economia, suas respostas se aproximam ${nomeComArtigo}.`,
  fraseSociedade: (nomeComArtigo: string) =>
    `Em temas de sociedade, suas respostas se aproximam ${nomeComArtigo}.`,
  fraseInternacional: (nomeComArtigo: string) =>
    `No comércio e nas relações internacionais, suas respostas se aproximam ${nomeComArtigo}.`,
  tituloPorQue: 'Por que esse resultado',
  suaResposta: 'Sua resposta:',
  aproximouEsquerda: 'Aproximou você da esquerda',
  aproximouDireita: 'Aproximou você da direita',
  todasNeutras:
    "Você respondeu 'neutro' em todas as afirmações. Leia as fichas dos lados e refaça o teste quando quiser.",
  conhecerLados: 'CONHECER OS LADOS',
  refazer: 'REFAZER O TESTE',
  rotuloEspectro: 'Posição no espectro',
  descricaoEspectro: (total: number) =>
    `Sua soma foi ${total}, numa escala de −36 (esquerda) a +36 (direita).`,
};

// Seção 9.4
export const textoPerfilMisto = {
  titulo: 'SEU PERFIL É MISTO.',
  texto: (tendenciaEconomia: string, tendenciaSociedade: string, tendenciaInternacional: string) =>
    `Suas respostas apontam para lados diferentes conforme o assunto. Na economia, elas se aproximam ${tendenciaEconomia}; em temas de sociedade, ${tendenciaSociedade}; em comércio e relações internacionais, ${tendenciaInternacional}. Isso é comum e mostra que uma palavra só não resume o que você pensa.`,
};

// ---------- Seção 05 — Os 5 lados ----------

// Rótulos da ficha e nota dos pensadores (seção 9.8)
export const textosLados = {
  seuResultado: 'SEU RESULTADO',
  resumo: 'EM RESUMO',
  ideiasCentrais: 'NO QUE ACREDITA',
  modeloEconomico: 'COMO VÊ A ECONOMIA',
  argumentosDefensores: 'O QUE DIZEM SEUS DEFENSORES',
  argumentosCriticos: 'O QUE DIZEM SEUS CRÍTICOS',
  pensadores: 'PENSADORES DE REFERÊNCIA',
  notaPensadores:
    'Autores cujas ideias ajudam a entender este lado. Eles não resumem tudo o que o lado pensa, e nem todos usavam esse rótulo para si.',
};

// ---------- Seção 06 — Comparação ----------

export const textosComparacao = {
  compararAPartirDe: 'Comparar a partir de:',
  posicaoDe: (nome: string) => `Posição: ${nome}`,
  criticaComum: 'Crítica mais comum',
  argumento: 'Principal argumento',
  outrosLados: 'Os outros lados',
  posicao: 'Posição',
};

// Rótulos e nota do bloco "Na prática" (seção 9.8)
export const textosNaPratica = {
  titulo: 'NA PRÁTICA',
  oQueFoi: 'O que foi',
  defensores: 'O que destacam os defensores',
  criticos: 'O que destacam os críticos',
  nota: 'Um exemplo de política que já foi aplicada no Brasil. Um caso só não prova que uma ideia sempre funciona ou sempre falha.',
};

// ---------- Etiquetas e fontes ----------

export const textosConteudo = {
  emRevisao: 'CONTEÚDO EM REVISÃO',
  fontes: (n: number) => `FONTES (${n})`,
  acessadoEm: 'Acessado em',
  abreEmNovaAba: '(abre em nova aba)',
};

export const nomesTipoFonte: Record<TipoFonte, string> = {
  academica: 'Acadêmicas',
  institucional: 'Institucionais',
  jornalistica: 'Jornalísticas',
  checagem: 'Checagem',
};

// ---------- Seção 07 — Metodologia (seção 9.6) ----------

export const textoMetodologia = {
  comoFunciona: {
    titulo: 'COMO O TESTE FUNCIONA',
    texto:
      'São 18 afirmações, em três blocos de 6: economia, sociedade, e comércio e relações internacionais. Em cada bloco, metade das afirmações aproxima da esquerda quando você concorda; a outra metade aproxima da direita. Cada resposta vale de −2 a +2 pontos, e a soma vai de −36 a +36. Essa soma é dividida em cinco faixas: esquerda, centro-esquerda, centro, centro-direita e direita.',
  },
  oQueNaoFaz: {
    titulo: 'O QUE ESTE TESTE NÃO FAZ',
    itens: [
      'Dezoito afirmações não cobrem tudo o que a política discute. O resultado é uma tendência, não um diagnóstico.',
      'A divisão entre esquerda e direita é uma simplificação. Muita gente pensa de um jeito na economia e de outro nos costumes; por isso mostramos os três blocos separados.',
      'Em comércio e relações internacionais, a divisão entre os lados é menos nítida do que nos outros blocos: posições nacionalistas, por exemplo, aparecem tanto à esquerda quanto à direita.',
      'Os limites entre as faixas são uma escolha nossa, e podem ser ajustados.',
      'Este site trata de posições que disputam ideias dentro da democracia.',
    ],
  },
  deOndeVem: {
    titulo: 'DE ONDE VÊM AS INFORMAÇÕES',
    paragrafos: [
      'Cada bloco de conteúdo das fichas e da comparação tem pelo menos 3 fontes, de veículos e tipos diferentes: acadêmicas, institucionais, jornalísticas e de checagem. As definições do glossário usam a lei em vigor ou uma fonte de referência. Todas estão listadas abaixo, com a data em que foram consultadas. Encontrou um erro? Confira a fonte original e desconfie também deste site.',
      'Na comparação por temas, os estudos descrevem principalmente os dois polos, esquerda e direita. As posições de centro-esquerda, centro e centro-direita são gradações entre eles, escritas por nós a partir dessas fontes.',
      'Nas fichas, os blocos "o que dizem seus defensores" e "o que dizem seus críticos" relatam argumentos que aparecem nas fontes. Eles não são a opinião deste site. Os pensadores de referência têm pelo menos 2 fontes cada.',
      'Os episódios "Na prática" mostram políticas que já foram aplicadas no Brasil. Eles ilustram uma ideia, não são atribuídos a nenhum lado, e um único caso não prova que uma ideia sempre funciona ou sempre falha.',
    ],
  },
  todasAsFontes: 'Todas as fontes',
  semFontes: 'Nenhuma fonte cadastrada ainda.',
};

// ---------- Seção 08 — Aviso final (seção 9.5) ----------

export const textoAvisoFinal = {
  titulo: 'SEU RESULTADO É UM PONTO DE PARTIDA.',
  paragrafo1:
    'Todo dia chega até você uma manchete, um vídeo, uma mensagem no grupo da família. Entre receber e reagir existe um intervalo. É nele que você deixa de repetir o que ouviu e passa a escolher o que pensa.',
  paragrafo2:
    'A política define o preço da comida, a escola dos seus filhos e a segurança da sua rua, com ou sem a sua opinião. Confira as fontes, forme a sua convicção e defenda o que você acredita: no voto, na conversa e na cobrança de quem você elegeu.',
  fechamento: 'NÃO ESCOLHER TAMBÉM É UMA ESCOLHA.',
  // Linha personalizada conforme o resultado
  linhaLado: (nomeComArtigo: string) =>
    `Você se aproximou ${nomeComArtigo}. Use esse intervalo: leia o melhor argumento de quem pensa o oposto.`,
  linhaCentro:
    'Você se aproximou do centro. Use esse intervalo: leia o melhor argumento da esquerda e o melhor argumento da direita.',
  linhaSemResultado:
    'Ainda não fez o teste? Use esse intervalo: leia o que cada lado defende antes de formar opinião.',
};

// ---------- Footer (seção 9.7) ----------

export const textoRodape = {
  citacao: '"Quem não recorda o passado está condenado a repeti-lo."',
  autorCitacao: 'George Santayana',
  obraCitacao: 'The Life of Reason',
  anoCitacao: '(1905)',
  // Texto a confirmar com o autor (seção 15 do SDD)
  semVinculo: 'Conteúdo informativo, sem vínculo com partidos, candidatos ou governos.',
  privacidade: 'Suas respostas não são armazenadas nem enviadas a lugar nenhum.',
  atualizado: (data: string) => `Conteúdo atualizado em ${data}.`,
  linkMetodologia: 'Metodologia e fontes',
  // Links que abrem o painel "Sobre" direto no trecho
  rotuloLinks: 'Mais sobre o DECIDA',
  linkFaq: 'FAQ',
  linkApoie: 'Apoie',
  linkQuemFaz: 'Quem faz',
  linkContato: 'Contato',
};

// Converte AAAA-MM-DD em DD/MM/AAAA
export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}
