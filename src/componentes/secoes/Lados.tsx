import type { ReactNode } from 'react';
import { lados } from '../../dados/lados';
import { secaoPorAncora, textosConteudo, textosLados } from '../../dados/textos';
import type { BlocoComFontes, Fonte, Lado, LadoId } from '../../tipos';
import { Acordeao } from '../ui/Acordeao';
import { Etiqueta } from '../ui/Etiqueta';
import { ListaFontes } from '../ui/ListaFontes';
import { NumeroSecao } from '../ui/NumeroSecao';

interface LadosProps {
  ladoDoUsuario: LadoId | null;
}

// Seção 05 — fichas dos 5 lados, em acordeão, na ordem do espectro.
// O lado do usuário começa aberto e com a etiqueta "SEU RESULTADO".
export function Lados({ ladoDoUsuario }: LadosProps) {
  return (
    <section id="lados" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('lados')} />
      <div className="space-y-5">
        {lados.map((lado) => {
          const ehDoUsuario = lado.id === ladoDoUsuario;
          return (
            <Acordeao
              // A chave muda com o resultado, para reabrir o lado certo ao refazer o teste
              key={`${lado.id}-${ladoDoUsuario ?? 'sem-resultado'}`}
              titulo={lado.nome}
              abertoInicial={ehDoUsuario}
              etiqueta={
                ehDoUsuario ? (
                  <Etiqueta variante="destaque" inclinada>
                    {textosLados.seuResultado}
                  </Etiqueta>
                ) : undefined
              }
            >
              <FichaDoLado lado={lado} />
            </Acordeao>
          );
        })}
      </div>
    </section>
  );
}

// Etiqueta mostrada em blocos ainda não entregues pelo autor
function EtiquetaRevisao({ pendente }: { pendente?: boolean }) {
  if (!pendente) return null;
  return (
    <Etiqueta variante="revisao" className="mb-3">
      {textosConteudo.emRevisao}
    </Etiqueta>
  );
}

// Um bloco da ficha: subtítulo, etiqueta de revisão, conteúdo e fontes
function BlocoFicha({ titulo, pendente, fontes, children }: { titulo: string; pendente?: boolean; fontes: Fonte[]; children: ReactNode }) {
  return (
    <div className="border-t-3 border-tinta pt-5 first:border-t-0 first:pt-0">
      <h4 className="mb-3 text-sm font-bold tracking-wider text-estrutura uppercase">{titulo}</h4>
      <EtiquetaRevisao pendente={pendente} />
      {children}
      <ListaFontes fontes={fontes} />
    </div>
  );
}

function ListaItens({ bloco }: { bloco: BlocoComFontes }) {
  return (
    <ul className="list-[square] space-y-2 pl-5 marker:text-estrutura">
      {bloco.itens.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

// Argumentos de defensores ou de críticos. Os dois quadros têm exatamente o mesmo
// visual (mesma cor, borda e tamanho), para nenhum parecer mais certo (seção 5.5).
function QuadroArgumentos({ titulo, bloco }: { titulo: string; bloco: BlocoComFontes }) {
  return (
    <div className="border-3 border-tinta bg-fundo p-4">
      <h4 className="mb-3 text-sm font-bold tracking-wider text-estrutura uppercase">{titulo}</h4>
      <EtiquetaRevisao pendente={bloco.pendente} />
      <ListaItens bloco={bloco} />
      <ListaFontes fontes={bloco.fontes} />
    </div>
  );
}

// Ficha completa, na ordem da seção 5.5
function FichaDoLado({ lado }: { lado: Lado }) {
  return (
    <div className="space-y-6">
      {/* O resumo é coberto pelas fontes das ideias centrais */}
      <BlocoFicha titulo={textosLados.resumo} pendente={lado.ideiasCentrais.pendente} fontes={[]}>
        <p className="text-lg">{lado.resumo}</p>
      </BlocoFicha>

      <BlocoFicha titulo={textosLados.ideiasCentrais} pendente={lado.ideiasCentrais.pendente} fontes={lado.ideiasCentrais.fontes}>
        <ListaItens bloco={lado.ideiasCentrais} />
      </BlocoFicha>

      <BlocoFicha titulo={textosLados.modeloEconomico} pendente={lado.modeloEconomico.pendente} fontes={lado.modeloEconomico.fontes}>
        <p>{lado.modeloEconomico.texto}</p>
      </BlocoFicha>

      {/* Defensores e críticos: lado a lado em telas largas, um abaixo do outro no celular */}
      <div className="grid gap-4 border-t-3 border-tinta pt-5 md:grid-cols-2">
        <QuadroArgumentos titulo={textosLados.argumentosDefensores} bloco={lado.argumentosDefensores} />
        <QuadroArgumentos titulo={textosLados.argumentosCriticos} bloco={lado.argumentosCriticos} />
      </div>

      <BlocoFicha titulo={textosLados.pensadores} fontes={[]}>
        <p className="mb-4 text-estrutura">{textosLados.notaPensadores}</p>
        <ul className="space-y-4">
          {lado.pensadores.map((pensador) => (
            <li key={pensador.nome} className="border-l-3 border-estrutura pl-4">
              <EtiquetaRevisao pendente={pensador.relacao.pendente} />
              <p className="font-bold">{pensador.nome}</p>
              <p className="text-estrutura">{pensador.quemFoi}</p>
              <p className="mt-2">{pensador.relacao.texto}</p>
              <ListaFontes fontes={pensador.relacao.fontes} />
            </li>
          ))}
        </ul>
      </BlocoFicha>
    </div>
  );
}
