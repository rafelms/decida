import { ladoPorId } from '../../logica/lados';
import {
  avisoAntesDoResultado,
  opcoesResposta,
  secaoPorAncora,
  textoPerfilMisto,
  textosResultado,
} from '../../dados/textos';
import type { EstadoTeste } from '../../hooks/useTeste';
import { respostasQueMaisPesaram } from '../../logica/pontuacao';
import { rolarPara } from '../../utils/rolarPara';
import { Aviso } from '../ui/Aviso';
import { BarraEspectro } from '../ui/BarraEspectro';
import { Botao } from '../ui/Botao';
import { Cartao } from '../ui/Cartao';
import { Etiqueta } from '../ui/Etiqueta';
import { NumeroSecao } from '../ui/NumeroSecao';

interface ResultadoProps {
  teste: EstadoTeste;
}

// Seção 04 — resultado do teste (ou convite para fazê-lo)
export function Resultado({ teste }: ResultadoProps) {
  const { resultado, perguntas, respostas, refazer } = teste;

  return (
    <section id="resultado" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('resultado')} />

      {!resultado ? (
        // Antes de completar o teste
        <Cartao>
          <p className="text-lg font-bold">{textosResultado.semResultado}</p>
          <Botao className="mt-5" onClick={() => rolarPara('teste')}>
            {textosResultado.irParaTeste}
          </Botao>
        </Cartao>
      ) : (
        <div className="space-y-8">
          {/* 1. Aviso */}
          <Aviso aviso={avisoAntesDoResultado} />

          {/* 2. Cartão do resultado (laranja: pertence ao usuário) */}
          <Cartao destaque>
            <Etiqueta inclinada>{textosResultado.rotuloResultado}</Etiqueta>
            <p className="mt-4 font-titulo text-3xl leading-tight uppercase md:text-4xl">
              {textosResultado.frasePrincipal(ladoPorId(resultado.lado).nomeComArtigo)}
            </p>
          </Cartao>

          {/* 3. Barra do espectro */}
          <Cartao>
            <BarraEspectro total={resultado.total} lado={resultado.lado} />
          </Cartao>

          {/* 4. Os três blocos */}
          <div className="grid gap-4">
            <Cartao>
              <p className="text-lg">{textosResultado.fraseEconomia(ladoPorId(resultado.tendenciaEconomia).nomeComArtigo)}</p>
            </Cartao>
            <Cartao>
              <p className="text-lg">
                {textosResultado.fraseSociedade(ladoPorId(resultado.tendenciaSociedade).nomeComArtigo)}
              </p>
            </Cartao>
            <Cartao>
              <p className="text-lg">
                {textosResultado.fraseInternacional(ladoPorId(resultado.tendenciaInternacional).nomeComArtigo)}
              </p>
            </Cartao>
          </div>

          {/* 5. Perfil misto */}
          {resultado.perfilMisto && (
            <Cartao>
              <p className="text-lg">
                <strong className="font-titulo uppercase">{textoPerfilMisto.titulo}</strong>{' '}
                {textoPerfilMisto.texto(
                  ladoPorId(resultado.tendenciaEconomia).nomeComArtigo,
                  ladoPorId(resultado.tendenciaSociedade).nomeComArtigo,
                  ladoPorId(resultado.tendenciaInternacional).nomeComArtigo,
                )}
              </p>
            </Cartao>
          )}

          {/* 6. Por que esse resultado */}
          <PorQueEsseResultado lista={respostasQueMaisPesaram(perguntas, respostas)} />

          {/* 7. Botões */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Botao onClick={() => rolarPara('lados')}>{textosResultado.conhecerLados}</Botao>
            <Botao
              variante="secundario"
              onClick={() => {
                refazer();
                rolarPara('teste');
              }}
            >
              {textosResultado.refazer}
            </Botao>
          </div>
        </div>
      )}
    </section>
  );
}

// As 3 respostas que mais pesaram (seção 7.5)
function PorQueEsseResultado({ lista }: { lista: ReturnType<typeof respostasQueMaisPesaram> }) {
  const rotuloDaResposta = (valor: number) => opcoesResposta.find((o) => o.valor === valor)?.rotulo;

  return (
    <div>
      <h3 className="mb-4 text-2xl">{textosResultado.tituloPorQue}</h3>
      {lista.length === 0 ? (
        <Cartao>
          <p>{textosResultado.todasNeutras}</p>
        </Cartao>
      ) : (
        <ol className="space-y-4">
          {lista.map((item) => (
            <li key={item.pergunta.id}>
              <Cartao>
                <p className="font-bold">{item.pergunta.texto}</p>
                <p className="mt-2 text-estrutura">
                  {textosResultado.suaResposta} <strong className="text-tinta">{rotuloDaResposta(item.valor)}</strong>
                </p>
                <p className="mt-3">
                  <Etiqueta>
                    {item.pontos < 0 ? textosResultado.aproximouEsquerda : textosResultado.aproximouDireita}
                  </Etiqueta>
                </p>
              </Cartao>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
