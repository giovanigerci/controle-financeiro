import type { ReactNode } from 'react'

type Variante = 'receita' | 'despesa' | 'neutro'

interface BadgeProps {
  variante?: Variante
  children: ReactNode
}

const estilos: Record<Variante, string> = {
  receita: 'bg-surface-elevated/60 text-text-muted border border-border/30',
  despesa: 'bg-surface-elevated/60 text-text-muted border border-border/30',
  neutro: 'bg-surface-elevated/60 text-text-muted border border-border/30',
}

export function Badge({ variante = 'neutro', children }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md
        text-xs font-medium font-[family-name:var(--font-body)]
        ${estilos[variante]}
      `}
    >
      {children}
    </span>
  )
}
