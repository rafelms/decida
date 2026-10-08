import { useCallback, useState } from 'react';
import { secoes, textosCabecalho, textosSobre } from '../../dados/textos';
import { useDialogo } from '../../hooks/useDialogo';
import { useTema } from '../../hooks/useTema';
import { rolarPara } from '../../utils/rolarPara';
import type { DestinoSobre } from './PainelSobre';

// Ícones do botão de tema, desenhados em SVG (sem emoji).
// Mostra o tema para o qual o botão leva: lua no claro, sol no escuro.
function IconeLua() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" stroke="currentColor" strokeWidth={2} strokeLinejoin="miter" />
    </svg>
  );
}

function IconeSol() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <rect x="8" y="8" width="8" height="8" fill="currentColor" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
    </svg>
  );
}

interface CabecalhoProps {
  sobreAberto: boolean;
  // Abre o painel "Sobre" (controlado pelo App, porque o rodapé também o abre)
  abrirSobre: (destino: DestinoSobre, origem: HTMLButtonElement) => void;
}

// Cabeçalho fixo (56px) com o nome DECIDA à esquerda e, à direita,
// o botão de tema (claro/escuro), o botão de perfil (painel "Sobre")
// e o botão MENU (seções numeradas).
export function Cabecalho({ sobreAberto, abrirSobre }: CabecalhoProps) {
  const { tema, alternarTema } = useTema();
  const [menuAberto, setMenuAberto] = useState(false);
  const fecharMenu = useCallback(() => setMenuAberto(false), []);
  const { painel: painelMenu, botaoQueAbriu: botaoMenu } = useDialogo(menuAberto, fecharMenu);

  // Fecha o menu e rola até a seção escolhida
  const irPara = (ancora: string) => {
    setMenuAberto(false);
    // Espera o painel fechar e a rolagem ser liberada antes de rolar
    requestAnimationFrame(() => rolarPara(ancora));
  };

  return (
    <>
      {/* Link para pular a animação de abertura (aparece só ao receber foco) */}
      <a
        href="#como-funciona"
        onClick={(e) => {
          e.preventDefault();
          rolarPara('como-funciona');
        }}
        className="border-3 border-tinta fixed top-2 left-2 z-[60] -translate-y-24 bg-destaque px-4 py-2 font-bold focus:translate-y-0"
      >
        {textosCabecalho.pularConteudo}
      </a>

      <header className="fixed inset-x-0 top-0 z-40 h-14 border-b-3 border-tinta bg-fundo">
        <div className="mx-auto flex h-full max-w-[720px] items-center justify-between px-4">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex min-h-12 items-center font-titulo text-xl tracking-wide no-underline"
          >
            {textosCabecalho.marca}
          </a>

          <div className="flex items-center gap-2 min-[400px]:gap-3">
            {/* Botão de tema: alterna entre claro (padrão) e escuro */}
            <button
              type="button"
              aria-label={tema === 'claro' ? textosCabecalho.ativarTemaEscuro : textosCabecalho.ativarTemaClaro}
              title={tema === 'claro' ? textosCabecalho.ativarTemaEscuro : textosCabecalho.ativarTemaClaro}
              onClick={alternarTema}
              className="flex size-12 cursor-pointer items-center justify-center border-3 border-tinta bg-superficie shadow-dura-p hover:bg-fundo active:translate-0.5 active:shadow-none"
            >
              {tema === 'claro' ? <IconeLua /> : <IconeSol />}
            </button>

            {/* Botão de perfil: abre o painel "Sobre" */}
            <button
              type="button"
              aria-label={textosSobre.rotuloBotao}
              aria-haspopup="dialog"
              aria-expanded={sobreAberto}
              onClick={(e) => abrirSobre('projeto', e.currentTarget)}
              className="size-12 cursor-pointer overflow-hidden border-3 border-tinta bg-superficie shadow-dura-p active:translate-0.5 active:shadow-none"
            >
              <img
                src="/gato-profile-pixel.svg"
                alt=""
                width={42}
                height={42}
                className="size-full [image-rendering:pixelated]"
              />
            </button>

            <button
              ref={botaoMenu}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={menuAberto}
              onClick={() => setMenuAberto(true)}
              className="border-3 border-tinta min-h-12 cursor-pointer bg-superficie px-4 font-titulo text-sm tracking-wider shadow-dura-p active:translate-0.5 active:shadow-none"
            >
              {textosCabecalho.menu}
            </button>
          </div>
        </div>
      </header>

      {menuAberto && (
        <div
          ref={painelMenu}
          role="dialog"
          aria-modal="true"
          aria-label={textosCabecalho.tituloMenu}
          className="fixed inset-0 z-50 overflow-y-auto bg-fundo"
        >
          <div className="mx-auto flex max-w-[720px] flex-col px-4 pb-10">
            <div className="flex h-14 items-center justify-between border-b-3 border-tinta">
              <span className="font-titulo text-xl tracking-wide" aria-hidden="true">
                {textosCabecalho.marca}
              </span>
              <button
                type="button"
                onClick={fecharMenu}
                className="border-3 border-tinta min-h-12 cursor-pointer bg-destaque px-4 font-titulo text-sm tracking-wider shadow-dura-p active:translate-0.5 active:shadow-none"
              >
                {textosCabecalho.fechar}
              </button>
            </div>
            <nav aria-label={textosCabecalho.tituloMenu} className="mt-6">
              <ol className="space-y-3">
                {secoes.map((secao) => (
                  <li key={secao.ancora}>
                    <a
                      href={`#${secao.ancora}`}
                      onClick={(e) => {
                        e.preventDefault();
                        irPara(secao.ancora);
                      }}
                      className="border-3 border-tinta flex min-h-14 items-center gap-4 bg-superficie px-4 py-2 no-underline shadow-dura active:translate-0.5 active:shadow-dura-p"
                    >
                      <span className="font-titulo text-xl text-estrutura">{secao.numero}</span>
                      <span className="font-titulo text-lg uppercase">{secao.titulo}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
