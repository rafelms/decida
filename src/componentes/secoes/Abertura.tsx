import { useEffect, useRef } from 'react';
import { etiquetasAbertura, secaoPorAncora, textosAbertura, type PosicaoEtiqueta } from '../../dados/textos';
import { rolarPara } from '../../utils/rolarPara';
import { classesBotao } from '../ui/classesBotao';

// Seção 01 — animação de abertura ligada ao scroll (seção 10 do SDD).
// Portada de referencias/animacao-original/DECIDA Hero.html.
// Diferenças em relação ao original, exigidas pela seção 10.3:
// - o bloco não cai para nenhum lado: inclina para a frente, desce e pousa no
//   chão, no centro, enquanto o muro desaba;
// - palavra final "ENTENDI", tagline "Saiba onde você está.", botão COMEÇAR
//   rolando até #como-funciona;
// - cores e fontes vêm dos tokens; anima só transform e opacity.
// A cada quadro, os estilos são aplicados direto no DOM (sem re-renderizar o React).

// ---------- Marcos do progresso do scroll (0 a 1) ----------
const T = {
  etiquetasEntram: [0.22, 0.43],
  riscos: [0.47, 0.62],
  rachaduras: [0.47, 0.52, 0.57, 0.615],
  inclina: 0.65,
  queda: 0.675,
  impacto: 0.71,
  etiquetasSaem: 0.73,
  desabamento: [0.75, 0.83],
  chao: [0.79, 0.85],
  titulo: 0.865,
  tagline: 0.91,
  botao: 0.945,
};
const FILEIRAS_TIJOLO = 6;
const LARGURA_CELULAR = 640; // abaixo disso: menos etiquetas e dica com progresso
const ALTURA_CABECALHO = 56; // as etiquetas não podem ficar sob o cabeçalho fixo
const ESCALA_POUSO = 1.12; // o bloco fica um pouco maior: veio para a frente
const TREMOR = [
  [-9, 5],
  [7, -4],
  [-4, 2],
  [0, 0],
];

// ---------- Funções auxiliares (movimento em degraus, como no original) ----------
const limitar = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const trecho = (p: number, a: number, b: number) => limitar((p - a) / (b - a));
const degraus = (t: number, n: number) => Math.floor(t * n) / n;
const interpolar = (a: number, b: number, t: number) => a + (b - a) * t;
const carimbo = (p: number, em: number, duracao: number, grande: number) => (p < em + duracao ? grande : 1);

// Linhas da rachadura no muro (coordenadas em % do muro)
const RACHADURAS = ['50,0 40,12 58,26', '58,26 42,42 60,54', '60,54 40,68 57,80', '57,80 45,90 54,100'];

