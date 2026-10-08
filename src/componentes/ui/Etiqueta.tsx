import type { ReactNode } from 'react';

interface EtiquetaProps {
  children: ReactNode;
  variante?: 'neutra' | 'destaque' | 'revisao';
  inclinada?: boolean; // leve rotação, só em uso decorativo
  className?: string;
}

const fundos = {
  neutra: 'bg-superficie',
  destaque: 'bg-destaque',
  revisao: 'bg-fundo border-dashed',
};

// Etiqueta curta em caixa alta (ex.: "SEU RESULTADO", "VISÃO PRÓXIMA")
export function Etiqueta({ children, variante = 'neutra', inclinada = false, className = '' }: EtiquetaProps) {
  return (
    <span
      className={`border-3 border-tinta inline-block px-2 py-0.5 text-sm font-bold uppercase leading-snug tracking-wider whitespace-nowrap text-tinta ${fundos[variante]} ${inclinada ? '-rotate-2' : ''} ${className}`}
    >
      {children}
    </span>
  );
}
