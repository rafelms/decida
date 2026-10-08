import { lados } from '../dados/lados';
import type { Lado, LadoId } from '../tipos';

// Busca um lado pelo id.
// Fica fora de src/dados/lados.ts porque esse arquivo é entregue pronto pelo autor.
export function ladoPorId(id: LadoId): Lado {
  const lado = lados.find((l) => l.id === id);
  if (!lado) throw new Error(`Lado não encontrado: ${id}`);
  return lado;
}
