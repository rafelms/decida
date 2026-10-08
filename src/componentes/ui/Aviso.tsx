import type { TextoAviso } from '../../dados/textos';

interface AvisoProps {
  aviso: TextoAviso;
  className?: string;
}

// Bloco de aviso: título em caixa alta e parágrafos com trecho em negrito
export function Aviso({ aviso, className = '' }: AvisoProps) {
  return (
    <aside
      className={`border-3 border-tinta border-l-[12px] bg-superficie p-5 shadow-dura md:p-6 md:shadow-dura-g ${className}`}
      aria-label={aviso.titulo}
    >
      <p className="mb-3 font-titulo text-lg uppercase">{aviso.titulo}</p>
      <div className="space-y-3">
        {aviso.paragrafos.map((p, i) => (
          <p key={i}>
            {p.negrito && <strong className="font-bold">{p.negrito}</strong>}
            {p.negrito && p.texto && ' '}
            {p.texto}
          </p>
        ))}
      </div>
    </aside>
  );
}
