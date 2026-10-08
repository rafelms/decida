import { describe, expect, it } from 'vitest';
import { perguntas } from '../dados/perguntas';
import type { Bloco, Pergunta, Respostas, ValorResposta } from '../tipos';
import {
  calcularResultado,
  classificarBloco,
  classificarTotal,
  respostasQueMaisPesaram,
} from './pontuacao';

// Casos da seção 12.1 do SDD. As respostas são montadas pelos campos
// "direcao" e "bloco" de cada pergunta, sem depender dos ids.

const CT: ValorResposta = 2;
const C: ValorResposta = 1;
const N: ValorResposta = 0;
const DT: ValorResposta = -2;

// Monta respostas a partir de uma função que recebe a pergunta
function montar(valorDa: (p: Pergunta) => ValorResposta): Respostas {
  const respostas: Respostas = {};
  for (const p of perguntas) respostas[p.id] = valorDa(p);
  return respostas;
}

// Padrão do caso 3: CT nas de direção esquerda, DT nas de direção direita
const comoCaso3 = (p: Pergunta): ValorResposta => (p.direcao === 'esquerda' ? CT : DT);
// Padrão do caso 4: DT nas de direção esquerda, CT nas de direção direita
const comoCaso4 = (p: Pergunta): ValorResposta => (p.direcao === 'esquerda' ? DT : CT);

// Aplica um padrão diferente em cada bloco
function porBloco(padroes: Record<Bloco, (p: Pergunta) => ValorResposta>): Respostas {
  return montar((p) => padroes[p.bloco](p));
}

// Resume o resultado na ordem das colunas da tabela do SDD
function resumo(respostas: Respostas) {
  const r = calcularResultado(perguntas, respostas);
  return [r.economia, r.sociedade, r.internacional, r.total, r.lado, r.perfilMisto];
}

describe('calcularResultado — casos da seção 12.1', () => {
  it('caso 1: N em todas', () => {
    expect(resumo(montar(() => N))).toEqual([0, 0, 0, 0, 'centro', false]);
  });

  it('caso 2: CT em todas', () => {
    expect(resumo(montar(() => CT))).toEqual([0, 0, 0, 0, 'centro', false]);
  });

  it('caso 3: CT nas de direção esquerda, DT nas de direção direita', () => {
    expect(resumo(montar(comoCaso3))).toEqual([-12, -12, -12, -36, 'esquerda', false]);
  });

  it('caso 4: DT nas de direção esquerda, CT nas de direção direita', () => {
    expect(resumo(montar(comoCaso4))).toEqual([12, 12, 12, 36, 'direita', false]);
  });

  it('caso 5: economia como no 3, sociedade como no 4, N no internacional', () => {
    const respostas = porBloco({ economia: comoCaso3, sociedade: comoCaso4, internacional: () => N });
    expect(resumo(respostas)).toEqual([-12, 12, 0, 0, 'centro', true]);
  });

  it('caso 6: C nas de direção esquerda, N nas demais', () => {
    const respostas = montar((p) => (p.direcao === 'esquerda' ? C : N));
    expect(resumo(respostas)).toEqual([-3, -3, -3, -9, 'centro-esquerda', false]);
  });

  it('caso 7: economia e sociedade como no 3, internacional como no 4', () => {
    const respostas = porBloco({ economia: comoCaso3, sociedade: comoCaso3, internacional: comoCaso4 });
    expect(resumo(respostas)).toEqual([-12, -12, 12, -12, 'centro-esquerda', true]);
  });
});

describe('calcularResultado — tendências dos três blocos', () => {
  it('cada bloco recebe a própria tendência', () => {
    const respostas = porBloco({ economia: comoCaso3, sociedade: () => N, internacional: comoCaso4 });
    const r = calcularResultado(perguntas, respostas);
    expect([r.tendenciaEconomia, r.tendenciaSociedade, r.tendenciaInternacional]).toEqual([
      'esquerda',
      'centro',
      'direita',
    ]);
  });
});

describe('classificarTotal — limites das faixas', () => {
  const casos: [number, string][] = [
    [-36, 'esquerda'],
    [-21, 'esquerda'],
    [-20, 'centro-esquerda'],
    [-6, 'centro-esquerda'],
    [-5, 'centro'],
    [5, 'centro'],
    [6, 'centro-direita'],
    [20, 'centro-direita'],
    [21, 'direita'],
    [36, 'direita'],
  ];
  it.each(casos)('total %i → %s', (total, esperado) => {
    expect(classificarTotal(total)).toBe(esperado);
  });
});

describe('classificarBloco — limites das faixas de bloco', () => {
  const casos: [number, string][] = [
    [-12, 'esquerda'],
    [-7, 'esquerda'],
    [-6, 'centro-esquerda'],
    [-2, 'centro-esquerda'],
    [-1, 'centro'],
    [1, 'centro'],
    [2, 'centro-direita'],
    [6, 'centro-direita'],
    [7, 'direita'],
    [12, 'direita'],
  ];
  it.each(casos)('soma %i → %s', (soma, esperado) => {
    expect(classificarBloco(soma)).toBe(esperado);
  });
});

describe('coerência entre faixas de bloco e de total', () => {
  it('três blocos com a mesma tendência dão o mesmo lado no total', () => {
    const incoerentes: string[] = [];
    for (let a = -12; a <= 12; a++) {
      for (let b = -12; b <= 12; b++) {
        for (let c = -12; c <= 12; c++) {
          const tendencia = classificarBloco(a);
          if (classificarBloco(b) !== tendencia || classificarBloco(c) !== tendencia) continue;
          if (classificarTotal(a + b + c) !== tendencia) incoerentes.push(`${a},${b},${c}`);
        }
      }
    }
    expect(incoerentes).toEqual([]);
  });
});

describe('respostasQueMaisPesaram (seção 7.5)', () => {
  // Escolhe perguntas pela direção e pela posição dentro do bloco, sem fixar ids
  const direita = perguntas.filter((p) => p.direcao === 'direita');
  const esquerda = perguntas.filter((p) => p.direcao === 'esquerda');

  it('ordena pelo valor absoluto e desempata pelo menor id', () => {
    const respostas = montar(() => N);
    const [d1, d2] = direita;
    const [e1, e2] = esquerda;
    respostas[d2.id] = C; // +1
    respostas[e2.id] = CT; // -2
    respostas[d1.id] = CT; // +2
    respostas[e1.id] = C; // -1
    const ids = respostasQueMaisPesaram(perguntas, respostas).map((r) => r.pergunta.id);
    const fortes = [d1.id, e2.id].sort((x, y) => x - y);
    const fracos = [d2.id, e1.id].sort((x, y) => x - y);
    expect(ids).toEqual([...fortes, fracos[0]]);
  });

  it('ignora respostas com 0 ponto', () => {
    const respostas = montar(() => N);
    respostas[esquerda[0].id] = CT;
    const lista = respostasQueMaisPesaram(perguntas, respostas);
    expect(lista).toHaveLength(1);
    expect(lista[0].pontos).toBe(-2);
  });

  it('retorna lista vazia quando todas são neutras', () => {
    expect(respostasQueMaisPesaram(perguntas, montar(() => N))).toEqual([]);
  });
});
