import { useQuery } from '@tanstack/react-query'
import api from '../../../services/api'

interface ResumoFinanceiro {
  receitas: number
  despesas: number
  saldo: number
}

export function useResumoFinanceiro() {
  return useQuery<ResumoFinanceiro>({
    queryKey: ['resumo'],
    queryFn: async () => {
      const response = await api.get('/transacoes/resumo')
      const dados = response.data
      return {
        receitas: Number(dados.receita ?? dados.receitas ?? 0),
        despesas: Number(dados.despesas ?? dados.despesa ?? 0),
        saldo: Number(dados.saldo ?? 0),
      }
    },
  })
}
