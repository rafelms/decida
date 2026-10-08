import type { Fonte, Lado, Pensador } from '../tipos';

// Fichas dos 5 lados (SDD v1.3, seções 5.5 e 6.2).
//
// Estrutura de cada ficha:
//   resumo               -> "Em resumo"
//   ideiasCentrais       -> "No que acredita" (4 itens)
//   modeloEconomico      -> "Como vê a economia"
//   argumentosDefensores -> "O que dizem seus defensores" (4 itens)
//   argumentosCriticos   -> "O que dizem seus críticos" (4 itens)
//   pensadores           -> "Pensadores de referência" (2 pessoas)
//
// O site não julga: ele relata o que defensores e críticos dizem.
// Os 5 lados têm a mesma quantidade de itens e textos de tamanho parecido.
// Nenhum texto cita partido, candidato ou político brasileiro em atividade.
// Os textos não contradizem as posições do mesmo lado em temas.ts.
// NÃO altere os textos: eles foram aprovados pelo autor.

// Data em que todas as fontes abaixo foram consultadas
const ACESSO = '2026-10-07';

// Cria uma fonte
function fonte(titulo: string, veiculo: string, tipo: Fonte['tipo'], url: string): Fonte {
  return { titulo, veiculo, tipo, url, acessadoEm: ACESSO };
}

// Cria um pensador de referência
function pensador(nome: string, quemFoi: string, texto: string, fontes: Fonte[]): Pensador {
  return { nome, quemFoi, relacao: { texto, fontes } };
}

// ---------- Fontes sobre as ideias dos lados ----------
// (as mesmas usadas em temas.ts, declaradas de novo para o arquivo ficar completo)

const SCHEEFFER = fonte(
  'Ideologia e comportamento parlamentar na Câmara dos Deputados (Fernando Scheeffer, 2018)',
  'Revista Teoria & Pesquisa',
  'academica',
  'https://teoriaepesquisa.ufscar.br/index.php/tp/article/download/670/409/1232',
);
const BRESSER = fonte(
  'A Nova Centro-Esquerda (Luiz Carlos Bresser-Pereira, 1999)',
  'Revista Século XXI',
  'academica',
  'https://eaesp.fgv.br/sites/default/files/legacy/pesquisa-eaesp-files/arquivos/bresser_-_novacentroesquerda.pdf',
);
const BOLOGNESI = fonte(
  'Uma nova classificação ideológica dos partidos políticos brasileiros (Bolognesi, Ribeiro e Codato, 2023)',
  'Dados — Revista de Ciências Sociais',
  'academica',
  'https://scielo.br/j/dados/a/zzyM3gzHD4P45WWdytXjZWg/?format=pdf',
);
const O_POVO = fonte(
  'Direita, esquerda, centro: qual a origem destes termos na política e quais suas diferenças (22/11/2020)',
  'O Povo',
  'jornalistica',
  'https://www.opovo.com.br/noticias/politica/2020/11/22/direita--esquerda--centro--qual-a-origem-destes-termos-na-politica-e-quais-suas-diferencas.html',
);
const SENADO_IMPOSTOS = fonte(
  'Por que a fórmula de cobrança de impostos do Brasil piora a desigualdade social (28/05/2021)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/infomaterias/2021/05/por-que-a-formula-de-cobranca-de-impostos-do-brasil-piora-a-desigualdade-social',
);
const SENADO_SIMPLIFICACAO = fonte(
  'Debatedores defendem simplificação do sistema tributário (29/08/2019)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/materias/2019/08/29/debatedores-defendem-simplificacao-do-sistema-tributario',
);
const SENADO_PRIVATIZACAO = fonte(
  'Privatização: desmonte do Estado ou modernização de empresas ineficientes? (24/02/2023)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/infomaterias/2023/02/privatizacao-desmonte-do-estado-ou-modernizacao-de-empresas-ineficientes',
);
const SENADO_ENCARCERAMENTO = fonte(
  'Pacote anticrime pode aumentar encarceramento de negros e pobres, aponta debate na CCJ (08/08/2019)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/materias/2019/08/08/pacote-anticrime-pode-aumentar-encarceramento-de-negros-e-pobres-aponta-debate-na-ccj-1',
);
const MATERIA_CARGA_EMPRESAS = fonte(
  'Aumento de CSLL e JCP agrava carga tributária, prejudica produção e gera incertezas, diz Fiesp (02/09/2024)',
  'Folha Vitória',
  'jornalistica',
  'https://www.folhavitoria.com.br/economia/aumento-de-csll-e-jcp-agrava-carga-tributaria-prejudica-producao-e-gera-incertezas-diz-fiesp/',
);
const IPEA_TRANSFERENCIA = fonte(
  'Programas focalizados de transferência de renda no Brasil: contribuições para o debate (Medeiros, Britto e Soares, 2007)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/c102e3fb-255f-4866-81ea-99b58a5c7752/content',
);
const IPEA_ABERTURA = fonte(
  'Abertura comercial em debate (revista Desafios do Desenvolvimento, novembro de 2005)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/5910a89a-6385-4709-a59b-8e3763aa4c48/content',
);
const PESQUISA_COSTUMES = fonte(
  'Pesquisa Datafolha mostra que Brasil continua conservador (26/03/2024)',
  'Jornal Opção',
  'jornalistica',
  'https://www.jornalopcao.com.br/brasil/pesquisa-datafolha-mostra-que-brasil-continua-conservador-592242/',
);
const ONUKI_OLIVEIRA = fonte(
  'Eleições, política externa e integração regional (Janina Onuki e Amâncio Jorge de Oliveira, 2006)',
  'Revista de Sociologia e Política',
  'academica',
  'https://www.redalyc.org/pdf/238/23802710.pdf',
);
const MARCON_PEREIRA = fonte(
  'Globalização e a política externa brasileira, 2003-2010 (João Paulo Marcon e Alexsandro Pereira, 2013)',
  'Associação Latino-Americana de Ciência Política (ALACIP)',
  'academica',
  'https://alacip.org/cong13/107-marcon-7c.pdf',
);

