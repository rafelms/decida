import type { Pergunta } from '../tipos';

// As 18 afirmações do teste (SDD v1.1, seção 9.1).
// São 3 blocos de 6 afirmações. Em cada bloco, 3 aproximam da esquerda e
// 3 aproximam da direita quando a pessoa CONCORDA. Assim, quem concorda
// com tudo (ou discorda de tudo) soma zero e não é empurrado para um lado.
// A direção nunca é mostrada ao usuário durante o teste.
// NÃO altere os textos: o glossário depende de trechos exatos deles.

export const perguntas: Pergunta[] = [
  // ----- Bloco 1: economia -----
  {
    id: 1,
    bloco: 'economia',
    direcao: 'esquerda',
    texto: 'Quem ganha mais deve pagar mais impostos para financiar serviços públicos.',
  },
  {
    id: 2,
    bloco: 'economia',
    direcao: 'direita',
    texto: 'Estatais devem ser privatizadas sempre que a iniciativa privada puder prestar o mesmo serviço.',
  },
  {
    id: 3,
    bloco: 'economia',
    direcao: 'esquerda',
    texto: 'Programas de transferência de renda são essenciais para reduzir a pobreza.',
  },
  {
    id: 4,
    bloco: 'economia',
    direcao: 'direita',
    texto: 'Reduzir impostos e burocracia para empresas é o melhor caminho para gerar empregos.',
  },
  {
    id: 5,
    bloco: 'economia',
    direcao: 'esquerda',
    texto: 'O governo deve intervir nos preços de itens essenciais quando eles sobem demais.',
  },
  {
    id: 6,
    bloco: 'economia',
    direcao: 'direita',
    texto: 'O governo deve gastar somente o que arrecada, mesmo que isso exija cortar investimentos e programas.',
  },

  // ----- Bloco 2: sociedade -----
  {
    id: 7,
    bloco: 'sociedade',
    direcao: 'direita',
    texto: 'A lei deve ser mais dura com quem comete crimes, mesmo que isso aumente o número de presos.',
  },
  {
    id: 8,
    bloco: 'sociedade',
    direcao: 'esquerda',
    texto: 'Cotas são uma forma legítima de corrigir desigualdades históricas.',
  },
  {
    id: 9,
    bloco: 'sociedade',
    direcao: 'direita',
    texto: 'Valores religiosos devem ter peso na criação de leis e políticas públicas.',
  },
  {
    id: 10,
    bloco: 'sociedade',
    direcao: 'direita',
    texto: 'O cidadão deve ter acesso facilitado a armas para se defender.',
  },
  {
    id: 11,
    bloco: 'sociedade',
    direcao: 'esquerda',
    texto: 'O uso de drogas deve ser tratado como questão de saúde pública, e não de polícia.',
  },
  {
    id: 12,
    bloco: 'sociedade',
    direcao: 'esquerda',
    texto: 'O Brasil deve facilitar a entrada de imigrantes e refugiados.',
  },

  // ----- Bloco 3: comércio e relações internacionais -----
  {
    id: 13,
    bloco: 'internacional',
    direcao: 'direita',
    texto: 'O Brasil deve reduzir os impostos sobre produtos importados, mesmo que isso aumente a concorrência para a indústria nacional.',
  },
  {
    id: 14,
    bloco: 'internacional',
    direcao: 'esquerda',
    texto: 'Setores estratégicos, como energia e mineração, devem ficar sob controle de empresas brasileiras, e não de estrangeiras.',
  },
  {
    id: 15,
    bloco: 'internacional',
    direcao: 'direita',
    texto: 'O Brasil deve poder fechar acordos comerciais sozinho, sem depender dos parceiros do Mercosul.',
  },
  {
    id: 16,
    bloco: 'internacional',
    direcao: 'esquerda',
    texto: 'O Brasil deve fortalecer o banco do BRICS para depender menos de instituições como o FMI e o Banco Mundial.',
  },
  {
    id: 17,
    bloco: 'internacional',
    direcao: 'direita',
    texto: 'Nas grandes questões internacionais, o Brasil deve se alinhar aos Estados Unidos e aos países da Europa.',
  },
  {
    id: 18,
    bloco: 'internacional',
    direcao: 'esquerda',
    texto: 'Acordos internacionais sobre meio ambiente devem ser cumpridos, mesmo que limitem a produção no campo e na indústria.',
  },
];
