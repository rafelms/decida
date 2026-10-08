import { ladoPorId } from '../../logica/lados';
import { secaoPorAncora, textoAvisoFinal } from '../../dados/textos';
import type { LadoId } from '../../tipos';
import { NumeroSecao } from '../ui/NumeroSecao';

interface AvisoFinalProps {
  ladoDoUsuario: LadoId | null;
}

// Linha personalizada conforme o resultado (seção 9.5)
function linhaPersonalizada(lado: LadoId | null): string {
  if (!lado) return textoAvisoFinal.linhaSemResultado;
  if (lado === 'centro') return textoAvisoFinal.linhaCentro;
  return textoAvisoFinal.linhaLado(ladoPorId(lado).nomeComArtigo);
}

// Seção 08 — mensagem de conscientização
export function AvisoFinal({ ladoDoUsuario }: AvisoFinalProps) {
  return (
    <section id="aviso-final" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('aviso-final')} />

      <div className="border-3 border-tinta bg-superficie p-6 shadow-dura md:p-10 md:shadow-dura-g">
        <p className="font-titulo text-2xl leading-tight uppercase md:text-3xl">{textoAvisoFinal.titulo}</p>
        <p className="mt-5 text-lg">{textoAvisoFinal.paragrafo1}</p>
        <p className="border-3 border-tinta mt-5 bg-fundo p-4 text-lg font-bold italic">
          {linhaPersonalizada(ladoDoUsuario)}
        </p>
        <p className="mt-5 text-lg">{textoAvisoFinal.paragrafo2}</p>
        <p className="mt-8 inline-block -rotate-1 bg-destaque px-3 py-2 font-titulo text-xl leading-tight uppercase md:text-2xl">
          {textoAvisoFinal.fechamento}
        </p>
      </div>
    </section>
  );
}
