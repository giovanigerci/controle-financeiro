import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, X, Menu, DollarSign } from 'lucide-react'

const itensNavegacao = [
  { caminho: '/', rotulo: 'Visão Geral', icone: LayoutDashboard },
  { caminho: '/transacoes', rotulo: 'Transações', icone: BookOpen },
]

export function Sidebar() {
  const [mobileAberto, setMobileAberto] = useState(false)

  const conteudoSidebar = (
    <nav className="flex flex-col h-full">
      <div className="px-6 py-6 border-b-2 border-border flex items-center gap-3">
        <div className="p-1.5 bg-accent/10 rounded-lg shrink-0">
          <DollarSign size={24} className="text-accent" />
        </div>
        <div>
          <h1 className="text-lg font-bold font-[family-name:var(--font-display)] text-accent tracking-wide leading-tight">
            Controle Financeiro
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-[family-name:var(--font-body)]">
            Razão
          </p>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        {itensNavegacao.map(({ caminho, rotulo, icone: Icone }) => (
          <NavLink
            key={caminho}
            to={caminho}
            onClick={() => setMobileAberto(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-sm font-medium font-[family-name:var(--font-body)]
              transition-all duration-150
              group relative
              ${isActive
                ? 'bg-accent/10 text-accent'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r" />
                )}
                <Icone size={18} className="shrink-0" />
                <span>{rotulo}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="px-6 py-4 border-t-2 border-border">
        <p className="text-xs text-text-muted/50 font-[family-name:var(--font-mono)] valor-mono">
          v1.0.0
        </p>
      </div>
    </nav>
  )

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-surface border-r border-border fixed left-0 top-0 z-30
        before:content-[''] before:absolute before:left-0 before:inset-y-0 before:w-1 
        before:bg-[repeating-linear-gradient(to_bottom,transparent,transparent_10px,var(--color-border)_10px,var(--color-border)_12px)]
        before:opacity-30 pl-1"
      >
        {conteudoSidebar}
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign size={20} className="text-accent" />
          <h1 className="text-lg font-bold font-[family-name:var(--font-display)] text-accent leading-tight">
            Controle Financeiro
          </h1>
        </div>
        <button
          onClick={() => setMobileAberto(true)}
          className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {mobileAberto && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-overlay animate-fade-in"
            onClick={() => setMobileAberto(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-surface border-r border-border animate-slide-in-left">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMobileAberto(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                aria-label="Fechar menu"
              >
                <X size={18} />
              </button>
            </div>
            {conteudoSidebar}
          </aside>
        </div>
      )}
    </>
  )
}
