import { dataConteudo, formatarData, textoRodape } from '../../dados/textos';
import { rolarPara } from '../../utils/rolarPara';
import type { DestinoSobre } from './PainelSobre';

interface RodapeProps {
  abrirSobre: (destino: DestinoSobre, origem: HTMLButtonElement) => void;
}

// Estilo comum dos links do rodapé: texto em negrito sublinhado, área de toque de 48px
const classeLink =
  'inline-flex min-h-12 cursor-pointer items-center px-1 font-bold underline decoration-2 underline-offset-4 hover:text-estrutura';

// Footer: citação, avisos legais, data do conteúdo (seção 9.7) e links
// para a metodologia e para o painel "Sobre" (FAQ, Apoie, Quem faz, Contato)
export function Rodape({ abrirSobre }: RodapeProps) {
  // Estes abrem o painel "Sobre" já no trecho certo (o Contato abre o formulário de e-mail)
  const linksSobre: { rotulo: string; destino: DestinoSobre }[] = [
    { rotulo: textoRodape.linkFaq, destino: 'faq' },
    { rotulo: textoRodape.linkApoie, destino: 'apoio' },
    { rotulo: textoRodape.linkQuemFaz, destino: 'quem-faz' },
    { rotulo: textoRodape.linkContato, destino: 'contato' },
  ];

  return (
    <footer className="border-t-3 border-tinta bg-superficie">
      <div className="mx-auto max-w-[720px] px-4 py-14">
        <figure className="m-0">
          <blockquote className="font-titulo text-2xl leading-tight uppercase md:text-3xl">{textoRodape.citacao}</blockquote>
          <figcaption className="mt-4 text-estrutura">
            {textoRodape.autorCitacao}, <cite>{textoRodape.obraCitacao}</cite> {textoRodape.anoCitacao}
          </figcaption>
        </figure>

        <div className="mt-10 space-y-2 border-t-3 border-tinta pt-6">
          <p>{textoRodape.semVinculo}</p>
          <p>{textoRodape.privacidade}</p>
          <p>{textoRodape.atualizado(formatarData(dataConteudo))}</p>
        </div>

        {/* Links em linha, separados por pontos (a partir de 640px) */}
        <nav aria-label={textoRodape.rotuloLinks} className="mt-6 border-t-3 border-tinta pt-4">
          <ul className="-mx-1 flex flex-wrap items-center gap-x-4 sm:gap-x-2">
            <li>
              <a
                href="#metodologia"
                onClick={(e) => {
                  e.preventDefault();
                  rolarPara('metodologia');
                }}
                className={classeLink}
              >
                {textoRodape.linkMetodologia}
              </a>
            </li>
            {linksSobre.map((link) => (
              // O ponto separador só aparece a partir de 640px, quando os links cabem numa linha;
              // no celular eles quebram de linha e ficam separados só pelo espaço
              <li key={link.destino} className="flex items-center gap-x-2">
                <span aria-hidden="true" className="hidden font-bold text-estrutura sm:inline">
                  ·
                </span>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => abrirSobre(link.destino, e.currentTarget)}
                  className={classeLink}
                >
                  {link.rotulo}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