// ---------- Fontes sobre os pensadores ----------

const SEP_MARX = fonte(
  'Karl Marx (verbete, em inglês)',
  'Stanford Encyclopedia of Philosophy',
  'academica',
  'https://plato.stanford.edu/entries/marx/',
);
const MATERIA_MARX = fonte(
  'No bicentenário de Marx, veja cinco fundamentos do marxismo (04/05/2018)',
  'Jornal do Brasil',
  'jornalistica',
  'https://www.jb.com.br/internacional/noticias/2018/05/04/amp/no-bicentenario-de-marx-veja-cinco-fundamentos-do-marxismo.html',
);
const BROWN_CAIO_PRADO = fonte(
  'Caio Prado Júnior (perfil, em inglês)',
  'Brown University Library',
  'academica',
  'https://library.brown.edu/collections/skidmore/portraits/caioPradoJunior.html',
);
const ARTIGO_CAIO_PRADO = fonte(
  'Anos 1960: Caio Prado Jr. e "A Revolução Brasileira" (José Carlos Reis, 1999)',
  'Revista Brasileira de História',
  'academica',
  'https://www.redalyc.org/pdf/263/26303712.pdf',
);
const MATERIA_KEYNES = fonte(
  'O que é keynesianismo, e sua relação com o pacote bilionário para enfrentar crise do coronavírus (01/04/2020)',
  'InfoMoney',
  'jornalistica',
  'https://www.infomoney.com.br/?p=1423895',
);
const POLITIZE_KEYNES = fonte(
  'Keynesianismo: o que diz essa teoria econômica?',
  'Politize!',
  'jornalistica',
  'https://www.politize.com.br/keynesianismo/',
);
const SENADO_FURTADO = fonte(
  'Biografia de Celso Furtado (02/03/2005)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/materias/2005/03/02/biografia-de-celso-furtado',
);
const MATERIA_FURTADO = fonte(
  'Editorial: Celso Furtado, o intérprete do Brasil (26/07/2020)',
  'O Povo',
  'jornalistica',
  'https://mais.opovo.com.br/colunistas/editorial/2020/07/26/editorial--celso-furtado--o-interprete-do-brasil.html',
);
const SEP_POPPER = fonte(
  'Karl Popper (verbete, em inglês)',
  'Stanford Encyclopedia of Philosophy',
  'academica',
  'https://plato.stanford.edu/entries/popper/',
);
const ARTIGO_POPPER = fonte(
  'Contribuições do racionalismo crítico de Karl Popper para a filosofia política e social contemporânea (Geraldo Armendane, 2009)',
  'Cadernos de Ética e Filosofia Política (USP)',
  'academica',
  'https://revistas.usp.br/cefp/article/view/82605',
);
const ARTIGO_MERQUIOR_1 = fonte(
  'A visão liberal social de José Guilherme Merquior para o Brasil (Anderson Barbosa Paz, 2019)',
  'Cadernos de Campo: Revista de Ciências Sociais (Unesp)',
  'academica',
  'https://periodicos.fclar.unesp.br/cadernos/article/view/13098',
);
const ARTIGO_MERQUIOR_2 = fonte(
  'As ideias de volta ao lugar: o liberalismo social encontra o outro Ocidente na obra de José Guilherme Merquior (2016)',
  'Revista Estudos Políticos (UFF)',
  'academica',
  'https://periodicos.uff.br/revista_estudos_politicos/article/download/39797/22885/133905',
);
const SEP_SMITH = fonte(
  "Adam Smith's Moral and Political Philosophy (verbete, em inglês)",
  'Stanford Encyclopedia of Philosophy',
  'academica',
  'https://plato.stanford.edu/entries/smith-moral-political/',
);
const MATERIA_SMITH = fonte(
  'Quão capitalista era Adam Smith, o "pai do capitalismo" (16/04/2023, reprodução da BBC)',
  'Correio Braziliense',
  'jornalistica',
  'https://www.correiobraziliense.com.br/economia/2023/04/5087715-quao-capitalista-era-adam-smith-o-pai-do-capitalismo.html',
);
const ARTIGO_GUDIN_1 = fonte(
  'Ortodoxia e liberalismo no Brasil contemporâneo: ideias, políticas e personagens (Martins e Salomão, 2018)',
  'Revista FAE',
  'academica',
  'https://revistafae.fae.edu/revistafae/article/download/614/470/1750',
);
const ARTIGO_GUDIN_2 = fonte(
  'Redimensionando a contribuição de Roberto Simonsen à controvérsia do planejamento, 1944-1945 (Curi e Cunha, 2015)',
  'América Latina en la Historia Económica',
  'academica',
  'https://scielo.org.mx/pdf/alhe/v22n3/v22n3a3.pdf',
);
const SEP_BURKE = fonte(
  'Edmund Burke (verbete, em inglês)',
  'Stanford Encyclopedia of Philosophy',
  'academica',
  'https://plato.stanford.edu/entries/burke/',
);
const ARTIGO_BURKE = fonte(
  'Edmund Burke e a gênese do conservadorismo (Jamerson Souza, 2016)',
  'Serviço Social & Sociedade',
  'academica',
  'https://scielo.br/j/sssoc/a/GqXmyVz6Ws4v9dqnfdbgXNC/?format=pdf',
);
const MATERIA_CAMPOS = fonte(
  'Perfil de Roberto Campos publicado por ocasião de sua morte (10/10/2001, reprodução)',
  'Folha de S.Paulo',
  'jornalistica',
  'https://www.bresserpereira.org.br/terceiros/RobertoCampos/Personalidade.PDF',
);
const POLITIZE_CAMPOS = fonte(
  'Roberto Campos (perfil)',
  'Politize!',
  'jornalistica',
  'https://www.politize.com.br/roberto-campos/',
);

