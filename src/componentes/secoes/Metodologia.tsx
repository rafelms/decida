import { glossario } from '../../dados/glossario';
import { lados } from '../../dados/lados';
import { temas } from '../../dados/temas';
import { nomesTipoFonte, secaoPorAncora, textoMetodologia, textosConteudo } from '../../dados/textos';
import { agruparPorTipo, todasAsFontes } from '../../logica/fontes';
import { Acordeao } from '../ui/Acordeao';
import { Cartao } from '../ui/Cartao';
import { Etiqueta } from '../ui/Etiqueta';
import { ItemFonte } from '../ui/ListaFontes';
import { NumeroSecao } from '../ui/NumeroSecao';

// Seção 07 — como o teste funciona, limites e lista de todas as fontes
export function Metodologia() {
  const grupos = agruparPorTipo(todasAsFontes(lados, temas, glossario));

  return (
    <section id="metodologia" className="mx-auto max-w-[720px] px-4 py-16 md:py-24">
      <NumeroSecao secao={secaoPorAncora('metodologia')} />

      <div className="space-y-6">
        <Cartao>
          <h3 className="mb-3 text-xl">{textoMetodologia.comoFunciona.titulo}</h3>
          <p>{textoMetodologia.comoFunciona.texto}</p>
        </Cartao>

        <Cartao>
          <h3 className="mb-3 text-xl">{textoMetodologia.oQueNaoFaz.titulo}</h3>
          <ul className="list-[square] space-y-2 pl-5 marker:text-estrutura">
            {textoMetodologia.oQueNaoFaz.itens.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Cartao>

        <Cartao>
          <h3 className="mb-3 text-xl">{textoMetodologia.deOndeVem.titulo}</h3>
          <div className="space-y-3">
            {textoMetodologia.deOndeVem.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Cartao>
      </div>

      <h3 className="mt-12 mb-5 text-2xl">{textoMetodologia.todasAsFontes}</h3>
      {grupos.length === 0 ? (
        <Cartao>
          <Etiqueta variante="revisao" className="mb-3">
            {textosConteudo.emRevisao}
          </Etiqueta>
          <p>{textoMetodologia.semFontes}</p>
        </Cartao>
      ) : (
        <div className="space-y-5">
          {grupos.map((grupo) => (
            <Acordeao key={grupo.tipo} nivelTitulo={4} titulo={`${nomesTipoFonte[grupo.tipo]} (${grupo.fontes.length})`}>
              <ul className="space-y-3">
                {grupo.fontes.map((fonte) => (
                  <ItemFonte key={fonte.url} fonte={fonte} />
                ))}
              </ul>
            </Acordeao>
          ))}
        </div>
      )}
    </section>
  );
}
