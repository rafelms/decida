import type { Bloco, LadoId, Pergunta, Respostas, Resultado, ValorResposta } from '../tipos';

// Regras de pontuação (seção 7 do SDD). Funções puras, sem React.

// ---------- Limites das faixas (ajuste aqui para calibrar) ----------

// Resultado final, pelo total (-36 a +36): limite superior de cada faixa
export const LIMITE_TOTAL_ESQUERDA = -21; // -36 a -21
export const LIMITE_TOTAL_CENTRO_ESQUERDA = -6; // -20 a -6
export const LIMITE_TOTAL_CENTRO = 5; // -5 a +5
export const LIMITE_TOTAL_CENTRO_DIREITA = 20; // +6 a +20; acima disso, direita

// Tendência de cada bloco (-12 a +12): limite superior de cada faixa
const LIMITE_BLOCO_ESQUERDA = -7; // -12 a -7
const LIMITE_BLOCO_CENTRO_ESQUERDA = -2; // -6 a -2
const LIMITE_BLOCO_CENTRO = 1; // -1 a +1
const LIMITE_BLOCO_CENTRO_DIREITA = 6; // +2 a +6; acima disso, direita

// Perfil misto: algum bloco chega a -5 ou menos e outro a +5 ou mais
const LIMITE_PERFIL_MISTO = 5;

// Quantas respostas aparecem em "Por que esse resultado"
const QUANTIDADE_POR_QUE = 3;

// ---------- Funções ----------

// Converte a resposta em pontos: negativo aproxima da esquerda, positivo da direita
function pontosDaResposta(pergunta: Pergunta, valor: ValorResposta): number {
  // "0 - valor" evita o -0 quando o valor é 0
  return pergunta.direcao === 'direita' ? valor : 0 - valor;
}

// Classifica o total (-36 a +36) em um dos 5 lados
export function classificarTotal(total: number): LadoId {
  if (total <= LIMITE_TOTAL_ESQUERDA) return 'esquerda';
  if (total <= LIMITE_TOTAL_CENTRO_ESQUERDA) return 'centro-esquerda';
  if (total <= LIMITE_TOTAL_CENTRO) return 'centro';
  if (total <= LIMITE_TOTAL_CENTRO_DIREITA) return 'centro-direita';
  return 'direita';
}

// Classifica a soma de um bloco (-12 a +12) em uma tendência
export function classificarBloco(soma: number): LadoId {
  if (soma <= LIMITE_BLOCO_ESQUERDA) return 'esquerda';
  if (soma <= LIMITE_BLOCO_CENTRO_ESQUERDA) return 'centro-esquerda';
  if (soma <= LIMITE_BLOCO_CENTRO) return 'centro';
  if (soma <= LIMITE_BLOCO_CENTRO_DIREITA) return 'centro-direita';
  return 'direita';
}

// Verdadeiro quando pelo menos dois blocos apontam claramente para lados opostos
function ehPerfilMisto(somasDosBlocos: number[]): boolean {
  return Math.min(...somasDosBlocos) <= -LIMITE_PERFIL_MISTO && Math.max(...somasDosBlocos) >= LIMITE_PERFIL_MISTO;
}

// Verdadeiro quando todas as perguntas foram respondidas
export function testeCompleto(perguntas: Pergunta[], respostas: Respostas): boolean {
  return perguntas.every((p) => respostas[p.id] !== undefined);
}

// Calcula o resultado completo. Perguntas sem resposta valem 0.
// Cada bloco soma as perguntas pelo campo "bloco", e não pelo id.
export function calcularResultado(perguntas: Pergunta[], respostas: Respostas): Resultado {
  const somas: Record<Bloco, number> = { economia: 0, sociedade: 0, internacional: 0 };

  for (const pergunta of perguntas) {
    const valor = respostas[pergunta.id] ?? 0;
    somas[pergunta.bloco] += pontosDaResposta(pergunta, valor);
  }

  const { economia, sociedade, internacional } = somas;
  const total = economia + sociedade + internacional;

  return {
    economia,
    sociedade,
    internacional,
    total,
    lado: classificarTotal(total),
    tendenciaEconomia: classificarBloco(economia),
    tendenciaSociedade: classificarBloco(sociedade),
    tendenciaInternacional: classificarBloco(internacional),
    perfilMisto: ehPerfilMisto([economia, sociedade, internacional]),
  };
}

export interface RespostaQuePesou {
  pergunta: Pergunta;
  valor: ValorResposta;
  pontos: number;
}

// As respostas que mais pesaram (seção 7.5): maior valor absoluto primeiro,
// empate resolvido pelo menor id, ignorando respostas com 0 ponto.
// Lista vazia significa que todas as respostas foram neutras.
export function respostasQueMaisPesaram(
  perguntas: Pergunta[],
  respostas: Respostas,
  limite: number = QUANTIDADE_POR_QUE,
): RespostaQuePesou[] {
  return perguntas
    .map((pergunta) => {
      const valor = respostas[pergunta.id] ?? 0;
      return { pergunta, valor, pontos: pontosDaResposta(pergunta, valor) };
    })
    .filter((r) => r.pontos !== 0)
    .sort((a, b) => Math.abs(b.pontos) - Math.abs(a.pontos) || a.pergunta.id - b.pergunta.id)
    .slice(0, limite);
}
