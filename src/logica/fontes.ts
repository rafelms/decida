import type { Fonte, Lado, Tema, TermoGlossario, TipoFonte } from '../tipos';

// Junta todas as fontes do site, sem repetição, para a seção de metodologia.

// Todas as fontes de uma ficha de lado, bloco por bloco
export function fontesDoLado(lado: Lado): Fonte[] {
  return [
    ...lado.ideiasCentrais.fontes,
    ...lado.modeloEconomico.fontes,
    ...lado.argumentosDefensores.fontes,
    ...lado.argumentosCriticos.fontes,
    ...lado.pensadores.flatMap((p) => p.relacao.fontes),
  ];
}

// Fontes de um tema: as das posições e as do episódio "Na prática"
export function fontesDoTema(tema: Tema): Fonte[] {
  return [...tema.fontes, ...tema.naPratica.fontes];
}

// Lista única (pela url e pelo título) de todas as fontes de fichas, temas (com os episódios) e glossário
export function todasAsFontes(lados: Lado[], temas: Tema[], glossario: TermoGlossario[]): Fonte[] {
  const todas = [
    ...lados.flatMap(fontesDoLado),
    ...temas.flatMap(fontesDoTema),
    ...glossario.flatMap((t) => t.definicao.fontes),
  ];
  // Mesma url com títulos diferentes (ex.: artigos distintos da Constituição) conta como fontes distintas
  const vistas = new Set<string>();
  return todas.filter((fonte) => {
    const chave = `${fonte.url} ${fonte.titulo}`;
    if (vistas.has(chave)) return false;
    vistas.add(chave);
    return true;
  });
}

// Agrupa as fontes por tipo, na ordem: acadêmica, institucional, jornalística, checagem
export function agruparPorTipo(fontes: Fonte[]): { tipo: TipoFonte; fontes: Fonte[] }[] {
  const ordem: TipoFonte[] = ['academica', 'institucional', 'jornalistica', 'checagem'];
  return ordem
    .map((tipo) => ({
      tipo,
      fontes: fontes
        .filter((f) => f.tipo === tipo)
        .sort((a, b) => a.veiculo.localeCompare(b.veiculo, 'pt-BR')),
    }))
    .filter((grupo) => grupo.fontes.length > 0);
}
