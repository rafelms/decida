import { useEffect, useRef, type KeyboardEvent } from 'react';
import { nomesBloco, opcoesResposta, secaoPorAncora, textosQuestionario } from '../../dados/textos';
import type { EstadoTeste } from '../../hooks/useTeste';
import { rolarPara } from '../../utils/rolarPara';
import { termosDaPergunta } from '../../dados/glossario';
import { BarraProgresso } from '../ui/BarraProgresso';
import { Etiqueta } from '../ui/Etiqueta';
import { BotoesGlossario, CartoesLaterais, TextoComTermos } from '../ui/Glossario';
import { Botao } from '../ui/Botao';
import { NumeroSecao } from '../ui/NumeroSecao';

interface QuestionarioProps {
  teste: EstadoTeste;
}

// Seção 03 — uma afirmação por vez, com 5 opções em um grupo de rádio acessível
export function Questionario({ teste }: QuestionarioProps) {
  const { perguntas, perguntaAtual, indiceAtual, respostas, completo, responder, voltar } = teste;
  const respostaAtual = respostas[perguntaAtual.id];
  const ultima = indiceAtual === perguntas.length - 1;

  const textoAfirmacao = useRef<HTMLParagraphElement>(null);
  const opcoes = useRef<(HTMLButtonElement | null)[]>([]);
  const primeiraRenderizacao = useRef(true);

  // Ao trocar de afirmação, leva o foco para o texto dela, se o foco já
  // estava dentro do questionário (para leitores de tela anunciarem a nova)
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    const secao = document.getElementById('teste');
    if (secao?.contains(document.activeElement) || document.activeElement === document.body) {
      textoAfirmacao.current?.focus({ preventScroll: true });
    }
  }, [indiceAtual]);

  // Navegação por setas entre as opções (o foco anda; Enter/Espaço escolhe).
  // Assim, andar com as setas não responde nem avança sem querer.
  const aoTeclar = (evento: KeyboardEvent<HTMLButtonElement>, indice: number) => {
    let proximo = -1;
    if (evento.key === 'ArrowDown' || evento.key === 'ArrowRight') proximo = (indice + 1) % opcoesResposta.length;
    if (evento.key === 'ArrowUp' || evento.key === 'ArrowLeft')
      proximo = (indice - 1 + opcoesResposta.length) % opcoesResposta.length;
    if (proximo >= 0) {
      evento.preventDefault();
      opcoes.current[proximo]?.focus();
    }
  };

  // Só uma opção fica no Tab: a marcada ou, sem resposta, a primeira
  const indiceFocavel = Math.max(0, opcoesResposta.findIndex((o) => o.valor === respostaAtual));
  const idTexto = `afirmacao-${perguntaAtual.id}`;
  const termos = termosDaPergunta(perguntaAtual.id, perguntaAtual.texto);

  return (
    <section id="teste" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('teste')} />

      {/* Bloco da afirmação atual (economia, sociedade ou internacional) */}
      <p className="mb-3">
        <span className="sr-only">{textosQuestionario.rotuloBloco}: </span>
        <Etiqueta className="tracking-normal">{nomesBloco[perguntaAtual.bloco]}</Etiqueta>
      </p>

      <BarraProgresso atual={indiceAtual + 1} total={perguntas.length} rotulo={textosQuestionario.rotuloProgresso} />

      {/* Cartão da afirmação; os cartões do glossário ficam nas laterais em telas largas */}
      <div className="relative border-3 border-tinta mt-6 bg-superficie p-5 shadow-dura md:p-8 md:shadow-dura-g">
        <p className="mb-2 text-sm font-bold tracking-wider text-estrutura uppercase">
          {textosQuestionario.afirmacao} {indiceAtual + 1}
        </p>
        <p
          id={idTexto}
          ref={textoAfirmacao}
          tabIndex={-1}
          className="font-titulo text-2xl leading-tight md:text-3xl"
        >
          <TextoComTermos texto={perguntaAtual.texto} termos={termos} />
        </p>
        <CartoesLaterais termos={termos} />
      </div>

      {/* A chave fecha a explicação aberta ao trocar de afirmação */}
      <BotoesGlossario key={perguntaAtual.id} termos={termos} />

      <div role="radiogroup" aria-labelledby={idTexto} className="mt-6 flex flex-col gap-3">
        {opcoesResposta.map((opcao, i) => {
          const marcada = respostaAtual === opcao.valor;
          return (
            <button
              key={opcao.valor}
              ref={(el) => {
                opcoes.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={marcada}
              tabIndex={i === indiceFocavel ? 0 : -1}
              onClick={() => responder(opcao.valor)}
              onKeyDown={(e) => aoTeclar(e, i)}
              className={`border-3 border-tinta flex min-h-14 w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-lg font-bold shadow-dura transition-[transform,box-shadow,background-color] duration-100 active:translate-0.5 active:shadow-dura-p md:shadow-dura-g ${
                marcada ? 'translate-0.5 bg-destaque shadow-dura-p md:shadow-dura-m' : 'bg-superficie hover:bg-fundo'
              }`}
            >
              {/* Indicador de marcação: quadrado vazio ou preenchido */}
              <span aria-hidden="true" className="border-3 border-tinta flex size-6 shrink-0 items-center justify-center bg-superficie">
                {marcada && <span className="size-3 bg-tinta" />}
              </span>
              {opcao.rotulo}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row-reverse sm:justify-between">
        {ultima && completo && (
          <Botao onClick={() => rolarPara('resultado')} larguraTotal className="sm:w-auto">
            {textosQuestionario.verResultado}
          </Botao>
        )}
        <Botao variante="secundario" onClick={voltar} disabled={indiceAtual === 0} className="sm:w-auto">
          {textosQuestionario.voltar}
        </Botao>
      </div>
    </section>
  );
}
