import { useCallback, useState } from 'react';
import { Abertura } from './componentes/secoes/Abertura';
import { AvisoFinal } from './componentes/secoes/AvisoFinal';
import { Cabecalho } from './componentes/secoes/Cabecalho';
import { Comparacao } from './componentes/secoes/Comparacao';
import { ComoFunciona } from './componentes/secoes/ComoFunciona';
import { Lados } from './componentes/secoes/Lados';
import { Metodologia } from './componentes/secoes/Metodologia';
import { PainelSobre, type DestinoSobre } from './componentes/secoes/PainelSobre';
import { Questionario } from './componentes/secoes/Questionario';
import { Resultado } from './componentes/secoes/Resultado';
import { Rodape } from './componentes/secoes/Rodape';
import { useDialogo } from './hooks/useDialogo';
import { useTeste } from './hooks/useTeste';

// Monta a página única, com as seções na ordem da seção 5 do SDD
export default function App() {
  const teste = useTeste();
  const ladoDoUsuario = teste.resultado?.lado ?? null;

  // Painel "Sobre": aberto pelo avatar do cabeçalho ou pelos links do rodapé (FAQ, Apoie, Quem faz, Contato)
  const [destinoSobre, setDestinoSobre] = useState<DestinoSobre | null>(null);
  const fecharSobre = useCallback(() => setDestinoSobre(null), []);
  const { painel: painelSobre, lembrarQuemAbriu } = useDialogo(destinoSobre !== null, fecharSobre);
  // Guarda quem abriu o painel, para devolver o foco a ele ao fechar
  const abrirSobre = useCallback(
    (destino: DestinoSobre, origem: HTMLButtonElement) => {
      lembrarQuemAbriu(origem);
      setDestinoSobre(destino);
    },
    [lembrarQuemAbriu],
  );

  return (
    <>
      <Cabecalho sobreAberto={destinoSobre !== null} abrirSobre={abrirSobre} />
      {destinoSobre && <PainelSobre ref={painelSobre} fechar={fecharSobre} destino={destinoSobre} />}
      <main>
        <Abertura />
        <ComoFunciona />
        <Questionario teste={teste} />
        <Resultado teste={teste} />
        <Lados ladoDoUsuario={ladoDoUsuario} />
        {/* A chave reinicia o seletor quando o resultado muda; sem resultado, começa no centro */}
        <Comparacao key={ladoDoUsuario ?? 'centro'} ladoInicial={ladoDoUsuario ?? 'centro'} />
        <Metodologia />
        <AvisoFinal ladoDoUsuario={ladoDoUsuario} />
      </main>
      <Rodape abrirSobre={abrirSobre} />
    </>
  );
}
