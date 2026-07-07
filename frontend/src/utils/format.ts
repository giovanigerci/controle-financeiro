const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const formatadorData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})

const formatadorDataCurta = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
})

export function formatarMoeda(valor: number): string {
  return formatadorMoeda.format(valor)
}

export function formatarData(data: string): string {
  return formatadorData.format(new Date(data + 'T00:00:00Z'))
}

export function formatarDataCurta(data: string): string {
  return formatadorDataCurta.format(new Date(data + 'T00:00:00Z'))
}
