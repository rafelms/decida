interface BarraProgressoProps {
  atual: number; // número da afirmação atual (1 a total)
  total: number;
  rotulo: string;
}

// Indicador "3 / 18" e barra de progresso do questionário
export function BarraProgresso({ atual, total, rotulo }: BarraProgressoProps) {
  const porcentagem = (atual / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="font-titulo text-lg tabular-nums" aria-hidden="true">
        {atual} / {total}
      </span>
      <div
        className="border-3 border-tinta h-4 flex-1 bg-superficie"
        role="progressbar"
        aria-label={rotulo}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={atual}
        aria-valuetext={`${atual} de ${total}`}
      >
        {/* A barra cresce com transform (scaleX), sem animar largura */}
        <div
          className="h-full origin-left bg-tinta transition-transform duration-200 ease-out"
          style={{ transform: `scaleX(${porcentagem / 100})` }}
        />
      </div>
    </div>
  );
}
