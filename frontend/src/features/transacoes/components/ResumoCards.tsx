import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { formatarMoeda } from '../../../utils/format'
import { useResumoFinanceiro } from '../hooks/useResumoFinanceiro'

function SkeletonCard() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-surface-elevated rounded animate-pulse-subtle" />
          <div className="h-7 w-28 bg-surface-elevated rounded animate-pulse-subtle" />
        </div>
        <div className="h-10 w-10 bg-surface-elevated rounded-lg animate-pulse-subtle" />
      </div>
    </div>
  )
}

export function ResumoCards() {
  const { data: resumo, isLoading, isError } = useResumoFinanceiro()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (isError || !resumo) {
    return (
      <div className="bg-surface rounded-xl border border-border p-5 text-center">
        <p className="text-sm text-negative">Erro ao carregar resumo financeiro.</p>
      </div>
    )
  }

  const cards = [
    {
      rotulo: 'Receitas',
      valor: resumo.receitas,
      icone: TrendingUp,
      corValor: 'text-positive',
      corIcone: 'bg-positive/10 text-positive',
    },
    {
      rotulo: 'Despesas',
      valor: resumo.despesas,
      icone: TrendingDown,
      corValor: 'text-negative',
      corIcone: 'bg-negative/10 text-negative',
    },
    {
      rotulo: 'Saldo',
      valor: resumo.saldo,
      icone: Wallet,
      corValor: resumo.saldo >= 0 ? 'text-accent' : 'text-negative',
      corIcone: resumo.saldo >= 0 ? 'bg-accent/10 text-accent' : 'bg-negative/10 text-negative',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ rotulo, valor, icone: Icone, corValor, corIcone }) => (
        <div
          key={rotulo}
          className="
            bg-surface rounded-xl border border-border p-5
            hover:border-border/80 hover:shadow-lg hover:shadow-black/10
            transition-all duration-200
            group
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider font-[family-name:var(--font-body)]">
                {rotulo}
              </p>
              <p className={`mt-1 text-2xl font-medium valor-mono ${corValor}`}>
                {formatarMoeda(valor)}
              </p>
            </div>
            <div className={`p-2.5 rounded-lg ${corIcone} transition-transform duration-200 group-hover:scale-105`}>
              <Icone size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
