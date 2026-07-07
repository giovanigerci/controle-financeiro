import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../services/api'
import type { Transacao } from '../../../types/transacao'

type NovaTransacao = Omit<Transacao, 'id'>

export function useAdicionarTransacao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dados: NovaTransacao) => {
      const response = await api.post('/transacoes', dados)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] })
      queryClient.invalidateQueries({ queryKey: ['resumo'] })
    },
  })
}
