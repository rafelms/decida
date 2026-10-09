import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { linksAutor, textosCabecalho, textosSobre } from '../../dados/textos';
import { Acordeao } from '../ui/Acordeao';
import { classesBotao } from '../ui/classesBotao';

// Onde o painel abre: no topo de uma aba ou direto num trecho dela
export type DestinoSobre = 'projeto' | 'faq' | 'quem-faz' | 'contato' | 'apoio';

interface PainelSobreProps {
  ref: RefObject<HTMLDivElement | null>; // usado pelo useDialogo (foco e Tab)
  fechar: () => void;
  destino: DestinoSobre;
}

type Aba = 'projeto' | 'quem-faz';

// Aba de cada destino e o id do título do trecho (null = topo da aba)
const destinos: Record<DestinoSobre, { aba: Aba; alvo: string | null }> = {
  projeto: { aba: 'projeto', alvo: null },
  faq: { aba: 'projeto', alvo: 'sobre-faq' },
  'quem-faz': { aba: 'quem-faz', alvo: 'sobre-quem-faz' },
  contato: { aba: 'quem-faz', alvo: 'sobre-contato' },
  apoio: { aba: 'quem-faz', alvo: 'sobre-apoio' },
};

// Painel em tela cheia aberto pelo botão de perfil do cabeçalho e pelos links do rodapé.
// Duas abas: "O projeto" (o que é, por que existe, neutralidade, FAQ) e
// "Quem faz" (autor, GitHub, formulário de contato e apoio financeiro).
export function PainelSobre({ ref, fechar, destino }: PainelSobreProps) {
  const [aba, setAba] = useState<Aba>(destinos[destino].aba);
  const id = useId();
  const botoesAba = useRef<(HTMLButtonElement | null)[]>([]);
  const abas: { id: Aba; rotulo: string }[] = [
    { id: 'projeto', rotulo: textosSobre.abaSobre },
    { id: 'quem-faz', rotulo: textosSobre.abaQuemFaz },
  ];

  // Troca de aba e leva o foco para o botão dela (usado pelo FAQ)
  const irParaAba = (destino: Aba) => {
    setAba(destino);
    botoesAba.current[abas.findIndex((a) => a.id === destino)]?.focus();
  };

  // Troca para "Quem faz" e leva ao formulário de contato (usado pelo FAQ).
  // flushSync mostra a aba antes de rolar, senão o título ainda estaria oculto.
  const irParaContato = () => {
    flushSync(() => setAba('quem-faz'));
    const titulo = ref.current?.querySelector<HTMLElement>('#sobre-contato');
    titulo?.scrollIntoView({ block: 'start' });
    titulo?.focus({ preventScroll: true });
  };

  // Ao abrir num trecho (FAQ, Quem faz, Contato, Apoie), rola até o título dele e leva o foco para lá.
  // Roda antes do foco padrão do useDialogo, que então mantém o foco aqui.
  useEffect(() => {
    const { alvo } = destinos[destino];
    if (!alvo) return;
    const titulo = ref.current?.querySelector<HTMLElement>(`#${alvo}`);
    titulo?.scrollIntoView({ block: 'start' });
    titulo?.focus({ preventScroll: true });
  }, [destino, ref]);

  // Setas esquerda/direita trocam de aba (padrão WAI-ARIA de abas)
  const aoTeclar = (evento: KeyboardEvent<HTMLButtonElement>, indice: number) => {
    if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
    evento.preventDefault();
    const proximo = (indice + (evento.key === 'ArrowRight' ? 1 : -1) + abas.length) % abas.length;
    setAba(abas[proximo].id);
    botoesAba.current[proximo]?.focus();
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-titulo`}
      className="fixed inset-0 z-50 overflow-y-auto bg-fundo"
    >
      <div className="mx-auto flex max-w-[720px] flex-col px-4 pb-16">
        {/* Topo do painel: título e botão de fechar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b-3 border-tinta">
          <h2 id={`${id}-titulo`} className="text-xl">
            {textosSobre.titulo}
          </h2>
          <button
            type="button"
            onClick={fechar}
            className="min-h-12 cursor-pointer border-3 border-tinta bg-destaque px-4 font-titulo text-sm tracking-wider shadow-dura-p active:translate-0.5 active:shadow-none"
          >
            {textosCabecalho.fechar}
          </button>
        </div>

        {/* Abas */}
        <div role="tablist" aria-labelledby={`${id}-titulo`} className="mt-6 grid grid-cols-2 gap-3">
          {abas.map((a, i) => {
            const ativa = a.id === aba;
            return (
              <button
                key={a.id}
                ref={(el) => {
                  botoesAba.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-aba-${a.id}`}
                aria-selected={ativa}
                aria-controls={`${id}-painel-${a.id}`}
                tabIndex={ativa ? 0 : -1}
                onClick={() => setAba(a.id)}
                onKeyDown={(e) => aoTeclar(e, i)}
                className={`min-h-12 cursor-pointer border-3 border-tinta px-3 font-titulo text-sm tracking-wider ${
                  ativa ? 'translate-0.5 bg-tinta text-superficie' : 'bg-superficie shadow-dura-p hover:bg-fundo'
                }`}
              >
                {a.rotulo}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${id}-painel-projeto`}
          aria-labelledby={`${id}-aba-projeto`}
          hidden={aba !== 'projeto'}
          className="mt-8"
        >
          <AbaProjeto irParaQuemFaz={() => irParaAba('quem-faz')} irParaContato={irParaContato} />
        </div>
        <div
          role="tabpanel"
          id={`${id}-painel-quem-faz`}
          aria-labelledby={`${id}-aba-quem-faz`}
          hidden={aba !== 'quem-faz'}
          className="mt-8"
        >
          <AbaQuemFaz />
        </div>
      </div>
    </div>
  );
}

// Bloco com título e conteúdo, usado nas duas abas
// idTitulo: permite abrir o painel direto neste bloco (links do rodapé)
function Bloco({ titulo, idTitulo, children }: { titulo: string; idTitulo?: string; children: ReactNode }) {
  return (
    <section className="border-3 border-tinta bg-superficie p-5 shadow-dura md:p-6 md:shadow-dura-g">
      <h3 id={idTitulo} tabIndex={idTitulo ? -1 : undefined} className="mb-3 scroll-mt-4 text-xl">
        {titulo}
      </h3>
      {children}
    </section>
  );
}

function AbaProjeto({ irParaQuemFaz, irParaContato }: { irParaQuemFaz: () => void; irParaContato: () => void }) {
  return (
    <div className="space-y-6">
      <Bloco titulo={textosSobre.oQueE.titulo}>
        <p>{textosSobre.oQueE.texto}</p>
      </Bloco>
      <Bloco titulo={textosSobre.porQue.titulo}>
        <p>{textosSobre.porQue.texto}</p>
      </Bloco>
      <Bloco titulo={textosSobre.neutralidade.titulo}>
        <ul className="list-[square] space-y-2 pl-5 marker:text-estrutura">
          {textosSobre.neutralidade.itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Bloco>
      <Bloco titulo={textosSobre.semFinsLucrativos.titulo}>
        <p>{textosSobre.semFinsLucrativos.texto}</p>
      </Bloco>
      <PerguntasFrequentes irParaQuemFaz={irParaQuemFaz} irParaContato={irParaContato} />
    </div>
  );
}

// FAQ: perguntas em acordeão, agrupadas por assunto, com um convite
// para a aba "Quem faz" no fim, para quem não achou a resposta.
// Respostas com linkContato ganham um botão que leva ao formulário de contato.
function PerguntasFrequentes({
  irParaQuemFaz,
  irParaContato,
}: {
  irParaQuemFaz: () => void;
  irParaContato: () => void;
}) {
  const { faq } = textosSobre;

  return (
    <section aria-labelledby="sobre-faq" className="pt-4">
      <h3 id="sobre-faq" tabIndex={-1} className="mb-6 scroll-mt-4 text-2xl">
        {faq.titulo}
      </h3>
      <div className="space-y-8">
        {faq.grupos.map((grupo) => (
          <div key={grupo.nome}>
            <p className="mb-3 text-sm font-bold tracking-wider text-estrutura uppercase">{grupo.nome}</p>
            <div className="space-y-4">
              {grupo.perguntas.map((item) => (
                <Acordeao key={item.pergunta} nivelTitulo={4} titulo={item.pergunta} tituloTexto>
                  <p>{item.resposta}</p>
                  {item.linkContato && (
                    <button type="button" onClick={irParaContato} className={`${classesBotao('secundario')} mt-4`}>
                      {item.linkContato}
                    </button>
                  )}
                </Acordeao>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 border-3 border-dashed border-tinta p-4 md:p-5">
        <p className="font-bold">{faq.naoAchou}</p>
        <button type="button" onClick={irParaQuemFaz} className={classesBotao('secundario')}>
          {faq.falarComigo}
        </button>
      </div>
    </section>
  );
}

function AbaQuemFaz() {
  const { apoio } = textosSobre;

  return (
    <div className="space-y-6">
      {/* Perfil */}
      <Bloco titulo={textosSobre.quemFaz.titulo} idTitulo="sobre-quem-faz">
        <div className="mb-5 flex items-center gap-4">
          <img
            src="/gato-profile-pixel.svg"
            alt={textosSobre.avatarAlt}
            width={80}
            height={80}
            className="size-20 shrink-0 border-3 border-tinta bg-fundo [image-rendering:pixelated]"
          />
          <p className="font-titulo text-xl break-all">{linksAutor.usuarioGithub}</p>
        </div>
        <div className="space-y-3">
          {textosSobre.quemFaz.paragrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {/* GitHub e portfólio: lado a lado; um abaixo do outro em telas estreitas */}
        <div className="mt-5 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
          <a
            href={linksAutor.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classesBotao('secundario')} no-underline`}
          >
            {textosSobre.quemFaz.github}
            <span className="sr-only"> {textosSobre.abreEmNovaAba}</span>
          </a>
          <a
            href={linksAutor.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classesBotao('secundario')} no-underline`}
          >
            {textosSobre.quemFaz.portfolio}
            <span className="sr-only"> {textosSobre.abreEmNovaAba}</span>
          </a>
        </div>
      </Bloco>

      {/* Contato: dicas, sugestões, reclamações, elogios */}
      <FormularioContato />

      {/* Apoio financeiro */}
      <Bloco titulo={apoio.titulo} idTitulo="sobre-apoio">
        <p>{apoio.texto}</p>
        <p className="mt-3 font-bold">{apoio.formas}</p>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Botão de apoio: abre a página de Pix em nova aba */}
          <div className="flex-1">
            {linksAutor.apoio ? (
              <a
                href={linksAutor.apoio}
                target="_blank"
                rel="noopener noreferrer"
                className={`${classesBotao('principal', true)} no-underline`}
              >
                {apoio.botao}
                <span className="sr-only"> {textosSobre.abreEmNovaAba}</span>
              </a>
            ) : (
              <button type="button" disabled className={classesBotao('principal', true)}>
                {apoio.botao} — {apoio.emBreve}
              </button>
            )}
          </div>

          {/* QR code do mesmo link, para pagar pelo celular quando o site está aberto no computador */}
          <figure className="m-0 flex flex-col items-center gap-2">
            {linksAutor.qrCodePix ? (
              <img
                src={linksAutor.qrCodePix}
                alt={apoio.qrCodeAlt}
                width={160}
                height={160}
                className="size-40 border-3 border-tinta bg-superficie [image-rendering:pixelated]"
              />
            ) : (
              <div className="flex size-40 items-center justify-center border-3 border-dashed border-tinta bg-fundo p-3 text-center text-sm font-bold uppercase">
                {apoio.emBreve}
              </div>
            )}
            <figcaption className="text-sm font-bold text-estrutura uppercase">{apoio.qrCode}</figcaption>
          </figure>
        </div>

        <p className="mt-5 border-t-3 border-tinta pt-4 text-estrutura">{apoio.aviso}</p>
      </Bloco>
    </div>
  );
}

// Limite da mensagem: links mailto muito longos podem não abrir em alguns aplicativos
const LIMITE_MENSAGEM = 1500;

// Formulário "Fale comigo". O site não tem servidor (SDD, seções 3 e 7.7):
// ao enviar, monta um link mailto e abre o aplicativo de e-mail da pessoa
// com assunto e mensagem preenchidos. Nada sai do navegador sem ela enviar.
function FormularioContato() {
  const { contato } = textosSobre;
  const [tipo, setTipo] = useState(contato.tipos[0]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const campoMensagem = useRef<HTMLTextAreaElement>(null);
  const id = useId();

  // Some com o "COPIADO" depois de 2 segundos
  useEffect(() => {
    if (!copiado) return;
    const timer = window.setTimeout(() => setCopiado(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copiado]);

  const enviar = (evento: FormEvent) => {
    evento.preventDefault();
    if (!mensagem.trim()) {
      // Erro logo abaixo do campo, e o foco vai para ele
      setErro(true);
      campoMensagem.current?.focus();
      return;
    }
    const assunto = encodeURIComponent(contato.assunto(tipo));
    const corpo = encodeURIComponent(mensagem.trim());
    window.location.href = `mailto:${linksAutor.email}?subject=${assunto}&body=${corpo}`;
  };

  const copiarEndereco = async () => {
    try {
      await navigator.clipboard.writeText(linksAutor.email);
      setCopiado(true);
    } catch {
      // Sem permissão para copiar: o endereço continua visível para copiar à mão
    }
  };

  return (
    <Bloco titulo={contato.titulo} idTitulo="sobre-contato">
      <p>{contato.texto}</p>

      <form onSubmit={enviar} noValidate className="mt-5 space-y-5">
        {/* Tipo da mensagem: grupo de rádio nativo, estilizado como etiquetas */}
        <fieldset>
          <legend className="mb-2 font-bold">{contato.rotuloTipo}</legend>
          <div className="flex flex-wrap gap-2">
            {contato.tipos.map((opcao) => (
              <label key={opcao} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-tipo`}
                  value={opcao}
                  checked={tipo === opcao}
                  onChange={() => setTipo(opcao)}
                  className="peer sr-only"
                />
                <span className="flex min-h-12 items-center border-3 border-tinta bg-superficie px-3 font-bold shadow-dura-p peer-checked:translate-0.5 peer-checked:bg-tinta peer-checked:text-superficie peer-checked:shadow-none peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-tinta hover:bg-fundo peer-checked:hover:bg-tinta">
                  {opcao}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Mensagem: rótulo visível, ajuda e erro ligados por aria-describedby */}
        <div>
          <label htmlFor={`${id}-mensagem`} className="mb-2 block font-bold">
            {contato.rotuloMensagem}
          </label>
          <textarea
            id={`${id}-mensagem`}
            ref={campoMensagem}
            value={mensagem}
            maxLength={LIMITE_MENSAGEM}
            rows={5}
            aria-invalid={erro}
            aria-describedby={`${id}-ajuda${erro ? ` ${id}-erro` : ''}`}
            onChange={(e) => {
              setMensagem(e.target.value);
              if (erro && e.target.value.trim()) setErro(false);
            }}
            className={`block w-full resize-y border-3 bg-superficie p-3 text-base ${erro ? 'border-destaque2' : 'border-tinta'}`}
          />
          <div className="mt-2 flex justify-between gap-3 text-sm text-estrutura">
            <p id={`${id}-ajuda`}>{contato.ajudaMensagem}</p>
            <p aria-hidden="true" className="shrink-0 tabular-nums">
              {mensagem.length}/{LIMITE_MENSAGEM}
            </p>
          </div>
          {erro && (
            <p id={`${id}-erro`} className="mt-2 border-l-[6px] border-destaque2 pl-2 font-bold">
              {contato.erroMensagem}
            </p>
          )}
        </div>

        <div>
          <button type="submit" className={classesBotao('principal', true)}>
            {contato.enviar}
          </button>
          <p className="mt-3 text-sm text-estrutura">{contato.comoFunciona}</p>
        </div>
      </form>

      {/* Alternativa: copiar o endereço, para quem não tem aplicativo de e-mail configurado */}
      <div className="mt-5 border-t-3 border-tinta pt-4">
        <p className="text-sm">{contato.semAplicativo}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a href={`mailto:${linksAutor.email}`} className="font-bold break-all underline decoration-2 underline-offset-4">
            {linksAutor.email}
          </a>
          <button
            type="button"
            onClick={copiarEndereco}
            className="min-h-12 cursor-pointer border-3 border-tinta bg-fundo px-3 text-sm font-bold tracking-wider uppercase shadow-dura-p active:translate-0.5 active:shadow-none"
          >
            {copiado ? contato.copiado : contato.copiar}
          </button>
          <span className="sr-only" aria-live="polite">
            {copiado ? contato.copiado : ''}
          </span>
        </div>
      </div>
    </Bloco>
  );
}
