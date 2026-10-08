import type { Fonte, TermoGlossario } from '../tipos';

// Glossário das afirmações: explica palavras que um leigo pode não conhecer.
// Versão revisada (SDD v1.1): textos conferidos e com fontes.
//
// Regra de fontes do glossário:
// - termo que tem lei em vigor: a própria lei basta como fonte;
// - termo sem lei: 1 fonte de referência;
// - termo que afirma algo disputado ("desigualdades históricas"): 3 fontes.
//
// O trecho precisa existir exatamente no texto da afirmação (há teste para isso).
// O glossário só DEFINE. Ele não traz argumento a favor nem contra a afirmação.

// Data em que todas as fontes abaixo foram consultadas
const ACESSO = '2026-10-07';

// Cria uma fonte que é uma lei ou decreto publicado no site do Planalto
function lei(titulo: string, url: string): Fonte {
  return {
    titulo,
    veiculo: 'Presidência da República (Planalto)',
    tipo: 'institucional',
    url,
    acessadoEm: ACESSO,
  };
}

// Cria uma fonte de qualquer outro veículo
function fonte(titulo: string, veiculo: string, tipo: Fonte['tipo'], url: string): Fonte {
  return { titulo, veiculo, tipo, url, acessadoEm: ACESSO };
}

// Cria uma fonte que aponta para artigos da Constituição
function constituicao(artigos: string): Fonte {
  return lei(
    `Constituição Federal de 1988 (${artigos})`,
    'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
  );
}

// ---------- Fontes usadas (cada uma declarada uma única vez) ----------

