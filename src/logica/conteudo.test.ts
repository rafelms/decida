import { describe, expect, it } from 'vitest';
import { glossario } from '../dados/glossario';
import { lados } from '../dados/lados';
import { perguntas } from '../dados/perguntas';
import { temas } from '../dados/temas';
import type { Bloco, Fonte, LadoId } from '../tipos';
import { fontesDoLado, fontesDoTema } from './fontes';

// Validação do conteúdo (seções 6.2, 6.4 e 12.3 do SDD)

const ordemLados: LadoId[] = ['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'];
const blocos: Bloco[] = ['economia', 'sociedade', 'internacional'];

// Regra das fontes de fichas e temas: 3 fontes, 3 veículos diferentes, 2 tipos diferentes
function cumpreRegraDeFontes(fontes: Fonte[]): boolean {
  const veiculos = new Set(fontes.map((f) => f.veiculo));
  const tipos = new Set(fontes.map((f) => f.tipo));
  return fontes.length >= 3 && veiculos.size >= 3 && tipos.size >= 2;
}

// Blocos de fichas, temas e episódios (pensadores e glossário têm regras próprias),
// com nome para a mensagem de erro
function blocosDeFichasETemas() {
  const lista: { nome: string; fontes: Fonte[]; pendente?: boolean }[] = [];
  for (const lado of lados) {
    lista.push({ nome: `${lado.id}/ideiasCentrais`, ...lado.ideiasCentrais });
    lista.push({ nome: `${lado.id}/modeloEconomico`, ...lado.modeloEconomico });
    lista.push({ nome: `${lado.id}/argumentosDefensores`, ...lado.argumentosDefensores });
    lista.push({ nome: `${lado.id}/argumentosCriticos`, ...lado.argumentosCriticos });
  }
  for (const tema of temas) {
    lista.push({ nome: `tema/${tema.id}`, fontes: tema.fontes, pendente: tema.pendente });
    lista.push({ nome: `tema/${tema.id}/naPratica`, ...tema.naPratica });
  }
  return lista;
}

describe('perguntas', () => {
  it('são exatamente 18, com ids de 1 a 18 em ordem', () => {
    expect(perguntas.map((p) => p.id)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
  });

  it.each(blocos)('bloco %s tem 6 perguntas: 3 com direção esquerda e 3 com direção direita', (bloco) => {
    const doBloco = perguntas.filter((p) => p.bloco === bloco);
    expect(doBloco).toHaveLength(6);
    expect(doBloco.filter((p) => p.direcao === 'esquerda')).toHaveLength(3);
    expect(doBloco.filter((p) => p.direcao === 'direita')).toHaveLength(3);
  });
});

describe('lados e temas', () => {
  it('existem exatamente 5 lados, na ordem do espectro', () => {
    expect(lados.map((l) => l.id)).toEqual(ordemLados);
  });

  it('existem exatamente 8 temas, com ids diferentes', () => {
    expect(temas).toHaveLength(8);
    expect(new Set(temas.map((t) => t.id)).size).toBe(8);
  });

  it('cada tema tem exatamente 5 posições, uma por lado', () => {
    for (const tema of temas) {
      expect(tema.posicoes.map((p) => p.lado).sort(), tema.id).toEqual([...ordemLados].sort());
    }
  });

  it('os 5 lados têm a mesma quantidade de itens em cada bloco (simetria)', () => {
    for (const lado of lados) {
      expect(lado.ideiasCentrais.itens, lado.id).toHaveLength(4);
      expect(lado.argumentosDefensores.itens, lado.id).toHaveLength(4);
      expect(lado.argumentosCriticos.itens, lado.id).toHaveLength(4);
      expect(lado.pensadores, lado.id).toHaveLength(2);
    }
  });

  it('nenhum bloco de lados.ts, temas.ts ou glossario.ts está pendente', () => {
    const pendentes = [
      ...blocosDeFichasETemas().filter((b) => b.pendente).map((b) => b.nome),
      ...lados.flatMap((l) => l.pensadores.filter((p) => p.relacao.pendente).map((p) => `${l.id}/${p.nome}`)),
      ...glossario.filter((t) => t.definicao.pendente).map((t) => t.id),
    ];
    expect(pendentes).toEqual([]);
  });
});

describe('fontes', () => {
  it('todo bloco de ficha, tema e episódio "Na prática" cumpre a regra de fontes (3 fontes, 3 veículos, 2 tipos)', () => {
    const reprovados = blocosDeFichasETemas()
      .filter((b) => !cumpreRegraDeFontes(b.fontes))
      .map((b) => b.nome);
    expect(reprovados).toEqual([]);
  });

  it('cada pensador tem pelo menos 2 fontes, de 2 veículos diferentes', () => {
    const reprovados = lados.flatMap((lado) =>
      lado.pensadores
        .filter((p) => p.relacao.fontes.length < 2 || new Set(p.relacao.fontes.map((f) => f.veiculo)).size < 2)
        .map((p) => `${lado.id}/${p.nome}`),
    );
    expect(reprovados).toEqual([]);
  });

  it('toda url começa com https:// e toda data está no formato AAAA-MM-DD', () => {
    const fontes = [
      ...lados.flatMap(fontesDoLado),
      ...temas.flatMap(fontesDoTema),
      ...glossario.flatMap((t) => t.definicao.fontes),
    ];
    for (const fonte of fontes) {
      expect(fonte.url, fonte.titulo).toMatch(/^https:\/\//);
      expect(fonte.acessadoEm, fonte.titulo).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('glossário', () => {
  it('todo termo aponta para uma pergunta existente e o trecho existe exatamente no texto dela', () => {
    for (const termo of glossario) {
      const pergunta = perguntas.find((p) => p.id === termo.perguntaId);
      expect(pergunta, termo.id).toBeDefined();
      expect(pergunta!.texto, termo.id).toContain(termo.trecho);
    }
  });

  it('os ids dos termos não se repetem', () => {
    expect(new Set(glossario.map((t) => t.id)).size).toBe(glossario.length);
  });

  it('os trechos de uma mesma afirmação não se sobrepõem', () => {
    for (const pergunta of perguntas) {
      const trechos = glossario
        .filter((t) => t.perguntaId === pergunta.id)
        .map((t) => [pergunta.texto.indexOf(t.trecho), pergunta.texto.indexOf(t.trecho) + t.trecho.length])
        .sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < trechos.length; i++) {
        expect(trechos[i][0], `pergunta ${pergunta.id}`).toBeGreaterThanOrEqual(trechos[i - 1][1]);
      }
    }
  });

  it('todo termo não pendente tem pelo menos 1 fonte', () => {
    const semFonte = glossario.filter((t) => !t.definicao.pendente && t.definicao.fontes.length < 1).map((t) => t.id);
    expect(semFonte).toEqual([]);
  });

  it('a afirmação 17 não tem termos (seção 6.4)', () => {
    expect(glossario.filter((t) => t.perguntaId === 17)).toEqual([]);
  });
});
