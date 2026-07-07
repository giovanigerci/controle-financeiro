import { forwardRef, type SelectHTMLAttributes } from 'react'

interface Opcao {
  valor: string
  texto: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  rotulo: string
  erro?: string
  opcoes: Opcao[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ rotulo, erro, opcoes, placeholder, id, className = '', ...props }, ref) {
    const selectId = id || rotulo.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-text-muted font-[family-name:var(--font-body)]"
        >
          {rotulo}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-3 py-2 rounded-lg text-sm
            bg-surface-elevated text-text-primary
            border border-border
            transition-colors duration-150
            hover:border-text-muted/50
            focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30
            font-[family-name:var(--font-body)]
            appearance-none
            bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238A93A1%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
            bg-[position:right_0.75rem_center]
            bg-no-repeat
            pr-10
            ${erro ? 'border-negative focus:border-negative focus:ring-negative/30' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.texto}
            </option>
          ))}
        </select>
        {erro && (
          <span className="text-xs text-negative">{erro}</span>
        )}
      </div>
    )
  }
)
