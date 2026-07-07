import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../services/api'

export function useDeletarTransacao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/transacoes/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] })
      queryClient.invalidateQueries({ queryKey: ['resumo'] })
    },
  })
}
