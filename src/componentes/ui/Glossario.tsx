import { useId, useState } from 'react';
import { textosConteudo, textosGlossario } from '../../dados/textos';
import type { TermoGlossario } from '../../tipos';
import { Etiqueta } from './Etiqueta';
import { ListaFontes } from './ListaFontes';

// Glossário do questionário (pedido do autor, seção 5.3 do SDD):
// - TextoComTermos: sublinha na afirmação as palavras que têm explicação;
// - CartoesLaterais: em telas a partir de 1280px, explicações ao lado do cartão;
// - BotoesGlossario: abaixo de 1280px, botões "i" que abrem a explicação.

// Selo "i" desenhado com texto e borda (sem emoji)
function SeloInfo() {
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center border-2 border-tinta bg-superficie font-titulo text-sm leading-none normal-case"
    >
      i
    </span>
  );
}

// Afirmação com os trechos do glossário sublinhados (só visual)
export function TextoComTermos({ texto, termos }: { texto: string; termos: TermoGlossario[] }) {
  const partes: { texto: string; termo: boolean }[] = [];
  let posicao = 0;
  for (const t of termos) {
    const inicio = texto.indexOf(t.trecho, posicao);
    if (inicio < 0) continue;
    if (inicio > posicao) partes.push({ texto: texto.slice(posicao, inicio), termo: false });
    partes.push({ texto: t.trecho, termo: true });
    posicao = inicio + t.trecho.length;
  }
  if (posicao < texto.length) partes.push({ texto: texto.slice(posicao), termo: false });

  return (
    <>
      {partes.map((p, i) =>
        p.termo ? (
          <span key={i} className="underline decoration-estrutura decoration-dotted decoration-[3px] underline-offset-[6px]">
            {p.texto}
          </span>
        ) : (
          p.texto
        ),
      )}
    </>
  );
}

// Conteúdo de uma explicação: título, etiqueta de revisão, texto e fontes
function Definicao({ termo, comTitulo }: { termo: TermoGlossario; comTitulo: boolean }) {
  return (
    <>
      {comTitulo && <p className="mb-2 font-titulo text-lg leading-tight uppercase">{termo.termo}</p>}
      {termo.definicao.pendente && (
        <Etiqueta variante="revisao" className="mb-2">
          {textosConteudo.emRevisao}
        </Etiqueta>
      )}
      <p className="leading-relaxed">{termo.definicao.texto}</p>
      <ListaFontes fontes={termo.definicao.fontes} />
    </>
  );
}

// Cartões nas laterais do cartão da afirmação (telas a partir de 1280px).
// Termos alternam: o 1º à esquerda, o 2º à direita, o 3º à esquerda...
// Ficam fora da coluna de leitura, posicionados em relação ao cartão.
export function CartoesLaterais({ termos }: { termos: TermoGlossario[] }) {
  if (termos.length === 0) return null;
  const esquerda = termos.filter((_, i) => i % 2 === 0);
  const direita = termos.filter((_, i) => i % 2 === 1);

  const coluna = (lista: TermoGlossario[], lado: 'esquerda' | 'direita') =>
    lista.length > 0 && (
      <ul
        className={`absolute top-0 hidden w-[clamp(200px,calc((100vw-720px)/2-48px),280px)] flex-col gap-4 min-[1280px]:flex ${
          lado === 'esquerda' ? 'right-full mr-6' : 'left-full ml-6'
        }`}
      >
        {lista.map((termo) => (
          <li
            key={termo.id}
            className="border-3 border-tinta bg-superficie p-4 shadow-dura"
          >
            <p className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-estrutura uppercase">
              <SeloInfo />
              {textosGlossario.rotulo}
            </p>
            <Definicao termo={termo} comTitulo />
          </li>
        ))}
      </ul>
    );

  return (
    <>
      {coluna(esquerda, 'esquerda')}
      {coluna(direita, 'direita')}
    </>
  );
}

// Botões "i" com as explicações (telas abaixo de 1280px). Uma aberta por vez.
export function BotoesGlossario({ termos }: { termos: TermoGlossario[] }) {
  const [aberto, setAberto] = useState<string | null>(null);
  const id = useId();
  if (termos.length === 0) return null;

  const termoAberto = termos.find((t) => t.id === aberto);

  return (
    <div className="mt-4 min-[1280px]:hidden">
      <p className="mb-2 text-sm font-bold tracking-wider text-estrutura uppercase">{textosGlossario.rotulo}:</p>
      <div className="flex flex-wrap gap-2">
        {termos.map((termo) => {
          const estaAberto = termo.id === aberto;
          return (
            <button
              key={termo.id}
              type="button"
              aria-expanded={estaAberto}
              aria-controls={`${id}-definicao`}
              aria-label={textosGlossario.rotuloBotao(termo.termo)}
              onClick={() => setAberto(estaAberto ? null : termo.id)}
              className={`flex min-h-12 cursor-pointer items-center gap-2 border-3 border-tinta px-3 py-2 text-left font-bold shadow-dura-p active:translate-0.5 active:shadow-none ${
                estaAberto ? 'bg-fundo' : 'bg-superficie hover:bg-fundo'
              }`}
            >
              <SeloInfo />
              {termo.termo}
            </button>
          );
        })}
      </div>
      <div
        id={`${id}-definicao`}
        role="region"
        aria-label={termoAberto ? termoAberto.termo : textosGlossario.rotulo}
        hidden={!termoAberto}
        className="mt-3 border-3 border-l-[12px] border-tinta bg-superficie p-4"
      >
        {termoAberto && <Definicao termo={termoAberto} comTitulo />}
      </div>
    </div>
  );
}
