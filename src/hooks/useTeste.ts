import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { perguntas } from '../dados/perguntas';
import { calcularResultado, testeCompleto } from '../logica/pontuacao';
import type { Respostas, Resultado, ValorResposta } from '../tipos';

// Tempo entre marcar uma opção e avançar para a próxima afirmação
const ATRASO_AVANCO_MS = 250;

// Estado do teste: respostas, afirmação atual e resultado.
// Tudo fica só em memória (seção 7.7): nada vai para localStorage, cookies ou URL.
export function useTeste() {
  const [respostas, setRespostas] = useState<Respostas>({});
  const [indiceAtual, setIndiceAtual] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  // Cancela um avanço agendado (ao voltar, refazer ou desmontar)
  const cancelarAvanco = () => window.clearTimeout(timer.current);
  useEffect(() => cancelarAvanco, []);

  // Marca a resposta e, se não for a última afirmação, avança após 250ms
  const responder = useCallback(
    (valor: ValorResposta) => {
      const pergunta = perguntas[indiceAtual];
      setRespostas((anteriores) => ({ ...anteriores, [pergunta.id]: valor }));
      cancelarAvanco();
      if (indiceAtual < perguntas.length - 1) {
        timer.current = window.setTimeout(() => setIndiceAtual(indiceAtual + 1), ATRASO_AVANCO_MS);
      }
    },
    [indiceAtual],
  );

  const voltar = useCallback(() => {
    cancelarAvanco();
    setIndiceAtual((i) => Math.max(0, i - 1));
  }, []);

  const refazer = useCallback(() => {
    cancelarAvanco();
    setRespostas({});
    setIndiceAtual(0);
  }, []);

  const completo = testeCompleto(perguntas, respostas);

  // O resultado só existe depois de todas as respostas
  const resultado: Resultado | null = useMemo(
    () => (completo ? calcularResultado(perguntas, respostas) : null),
    [completo, respostas],
  );

  return {
    perguntas,
    respostas,
    indiceAtual,
    perguntaAtual: perguntas[indiceAtual],
    completo,
    resultado,
    responder,
    voltar,
    refazer,
  };
}

export type EstadoTeste = ReturnType<typeof useTeste>;