const CTN = lei(
  'Lei nº 5.172/1966 — Código Tributário Nacional (arts. 3º e 16)',
  'https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm',
);
const LEI_USUARIO_SERVICOS = lei(
  'Lei nº 13.460/2017 — Direitos do usuário dos serviços públicos (art. 2º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm',
);
const LEI_CONCESSOES = lei(
  'Lei nº 8.987/1995 — Concessão e permissão de serviços públicos (art. 2º)',
  'https://www.planalto.gov.br/ccivil_03/leis/l8987cons.htm',
);
const LEI_ESTATAIS = lei(
  'Lei nº 13.303/2016 — Lei das Estatais (arts. 3º e 4º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13303.htm',
);
const LEI_DESESTATIZACAO = lei(
  'Lei nº 9.491/1997 — Programa Nacional de Desestatização (art. 2º)',
  'https://www.planalto.gov.br/ccivil_03/leis/l9491.htm',
);
const LEI_LIBERDADE_ECONOMICA = lei(
  'Lei nº 13.874/2019 — Declaração de Direitos de Liberdade Econômica (art. 3º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13874.htm',
);
const LEI_TRANSFERENCIA_RENDA = lei(
  'Lei nº 14.601/2023 — Programa de transferência de renda e suas condicionalidades (art. 10)',
  'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm',
);
const LEI_DESBUROCRATIZACAO = lei(
  'Lei nº 13.726/2018 — Racionalização de atos e procedimentos administrativos (art. 1º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13726.htm',
);
const LC_BENS_ESSENCIAIS = lei(
  'Lei Complementar nº 194/2022 — Bens e serviços considerados essenciais',
  'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp194.htm',
);
const LRF = lei(
  'Lei Complementar nº 101/2000 — Lei de Responsabilidade Fiscal (art. 1º)',
  'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm',
);
const LEI_PENAL_2019 = lei(
  'Lei nº 13.964/2019 — Altera a legislação penal e processual penal',
  'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13964.htm',
);
const LEI_COTAS_ENSINO = lei(
  'Lei nº 12.711/2012 — Reserva de vagas em instituições federais de ensino (arts. 1º e 3º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12711.htm',
);
const LEI_COTAS_CONCURSOS = fonte(
  'Lei nº 15.142/2025 — Reserva de vagas em concursos públicos federais',
  'Câmara dos Deputados',
  'institucional',
  'https://www2.camara.leg.br/legin/fed/lei/2025/lei-15142-3-junho-2025-797545-norma-pl.html',
);
const LEI_COTAS_EMPRESAS = lei(
  'Lei nº 8.213/1991 — Vagas para pessoas com deficiência em empresas (art. 93)',
  'https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm',
);
const ESTATUTO_DESARMAMENTO = lei(
  'Lei nº 10.826/2003 — Estatuto do Desarmamento (arts. 5º e 6º)',
  'https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm',
);
const LEI_DROGAS = lei(
  'Lei nº 11.343/2006 — Lei de Drogas (arts. 23, 28 e 33)',
  'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm',
);
const LEI_MIGRACAO = lei(
  'Lei nº 13.445/2017 — Lei de Migração (art. 1º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm',
);
const LEI_REFUGIO = lei(
  'Lei nº 9.474/1997 — Estatuto dos Refugiados no Brasil (art. 1º)',
  'https://www.planalto.gov.br/ccivil_03/leis/l9474.htm',
);
const DL_IMPORTACAO = lei(
  'Decreto-Lei nº 37/1966 — Imposto de importação (art. 1º)',
  'https://www.planalto.gov.br/ccivil_03/decreto-lei/del0037.htm',
);
const TRATADO_ASSUNCAO = lei(
  'Decreto nº 350/1991 — Tratado de Assunção, que criou o Mercosul (art. 1º)',
  'https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0350.htm',
);
const ACORDO_NDB = lei(
  'Decreto nº 8.624/2015 — Acordo sobre o Novo Banco de Desenvolvimento (arts. 1º e 4º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/decreto/d8624.htm',
);
const ACORDO_PARIS = lei(
  'Decreto nº 9.073/2017 — Acordo de Paris sobre mudança do clima (art. 2º)',
  'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/decreto/d9073.htm',
);
const IPEA_MERCOSUL = fonte(
  'Relacionamento externo do Mercosul: fundamentos históricos, dilemas contemporâneos e perspectivas futuras (Boletim de Economia e Política Internacional, n. 35, 2023)',
  'Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/6c96634c-1734-408e-80d8-9649d1be2577/content',
);
const GUIA_POLITICAS_PUBLICAS = fonte(
  'Avaliação de Políticas Públicas: Guia Prático de Análise Ex Ante (2018)',
  'Casa Civil da Presidência da República e Ipea',
  'institucional',
  'https://repositorio.ipea.gov.br/server/api/core/bitstreams/c44e9573-6a7e-4ef6-b505-6f9cccd7cb3e/content',
);
const IBGE_COR_RACA = fonte(
  'Desigualdades Sociais por Cor ou Raça no Brasil',
  'IBGE',
  'institucional',
  'https://www.ibge.gov.br/estatisticas/sociais/populacao/25844-desigualdades-sociais-por-cor-ou-raca.html',
);
const ARTIGO_FERES = fonte(
  'Aspectos semânticos da discriminação racial no Brasil: para além da teoria da modernidade (João Feres Júnior, 2006)',
  'Revista Brasileira de Ciências Sociais',
  'academica',
  'https://www.redalyc.org/pdf/107/10706109.pdf',
);
const MATERIA_RENDA = fonte(
  'Brancos têm renda 74% superior à de pretos e pardos, diz IBGE (13/11/2019)',
  'Diário do Nordeste',
  'jornalistica',
  'https://diariodonordeste.verdesmares.com.br/ultima-hora/pais/brancos-tem-renda-74-superior-a-de-pretos-e-pardos-diz-ibge-1.2174335',
);
const SITE_NDB = fonte(
  'About NDB (página oficial, em inglês)',
  'Novo Banco de Desenvolvimento',
  'institucional',
  'https://www.ndb.int/about-ndb/',
);
const SITE_FMI = fonte(
  'The IMF at a Glance (página oficial, em inglês)',
  'Fundo Monetário Internacional',
  'institucional',
  'https://www.imf.org/en/About/Factsheets/IMF-at-a-Glance',
);
const SITE_BANCO_MUNDIAL = fonte(
  'Who We Are (página oficial, em inglês)',
  'Banco Mundial',
  'institucional',
  'https://www.worldbank.org/en/who-we-are',
);

