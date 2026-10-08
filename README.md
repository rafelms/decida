# DECIDA

**Saiba onde você está.**

Site: **[decida.social.br](https://decida.social.br)**

DECIDA é um site gratuito, de página única, para quem está indeciso ou desinteressado de política. A pessoa responde **18 afirmações** e vê de qual lado do espectro político as respostas dela se aproximam: esquerda, centro-esquerda, centro, centro-direita ou direita. Em seguida, conhece o que cada lado defende, compara as visões em 8 temas e confere as fontes de tudo.

O resultado é apresentado como **ponto de partida, não veredito**.

## Princípios

| Princípio | Na prática |
|---|---|
| **Neutralidade** | Os 5 lados têm a mesma estrutura, a mesma quantidade de conteúdo e o mesmo tom. Nenhum lado tem cor própria. |
| **Tudo com fonte** | Fichas e temas: pelo menos 3 fontes, de 3 veículos e 2 tipos diferentes. Glossário: pelo menos 1 fonte (a lei em vigor ou uma referência). Um teste automático confere. |
| **Privacidade (LGPD)** | As respostas ficam só na memória do navegador. Não há backend, cookies, analytics nem requisições a terceiros. |
| **Nada partidário** | Nenhum partido, candidato ou político brasileiro aparece no site. |
| **Celular primeiro** | Projetado para 360px, com áreas de toque de 48px e foco em acessibilidade. |

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript (modo `strict`)
- [Tailwind CSS 4](https://tailwindcss.com), com os tokens da identidade visual em `src/index.css`
- [Vitest](https://vitest.dev) para lógica de pontuação, comparação e validação de conteúdo
- [Oxlint](https://oxc.rs) para lint
- Fontes Archivo Black e Space Grotesk hospedadas no projeto (`@fontsource`), sem chamadas externas
- Hospedado na Vercel como site estático. No build, o HTML é pré-renderizado com `react-dom/server`, para buscadores e prévias de links lerem o conteúdo sem JavaScript

Não há bibliotecas de roteamento, estado, componentes ou animação. A animação de abertura é feita à mão.

## Como rodar

Requer Node.js 20.19 ou mais recente (desenvolvido com o Node 24).

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm test          # testes (Vitest)
npm run lint      # lint (Oxlint)
npm run build     # verificação de tipos + build de produção (pré-renderizado) em dist/
npm run preview   # serve o build localmente
```

## Estrutura

```
decida/
├── public/                      # favicon, avatar, imagem de compartilhamento, QR code Pix, robots.txt, sitemap.xml
├── scripts/
│   └── prerender.mjs            # última etapa do build: coloca o HTML gerado em dist/index.html
├── src/
│   ├── main.tsx                 # ponto de entrada (hydrateRoot sobre o HTML pré-renderizado)
│   ├── entry-server.tsx         # gera o HTML da página no build
│   ├── App.tsx                  # monta as seções na ordem da página
│   ├── index.css                # Tailwind, tokens de cor/fonte/sombra, estilos base
│   ├── tipos/index.ts           # modelo de dados
│   ├── dados/                   # TODO o conteúdo do site (nenhum texto fica nos componentes)
│   │   ├── perguntas.ts         # as 18 afirmações
│   │   ├── glossario.ts         # 27 termos explicados nas afirmações
│   │   ├── temas.ts             # 8 temas da comparação e episódios "Na prática", com fontes
│   │   ├── lados.ts             # fichas dos 5 lados, com fontes
│   │   └── textos.ts            # avisos, metodologia, interface, painel Sobre, FAQ
│   ├── logica/                  # funções puras, sem React
│   │   ├── pontuacao.ts         # pontos, somas por bloco, faixas, perfil misto
│   │   ├── comparacao.ts        # relação entre lados em um tema
│   │   ├── fontes.ts            # junta e agrupa as fontes para a metodologia
│   │   ├── lados.ts             # busca um lado pelo id
│   │   └── *.test.ts            # testes de pontuação, comparação e conteúdo
│   ├── hooks/
│   │   ├── useTeste.ts          # respostas, afirmação atual e resultado (só em memória)
│   │   ├── useTema.ts           # tema claro/escuro (começa no claro, só em memória)
│   │   └── useDialogo.ts        # painéis em tela cheia: foco, Esc, Tab preso
│   ├── utils/rolarPara.ts       # rola até uma seção e move o foco para o título
│   └── componentes/
│       ├── ui/                  # componentes base (Botao, Cartao, Acordeao, Glossario...)
│       └── secoes/              # uma seção da página por arquivo
├── index.html                   # título, descrição, canonical, Open Graph, dados estruturados
└── package.json
```

### Seções da página

| # | Âncora | Componente | Conteúdo |
|---|---|---|---|
| — | — | `Cabecalho` + `PainelSobre` | Cabeçalho fixo, botão de tema, MENU e avatar, que abre o painel Sobre (projeto, FAQ, contato, apoio) |
| 01 | `#inicio` | `Abertura` | Animação ligada ao scroll |
| 02 | `#como-funciona` | `ComoFunciona` | 3 passos, explicação do glossário, aviso "Antes de começar" |
| 03 | `#teste` | `Questionario` | 18 afirmações, uma por vez, com glossário |
| 04 | `#resultado` | `Resultado` | Lado, barra do espectro, 3 blocos, perfil misto, "Por que esse resultado" |
| 05 | `#lados` | `Lados` | Fichas dos 5 lados em acordeão: ideias, economia, defensores, críticos e pensadores |
| 06 | `#comparacao` | `Comparacao` | Visões próximas, diferentes e opostas em 8 temas, com um episódio "Na prática" em cada |
| 07 | `#metodologia` | `Metodologia` | Como o teste funciona, limites e todas as fontes |
| 08 | `#aviso-final` | `AvisoFinal` | Mensagem de conscientização |
| — | — | `Rodape` | Citação, avisos, data do conteúdo e links (metodologia, FAQ, apoio, quem faz, contato) |

## Como editar o conteúdo

Todo texto fica em `src/dados/`. Os componentes só exibem o que está lá.

- **Fontes** são declaradas uma vez, como constantes no topo do arquivo, e reaproveitadas.
- **Conteúdo ainda não entregue** usa `pendente: true` e o texto `"CONTEÚDO PENDENTE"`. Na tela, ele aparece com a etiqueta "CONTEÚDO EM REVISÃO".
- **Depois de editar, rode `npm test`.** Os testes verificam:
  - a quantidade de afirmações e o equilíbrio de direção em cada bloco;
  - a simetria entre os lados;
  - a regra de fontes;
  - se cada trecho do glossário existe exatamente na afirmação.
- **As faixas de resultado** ficam em constantes no topo de `src/logica/pontuacao.ts`.

## Situação

- ✅ No ar em [decida.social.br](https://decida.social.br), com todo o conteúdo entregue: afirmações, glossário, fichas dos 5 lados e os 8 temas com episódios.
- ✅ Todas as fontes foram conferidas (links, autores, anos e números citados).
- Para sugerir correções ou apontar um erro em alguma fonte, use o formulário "Fale comigo" no site.

## Autor

Projeto independente de [@rafelms](https://github.com/rafelms). Sem vínculo com partidos, candidatos, campanhas ou governos.
