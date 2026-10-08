import { describe, expect, it } from 'vitest';
import { relacaoEntre, relacaoPorDistancia } from './comparacao';

// Casos da seção 12.2 do SDD

describe('relacaoPorDistancia', () => {
  it.each([
    [0, 'VISÃO PRÓXIMA'],
    [1, 'VISÃO PRÓXIMA'],
    [2, 'VISÃO DIFERENTE'],
    [3, 'VISÃO OPOSTA'],
    [4, 'VISÃO OPOSTA'],
  ])('distância %i → %s', (distancia, esperado) => {
    expect(relacaoPorDistancia(distancia)).toBe(esperado);
  });
});

describe('relacaoEntre', () => {
  const base = { posicao: '', argumento: '', criticaComum: '' };
  it('usa a distância absoluta, nos dois sentidos', () => {
    const a = { ...base, lado: 'esquerda' as const, valor: 1 as const };
    const b = { ...base, lado: 'direita' as const, valor: 5 as const };
    expect(relacaoEntre(a, b)).toBe('VISÃO OPOSTA');
    expect(relacaoEntre(b, a)).toBe('VISÃO OPOSTA');
  });
});
