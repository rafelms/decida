import { lados } from '../../dados/lados';
import { textosResultado } from '../../dados/textos';
import {
  LIMITE_TOTAL_CENTRO,
  LIMITE_TOTAL_CENTRO_DIREITA,
  LIMITE_TOTAL_CENTRO_ESQUERDA,
  LIMITE_TOTAL_ESQUERDA,
} from '../../logica/pontuacao';
import type { LadoId } from '../../tipos';

interface BarraEspectroProps {
  total: number; // -36 a +36
  lado: LadoId;
}

// Quantos valores inteiros do total cabem em cada faixa (-36 a +36 = 73 valores),
// seguindo os limites de src/logica/pontuacao.ts.
// Cada segmento da barra tem largura proporcional à sua faixa.
const TOTAL_MAXIMO = 36;
const tamanhoFaixas: Record<LadoId, number> = {
  esquerda: LIMITE_TOTAL_ESQUERDA + TOTAL_MAXIMO + 1, // -36 a -21
  'centro-esquerda': LIMITE_TOTAL_CENTRO_ESQUERDA - LIMITE_TOTAL_ESQUERDA, // -20 a -6
  centro: LIMITE_TOTAL_CENTRO - LIMITE_TOTAL_CENTRO_ESQUERDA, // -5 a +5
  'centro-direita': LIMITE_TOTAL_CENTRO_DIREITA - LIMITE_TOTAL_CENTRO, // +6 a +20
  direita: TOTAL_MAXIMO - LIMITE_TOTAL_CENTRO_DIREITA, // +21 a +36
};
const TOTAL_VALORES = TOTAL_MAXIMO * 2 + 1;

// Posição (0 a 100%) do centro de cada faixa, para os rótulos
function centroDaFaixa(indice: number): number {
  const antes = lados.slice(0, indice).reduce((soma, l) => soma + tamanhoFaixas[l.id], 0);
  return ((antes + tamanhoFaixas[lados[indice].id] / 2) / TOTAL_VALORES) * 100;
}

// Quebra "Centro-esquerda" em duas linhas para caber no celular
function rotuloEmLinhas(nome: string) {
  const [primeira, segunda] = nome.split('-');
  return segunda ? (
    <>
      {primeira}-<br />
      {segunda}
    </>
  ) : (
    nome
  );
}

// Linha horizontal com os 5 lados e um marcador na posição do total.
// Rótulos alternam acima e abaixo da barra para não se sobreporem em 360px.
export function BarraEspectro({ total, lado }: BarraEspectroProps) {
  const posicaoMarcador = ((total + TOTAL_MAXIMO + 0.5) / TOTAL_VALORES) * 100;

  const rotulo = (indice: number) => {
    const l = lados[indice];
    const ehDoUsuario = l.id === lado;
    // As pontas ficam alinhadas às bordas; os demais, centralizados
    const alinhamento =
      indice === 0 ? 'left-0 text-left' : indice === lados.length - 1 ? 'right-0 text-right' : '-translate-x-1/2 text-center';
    return (
      <span
        key={l.id}
        className={`absolute top-0 font-bold leading-tight uppercase ${alinhamento} ${ehDoUsuario ? 'underline decoration-destaque decoration-4 underline-offset-4' : ''}`}
        style={indice === 0 || indice === lados.length - 1 ? undefined : { left: `${centroDaFaixa(indice)}%` }}
      >
        {rotuloEmLinhas(l.nome)}
      </span>
    );
  };

  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        {textosResultado.rotuloEspectro}: {textosResultado.descricaoEspectro(total)}
      </figcaption>
      <div aria-hidden="true">
        {/* Rótulos de cima: esquerda, centro, direita */}
        <div className="relative h-7">{[0, 2, 4].map(rotulo)}</div>

        {/* Barra com os 5 segmentos e o marcador */}
        <div className="relative my-3">
          <div className="border-3 border-tinta flex h-6 bg-superficie">
            {lados.map((l, i) => (
              <div
                key={l.id}
                className={i > 0 ? 'border-l-3 border-tinta' : ''}
                style={{ flexGrow: tamanhoFaixas[l.id], flexBasis: 0 }}
              />
            ))}
          </div>
          <div
            className="border-3 border-tinta absolute top-1/2 size-8 -translate-1/2 rotate-45 bg-destaque shadow-dura-p"
            style={{ left: `${posicaoMarcador}%` }}
          />
        </div>

        {/* Rótulos de baixo: centro-esquerda e centro-direita */}
        <div className="relative h-14">{[1, 3].map(rotulo)}</div>

        <div className="flex justify-between text-sm font-bold text-estrutura tabular-nums">
          <span>−{TOTAL_MAXIMO}</span>
          <span>0</span>
          <span>+{TOTAL_MAXIMO}</span>
        </div>
      </div>
    </figure>
  );
}
