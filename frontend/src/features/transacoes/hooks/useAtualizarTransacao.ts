import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../services/api'

interface AtualizarParams {
  id: number
  campo: string
  novo_valor: string | number
}

export function useAtualizarTransacao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, campo, novo_valor }: AtualizarParams) => {
      const response = await api.put(`/transacoes/${id}`, {
        campo,
        novo_valor: String(novo_valor),
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] })
      queryClient.invalidateQueries({ queryKey: ['resumo'] })
    },
  })
}
