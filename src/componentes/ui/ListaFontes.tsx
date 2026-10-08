import { useId, useState } from 'react';
import { formatarData, textosConteudo } from '../../dados/textos';
import type { Fonte } from '../../tipos';

interface ListaFontesProps {
  fontes: Fonte[];
}

// Uma fonte na lista: título com link, veículo e data de acesso
export function ItemFonte({ fonte }: { fonte: Fonte }) {
  return (
    <li className="leading-snug">
      <a
        href={fonte.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline decoration-2 underline-offset-2 hover:text-estrutura"
      >
        {fonte.titulo}
        <span className="sr-only"> {textosConteudo.abreEmNovaAba}</span>
      </a>
      <span className="block text-estrutura">
        {fonte.veiculo} · {textosConteudo.acessadoEm} {formatarData(fonte.acessadoEm)}
      </span>
    </li>
  );
}

// Botão "FONTES (n)" que expande a lista de links
export function ListaFontes({ fontes }: ListaFontesProps) {
  const [aberta, setAberta] = useState(false);
  const id = useId();

  if (fontes.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        type="button"
        aria-expanded={aberta}
        aria-controls={id}
        onClick={() => setAberta(!aberta)}
        className="border-3 border-tinta min-h-12 cursor-pointer bg-fundo px-3 py-2 text-sm font-bold tracking-wider uppercase hover:bg-superficie"
      >
        {textosConteudo.fontes(fontes.length)}
      </button>
      <ul id={id} hidden={!aberta} className="mt-3 space-y-3 border-l-3 border-tinta pl-4">
        {fontes.map((fonte) => (
          <ItemFonte key={fonte.url} fonte={fonte} />
        ))}
      </ul>
    </div>
  );
}