export function Abertura() {
  const raiz = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const mundo = useRef<HTMLDivElement>(null);
  const recorteMuro = useRef<HTMLDivElement>(null);
  const muroEsq = useRef<HTMLDivElement>(null);
  const muroDir = useRef<HTMLDivElement>(null);
  const rachadura = useRef<SVGSVGElement>(null);
  const chao = useRef<HTMLDivElement>(null);
  const bloco = useRef<HTMLDivElement>(null);
  const sombraBloco = useRef<HTMLDivElement>(null);
  const faceInicial = useRef<HTMLDivElement>(null);
  const faceFinal = useRef<HTMLDivElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const botao = useRef<HTMLDivElement>(null);
  const dica = useRef<HTMLDivElement>(null);
  const dicaInicio = useRef<HTMLSpanElement>(null);
  const dicaContinuar = useRef<HTMLSpanElement>(null);
  const dicaBarra = useRef<HTMLSpanElement>(null);
  const etiquetasExternas = useRef<(HTMLDivElement | null)[]>([]);
  const etiquetasInternas = useRef<(HTMLDivElement | null)[]>([]);
  const riscos = useRef<(HTMLSpanElement | null)[]>([]);
  const segmentosRachadura = useRef<(SVGPolylineElement | null)[]>([]);

  useEffect(() => {
    const el = {
      raiz: raiz.current!,
      palco: palco.current!,
      mundo: mundo.current!,
      recorteMuro: recorteMuro.current!,
      muroEsq: muroEsq.current!,
      muroDir: muroDir.current!,
      rachadura: rachadura.current!,
      chao: chao.current!,
      bloco: bloco.current!,
      sombraBloco: sombraBloco.current!,
      faceInicial: faceInicial.current!,
      faceFinal: faceFinal.current!,
      titulo: titulo.current!,
      tagline: tagline.current!,
      botao: botao.current!,
      dica: dica.current!,
      dicaInicio: dicaInicio.current!,
      dicaContinuar: dicaContinuar.current!,
      dicaBarra: dicaBarra.current!,
    };

    // ---------- Layout (recalculado quando a tela muda de tamanho) ----------
    interface EtiquetaPosicionada {
      indice: number;
      direcao: number;
      x: number;
      y: number;
      entra: number;
      risca: number;
      sai: number;
    }
    let L: {
      celular: boolean;
      W: number;
      H: number;
      alturaMuro: number;
      repouso: { x: number; y: number };
      pouso: { x: number; y: number };
      etiquetas: EtiquetaPosicionada[];
    } | null = null;

    function calcularLayout(): boolean {
      const W = el.palco.clientWidth;
      const H = el.palco.clientHeight;
      if (!W || !H) return false;
      const celular = W < LARGURA_CELULAR;

      const chaoY = Math.round(H * 0.8);
      const larguraMuro = Math.round(limitar(W * 0.11, celular ? 64 : 90, 170));
      const alturaMuro = Math.round(H * (celular ? 0.3 : 0.34));
      const muroX = Math.round(W / 2 - larguraMuro / 2);
      const topoMuro = chaoY - alturaMuro;

      el.recorteMuro.style.height = `${chaoY}px`;
      Object.assign(el.muroEsq.style, { left: `${muroX}px`, top: `${topoMuro}px`, width: `${larguraMuro / 2}px`, height: `${alturaMuro}px` });
      Object.assign(el.muroDir.style, { left: `${muroX + larguraMuro / 2}px`, top: `${topoMuro}px`, width: `${larguraMuro / 2}px`, height: `${alturaMuro}px` });
      Object.assign(el.rachadura.style, { left: `${muroX}px`, top: `${topoMuro}px`, width: `${larguraMuro}px`, height: `${alturaMuro}px` });
      Object.assign(el.chao.style, { width: `${W}px`, top: `${chaoY}px` });

      const larguraBloco = el.bloco.offsetWidth;
      const alturaBloco = el.bloco.offsetHeight;
      const repouso = { x: W / 2 - larguraBloco / 2, y: topoMuro - alturaBloco + 2 };
      // Pousa no chão, no centro, na frente do muro (não cai para nenhum lado)
      const pouso = { x: repouso.x, y: chaoY - alturaBloco };
      const centroBlocoY = topoMuro - alturaBloco / 2;

      // No celular, aparecem menos etiquetas
      const visiveis: { indice: number; pos: PosicaoEtiqueta }[] = [];
      etiquetasAbertura.forEach((etiqueta, indice) => {
        const pos = celular ? etiqueta.m : etiqueta.d;
        const externa = etiquetasExternas.current[indice];
        if (externa) externa.style.display = pos ? '' : 'none';
        if (pos) visiveis.push({ indice, pos });
      });

      const n = visiveis.length - 1;
      const etiquetas = visiveis.map(({ indice, pos }, i) => {
        const interna = etiquetasInternas.current[indice]!;
        interna.style.transform = `translate(-50%,-50%) rotate(${pos.r}deg)`;
        const larguraEtiqueta = interna.offsetWidth;
        const alturaEtiqueta = interna.offsetHeight;
        const direcao = Math.sign(pos.x);
        const folga =
          pos.folga === 'bloco'
            ? larguraBloco / 2 + 28 + larguraEtiqueta / 2
            : pos.folga === 'muro'
              ? larguraMuro / 2 + 24 + larguraEtiqueta / 2
              : 0;
        const x = limitar(W / 2 + direcao * Math.max(Math.abs(pos.x) * W, folga), larguraEtiqueta / 2 + 14, W - larguraEtiqueta / 2 - 14);
        return {
          indice,
          direcao,
          x,
          y: Math.max(centroBlocoY + pos.y * H, ALTURA_CABECALHO + 16 + alturaEtiqueta / 2),
          entra: interpolar(T.etiquetasEntram[0], T.etiquetasEntram[1], i / n),
          risca: interpolar(T.riscos[0], T.riscos[1], i / n),
          sai: T.etiquetasSaem + i * 0.008,
        };
      });

      L = { celular, W, H, alturaMuro, repouso, pouso, etiquetas };
      // A cena começa invisível e só aparece já posicionada (evita deslocamento de layout)
      el.mundo.style.visibility = 'visible';
      return true;
    }

    // ---------- Desenho de um quadro (p = progresso do scroll, fase = balanço) ----------
    let frequencia = 0.8;
    function desenhar(p: number, fase: number) {
      if (!L) return;
      const { celular, W, H, alturaMuro, repouso, pouso, etiquetas } = L;

      // Dica do rodapé. No computador, some assim que a rolagem começa.
      // No celular, a rolagem por toque é mais curta e as palavras demoram a surgir:
      // a dica fica até o botão aparecer, com uma barra que mostra quanto falta.
      el.dica.style.opacity = (celular ? p < T.botao : p < 0.03) ? '1' : '0';
      const muroCaiu = celular && p >= T.desabamento[0];
      el.dicaInicio.style.opacity = muroCaiu ? '0' : '1';
      el.dicaContinuar.style.opacity = muroCaiu ? '1' : '0';
      el.dicaBarra.style.transform = `scaleX(${trecho(p, 0, T.botao)})`;

      // Etiquetas: entram carimbadas, são riscadas e saem voando para fora
      let mostradas = 0;
      for (const g of etiquetas) {
        const entrou = p >= g.entra;
        if (entrou) mostradas++;
        const escala = entrou ? carimbo(p, g.entra, 0.01, 1.22) : 1;
        const risco = riscos.current[g.indice];
        if (risco) risco.style.transform = `scaleX(${degraus(trecho(p, g.risca, g.risca + 0.02), 3)})`;
        const saida = degraus(trecho(p, g.sai, g.sai + 0.03), 4);
        const externa = etiquetasExternas.current[g.indice]!;
        externa.style.opacity = entrou && saida < 1 ? '1' : '0';
        externa.style.transform = `translate3d(${g.x + g.direcao * saida * W * 0.9}px,${g.y - saida * H * 0.12}px,0) rotate(${g.direcao * saida * 28}deg) scale(${escala})`;
      }

      // Balanço do bloco (cresce com a tensão; é simétrico, não pende para um lado)
      let amplitude: number;
      if (p < 0.2) {
        amplitude = 2.5;
        frequencia = 0.8;
      } else if (p < 0.45) {
        amplitude = 2.5 + mostradas * 1.1;
        frequencia = 0.8 + mostradas * 0.12;
      } else {
        const k = trecho(p, 0.45, T.inclina);
        amplitude = interpolar(9.1, 15, k);
        frequencia = interpolar(1.5, 2.6, k);
      }

      // Bloco: balança, inclina para a FRENTE (rotateX), desce e pousa no centro
      let y = repouso.y;
      let giro = 0; // rotação no plano (só no balanço)
      let inclinacao = 0; // rotação para a frente, em direção a quem vê
      let escala = 1;
      let achataX = 1;
      let achataY = 1;
      let decidido = false;
      if (p < T.inclina) {
        giro = amplitude * Math.sin(fase);
      } else if (p < T.queda) {
        inclinacao = -(12 + 18 * degraus(trecho(p, T.inclina, T.queda), 3));
      } else if (p < T.impacto) {
        const f = degraus(trecho(p, T.queda, T.impacto), 10);
        y = interpolar(repouso.y, pouso.y, f * f);
        inclinacao = interpolar(-30, -65, f);
        escala = interpolar(1, ESCALA_POUSO, f);
      } else {
        y = pouso.y;
        escala = ESCALA_POUSO;
        decidido = true;
        if (p < T.impacto + 0.014) {
          achataX = 1.12;
          achataY = 0.84;
        }
      }
      el.bloco.style.transform = `translate3d(${repouso.x}px,${y}px,0) perspective(700px) rotateX(${inclinacao}deg) rotate(${giro}deg) scale(${escala * achataX},${escala * achataY})`;
      el.faceFinal.style.opacity = decidido ? '1' : '0';
      el.faceInicial.style.opacity = decidido ? '0' : '1';
      el.sombraBloco.style.opacity = decidido ? '1' : '0';

      // Tremor do mundo no impacto e no carimbo do título
      let tremor = [0, 0];
      if (p >= T.impacto && p < T.impacto + 0.02) tremor = TREMOR[Math.floor(trecho(p, T.impacto, T.impacto + 0.02) * 3.999)];
      else if (p >= T.titulo && p < T.titulo + 0.016)
        tremor = TREMOR[Math.floor(trecho(p, T.titulo, T.titulo + 0.016) * 3.999)].map((v) => v * 0.6);
      el.mundo.style.transform = `translate3d(${tremor[0]}px,${tremor[1]}px,0)`;

      // Muro: rachaduras e desabamento simétrico (as metades descem pelo chão)
      const desabou = degraus(trecho(p, T.desabamento[0], T.desabamento[1]), 5);
      let tranco = 0;
      T.rachaduras.forEach((momento, i) => {
        const segmento = segmentosRachadura.current[i];
        if (segmento) segmento.style.opacity = p >= momento ? '1' : '0';
        if (p >= momento && p < momento + 0.008) tranco = i % 2 ? 4 : -4;
      });
      el.rachadura.style.opacity = desabou > 0 ? '0' : '1';
      el.rachadura.style.transform = `translateX(${tranco}px)`;
      const descida = desabou * (alturaMuro + 40);
      el.muroEsq.style.transform = `translate3d(${tranco - desabou * 16}px,${descida}px,0) rotate(${-desabou * 7}deg)`;
      el.muroDir.style.transform = `translate3d(${tranco + desabou * 16}px,${descida}px,0) rotate(${desabou * 7}deg)`;
      el.chao.style.transform = `scaleY(${interpolar(0.375, 1, degraus(trecho(p, T.chao[0], T.chao[1]), 3))})`;

      // Final: título, tagline e botão entram carimbados
      const k = trecho(p, T.titulo, T.titulo + 0.016);
      el.titulo.style.opacity = p >= T.titulo ? '1' : '0';
      el.titulo.style.transform = `rotate(-2deg) scale(${k < 0.5 ? 1.6 : k < 1 ? 1.12 : 1})`;
      el.tagline.style.opacity = p >= T.tagline ? '1' : '0';
      el.tagline.style.transform = `rotate(1.5deg) translateX(${p < T.tagline + 0.01 ? -18 : 0}px)`;
      el.botao.style.opacity = p >= T.botao ? '1' : '0';
      el.botao.style.transform = `rotate(-1deg) scale(${carimbo(p, T.botao, 0.01, 1.2)})`;
      el.botao.style.pointerEvents = p >= T.botao ? 'auto' : 'none';
    }

    // ---------- Laço de animação ----------
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Progresso: 0 no topo da seção, 1 quando o palco chega ao fim da trilha
    const progresso = () => {
      const caixa = el.raiz.getBoundingClientRect();
      const percurso = el.raiz.offsetHeight - el.palco.clientHeight;
      return percurso > 0 ? limitar(-caixa.top / percurso) : 1;
    };

    let fase = 0;
    let ultimo = performance.now();
    let quadro = 0;

    function aCadaQuadro(agora: number) {
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      const caixa = el.raiz.getBoundingClientRect();
      // Só desenha enquanto a abertura está visível
      if (caixa.bottom > 0 && caixa.top < window.innerHeight) {
        fase += dt * Math.PI * 2 * frequencia;
        desenhar(progresso(), fase);
      }
      quadro = requestAnimationFrame(aCadaQuadro);
    }

    // Com movimento reduzido, mostra direto o estado final
    const redesenhar = () => {
      if (calcularLayout()) desenhar(semMovimento.matches ? 1 : progresso(), fase);
    };

    function iniciar() {
      cancelAnimationFrame(quadro);
      redesenhar();
      if (!semMovimento.matches) {
        ultimo = performance.now();
        quadro = requestAnimationFrame(aCadaQuadro);
      }
    }

    const observador = new ResizeObserver(redesenhar);
    observador.observe(el.palco);
    window.addEventListener('resize', redesenhar);
    semMovimento.addEventListener('change', iniciar);
    // As fontes mudam o tamanho do bloco e das etiquetas: recalcula ao carregar
    document.fonts?.ready.then(redesenhar);
    iniciar();

    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
      window.removeEventListener('resize', redesenhar);
      semMovimento.removeEventListener('change', iniciar);
    };
  }, []);

  const secao = secaoPorAncora('inicio');

  // Tijolos do muro (linhas e juntas), em %, para não depender do tamanho da tela
  const tijolos = (lado: 'esq' | 'dir') => (
    <>
      {Array.from({ length: FILEIRAS_TIJOLO - 1 }, (_, i) => (
        <div
          key={`linha-${i}`}
          className="absolute inset-x-0 h-[3px] bg-tinta"
          style={{ top: `calc(${((i + 1) / FILEIRAS_TIJOLO) * 100}% - 1.5px)` }}
        />
      ))}
      {Array.from({ length: FILEIRAS_TIJOLO }, (_, i) => (
        <div
          key={`junta-${i}`}
          className="absolute w-[3px] bg-tinta"
          style={{
            top: `${(i / FILEIRAS_TIJOLO) * 100}%`,
            height: `${100 / FILEIRAS_TIJOLO}%`,
            ...(i % 2 ? { left: 'calc(50% - 1.5px)' } : lado === 'esq' ? { right: '-1.5px' } : { left: '-1.5px' }),
          }}
        />
      ))}
    </>
  );

  return (
    <section
      id="inicio"
      ref={raiz}
      aria-labelledby="titulo-principal"
      // No celular a trilha é mais curta (3 telas), para as palavras surgirem com menos rolagem
      className="relative h-[300vh] motion-reduce:h-svh sm:motion-safe:h-[400vh]"
    >
      <div ref={palco} className="sticky top-0 h-svh overflow-hidden bg-fundo">
        {/* Número da seção */}
        <span
          aria-hidden="true"
          className="border-3 border-tinta absolute top-[72px] left-4 z-10 -rotate-2 bg-superficie px-2 py-1 font-titulo text-xl leading-none shadow-dura"
        >
          {secao.numero}
        </span>

        {/* Cena decorativa: muro, chão, etiquetas e bloco */}
        <div ref={mundo} aria-hidden="true" className="invisible absolute inset-0 will-change-transform">
          <div ref={recorteMuro} className="absolute inset-x-0 top-0 overflow-hidden">
            <div ref={muroEsq} className="absolute border-4 border-r-0 border-tinta bg-estrutura will-change-transform">
              {tijolos('esq')}
            </div>
            <div ref={muroDir} className="absolute border-4 border-l-0 border-tinta bg-estrutura will-change-transform">
              {tijolos('dir')}
            </div>
          </div>

          <svg ref={rachadura} viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 size-0 overflow-visible">
            {RACHADURAS.map((pontos, i) => (
              <polyline
                key={pontos}
                ref={(n) => {
                  segmentosRachadura.current[i] = n;
                }}
                points={pontos}
                fill="none"
                stroke="var(--color-tinta)"
                strokeWidth={5}
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <div ref={chao} className="absolute top-0 left-0 h-2 origin-top bg-tinta" />

          {etiquetasAbertura.map((etiqueta, i) => (
            <div
              key={etiqueta.texto}
              ref={(n) => {
                etiquetasExternas.current[i] = n;
              }}
              className="absolute top-0 left-0 z-[2] opacity-0 will-change-transform"
            >
              <div
                ref={(n) => {
                  etiquetasInternas.current[i] = n;
                }}
                className="border-3 border-tinta relative bg-superficie px-[.7em] pt-[.5em] pb-[.45em] font-titulo text-[13px] leading-none tracking-wide whitespace-nowrap shadow-dura sm:text-[clamp(13px,1.55vw,22px)]"
              >
                {etiqueta.texto}
                {/* Risco terracota que "cancela" a etiqueta */}
                <span
                  ref={(n) => {
                    riscos.current[i] = n;
                  }}
                  className="absolute top-[calc(50%-4px)] -left-[8%] h-2 w-[116%] origin-left scale-x-0 border-2 border-tinta bg-destaque2"
                />
              </div>
            </div>
          ))}

          <div ref={bloco} className="absolute top-0 left-0 z-[3] origin-bottom will-change-transform">
            <div ref={sombraBloco} className="absolute inset-0 translate-2 bg-tinta opacity-0" />
            <div className="grid">
              <div
                ref={faceInicial}
                className="relative [grid-area:1/1] border-4 border-tinta bg-superficie px-[.6em] pt-[.42em] pb-[.38em] text-center font-titulo text-2xl leading-none tracking-wide whitespace-nowrap sm:text-[clamp(26px,3.6vw,54px)]"
              >
                {textosAbertura.palavraInicial}
              </div>
              <div
                ref={faceFinal}
                className="relative [grid-area:1/1] border-4 border-tinta bg-destaque px-[.6em] pt-[.42em] pb-[.38em] text-center font-titulo text-2xl leading-none tracking-wide whitespace-nowrap opacity-0 sm:text-[clamp(26px,3.6vw,54px)]"
              >
                {textosAbertura.palavraFinal}
              </div>
            </div>
          </div>
        </div>

        {/* Estado final: título, tagline e botão */}
        <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col items-center gap-[clamp(14px,3vh,30px)] px-4 pt-[max(124px,17vh)]">
          <h1
            id="titulo-principal"
            ref={titulo}
            className="text-[clamp(52px,16vw,300px)] leading-[.82] tracking-tight opacity-0 will-change-transform"
            style={{ textShadow: '.045em .045em 0 var(--color-destaque)' }}
          >
            {textosAbertura.titulo}
          </h1>
          <p
            ref={tagline}
            className="border-3 border-tinta bg-superficie px-[.6em] py-[.25em] text-center text-[clamp(20px,2.8vw,36px)] font-bold opacity-0 shadow-dura will-change-transform md:shadow-dura-g"
          >
            {textosAbertura.tagline}
          </p>
          {/* Ao receber foco pelo teclado, o botão aparece mesmo antes do fim (ver index.css) */}
          <div ref={botao} className="abertura-botao pointer-events-none opacity-0 will-change-transform">
            <button
              type="button"
              onClick={() => rolarPara('como-funciona')}
              className={`${classesBotao('principal')} px-8 text-lg md:text-2xl`}
            >
              {textosAbertura.botao}
            </button>
          </div>
        </div>

        <div
          ref={dica}
          aria-hidden="true"
          className="border-3 border-tinta absolute bottom-[4vh] left-1/2 z-[5] -translate-x-1/2 -rotate-1 bg-superficie px-3 py-2 text-sm font-bold tracking-widest whitespace-nowrap uppercase motion-reduce:hidden"
        >
          {/* Os dois textos ocupam a mesma célula; só a opacidade troca */}
          <span className="grid justify-items-center">
            <span ref={dicaInicio} className="[grid-area:1/1]">
              {textosAbertura.dica} <span className="seta-dica">↓</span>
            </span>
            <span ref={dicaContinuar} className="[grid-area:1/1] opacity-0">
              {textosAbertura.dicaContinuar} <span className="seta-dica">↓</span>
            </span>
          </span>
          {/* Barra de progresso da abertura (só no celular) */}
          <span className="mt-2 block h-2.5 border-2 border-tinta bg-fundo sm:hidden">
            <span ref={dicaBarra} className="block h-full origin-left bg-tinta" style={{ transform: 'scaleX(0)' }} />
          </span>
        </div>
      </div>
    </section>
  );
}
