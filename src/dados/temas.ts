import type { Fonte, LadoId, PosicaoNoTema, Tema } from '../tipos';

// Os 8 temas da comparação (SDD, seções 5.6 e 6.3).
//
// Como ler o campo "valor" (1 a 5): é a posição do lado na escala do tema.
// O que significam os extremos de cada escala está no comentário de cada tema.
//
// Sobre as fontes: os estudos descrevem principalmente os dois polos
// (esquerda e direita). As posições de centro-esquerda, centro e
// centro-direita são gradações entre eles, escritas a partir dessas fontes.
// A página de metodologia avisa isso ao leitor.
//
// Nenhum texto cita partido, candidato ou político. As fontes podem citar.

// Data em que todas as fontes abaixo foram consultadas
const ACESSO = '2026-10-07';

// Cria uma fonte
function fonte(titulo: string, veiculo: string, tipo: Fonte['tipo'], url: string): Fonte {
  return { titulo, veiculo, tipo, url, acessadoEm: ACESSO };
}

// Cria a posição de um lado em um tema
function posicao(
  lado: LadoId,
  valor: PosicaoNoTema['valor'],
  texto: string,
  argumento: string,
  criticaComum: string,
): PosicaoNoTema {
  return { lado, valor, posicao: texto, argumento, criticaComum };
}

