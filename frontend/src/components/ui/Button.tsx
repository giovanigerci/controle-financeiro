import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variante = 'primario' | 'secundario' | 'fantasma' | 'perigo'
type Tamanho = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  tamanho?: Tamanho
  carregando?: boolean
  icone?: ReactNode
}

const estilosVariante: Record<Variante, string> = {
  primario:
    'bg-transparent text-accent border border-accent hover:bg-accent hover:text-bg font-semibold',
  secundario:
    'bg-surface-elevated text-text-primary border border-border hover:border-text-muted',
  fantasma:
    'bg-transparent text-text-muted hover:text-text-primary hover:bg-surface-elevated',
  perigo:
    'bg-negative/10 text-negative border border-negative/30 hover:bg-negative/20',
}

const estilosTamanho: Record<Tamanho, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
}

export function Button({
  variante = 'primario',
  tamanho = 'md',
  carregando = false,
  icone,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || carregando}
      className={`
        inline-flex items-center justify-center rounded-lg
        font-medium font-[family-name:var(--font-body)]
        transition-all duration-150 ease-out
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${estilosVariante[variante]}
        ${estilosTamanho[tamanho]}
        ${className}
      `}
      {...props}
    >
      {carregando ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : icone ? (
        <span className="shrink-0">{icone}</span>
      ) : null}
      {children}
    </button>
  )
}
