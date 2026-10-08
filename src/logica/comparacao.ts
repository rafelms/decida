import type { LadoId, PosicaoNoTema, Tema } from '../tipos';

// Relação entre dois lados em um tema (seção 7.6 do SDD). Funções puras.

export type Relacao = 'VISÃO PRÓXIMA' | 'VISÃO DIFERENTE' | 'VISÃO OPOSTA';

// Limites de distância na escala de 1 a 5
const DISTANCIA_MAXIMA_PROXIMA = 1; // 0 ou 1
const DISTANCIA_MAXIMA_DIFERENTE = 2; // 2; acima disso, oposta

// Classifica a relação a partir da distância entre os valores
export function relacaoPorDistancia(distancia: number): Relacao {
  if (distancia <= DISTANCIA_MAXIMA_PROXIMA) return 'VISÃO PRÓXIMA';
  if (distancia <= DISTANCIA_MAXIMA_DIFERENTE) return 'VISÃO DIFERENTE';
  return 'VISÃO OPOSTA';
}

// Relação entre o lado selecionado (A) e outro lado (B)
export function relacaoEntre(posicaoA: PosicaoNoTema, posicaoB: PosicaoNoTema): Relacao {
  return relacaoPorDistancia(Math.abs(posicaoA.valor - posicaoB.valor));
}

// Busca a posição de um lado dentro de um tema
export function posicaoDoLado(tema: Tema, lado: LadoId): PosicaoNoTema {
  const posicao = tema.posicoes.find((p) => p.lado === lado);
  if (!posicao) throw new Error(`Tema ${tema.id} sem posição para ${lado}`);
  return posicao;
}
