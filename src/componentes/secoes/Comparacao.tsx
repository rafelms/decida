import { useId, useState } from 'react';
import { lados } from '../../dados/lados';
import { ladoPorId } from '../../logica/lados';
import { temas } from '../../dados/temas';
import { secaoPorAncora, textosComparacao, textosConteudo, textosNaPratica } from '../../dados/textos';
import { posicaoDoLado, relacaoEntre } from '../../logica/comparacao';
import type { EpisodioHistorico, LadoId, PosicaoNoTema, Tema } from '../../tipos';
import { Cartao } from '../ui/Cartao';
import { Etiqueta } from '../ui/Etiqueta';
import { ListaFontes } from '../ui/ListaFontes';
import { NumeroSecao } from '../ui/NumeroSecao';

interface ComparacaoProps {
  ladoInicial: LadoId; // resultado do usuário ou, sem resultado, "centro"
}

// Seção 06 — visões próximas e opostas por tema
export function Comparacao({ ladoInicial }: ComparacaoProps) {
  const [selecionado, setSelecionado] = useState<LadoId>(ladoInicial);
  const idSeletor = useId();

  return (
    <section id="comparacao" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('comparacao')} />

      <div className="mb-8">
        <label htmlFor={idSeletor} className="mb-2 block font-bold">
          {textosComparacao.compararAPartirDe}
        </label>
        <select
          id={idSeletor}
          value={selecionado}
          onChange={(e) => setSelecionado(e.target.value as LadoId)}
          className="border-3 border-tinta min-h-12 w-full cursor-pointer bg-superficie px-3 text-lg font-bold shadow-dura md:shadow-dura-g"
        >
          {lados.map((lado) => (
            <option key={lado.id} value={lado.id}>
              {lado.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {temas.map((tema) => (
          <CartaoTema key={`${tema.id}-${selecionado}`} tema={tema} selecionado={selecionado} />
        ))}
      </div>
    </section>
  );
}

// Um tema: posição do lado selecionado, crítica a ela e os outros 4 lados
function CartaoTema({ tema, selecionado }: { tema: Tema; selecionado: LadoId }) {
  const posicaoSelecionada = posicaoDoLado(tema, selecionado);
  const outros = tema.posicoes.filter((p) => p.lado !== selecionado);

  return (
    <Cartao>
      <h3 className="text-2xl">{tema.nome}</h3>
      {tema.pendente && (
        <Etiqueta variante="revisao" className="mt-3">
          {textosConteudo.emRevisao}
        </Etiqueta>
      )}

      <div className="mt-4 space-y-3">
        <p className="text-sm font-bold tracking-wider text-estrutura uppercase">
          {textosComparacao.posicaoDe(ladoPorId(selecionado).nome)}
        </p>
        <p className="text-lg">{posicaoSelecionada.posicao}</p>
        <p>
          <strong>{textosComparacao.criticaComum}:</strong> {posicaoSelecionada.criticaComum}
        </p>
      </div>

      <p className="mt-6 mb-3 text-sm font-bold tracking-wider text-estrutura uppercase">{textosComparacao.outrosLados}</p>
      <ul className="space-y-3">
        {outros.map((posicao) => (
          <OutroLado
            key={posicao.lado}
            posicao={posicao}
            // Enquanto o tema estiver pendente, os valores da escala ainda não existem
            relacao={tema.pendente ? null : relacaoEntre(posicaoSelecionada, posicao)}
          />
        ))}
      </ul>

      <ListaFontes fontes={tema.fontes} />

      {/* Episódio histórico do tema: não muda com o lado selecionado (seção 5.6) */}
      <NaPratica episodio={tema.naPratica} />
    </Cartao>
  );
}

// Outro lado: ao tocar, mostra posição, argumento e crítica mais comum
function OutroLado({ posicao, relacao }: { posicao: PosicaoNoTema; relacao: string | null }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  return (
    <li className="border-3 border-tinta bg-fundo">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto(!aberto)}
        className="flex min-h-14 w-full cursor-pointer flex-wrap items-center justify-between gap-2 px-3 py-2 text-left"
      >
        <span className="font-titulo uppercase">{ladoPorId(posicao.lado).nome}</span>
        <span className="flex items-center gap-2">
          {relacao && <Etiqueta>{relacao}</Etiqueta>}
          <span aria-hidden="true" className="font-titulo text-xl leading-none">
            {aberto ? '−' : '+'}
          </span>
        </span>
      </button>
      <div id={id} hidden={!aberto} className="space-y-2 border-t-3 border-tinta bg-superficie px-3 py-3">
        <p>
          <strong>{textosComparacao.posicao}:</strong> {posicao.posicao}
        </p>
        <p>
          <strong>{textosComparacao.argumento}:</strong> {posicao.argumento}
        </p>
        <p>
          <strong>{textosComparacao.criticaComum}:</strong> {posicao.criticaComum}
        </p>
      </div>
    </li>
  );
}

// Bloco "Na prática": um episódio da história do Brasil ligado ao tema, fechado por padrão.
// Não é atribuído a nenhum lado. Defensores e críticos têm o mesmo visual.
function NaPratica({ episodio }: { episodio: EpisodioHistorico }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  return (
    <div className="mt-6 border-3 border-tinta bg-fundo">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto(!aberto)}
        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 text-left"
      >
        <span className="font-titulo uppercase">{textosNaPratica.titulo}</span>
        <span aria-hidden="true" className="font-titulo text-xl leading-none">
          {aberto ? '−' : '+'}
        </span>
      </button>
      <div id={id} hidden={!aberto} className="border-t-3 border-tinta bg-superficie px-3 py-4">
        {episodio.pendente && (
          <Etiqueta variante="revisao" className="mb-3">
            {textosConteudo.emRevisao}
          </Etiqueta>
        )}
        <h4 className="font-texto text-lg leading-snug font-bold normal-case">{episodio.titulo}</h4>

        <p className="mt-4 mb-1 text-sm font-bold tracking-wider text-estrutura uppercase">{textosNaPratica.oQueFoi}</p>
        <p>{episodio.oQueFoi}</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="border-3 border-tinta bg-fundo p-3">
            <p className="mb-1 text-sm font-bold tracking-wider text-estrutura uppercase">{textosNaPratica.defensores}</p>
            <p>{episodio.defensores}</p>
          </div>
          <div className="border-3 border-tinta bg-fundo p-3">
            <p className="mb-1 text-sm font-bold tracking-wider text-estrutura uppercase">{textosNaPratica.criticos}</p>
            <p>{episodio.criticos}</p>
          </div>
        </div>

        <p className="mt-4 border-l-3 border-estrutura pl-3 text-estrutura">{textosNaPratica.nota}</p>
        <ListaFontes fontes={episodio.fontes} />
      </div>
    </div>
  );
}
