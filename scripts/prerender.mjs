// Pré-renderização (última etapa do "npm run build").
// Coloca o HTML gerado por src/entry-server.tsx dentro do <div id="root"> de dist/index.html.
// Assim o Google e as prévias de links recebem o texto do site sem precisar rodar JavaScript.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const pastaSsr = resolve(raiz, 'dist-ssr');
const arquivoHtml = resolve(raiz, 'dist', 'index.html');

const { renderizar } = await import(pathToFileURL(resolve(pastaSsr, 'entry-server.js')).href);
const conteudo = renderizar();

const marcador = '<div id="root"></div>';
const html = readFileSync(arquivoHtml, 'utf8');
if (!html.includes(marcador)) throw new Error(`Não encontrei ${marcador} em dist/index.html`);
writeFileSync(arquivoHtml, html.replace(marcador, `<div id="root">${conteudo}</div>`));

// O pacote usado para gerar o HTML não vai para produção
rmSync(pastaSsr, { recursive: true, force: true });
console.log(`Pré-renderização: ${Math.round(conteudo.length / 1024)} KB de HTML em dist/index.html`);