// ---------- Lados, na ordem do espectro ----------

export const lados: Lado[] = [
  // ===== Esquerda =====
  {
    id: 'esquerda',
    nome: 'Esquerda',
    nomeComArtigo: 'da esquerda',
    resumo:
      'A esquerda coloca a igualdade em primeiro lugar. Defende um Estado forte, que conduza a economia, ofereça serviços públicos a todos e reduza a distância entre ricos e pobres. Nos costumes, tende a apoiar a ampliação de direitos individuais e de minorias.',
    ideiasCentrais: {
      itens: [
        'A pobreza vem sobretudo da desigualdade, e não de escolhas individuais. Reduzir a desigualdade é a principal tarefa da política.',
        'Serviços essenciais, como saúde, educação e energia, devem ser oferecidos pelo Estado.',
        'Cada pessoa deve decidir sobre a própria vida, e a lei deve proteger grupos que sofrem discriminação.',
        'O Brasil deve buscar autonomia diante das grandes potências, em aliança com outros países em desenvolvimento.',
      ],
      fontes: [SCHEEFFER, BRESSER, O_POVO, ONUKI_OLIVEIRA],
    },
    modeloEconomico: {
      texto:
        'Para a esquerda, o mercado sozinho concentra riqueza. Por isso o Estado deve intervir sempre que julgar necessário: manter empresas estratégicas, agir sobre preços de itens essenciais e proteger a indústria nacional. Para pagar serviços públicos amplos, aceita uma carga de impostos alta, cobrada principalmente de quem tem mais renda e patrimônio. Programas sociais são vistos como direito permanente, e leis trabalhistas amplas, como proteção necessária ao trabalhador.',
      fontes: [SCHEEFFER, BRESSER, SENADO_IMPOSTOS, O_POVO],
    },
    argumentosDefensores: {
      itens: [
        'Põe a redução da pobreza e da desigualdade no centro das decisões.',
        'Garante saúde, educação e proteção a quem não pode pagar por elas.',
        'Protege trabalhadores e grupos discriminados com leis e políticas próprias.',
        'Mantém sob controle do país empresas e recursos considerados estratégicos.',
      ],
      fontes: [SCHEEFFER, SENADO_IMPOSTOS, SENADO_PRIVATIZACAO, O_POVO],
    },
    argumentosCriticos: {
      itens: [
        'Um Estado grande custa caro, é lento e abre espaço para ineficiência.',
        'Impostos altos e muita intervenção desestimulam o investimento e o emprego.',
        'Benefícios permanentes podem criar dependência do governo.',
        'Nos costumes, avança mais rápido do que grande parte da população aceita.',
      ],
      fontes: [SENADO_PRIVATIZACAO, MATERIA_CARGA_EMPRESAS, IPEA_TRANSFERENCIA, PESQUISA_COSTUMES],
    },
    pensadores: [
      pensador(
        'Karl Marx',
        'filósofo e economista alemão (1818–1883)',
        'Em O Capital, descreveu o capitalismo como um sistema que extrai riqueza do trabalho dos operários e afirmou que a história é movida pela luta entre classes. Suas ideias influenciaram grande parte do pensamento de esquerda.',
        [SEP_MARX, MATERIA_MARX],
      ),
      pensador(
        'Caio Prado Júnior',
        'historiador brasileiro (1907–1990)',
        'Em Formação do Brasil Contemporâneo (1942), usou o método de Marx para explicar o país a partir do "sentido da colonização": uma economia montada desde o início para abastecer o mercado externo.',
        [BROWN_CAIO_PRADO, ARTIGO_CAIO_PRADO],
      ),
    ],
  },

  // ===== Centro-esquerda =====
  {
    id: 'centro-esquerda',
    nome: 'Centro-esquerda',
    nomeComArtigo: 'da centro-esquerda',
    resumo:
      'A centro-esquerda busca reduzir a desigualdade sem abrir mão da economia de mercado. Defende que o Estado regule a economia e garanta serviços gratuitos e proteção social, deixando a produção principalmente com as empresas. Nos costumes, apoia direitos de minorias, com mudanças graduais.',
    ideiasCentrais: {
      itens: [
        'Mercado e Estado se completam: um gera riqueza, o outro corrige suas falhas.',
        'Todos devem ter acesso gratuito a saúde e educação, com prioridade para quem mais precisa.',
        'Direitos de minorias devem avançar, de forma gradual e com apoio da sociedade.',
        'O Brasil deve ter muitos parceiros no mundo, sem depender de nenhum deles.',
      ],
      fontes: [BRESSER, BOLOGNESI, MARCON_PEREIRA, O_POVO],
    },
    modeloEconomico: {
      texto:
        'A centro-esquerda aceita a economia de mercado, mas quer um Estado que regule, fiscalize e compense o que o mercado não resolve. Mantém sob controle público as empresas consideradas estratégicas e aceita concessões e parcerias com o setor privado nas demais. Nos impostos, prefere cobrar menos sobre o consumo e mais sobre renda e patrimônio, sem necessariamente aumentar o total. Defende programas de transferência de renda permanentes e serviços sociais gratuitos.',
      fontes: [BRESSER, SENADO_IMPOSTOS, SENADO_PRIVATIZACAO, O_POVO],
    },
    argumentosDefensores: {
      itens: [
        'Combina crescimento econômico com redução da desigualdade.',
        'Mantém a proteção social sem afastar o investimento privado.',
        'Torna os impostos mais justos sem aumentar o total cobrado.',
        'Faz mudanças aos poucos, o que as torna mais duradouras.',
      ],
      fontes: [BRESSER, SENADO_IMPOSTOS, IPEA_TRANSFERENCIA, O_POVO],
    },
    argumentosCriticos: {
      itens: [
        'Para a esquerda, cede demais ao mercado e adia mudanças mais profundas.',
        'Para a direita, mantém um Estado grande e caro demais.',
        'Programas permanentes podem criar dependência e pesar nas contas públicas.',
        'Ao tentar conciliar, pode ficar sem resultado claro em nenhuma das frentes.',
      ],
      fontes: [BRESSER, SCHEEFFER, IPEA_TRANSFERENCIA, O_POVO],
    },
    pensadores: [
      pensador(
        'John Maynard Keynes',
        'economista britânico (1883–1946)',
        'Na Teoria Geral do Emprego, do Juro e da Moeda (1936), defendeu que o governo deve gastar e investir nas crises para garantir empregos, mesmo que precise se endividar. Suas ideias sustentam a economia de mercado com Estado atuante.',
        [MATERIA_KEYNES, POLITIZE_KEYNES],
      ),
      pensador(
        'Celso Furtado',
        'economista brasileiro (1920–2004)',
        'Em Formação Econômica do Brasil (1959), explicou as raízes do subdesenvolvimento do país. Defendeu o planejamento pelo Estado para crescer, distribuir renda e reduzir as desigualdades entre regiões.',
        [SENADO_FURTADO, MATERIA_FURTADO],
      ),
    ],
  },

  // ===== Centro =====
  {
    id: 'centro',
    nome: 'Centro',
    nomeComArtigo: 'do centro',
    resumo:
      'O centro não parte de uma doutrina fixa. Avalia cada tema pelo resultado esperado e combina propostas da esquerda e da direita conforme o caso. Costuma defender mudanças graduais, negociação e estabilidade das regras.',
    ideiasCentrais: {
      itens: [
        'Nenhum lado tem todas as respostas; boas soluções podem vir de qualquer um.',
        'O que importa é o serviço funcionar, seja ele público ou privado.',
        'Mudanças devem ser graduais e negociadas, sem rupturas.',
        'Regras estáveis valem mais do que a vitória de um lado sobre o outro.',
      ],
      fontes: [O_POVO, BOLOGNESI, SENADO_PRIVATIZACAO, SENADO_SIMPLIFICACAO],
    },
    modeloEconomico: {
      texto:
        'O centro decide caso a caso. Privatiza onde há concorrência e boa regulação e mantém empresas públicas onde não há. Prioriza simplificar os impostos, sem aumentar o total cobrado. Apoia programas sociais focados nos mais pobres, com exigências como manter os filhos na escola e com avaliação de resultados. No comércio exterior, prefere abrir o mercado de forma gradual, dando tempo para as empresas se adaptarem.',
      fontes: [SENADO_PRIVATIZACAO, SENADO_SIMPLIFICACAO, IPEA_TRANSFERENCIA, IPEA_ABERTURA, O_POVO],
    },
    argumentosDefensores: {
      itens: [
        'Evita os excessos dos dois polos e reduz a polarização.',
        'Facilita acordos, porque conversa com todos os lados.',
        'Decide com base em resultados, e não em doutrina.',
        'Dá estabilidade: as regras não mudam por completo a cada eleição.',
      ],
      fontes: [O_POVO, SENADO_SIMPLIFICACAO, IPEA_TRANSFERENCIA],
    },
    argumentosCriticos: {
      itens: [
        'Sem posição definida, pode mudar de lado conforme a conveniência do momento.',
        'Ao ficar no meio, evita decisões difíceis e adia problemas.',
        'É difícil saber o que esperar dele: falta um projeto claro de país.',
        'A busca por acordo pode conservar as coisas como estão.',
      ],
      fontes: [O_POVO, BOLOGNESI, BRESSER],
    },
    pensadores: [
      pensador(
        'Karl Popper',
        'filósofo austríaco-britânico (1902–1994)',
        'Em A Sociedade Aberta e Seus Inimigos (1945), defendeu reformas graduais, feitas problema por problema e corrigidas pelo caminho, em vez de grandes planos para refazer a sociedade inteira.',
        [SEP_POPPER, ARTIGO_POPPER],
      ),
      pensador(
        'José Guilherme Merquior',
        'ensaísta e diplomata brasileiro (1941–1991)',
        'Em O Liberalismo: Antigo e Moderno (1991), defendeu o liberalismo social: mercado livre combinado com um Estado que amplie as oportunidades, um caminho entre o mercado sem regras e o socialismo.',
        [ARTIGO_MERQUIOR_1, ARTIGO_MERQUIOR_2],
      ),
    ],
  },

  // ===== Centro-direita =====
  {
    id: 'centro-direita',
    nome: 'Centro-direita',
    nomeComArtigo: 'da centro-direita',
    resumo:
      'A centro-direita defende a economia de mercado com regras claras. Quer um Estado menor, que fiscalize e ofereça uma proteção básica, deixando a produção com as empresas. Nos costumes, valoriza a família e as tradições, com mudanças lentas.',
    ideiasCentrais: {
      itens: [
        'Empresas competindo entregam mais e melhor do que o Estado produzindo.',
        'O Estado deve cuidar das regras, da fiscalização e de uma proteção básica.',
        'A ajuda do governo deve ser uma ponte para a pessoa voltar a se sustentar.',
        'Tradições dão estabilidade à sociedade e devem mudar devagar.',
      ],
      fontes: [SCHEEFFER, BRESSER, SENADO_PRIVATIZACAO, O_POVO],
    },
    modeloEconomico: {
      texto:
        'A centro-direita quer menos impostos sobre empresas e produção e é contra criar novos tributos; espera equilibrar as contas com crescimento e controle de gastos. Defende privatizar a maior parte das estatais e conceder a infraestrutura, com agências reguladoras fiscalizando. Aceita programas para os mais pobres, limitados no valor e no tempo e ligados a trabalho e qualificação. No comércio exterior, busca acordos com as grandes economias.',
      fontes: [SCHEEFFER, SENADO_PRIVATIZACAO, MATERIA_CARGA_EMPRESAS, ONUKI_OLIVEIRA],
    },
    argumentosDefensores: {
      itens: [
        'Estimula o investimento, a produção e a geração de empregos.',
        'Cuida do equilíbrio das contas públicas e evita o aumento da dívida.',
        'Mantém uma rede de proteção sem criar dependência permanente.',
        'Aproxima o país dos maiores mercados e de investidores.',
      ],
      fontes: [SENADO_PRIVATIZACAO, MATERIA_CARGA_EMPRESAS, ONUKI_OLIVEIRA, MARCON_PEREIRA],
    },
    argumentosCriticos: {
      itens: [
        'Menos arrecadação significa menos dinheiro para saúde, educação e programas sociais.',
        'Com fiscalização fraca, a privatização pode encarecer serviços.',
        'Limitar a ajuda no tempo pode devolver famílias à pobreza.',
        'Manter tudo como está conserva desigualdades que atingem minorias.',
      ],
      fontes: [SENADO_IMPOSTOS, SENADO_PRIVATIZACAO, IPEA_TRANSFERENCIA, O_POVO],
    },
    pensadores: [
      pensador(
        'Adam Smith',
        'filósofo e economista escocês (1723–1790)',
        'Em A Riqueza das Nações (1776), defendeu que pessoas buscando o próprio interesse, em concorrência, acabam gerando prosperidade para todos. Reservava ao Estado a justiça, a defesa, certas obras públicas e a educação.',
        [SEP_SMITH, MATERIA_SMITH],
      ),
      pensador(
        'Eugênio Gudin',
        'economista brasileiro (1886–1986)',
        'Nos anos 1940, em um debate que marcou a economia brasileira, defendeu o mercado livre e a integração do país ao comércio mundial e criticou o planejamento da indústria pelo Estado.',
        [ARTIGO_GUDIN_1, ARTIGO_GUDIN_2],
      ),
    ],
  },

  // ===== Direita =====
  {
    id: 'direita',
    nome: 'Direita',
    nomeComArtigo: 'da direita',
    resumo:
      'A direita coloca a liberdade econômica e a responsabilidade individual em primeiro lugar. Defende um Estado pequeno, impostos baixos e mercado livre. Nos costumes e na segurança, defende valores tradicionais e punição rigorosa para quem comete crimes.',
    ideiasCentrais: {
      itens: [
        'O mercado se regula sozinho, e cada pessoa decide melhor que o governo como usar o próprio dinheiro.',
        'O Estado deve ser o menor possível: segurança, justiça e pouco mais.',
        'Cada um é responsável pelas próprias escolhas, inclusive quando comete um crime.',
        'Família, religião e tradição são a base da sociedade e devem ser preservadas pelas leis.',
      ],
      fontes: [SCHEEFFER, BRESSER, O_POVO],
    },
    modeloEconomico: {
      texto:
        'Para a direita, imposto pesa sobre quem produz. Por isso defende um corte amplo de impostos, acompanhado de corte de gastos, e a passagem à iniciativa privada de tudo o que ela puder operar. A proteção das pessoas deve vir do trabalho, da família e do mercado; a ajuda do governo fica para o último caso, pequena e por pouco tempo. Defende regras trabalhistas mais flexíveis e tarifas de importação baixas, para aumentar a concorrência.',
      fontes: [SCHEEFFER, BRESSER, MATERIA_CARGA_EMPRESAS, O_POVO],
    },
    argumentosDefensores: {
      itens: [
        'Dá liberdade para trabalhar, empreender e decidir sobre o próprio dinheiro.',
        'Um Estado menor custa menos e interfere menos na vida das pessoas.',
        'A concorrência baixa preços e obriga as empresas a melhorar.',
        'Punição rigorosa e valores tradicionais dão ordem e segurança.',
      ],
      fontes: [SCHEEFFER, SENADO_PRIVATIZACAO, IPEA_ABERTURA, O_POVO],
    },
    argumentosCriticos: {
      itens: [
        'Sem o Estado, quem não pode pagar fica sem saúde, educação e proteção.',
        'Cortes amplos favorecem mais quem tem renda alta e aumentam a desigualdade.',
        'Punir mais lotou as cadeias sem reduzir a violência, e atinge mais pobres e negros.',
        'Impõe a todos regras baseadas na moral ou na religião de uma parte da população.',
      ],
      fontes: [SENADO_IMPOSTOS, SENADO_ENCARCERAMENTO, SCHEEFFER, O_POVO],
    },
    pensadores: [
      pensador(
        'Edmund Burke',
        'pensador e parlamentar irlandês do século XVIII',
        'Em Reflexões sobre a Revolução na França (1790), criticou a tentativa de refazer a sociedade do zero e defendeu preservar as instituições e tradições herdadas. Seu pensamento é apontado como a origem do conservadorismo.',
        [SEP_BURKE, ARTIGO_BURKE],
      ),
      pensador(
        'Roberto Campos',
        'economista e diplomata brasileiro (1917–2001)',
        'Nas últimas décadas de vida, tornou-se o defensor mais conhecido, no Brasil, do Estado pequeno, das privatizações e da abertura ao capital estrangeiro. Reuniu suas memórias em A Lanterna na Popa (1994).',
        [MATERIA_CAMPOS, POLITIZE_CAMPOS],
      ),
    ],
  },
];