// ---------- Termos ----------

// Cria um termo já revisado, com suas fontes
function termo(
  id: string,
  perguntaId: number,
  trecho: string,
  nome: string,
  texto: string,
  fontes: Fonte[],
): TermoGlossario {
  return { id, perguntaId, trecho, termo: nome, definicao: { texto, fontes } };
}

export const glossario: TermoGlossario[] = [
  // ===== Bloco 1: economia =====

  // 1 — impostos
  termo(
    'impostos',
    1,
    'impostos',
    'Impostos',
    'Valores que pessoas e empresas pagam obrigatoriamente ao governo. Quando a porcentagem cobrada aumenta conforme a renda, o sistema é chamado de progressivo.',
    [CTN, constituicao('art. 153, § 2º, I')],
  ),
  termo(
    'servicos-publicos',
    1,
    'serviços públicos',
    'Serviços públicos',
    'Atividades oferecidas ou garantidas pelo governo à população, como saúde, educação, segurança, transporte e saneamento. São custeadas com impostos e, em alguns casos, com tarifas cobradas de quem usa.',
    [LEI_USUARIO_SERVICOS, LEI_CONCESSOES],
  ),

  // 2 — privatizações
  termo(
    'estatais',
    2,
    'Estatais',
    'Estatais',
    'Empresas em que o governo (federal, estadual ou municipal) é dono de tudo ou tem o controle. Exemplos no Brasil: Correios e Caixa Econômica Federal.',
    [LEI_ESTATAIS],
  ),
  termo(
    'privatizar',
    2,
    'privatizadas',
    'Privatizar',
    'Vender uma empresa ou serviço do governo, total ou parcialmente, para empresas ou investidores particulares. Um caminho parecido é a concessão: o governo continua dono, mas uma empresa privada opera o serviço por um prazo definido.',
    [LEI_DESESTATIZACAO, LEI_CONCESSOES],
  ),
  termo(
    'iniciativa-privada',
    2,
    'iniciativa privada',
    'Iniciativa privada',
    'Empresas e pessoas que produzem e vendem bens e serviços por conta própria, sem ser o governo. Exemplos: lojas, fábricas e bancos privados.',
    [LEI_LIBERDADE_ECONOMICA, constituicao('art. 170')],
  ),

  // 3 — programas sociais
  termo(
    'transferencia-de-renda',
    3,
    'Programas de transferência de renda',
    'Transferência de renda',
    'Programas em que o governo paga dinheiro diretamente a famílias, em geral de baixa renda. Muitos exigem contrapartidas, como manter os filhos na escola e a vacinação em dia.',
    [LEI_TRANSFERENCIA_RENDA],
  ),

  // 4 — burocracia
  termo(
    'burocracia',
    4,
    'burocracia',
    'Burocracia',
    'Conjunto de regras, documentos e etapas exigidos pelo governo, por exemplo para abrir uma empresa, pagar impostos ou obter licenças. A palavra também é usada para o excesso dessas exigências.',
    [LEI_DESBUROCRATIZACAO],
  ),

  // 5 — preços
  termo(
    'intervir-nos-precos',
    5,
    'intervir nos preços',
    'Intervir nos preços',
    'Quando o governo define ou limita o preço de um produto (tabelamento, congelamento ou teto) ou usa dinheiro público para segurá-lo (subsídio), em vez de deixar que o mercado o defina.',
    [LEI_LIBERDADE_ECONOMICA],
  ),
  termo(
    'itens-essenciais',
    5,
    'itens essenciais',
    'Itens essenciais',
    'Produtos e serviços básicos para o dia a dia, como alimentos da cesta básica, gás de cozinha, combustível, energia elétrica e remédios.',
    [LC_BENS_ESSENCIAIS, constituicao('art. 7º, IV')],
  ),

  // 6 — contas públicas
  termo(
    'equilibrio-das-contas',
    6,
    'gastar somente o que arrecada',
    'Equilíbrio das contas públicas',
    'Quando as despesas do governo não passam do que ele recebe, principalmente com impostos. Se gasta mais do que arrecada, o governo precisa tomar dinheiro emprestado, o que aumenta a dívida pública.',
    [LRF],
  ),

  // ===== Bloco 2: sociedade =====

  // 7 — segurança
  termo(
    'lei-mais-dura',
    7,
    'mais dura',
    'Lei mais dura',
    'Leis penais mais duras significam, por exemplo, penas mais longas, menos possibilidades de deixar a prisão antes do fim da pena ou mais condutas tratadas como crime.',
    [LEI_PENAL_2019],
  ),

  // 8 — cotas
  termo(
    'cotas',
    8,
    'Cotas',
    'Cotas',
    'Reserva de uma parte das vagas (em universidades, concursos públicos ou empresas) para grupos específicos, como estudantes de escola pública, pessoas pretas, pardas, indígenas e quilombolas ou pessoas com deficiência. No Brasil, há cotas previstas em lei.',
    [LEI_COTAS_ENSINO, LEI_COTAS_CONCURSOS, LEI_COTAS_EMPRESAS],
  ),
  termo(
    'desigualdades-historicas',
    8,
    'desigualdades históricas',
    'Desigualdades históricas',
    'Diferenças de renda, educação e oportunidades entre grupos da população, atribuídas a fatos do passado, como a escravidão. Há debate sobre quanto o passado explica as diferenças de hoje e sobre a melhor forma de reduzi-las.',
    [IBGE_COR_RACA, ARTIGO_FERES, MATERIA_RENDA],
  ),

  // 9 — religião
  termo(
    'valores-religiosos',
    9,
    'Valores religiosos',
    'Valores religiosos',
    'Princípios morais ligados a uma religião. A Constituição proíbe o governo de adotar ou financiar uma religião e garante a liberdade de crença. Há debate sobre se isso impede que valores religiosos orientem as leis.',
    [constituicao('art. 5º, VI, e art. 19, I')],
  ),
  termo(
    'politicas-publicas',
    9,
    'políticas públicas',
    'Políticas públicas',
    'Ações e programas do governo para lidar com problemas da população, como uma campanha de vacinação, um programa de moradia ou uma regra de trânsito.',
    [GUIA_POLITICAS_PUBLICAS],
  ),

  // 10 — armas
  termo(
    'acesso-a-armas',
    10,
    'acesso facilitado a armas',
    'Acesso facilitado a armas',
    'Regras com menos exigências para comprar e ter armas de fogo. A lei brasileira diferencia a posse (manter a arma em casa ou no local de trabalho) do porte (andar armado fora desses lugares), que é proibido como regra e só é permitido nos casos previstos em lei.',
    [ESTATUTO_DESARMAMENTO],
  ),

  // 11 — drogas
  termo(
    'saude-publica',
    11,
    'saúde pública',
    'Saúde pública',
    'Tratar o uso de drogas como questão de saúde pública significa priorizar prevenção, tratamento e redução de danos para quem usa.',
    [LEI_DROGAS],
  ),
  termo(
    'questao-de-policia',
    11,
    'polícia',
    'Questão de polícia',
    'Tratar o uso de drogas como questão de polícia significa lidar com ele principalmente por meio da lei penal: apreensão, processo e punição.',
    [LEI_DROGAS],
  ),

  // 12 — imigração
  termo(
    'imigrantes',
    12,
    'imigrantes',
    'Imigrantes',
    'Pessoas de outro país que vêm morar ou trabalhar no Brasil, por um período ou de forma definitiva.',
    [LEI_MIGRACAO],
  ),
  termo(
    'refugiados',
    12,
    'refugiados',
    'Refugiados',
    'Pessoas que deixaram seu país por perseguição (por raça, religião, nacionalidade, grupo social ou opinião política) ou por grave violação de direitos humanos, e que buscam proteção em outro país.',
    [LEI_REFUGIO],
  ),

  // ===== Bloco 3: comércio e relações internacionais =====

  // 13 — importações
  termo(
    'imposto-de-importacao',
    13,
    'impostos sobre produtos importados',
    'Imposto de importação',
    'Imposto cobrado quando um produto estrangeiro entra no país, o que aumenta o preço dele para quem compra. Também é chamado de tarifa de importação.',
    [DL_IMPORTACAO],
  ),

  // 14 — setores estratégicos
  termo(
    'setores-estrategicos',
    14,
    'Setores estratégicos',
    'Setores estratégicos',
    'Áreas consideradas decisivas para a economia e a segurança de um país, como energia, mineração, petróleo, telecomunicações e defesa. Não existe uma lista única: o que conta como estratégico faz parte do debate.',
    [constituicao('arts. 176 e 177')],
  ),

  // 15 — Mercosul
  termo(
    'acordos-comerciais',
    15,
    'acordos comerciais',
    'Acordos comerciais',
    'Acordos entre países ou blocos para facilitar o comércio entre eles, por exemplo reduzindo impostos de importação.',
    [IPEA_MERCOSUL],
  ),
  termo(
    'mercosul',
    15,
    'Mercosul',
    'Mercosul',
    'Bloco econômico criado em 1991 por Argentina, Brasil, Paraguai e Uruguai, com livre comércio entre os membros e uma tarifa comum para produtos de fora. Pelas regras do bloco, acordos comerciais com outros países devem ser negociados em conjunto.',
    [TRATADO_ASSUNCAO, IPEA_MERCOSUL],
  ),

  // 16 — banco do BRICS
  termo(
    'banco-do-brics',
    16,
    'banco do BRICS',
    'Banco do BRICS',
    'Nome popular do Novo Banco de Desenvolvimento, criado por um acordo assinado em 2014 por Brasil, Rússia, Índia, China e África do Sul. Empresta dinheiro para obras de infraestrutura e projetos de desenvolvimento sustentável em países em desenvolvimento.',
    [ACORDO_NDB, SITE_NDB],
  ),
  termo(
    'fmi-e-banco-mundial',
    16,
    'o FMI e o Banco Mundial',
    'FMI e Banco Mundial',
    'Instituições internacionais criadas em 1944. O FMI (Fundo Monetário Internacional) empresta dinheiro a países em crise e acompanha a economia dos países membros. O Banco Mundial financia projetos de desenvolvimento e de redução da pobreza.',
    [SITE_FMI, SITE_BANCO_MUNDIAL],
  ),

  // 17 — alinhamento externo: sem termos de glossário

  // 18 — meio ambiente
  termo(
    'acordos-ambientais',
    18,
    'Acordos internacionais sobre meio ambiente',
    'Acordos internacionais sobre meio ambiente',
    'Compromissos assinados entre países para proteger o meio ambiente. O mais conhecido é o Acordo de Paris, de 2015, em que cada país define metas para reduzir a emissão de gases que aquecem o planeta.',
    [ACORDO_PARIS],
  ),
];

// Termos de uma afirmação, na ordem em que aparecem no texto
export function termosDaPergunta(perguntaId: number, texto: string): TermoGlossario[] {
  return glossario
    .filter((t) => t.perguntaId === perguntaId)
    .sort((a, b) => texto.indexOf(a.trecho) - texto.indexOf(b.trecho));
}
