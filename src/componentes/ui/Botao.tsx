import type { ButtonHTMLAttributes } from 'react';
import { classesBotao } from './classesBotao';

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'principal' | 'secundario';
  larguraTotal?: boolean;
}

export function Botao({ variante = 'principal', larguraTotal = false, className = '', type = 'button', ...resto }: BotaoProps) {
  return <button type={type} className={`${classesBotao(variante, larguraTotal)} ${className}`} {...resto} />;
}
