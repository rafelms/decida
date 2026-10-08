import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Usado só no build (scripts/prerender.mjs): gera o HTML da página com o texto
// já pronto, para buscadores e prévias de links lerem o conteúdo sem rodar JavaScript.
// No navegador, o main.tsx aproveita esse HTML (hydrateRoot) em vez de recriá-lo.
export function renderizar(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
