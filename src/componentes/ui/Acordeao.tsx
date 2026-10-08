import { useId, useState, type ReactNode } from 'react';

interface AcordeaoProps {
  titulo: ReactNode;
  children: ReactNode;
  abertoInicial?: boolean;
  etiqueta?: ReactNode; // ex.: "SEU RESULTADO"
  nivelTitulo?: 3 | 4;
  destaque?: boolean;
  tituloTexto?: boolean; // título em texto comum (para perguntas longas, como no FAQ)
}

// Acordeão acessível: botão com aria-expanded controlando um painel (padrão WAI-ARIA)
export function Acordeao({
  titulo,
  children,
  abertoInicial = false,
  etiqueta,
  nivelTitulo = 3,
  destaque = false,
  tituloTexto = false,
}: AcordeaoProps) {
  const [aberto, setAberto] = useState(abertoInicial);
  const id = useId();
  const Titulo = nivelTitulo === 3 ? 'h3' : 'h4';

  return (
    <div className={`border-3 border-tinta shadow-dura md:shadow-dura-g ${destaque ? 'bg-destaque' : 'bg-superficie'}`}>
      <Titulo className="m-0 font-texto normal-case">
        <button
          type="button"
          id={`${id}-botao`}
          aria-expanded={aberto}
          aria-controls={`${id}-painel`}
          onClick={() => setAberto(!aberto)}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left md:px-5"
        >
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={tituloTexto ? 'text-lg leading-snug font-bold' : 'font-titulo text-lg uppercase md:text-xl'}>
              {titulo}
            </span>
            {etiqueta}
          </span>
          {/* Sinal de + / − desenhado com CSS (sem emoji) */}
          <span aria-hidden="true" className="border-3 border-tinta relative size-8 shrink-0 bg-fundo">
            <span className="absolute top-1/2 left-1/2 h-[3px] w-3.5 -translate-1/2 bg-tinta" />
            <span
              className={`absolute top-1/2 left-1/2 h-3.5 w-[3px] -translate-1/2 bg-tinta transition-transform duration-150 ${aberto ? 'scale-y-0' : ''}`}
            />
          </span>
        </button>
      </Titulo>
      <div
        id={`${id}-painel`}
        role="region"
        aria-labelledby={`${id}-botao`}
        hidden={!aberto}
        className="border-t-3 border-tinta bg-superficie px-4 py-5 md:px-5"
      >
        {children}
      </div>
    </div>
  );
}
