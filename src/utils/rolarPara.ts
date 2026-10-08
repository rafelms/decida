// Rola a página até uma seção e leva o foco do teclado para o título dela,
// para quem usa leitor de tela ou teclado continuar do lugar certo.
export function rolarPara(ancora: string) {
  const secao = document.getElementById(ancora);
  if (!secao) return;

  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  secao.scrollIntoView({ behavior: semAnimacao ? 'auto' : 'smooth', block: 'start' });

  // O título da seção tem tabIndex={-1} para poder receber foco
  const titulo = secao.querySelector<HTMLElement>('[data-titulo-secao]');
  titulo?.focus({ preventScroll: true });
}
