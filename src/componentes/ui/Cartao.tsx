import type { HTMLAttributes } from 'react';

interface CartaoProps extends HTMLAttributes<HTMLDivElement> {
  destaque?: boolean; // laranja: só para o que pertence ao usuário
}

// Cartão base: superfície creme, borda de 3px e sombra dura
export function Cartao({ destaque = false, className = '', ...resto }: CartaoProps) {
  return (
    <div
      className={`border-3 border-tinta p-5 shadow-dura md:p-6 md:shadow-dura-g ${destaque ? 'bg-destaque' : 'bg-superficie'} ${className}`}
      {...resto}
    />
  );
}
