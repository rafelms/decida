// Classes do botão neobrutalista: borda de 3px, sombra dura e,
// ao pressionar, desloca 2px para baixo e para a direita com a sombra menor.
export function classesBotao(variante: 'principal' | 'secundario' = 'principal', larguraTotal = false) {
  return [
    'border-3 border-tinta inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 px-5 py-3',
    'font-titulo text-base uppercase tracking-wide text-tinta',
    'shadow-dura md:shadow-dura-g',
    'transition-[transform,box-shadow] duration-100 ease-out',
    'active:translate-x-0.5 active:translate-y-0.5 active:shadow-dura-p md:active:shadow-dura-m',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-0 disabled:active:shadow-dura',
    // Texto sobre laranja é sempre tinta, nunca branco
    variante === 'principal' ? 'bg-destaque' : 'bg-superficie hover:bg-fundo',
    larguraTotal ? 'w-full' : '',
  ].join(' ');
}
