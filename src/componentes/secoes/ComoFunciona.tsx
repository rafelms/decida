import { avisoAntesDeComecar, botaoComecar, dicaGlossario, passosComoFunciona, secaoPorAncora } from '../../dados/textos';
import { rolarPara } from '../../utils/rolarPara';
import { Aviso } from '../ui/Aviso';
import { Botao } from '../ui/Botao';
import { NumeroSecao } from '../ui/NumeroSecao';

// Seção 02 — três passos, aviso "Antes de começar" e botão COMEÇAR
export function ComoFunciona() {
  return (
    <section id="como-funciona" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('como-funciona')} />

      <ol className="space-y-4">
        {passosComoFunciona.map((passo, i) => (
          <li
            key={passo}
            className="border-3 border-tinta flex items-center gap-4 bg-superficie p-4 shadow-dura md:p-5 md:shadow-dura-g"
          >
            <span
              aria-hidden="true"
              className="border-3 border-tinta flex size-12 shrink-0 items-center justify-center bg-fundo font-titulo text-2xl"
            >
              {i + 1}
            </span>
            <span className="text-lg font-bold">{passo}</span>
          </li>
        ))}
      </ol>

      {/* Explica o glossário das afirmações */}
      <div className="mt-6 flex gap-4 border-3 border-dashed border-tinta p-4 md:p-5">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center border-3 border-tinta bg-superficie font-titulo text-2xl"
        >
          i
        </span>
        <div>
          <p className="font-titulo uppercase">{dicaGlossario.titulo}</p>
          <p className="mt-1">{dicaGlossario.texto}</p>
        </div>
      </div>

      <Aviso aviso={avisoAntesDeComecar} className="mt-10" />

      <div className="mt-8">
        <Botao larguraTotal onClick={() => rolarPara('teste')}>
          {botaoComecar}
        </Botao>
      </div>
    </section>
  );
}
