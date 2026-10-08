import { useEffect, useState } from 'react';

export type Tema = 'claro' | 'escuro';

// Cor da barra do navegador no celular, igual ao token "fundo" de cada tema (index.css)
const corDaBarra: Record<Tema, string> = {
  claro: '#F2E8D5',
  escuro: '#1C1714',
};

// Tema da página (claro ou escuro). Começa sempre no claro e fica só em memória:
// nada é gravado no navegador (seção 7.7 do SDD), então recarregar volta ao claro.
// O tema é aplicado pelo atributo data-tema no <html>, que troca os tokens de cor.
export function useTema() {
  const [tema, setTema] = useState<Tema>('claro');

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', corDaBarra[tema]);
  }, [tema]);

  const alternarTema = () => setTema((atual) => (atual === 'claro' ? 'escuro' : 'claro'));

  return { tema, alternarTema };
}