// ---------- Fontes usadas (cada uma declarada uma única vez) ----------

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
const SENADO_PRIVATIZACAO = fonte(
  'Privatização: desmonte do Estado ou modernização de empresas ineficientes? (24/02/2023)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/infomaterias/2023/02/privatizacao-desmonte-do-estado-ou-modernizacao-de-empresas-ineficientes',
);
const PESQUISA_PRIVATIZACAO = fonte(
  '45% dos brasileiros são contra privatizações, diz Datafolha (09/04/2023)',
  'Poder360',
  'jornalistica',
  'https://www.poder360.com.br/pesquisas/38-dos-brasileiros-sao-a-favor-de-privatizacoes-diz-datafolha/',
);
const TESE_SEGURANCA = fonte(
  'Entre esquerdas e direitas: o debate parlamentar brasileiro sobre segurança pública e justiça criminal, 2003-2021 (Marcelo Santos, 2022)',
  'Universidade do Estado do Rio de Janeiro (UERJ)',
  'academica',
  'https://oasisbr.ibict.br/vufind/Record/UERJ_fb3ee99b34879c9738e29f35d2f74087',
);
const SENADO_ENCARCERAMENTO = fonte(
  'Pacote anticrime pode aumentar encarceramento de negros e pobres, aponta debate na CCJ (08/08/2019)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/materias/2019/08/08/pacote-anticrime-pode-aumentar-encarceramento-de-negros-e-pobres-aponta-debate-na-ccj-1',
);
const SENADO_PENAS = fonte(
  'Comissão de Segurança Pública pode votar projetos que endurecem penas (24/01/2025)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/materias/2025/01/24/comissao-de-seguranca-publica-pode-votar-projetos-que-endurecem-penas',
);
const SENADO_PEC_SEGURANCA = fonte(
  'PEC da Segurança Pública: o que muda e por que causa polêmica? (25/04/2025)',
  'Agência Senado',
  'institucional',
  'https://www12.senado.leg.br/noticias/infomaterias/2025/04/pec-da-seguranca-publica-o-que-muda-e-por-que-causa-polemica',
);
const MATERIA_PENAS = fonte(
  'Endurecimento de penas favorece facções criminosas, advertem especialistas (14/03/2024)',
  'Congresso em Foco',
  'jornalistica',
  'https://congressoemfoco.com.br/noticia/8728/endurecimento-de-penas-favorece-faccoes-criminosas-advertem-especialistas',
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
const IPEA_ABERTURA = fonte(
  'Abertura comercial em debate (revista Desafios do Desenvolvimento, novembro de 2005)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/5910a89a-6385-4709-a59b-8e3763aa4c48/content',
);
const IPEA_MERCOSUL = fonte(
  'Relacionamento externo do Mercosul: fundamentos históricos, dilemas contemporâneos e perspectivas futuras (Boletim de Economia e Política Internacional, n. 35, 2023)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/6c96634c-1734-408e-80d8-9649d1be2577/content',
);
const MATERIA_MERCOSUL = fonte(
  'Mercosul comemora 30 anos em meio a tensões crescentes (29/03/2021)',
  'Dialogue Earth',
  'jornalistica',
  'https://dialogue.earth/pt-br/?p=50041802',
);
const MARCON_PEREIRA = fonte(
  'Globalização e a política externa brasileira, 2003-2010 (João Paulo Marcon e Alexsandro Pereira, 2013)',
  'Associação Latino-Americana de Ciência Política (ALACIP)',
  'academica',
  'https://alacip.org/cong13/107-marcon-7c.pdf',
);
const IPEA_ALINHAMENTO = fonte(
  'O desafio do alinhamento externo (Renato Baumann, capítulo 8 de Percurso Incompleto: a política econômica externa do Brasil, 2023)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/976976b1-f5ae-4b3a-a608-8c1bb6831a80/content',
);
const MATERIA_OCDE = fonte(
  'A OCDE, a política externa e as políticas públicas no Brasil (10/02/2025)',
  'Le Monde Diplomatique Brasil',
  'jornalistica',
  'https://diplomatique.org.br/a-ocde-a-politica-externa-e-as-politicas-publicas-no-brasil/',
);

// ---------- Fontes dos episódios históricos ("Na prática") ----------

// Cria uma fonte que é uma lei ou decreto publicado no site do Planalto
function lei(titulo: string, url: string): Fonte {
  return fonte(titulo, 'Presidência da República (Planalto)', 'institucional', url);
}

const LEI_SUS = lei(
  'Lei nº 8.080/1990 — Lei Orgânica da Saúde (arts. 2º e 7º)',
  'https://www.planalto.gov.br/ccivil_03/leis/l8080.htm',
);
const OPAS_SUS = fonte(
  'Relatório 30 anos de SUS, que SUS para 2030? (2018)',
  'Organização Pan-Americana da Saúde (OPAS/OMS)',
  'institucional',
  'https://iris.paho.org/handle/10665.2/49663',
);
const EDITORIAL_SUS = fonte(
  'Sistema Único de Saúde: 30 anos de luta! (Paim, Temporão, Penna, Santos e Pinto, 2018)',
  'Ciência & Saúde Coletiva',
  'academica',
  'https://scielosp.org/pdf/csc/2018.v23n6/1704-1704/pt',
);
const LEI_DESONERACAO = lei(
  'Lei nº 12.546/2011 — Contribuição sobre a receita bruta no lugar da folha (arts. 7º e 8º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12546.htm',
);
const IPEA_DESONERACAO = fonte(
  'Impacto da desoneração da folha de pagamento sobre o emprego: novas evidências (Garcia, Sachsida e Carvalho, Texto para Discussão 2357, 2018)',
  'Ipea',
  'institucional',
  'https://ideas.repec.org/p/ipe/ipetds/2357.html',
);
const ESTUDO_DESONERACAO = fonte(
  'Desoneração da folha de pagamentos: efeitos no emprego e nos salários (Clóvis Scherer, boletim Mercado de Trabalho, out. 2015; cópia hospedada pelo Poder360)',
  'Ipea',
  'institucional',
  'https://static.poder360.com.br/2024/05/efeito-desoneracao-ipea.pdf',
);
const MATERIA_DESONERACAO = fonte(
  'Setores beneficiados com desoneração da folha são os que menos empregam (16/04/2026)',
  'Monitor Mercantil',
  'jornalistica',
  'https://monitormercantil.com.br/setores-beneficiados-com-desoneracao-da-folha-sao-os-que-menos-empregam/',
);
const MATERIA_TRANSFERENCIA_1 = fonte(
  'Reportagem sobre o estudo do Ipea a respeito dos 15 anos do programa de transferência de renda (07/08/2019)',
  'Gazeta do Povo',
  'jornalistica',
  'https://www.gazetadopovo.com.br/republica/bolsa-familia-barato-eficiente-reduzir-pobreza-desigualdade/',
);
const MATERIA_TRANSFERENCIA_2 = fonte(
  'Ipea diz que Bolsa Família reduziu pobreza e desigualdade em 15 anos (07/08/2019)',
  'Monitor Mercantil',
  'jornalistica',
  'https://monitormercantil.com.br/ipea-diz-que-bolsa-familia-reduziu-pobreza-e-desigualdade-em-15-anos/',
);
const LEI_TELECOMUNICACOES = lei(
  'Lei nº 9.472/1997 — Lei Geral de Telecomunicações',
  'https://www.planalto.gov.br/ccivil_03/leis/l9472.htm',
);
const MATERIA_TELEFONIA_1 = fonte(
  'Concorrência entre telefônicas diminui em 25 anos de privatização (06/08/2023, reprodução da Agência Brasil)',
  'Jornal Grande Bahia',
  'jornalistica',
  'https://jornalgrandebahia.com.br/?p=1085489',
);
const MATERIA_TELEFONIA_2 = fonte(
  'Não foi a privatização que ampliou acesso à telefonia, foi a tecnologia (07/03/2019)',
  'Brasil de Fato',
  'jornalistica',
  'https://www.brasildefato.com.br/2019/03/07/nao-foi-a-privatizacao-que-ampliou-acesso-a-telefonia-foi-a-tecnologia',
);
const LEI_CRIMES_HEDIONDOS = lei(
  'Lei nº 8.072/1990 — Lei de Crimes Hediondos (art. 2º)',
  'https://www.planalto.gov.br/ccivil_03/leis/l8072.htm',
);
const ARTIGO_CRIMES_HEDIONDOS = fonte(
  'Crimes hediondos: análise propedêutica e progressão especial de regime instituída pela Lei 13.769/18 (Fabiana Souto, 2021)',
  'Colloquium Socialis',
  'academica',
  'https://journal.unoeste.br/index.php/cs/article/download/3226/3263/18674',
);
const TEXTO_CRIMES_HEDIONDOS = fonte(
  'Crimes hediondos e suas consequências perante a sociedade',
  'Jus Navigandi',
  'jornalistica',
  'https://jus.com.br/artigos/104028/crimes-hediondos-e-suas-consequencias-perante-a-sociedade',
);
const LEI_COTAS = lei(
  'Lei nº 12.711/2012 — Reserva de vagas em instituições federais de ensino (arts. 1º e 3º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12711.htm',
);
const ARTIGO_COTAS = fonte(
  'Impactos das cotas no ensino superior: um balanço do desempenho dos cotistas nas universidades estaduais (Pinheiro, Pereira e Xavier, 2021)',
  'Revista Brasileira de Educação',
  'academica',
  'https://www.scielo.br/j/rbedu/a/pJbNpfcXxbkPtzwg3CWrSMD/?lang=pt',
);
const MATERIA_COTAS = fonte(
  'Em 10 anos, cotas levam mais pretos, pardos e indígenas à faculdade (29/08/2022)',
  'Correio Braziliense',
  'jornalistica',
  'https://www.correiobraziliense.com.br/euestudante/ensino-superior/2022/08/amp/5032915-em-10-anos-cotas-levam-mais-pretos-pardos-e-indigenas-a-faculdade.html',
);
const IPEA_PRODUTIVIDADE = fonte(
  'Crescimento da produtividade e geração de emprego na indústria brasileira (André Villela e Edward Amadeo, 1994)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/860302f0-284a-403f-b350-eed103260681/content',
);
const FGV_ABERTURA = fonte(
  'Abertura comercial e produtividade: a economia política de uma reforma tarifária (Lia Valls Pereira, 17/04/2018)',
  'Blog do IBRE (FGV)',
  'academica',
  'https://blogdoibre.fgv.br/node/321',
);
const MATERIA_ABERTURA = fonte(
  'Abertura comercial do país sem contrapartidas e na hora errada (13/03/2019)',
  'Monitor Mercantil',
  'jornalistica',
  'https://monitormercantil.com.br/abertura-comercial-do-pa-s-sem-contrapartidas-e-na-hora-errada/',
);
const ACORDO_NDB = lei(
  'Decreto nº 8.624/2015 — Acordo sobre o Novo Banco de Desenvolvimento (arts. 1º e 4º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/decreto/d8624.htm',
);
const IPEA_NDB = fonte(
  'Os novos bancos de desenvolvimento: independência conflitiva ou parcerias estratégicas? (Renato Baumann, Radar n. 43, 2016)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/e3a99676-8626-456d-bc96-0f557d25daf5/content',
);
const MATERIA_NDB = fonte(
  'De Fortaleza a Xangai: banco do BRICS completa 10 anos e desafia modelo de Bretton Woods (05/07/2025)',
  'Brasil de Fato',
  'jornalistica',
  'https://www.brasildefato.com.br/2025/07/05/de-fortaleza-a-xangai-banco-do-brics-completa-10-anos-e-desafia-modelo-de-bretton-woods-sob-lideranca-de-dilma/',
);

// ---------- Temas ----------
//
// Cada tema tem também um episódio "naPratica": uma política que já foi
// aplicada no Brasil, com o que defensores e críticos dizem do resultado.
// O episódio ilustra uma política, e NÃO é atribuído a nenhum dos 5 lados.
// Dos 8 episódios, 4 ilustram políticas de um polo e 4 do outro.

export const temas: Tema[] = [
  // ===== 1. Papel do Estado =====
  // Escala: 1 = Estado amplo, que conduz a economia e presta os serviços
  //         5 = Estado mínimo, limitado a segurança, justiça e regras
  {
    id: 'papel-do-estado',
    nome: 'Papel do Estado',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'O Estado deve conduzir a economia e oferecer diretamente os serviços essenciais, como saúde, educação e energia.',
        'O mercado sozinho concentra riqueza; só o Estado garante que todos tenham acesso ao básico.',
        'Um Estado grande custa caro, é lento e abre espaço para ineficiência.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'O Estado não precisa produzir tudo, mas deve regular a economia e garantir serviços gratuitos, corrigindo o que o mercado não resolve.',
        'O mercado gera riqueza e o Estado compensa suas falhas: os dois se completam.',
        'Para a esquerda, cede demais ao mercado; para a direita, mantém um Estado grande demais.',
      ),
      posicao(
        'centro',
        3,
        'Não tem preferência fixa: quer o Estado presente em algumas áreas e ausente em outras, conforme o resultado.',
        'O que importa é o serviço funcionar, seja ele público ou privado.',
        'Sem posição definida, pode mudar de lado conforme o momento político.',
      ),
      posicao(
        'centro-direita',
        4,
        'O Estado deve cuidar das regras, da fiscalização e de uma proteção básica, deixando a produção para as empresas.',
        'Empresas competindo entregam mais e melhor; cabe ao Estado garantir que as regras sejam cumpridas.',
        'Regras e fiscalização nem sempre bastam para proteger quem tem menos.',
      ),
      posicao(
        'direita',
        5,
        'O Estado deve ser o menor possível: segurança, justiça e pouco mais.',
        'O mercado se regula sozinho, e cada pessoa decide melhor que o governo como usar o próprio dinheiro.',
        'Sem o Estado, quem não pode pagar fica sem saúde, educação e proteção.',
      ),
    ],
    fontes: [SCHEEFFER, BRESSER, BOLOGNESI, O_POVO],
    naPratica: {
      titulo: 'Criação do SUS (1988–1990)',
      oQueFoi:
        'A Constituição de 1988 e a lei que a regulamentou, em 1990, criaram o Sistema Único de Saúde, que oferece atendimento gratuito a toda a população, pago com impostos.',
      defensores:
        'A mortalidade infantil caiu de 85 para 14 mortes por mil nascidos entre 1980 e 2015, e estudos ligam a queda à expansão das equipes de saúde da família.',
      criticos:
        'O sistema recebe menos dinheiro do que precisa, a gestão dividida entre União, estados e municípios é fragmentada, e os tratamentos mais caros dos planos privados acabam no sistema público.',
      fontes: [LEI_SUS, OPAS_SUS, EDITORIAL_SUS],
    },
  },

  // ===== 2. Impostos =====
  // Escala: 1 = carga maior e mais progressiva, para financiar serviços
  //         5 = carga menor e mais simples, para estimular investimento
  {
    id: 'impostos',
    nome: 'Impostos',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Aceita uma carga de impostos alta para financiar o Estado e quer cobrar bem mais de grandes rendas e fortunas.',
        'No Brasil, quem ganha pouco perde uma fatia maior da renda com impostos; cobrar mais de quem tem mais corrige isso.',
        'Imposto alto desestimula o investimento e pode travar a produção e o emprego.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Mantém o total arrecadado, mas muda quem paga: menos imposto sobre o consumo, mais sobre renda e patrimônio.',
        'Dá para reduzir a desigualdade sem aumentar o total de impostos.',
        'Para a direita, ainda pesa sobre quem investe; para a esquerda, é tímido e não amplia os recursos do Estado.',
      ),
      posicao(
        'centro',
        3,
        'Prioriza simplificar o sistema, sem aumentar o total cobrado.',
        'O maior problema é a complexidade; regras simples e iguais para todos já ajudam empresas e contribuintes.',
        'Simplificar não decide quem paga a conta: adia a discussão sobre a desigualdade e sobre o tamanho da carga.',
      ),
      posicao(
        'centro-direita',
        4,
        'Quer reduzir os impostos sobre empresas e produção e é contra criar novos tributos.',
        'A carga já é alta; menos imposto libera dinheiro para investir e contratar, e as contas se equilibram com o crescimento.',
        'Menos arrecadação significa menos dinheiro para saúde, educação e programas sociais.',
      ),
      posicao(
        'direita',
        5,
        'Defende um corte amplo de impostos, acompanhado de corte de gastos do governo.',
        'Imposto pesa sobre quem produz; com menos imposto, as empresas crescem e geram emprego.',
        'Cortes amplos favorecem mais quem tem renda alta e reduzem serviços usados pelos mais pobres.',
      ),
    ],
    fontes: [SCHEEFFER, SENADO_IMPOSTOS, SENADO_SIMPLIFICACAO, MATERIA_CARGA_EMPRESAS],
    naPratica: {
      titulo: 'Desoneração da folha de pagamento (a partir de 2012)',
      oQueFoi:
        'Uma lei de 2011 permitiu que empresas de alguns setores trocassem a contribuição de 20% sobre os salários por uma taxa menor, cobrada sobre o faturamento. A regra começou a valer em 2012.',
      defensores:
        'Um estudo de 2015 encontrou aumento de cerca de 14% no emprego formal dos setores beneficiados.',
      criticos:
        'Um estudo do Ipea de 2018 não encontrou efeito sobre o número de empregos, e um levantamento posterior mostrou que os setores beneficiados perderam 960 mil vagas com carteira entre 2012 e 2022.',
      fontes: [LEI_DESONERACAO, IPEA_DESONERACAO, ESTUDO_DESONERACAO, MATERIA_DESONERACAO],
    },
  },

  // ===== 3. Programas sociais =====
  // Escala: 1 = amplos e permanentes, tratados como direito
  //         5 = restritos e temporários, com foco na saída pelo trabalho
  {
    id: 'programas-sociais',
    nome: 'Programas sociais',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Benefícios e serviços sociais devem ser amplos, permanentes e tratados como direito de todos, oferecidos diretamente pelo Estado.',
        'A pobreza vem sobretudo da desigualdade de oportunidades, e só uma proteção ampla consegue enfrentá-la.',
        'Custa muito e pode gastar com quem não precisa, em vez de concentrar nos mais pobres.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Defende serviços sociais gratuitos e programas de transferência de renda permanentes, com prioridade para quem mais precisa.',
        'Protege a todos e prioriza os mais pobres; o serviço pode ser gratuito sem ser prestado só pelo Estado.',
        'Para a esquerda, priorizar os mais pobres enfraquece a ideia de direito de todos; para a direita, programa permanente cria dependência.',
      ),
      posicao(
        'centro',
        3,
        'Apoia programas focados nos mais pobres, com exigências como manter os filhos na escola e com avaliação de resultados.',
        'Com dinheiro limitado, concentrar nos mais pobres reduz mais a pobreza e a desigualdade.',
        'Não se sabe ao certo quanto as exigências ajudam nem quanto custa fiscalizá-las.',
      ),
      posicao(
        'centro-direita',
        4,
        'Aceita programas para os mais pobres, desde que limitados no valor e no tempo e ligados a trabalho e qualificação.',
        'A ajuda deve ser uma ponte para a pessoa voltar a se sustentar, sem virar renda permanente.',
        'Educação e emprego levam anos para mudar; cortar a ajuda antes disso devolve a família à pobreza.',
      ),
      posicao(
        'direita',
        5,
        'Ajuda do governo só em último caso, pequena e por pouco tempo; a proteção deve vir do trabalho, da família e do mercado.',
        'Crescimento e emprego tiram mais gente da pobreza do que benefícios, e ajuda demais desestimula o trabalho.',
        'Confiar só no mercado deixa sem proteção quem não consegue trabalhar, como crianças, idosos e doentes.',
      ),
    ],
    fontes: [SCHEEFFER, BRESSER, IPEA_TRANSFERENCIA, O_POVO],
    naPratica: {
      titulo: 'Transferência de renda com exigências (a partir de 2003)',
      oQueFoi:
        'A partir de 2003, o governo federal passou a pagar um valor mensal a famílias pobres que mantêm os filhos na escola e a vacinação em dia.',
      defensores:
        'Em 15 anos, o programa reduziu a pobreza extrema em 25% e respondeu por 10% da queda da desigualdade, custando 0,5% de tudo o que o país produz em um ano.',
      criticos:
        'Depois de 15 anos, 64% dos beneficiados continuavam na pobreza extrema, e há quem aponte risco de dependência e falta de uma saída pelo trabalho.',
      fontes: [IPEA_TRANSFERENCIA, MATERIA_TRANSFERENCIA_1, MATERIA_TRANSFERENCIA_2],
    },
  },

  // ===== 4. Privatizações =====
  // Escala: 1 = manter e ampliar estatais
  //         5 = privatizar tudo o que o setor privado puder operar
  {
    id: 'privatizacoes',
    nome: 'Privatizações',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Empresas e serviços estratégicos devem ser do Estado. É contra novas vendas.',
        'Estatais são patrimônio público: as que dão lucro geram receita para a sociedade, e vendê-las pode encarecer serviços.',
        'Estatais deficitárias custam caro ao contribuinte e mudam de rumo a cada governo.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Mantém as estatais estratégicas sob controle público e aceita concessões e parcerias com empresas privadas.',
        'O Estado complementa o mercado: atua onde ele falha, sem precisar fazer tudo sozinho.',
        'Para a esquerda, concessão é privatização disfarçada; para a direita, preserva empresas ineficientes.',
      ),
      posicao(
        'centro',
        3,
        'Decide caso a caso: privatiza onde há concorrência e boa regulação, mantém onde não há.',
        'As estatais são muito diferentes entre si; uma regra única não serve para todas.',
        'Sem critério fixo, a decisão varia conforme a conveniência política do momento.',
      ),
      posicao(
        'centro-direita',
        4,
        'Privatiza a maior parte das estatais e concede a infraestrutura, com agências reguladoras fiscalizando.',
        'Empresas privadas tendem a ser mais competitivas, e o Estado deixa de cobrir prejuízos.',
        'Com regulação fraca, o consumidor paga mais; há risco de vender por preço baixo.',
      ),
      posicao(
        'direita',
        5,
        'Passa à iniciativa privada tudo o que ela puder operar, deixando ao Estado o mínimo.',
        'O mercado se regula sozinho; um Estado menor custa menos e interfere menos.',
        'É simplista supor que o Estado é sempre ineficiente; o país perde empresas estratégicas.',
      ),
    ],
    fontes: [SCHEEFFER, BRESSER, SENADO_PRIVATIZACAO, PESQUISA_PRIVATIZACAO, O_POVO],
    naPratica: {
      titulo: 'Venda das empresas de telefonia (1998)',
      oQueFoi:
        'Em 1997, uma lei criou a agência que regula as telecomunicações. Em 1998, as empresas federais de telefonia foram vendidas a grupos privados.',
      defensores:
        'O país tinha 7,4 milhões de celulares em 1998 e chegou a 251 milhões em 2023; a internet rápida, que não existia, passou de 45 milhões de acessos.',
      criticos:
        'A concorrência prometida diminuiu com as fusões entre empresas, o setor está entre os que mais recebem reclamações, e há quem atribua a expansão à tecnologia mais barata, e não à venda.',
      fontes: [LEI_TELECOMUNICACOES, MATERIA_TELEFONIA_1, MATERIA_TELEFONIA_2],
    },
  },

  // ===== 5. Segurança =====
  // Escala: 1 = prioridade a prevenção e alternativas à prisão
  //         5 = prioridade a punição mais dura e policiamento
  {
    id: 'seguranca',
    nome: 'Segurança',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Prioriza reduzir desigualdades e prevenir o crime. É contra penas mais longas e quer menos gente presa.',
        'O crime nasce sobretudo da falta de oportunidades; prender mais lotou as cadeias sem reduzir a violência.',
        'Subestima a responsabilidade de quem comete o crime e soa como soltar presos.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Combina prevenção social com investigação e integração das polícias; reserva a prisão para crimes graves.',
        'Informação compartilhada e inteligência resolvem mais do que aumentar penas.',
        'Para a direita, é brando com o crime; para a esquerda, mantém a lógica da repressão.',
      ),
      posicao(
        'centro',
        3,
        'Quer punição e prevenção ao mesmo tempo, sem priorizar uma delas.',
        'Nenhuma das duas resolve sozinha; o problema é a falta de coordenação.',
        'Fica no meio do caminho e não define prioridade quando o dinheiro é curto.',
      ),
      posicao(
        'centro-direita',
        4,
        'Defende penas mais longas para crimes violentos e menos benefícios a presos, com mais polícia.',
        'Atende ao que a população pede e impede que o condenado volte a cometer crimes.',
        'Mais presos significa mais gente recrutada pelas facções dentro das cadeias.',
      ),
      posicao(
        'direita',
        5,
        'Punição dura é a prioridade: penas mais longas, redução da maioridade penal e mais liberdade de ação para a polícia.',
        'O crime é escolha de quem o comete; punição severa e certa protege a população.',
        'O endurecimento atinge mais pobres e negros e não reduziu a violência quando foi tentado.',
      ),
    ],
    fontes: [
      SCHEEFFER,
      TESE_SEGURANCA,
      SENADO_ENCARCERAMENTO,
      SENADO_PENAS,
      SENADO_PEC_SEGURANCA,
      MATERIA_PENAS,
    ],
    naPratica: {
      titulo: 'Lei de Crimes Hediondos (1990)',
      oQueFoi:
        'Uma lei de 1990 definiu uma lista de crimes graves e proibiu fiança, perdão da pena e, na versão original, a passagem para regimes mais brandos de prisão.',
      defensores:
        'A lei respondeu ao medo da população diante do aumento da violência e cumpriu a Constituição, que manda tratar com mais rigor os crimes mais graves.',
      criticos:
        'Os crimes e o número de presos continuaram subindo depois da lei, e a proibição de passar a regimes mais brandos foi retirada em 2007.',
      fontes: [LEI_CRIMES_HEDIONDOS, SENADO_ENCARCERAMENTO, ARTIGO_CRIMES_HEDIONDOS, TEXTO_CRIMES_HEDIONDOS],
    },
  },

  // ===== 6. Costumes =====
  // Escala: 1 = ampliar liberdades individuais e direitos de minorias
  //         5 = preservar valores tradicionais e religiosos nas leis
  {
    id: 'costumes',
    nome: 'Costumes',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Defende ampliar direitos em temas como aborto, drogas e união entre pessoas do mesmo sexo, além de ações afirmativas para grupos desfavorecidos.',
        'Cada pessoa deve decidir sobre a própria vida, e a lei deve proteger quem sofre discriminação.',
        'Avança mais rápido do que a maioria da população aceita e contraria valores de famílias e religiões.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Apoia direitos de minorias e ações afirmativas, mas avança com cautela nos temas que mais dividem, como aborto e drogas.',
        'Mudanças duram mais quando são graduais e têm apoio da sociedade.',
        'Para a esquerda, adia direitos; para a direita, já muda costumes demais.',
      ),
      posicao(
        'centro',
        3,
        'Mantém as leis atuais sobre costumes e evita tratar desses temas como prioridade.',
        'As regras em vigor refletem um equilíbrio; mexer nelas divide o país sem resolver problemas urgentes.',
        'Ao evitar o assunto, deixa sem resposta quem pede mudança e quem pede mais rigor.',
      ),
      posicao(
        'centro-direita',
        4,
        'Valoriza a família e os costumes tradicionais e é contra legalizar aborto e drogas, sem retirar direitos já reconhecidos.',
        'Tradições dão estabilidade à sociedade e devem mudar devagar.',
        'Manter tudo como está conserva desigualdades que atingem minorias.',
      ),
      posicao(
        'direita',
        5,
        'Quer que as leis preservem valores tradicionais e religiosos: defende o modelo tradicional de família e é contra aborto, legalização de drogas e ações afirmativas.',
        'Esses valores são a base da família e da sociedade, e grande parte da população os compartilha.',
        'Impõe a todos regras baseadas na moral ou na religião de uma parte da população.',
      ),
    ],
    fontes: [SCHEEFFER, O_POVO, PESQUISA_COSTUMES],
    naPratica: {
      titulo: 'Lei de Cotas nas universidades federais (2012)',
      oQueFoi:
        'Uma lei de 2012 reservou pelo menos metade das vagas das universidades e institutos federais para alunos de escola pública, com parte delas para pretos, pardos, indígenas e pessoas de baixa renda.',
      defensores:
        'A parcela de pretos, pardos e indígenas entre os universitários subiu de 43,7% para 52,4% em dez anos, e estudos encontraram notas parecidas entre cotistas e os demais alunos.',
      criticos:
        'No início, críticos previam queda na qualidade do ensino; hoje, as críticas se concentram na falta de apoio para o cotista conseguir permanecer no curso.',
      fontes: [LEI_COTAS, ARTIGO_COTAS, MATERIA_COTAS],
    },
  },

  // ===== 7. Comércio exterior =====
  // Escala: 1 = proteger a produção nacional com tarifas e exigências
  //         5 = abrir o mercado, com tarifas baixas e livre concorrência
  {
    id: 'comercio-exterior',
    nome: 'Comércio exterior',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Protege a indústria nacional com impostos de importação altos e resiste a acordos que abram o mercado a países ricos.',
        'Sem proteção, a indústria local não aguenta a concorrência de fora, e o país perde empregos e autonomia.',
        'Proteção encarece os produtos para o consumidor e acomoda empresas pouco eficientes.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Aceita abrir o mercado aos poucos, e só em troca de vantagens para os produtos brasileiros.',
        'Abrir sem contrapartida é entregar o mercado de graça; a negociação deve trazer ganhos concretos.',
        'Para a direita, exigir contrapartidas trava acordos por anos; para a esquerda, ainda expõe a indústria.',
      ),
      posicao(
        'centro',
        3,
        'Defende uma redução gradual e moderada das tarifas de importação.',
        'Um meio-termo dá tempo para as empresas se adaptarem sem fechar o país.',
        'Devagar demais para quem quer abertura, rápido demais para os setores mais frágeis.',
      ),
      posicao(
        'centro-direita',
        4,
        'Quer mais acordos comerciais com grandes economias e liberdade para negociá-los, inclusive fora do Mercosul.',
        'Acesso a grandes mercados aumenta as exportações e torna a economia mais competitiva.',
        'Abrir rápido pode afastar investimentos e fechar fábricas que não aguentam a concorrência.',
      ),
      posicao(
        'direita',
        5,
        'Defende um corte amplo das tarifas de importação, para todos os setores.',
        'A concorrência de fora baixa os preços e obriga as empresas a melhorar.',
        'Setores inteiros podem desaparecer antes de conseguir competir, com perda de empregos.',
      ),
    ],
    fontes: [ONUKI_OLIVEIRA, IPEA_ABERTURA, IPEA_MERCOSUL, MATERIA_MERCOSUL],
    naPratica: {
      titulo: 'Abertura comercial (início dos anos 1990)',
      oQueFoi:
        'No início dos anos 1990, o Brasil reduziu os impostos de importação e eliminou barreiras à entrada de produtos estrangeiros.',
      defensores:
        'A produtividade da indústria cresceu cerca de 17% entre 1990 e 1992, com máquinas e materiais importados mais baratos.',
      criticos:
        'O emprego na indústria caiu 20% entre 1988 e 1992, embora parte da queda seja atribuída à recessão da época, e um estudo aponta perdas de emprego e salário nas regiões mais expostas até pelo menos 2010.',
      fontes: [IPEA_PRODUTIVIDADE, FGV_ABERTURA, MATERIA_ABERTURA],
    },
  },

  // ===== 8. Política externa =====
  // Escala: 1 = prioridade a países em desenvolvimento e a instituições criadas por eles
  //         5 = prioridade ao alinhamento com Estados Unidos e Europa
  {
    id: 'politica-externa',
    nome: 'Política externa',
    posicoes: [
      posicao(
        'esquerda',
        1,
        'Prioriza alianças com países em desenvolvimento e instituições criadas por eles, e rejeita seguir as grandes potências.',
        'Com parceiros em situação parecida, o Brasil negocia de igual para igual e ganha autonomia.',
        'Afasta o país dos maiores mercados e das principais fontes de investimento.',
      ),
      posicao(
        'centro-esquerda',
        2,
        'Diversifica parceiros, com ênfase em países em desenvolvimento e nos vizinhos, sem romper com Estados Unidos e Europa.',
        'Ter muitos parceiros reduz a dependência de qualquer um deles.',
        'Para a direita, dispersa esforços e adia acordos com os maiores mercados; para a esquerda, preserva a dependência das potências.',
      ),
      posicao(
        'centro',
        3,
        'Mantém compromissos com vizinhos, países emergentes e países ricos ao mesmo tempo, decidindo caso a caso.',
        'O interesse do país muda conforme o assunto; não é preciso escolher um bloco.',
        'Compromissos simultâneos podem se contradizer e deixar a estratégia do país pouco clara.',
      ),
      posicao(
        'centro-direita',
        4,
        'Prioriza acordos com as grandes economias e a entrada em organizações de países ricos, como a OCDE.',
        'Seguir os padrões dos países ricos dá credibilidade e atrai investimentos.',
        'Entrar nesses grupos traz exigências e pode deixar o Brasil em posição secundária.',
      ),
      posicao(
        'direita',
        5,
        'Defende alinhar o Brasil aos Estados Unidos e à Europa nas principais decisões internacionais.',
        'São os maiores mercados e as principais fontes de investimento; estar ao lado deles traz vantagens.',
        'Alinhamento automático reduz a autonomia do país e pode custar outros parceiros comerciais.',
      ),
    ],
    fontes: [ONUKI_OLIVEIRA, MARCON_PEREIRA, IPEA_ALINHAMENTO, MATERIA_OCDE],
    naPratica: {
      titulo: 'Criação do banco do BRICS (2014)',
      oQueFoi:
        'Em 2014, Brasil, Rússia, Índia, China e África do Sul assinaram em Fortaleza o acordo que criou o Novo Banco de Desenvolvimento, com sede em Xangai.',
      defensores:
        'Em dez anos, o banco aprovou 120 projetos e 39 bilhões de dólares em financiamentos, com poder dividido igualmente entre os fundadores e sem exigir cortes de gastos em troca.',
      criticos:
        'O banco é pequeno perto de outros bancos internacionais, cresce devagar e ainda empresta principalmente em dólar.',
      fontes: [ACORDO_NDB, IPEA_NDB, MATERIA_NDB],
    },
  },
];
