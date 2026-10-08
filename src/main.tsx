import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Ponto de entrada: monta o App dentro de <div id="root"> (index.html).
// Em produção, o HTML já vem pronto do build (scripts/prerender.mjs) e o React só o
// "ativa" (hydrateRoot). Em desenvolvimento, a div vem vazia e o React a preenche.
const raiz = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (raiz.hasChildNodes()) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
