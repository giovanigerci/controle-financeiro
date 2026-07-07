import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string
  erro?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ rotulo, erro, id, className = '', ...props }, ref) {
    const inputId = id || rotulo.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-muted font-[family-name:var(--font-body)]"
        >
          {rotulo}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2 rounded-lg text-sm
            bg-surface-elevated text-text-primary
            border border-border
            placeholder:text-text-muted/50
            transition-colors duration-150
            hover:border-text-muted/50
            focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30
            font-[family-name:var(--font-body)]
            ${erro ? 'border-negative focus:border-negative focus:ring-negative/30' : ''}
            ${className}
          `}
          {...props}
        />
        {erro && (
          <span className="text-xs text-negative">{erro}</span>
        )}
      </div>
    )
  }
)
