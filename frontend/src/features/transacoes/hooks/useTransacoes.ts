import { useQuery } from '@tanstack/react-query'
import api from '../../../services/api'
import type { Transacao } from '../../../types/transacao'

function normalizarTransacao(item: unknown): Transacao {
  if (Array.isArray(item)) {
    return {
      id: item[0],
      tipo: item[1],
      categoria: item[2],
      valor: Number(item[3]),
      descricao: item[4],
      data: normalizarData(item[5]),
    }
  }
  const obj = item as Record<string, unknown>
  return {
    id: Number(obj.id),
    tipo: String(obj.tipo),
    categoria: String(obj.categoria),
    valor: Number(obj.valor),
    descricao: String(obj.descricao),
    data: normalizarData(obj.data),
  }
}

function normalizarData(valor: unknown): string {
  const str = String(valor)
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str
  const date = new Date(str)
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0]
  }
  return str
}

export function useTransacoes() {
  return useQuery<Transacao[]>({
    queryKey: ['transacoes'],
    queryFn: async () => {
      const response = await api.get('/transacoes')
      const dados = response.data
      if (Array.isArray(dados)) {
        return dados.map(normalizarTransacao)
      }
      return []
    },
  })
}
