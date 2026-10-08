import { useCallback, useEffect, useRef } from 'react';

// Comportamento de um painel em tela cheia (menu, sobre):
// trava a rolagem do fundo, foca o primeiro elemento, fecha com Esc,
// mantém o Tab dentro do painel e devolve o foco ao botão que o abriu.
export function useDialogo(aberto: boolean, fechar: () => void) {
  const painel = useRef<HTMLDivElement>(null);
  const botaoQueAbriu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const botao = botaoQueAbriu.current;
    document.body.style.overflow = 'hidden';
    // Foca o primeiro elemento, a menos que o painel já tenha levado o foco a um
    // trecho específico (ex.: o rodapé abre o "Sobre" direto no FAQ)
    if (!painel.current?.contains(document.activeElement)) {
      painel.current?.querySelector<HTMLElement>('a, button:not([disabled])')?.focus();
    }

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') fechar();
      if (evento.key === 'Tab' && painel.current) {
        const focaveis = [...painel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
        )].filter(
          (el) => el.tabIndex >= 0 && el.offsetParent !== null,
        );
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primeiro.focus();
        }
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', aoTeclar);
      botao?.focus({ preventScroll: true });
    };
  }, [aberto, fechar]);

  // Para painéis abertos por mais de um botão (ex.: o "Sobre", pelo cabeçalho e pelo rodapé):
  // registra quem abriu, antes de abrir, para o foco voltar a ele ao fechar
  const lembrarQuemAbriu = useCallback((botao: HTMLButtonElement) => {
    botaoQueAbriu.current = botao;
  }, []);

  return { painel, botaoQueAbriu, lembrarQuemAbriu };
}
