import type { Secao } from '../../dados/textos';

interface NumeroSecaoProps {
  secao: Secao;
}

// Cabeçalho de seção: número (01, 02...) em etiqueta inclinada e título h2.
// O título recebe foco quando a página rola até a seção (ver rolarPara).
export function NumeroSecao({ secao }: NumeroSecaoProps) {
  return (
    <div className="mb-8 flex flex-col items-start gap-3">
      <span
        aria-hidden="true"
        className="border-3 border-tinta inline-block -rotate-2 bg-superficie px-2 py-1 font-titulo text-2xl leading-none shadow-dura"
      >
        {secao.numero}
      </span>
      <h2 data-titulo-secao tabIndex={-1} className="text-3xl md:text-5xl">
        <span className="sr-only">{secao.numero}. </span>
        {secao.titulo}
      </h2>
    </div>
  );
}
