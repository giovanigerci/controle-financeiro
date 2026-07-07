import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface SlideOverProps {
  aberto: boolean
  aoFechar: () => void
  titulo: string
  children: ReactNode
}

export function SlideOver({ aberto, aoFechar, titulo, children }: SlideOverProps) {
  const painelRef = useRef<HTMLDivElement>(null)

  // Fechar com Escape
  useEffect(() => {
    if (!aberto) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') aoFechar()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [aberto, aoFechar])

  // Travar scroll do body quando aberto
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  // Focar no painel ao abrir
  useEffect(() => {
    if (aberto && painelRef.current) {
      painelRef.current.focus()
    }
  }, [aberto])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={titulo}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-overlay animate-fade-in"
        onClick={aoFechar}
        aria-hidden="true"
      />

      {/* Painel */}
      <div
        ref={painelRef}
        tabIndex={-1}
        className="
          absolute top-0 right-0 h-full w-full max-w-md
          bg-surface border-l border-border
          shadow-2xl shadow-black/50
          animate-slide-in
          flex flex-col
          outline-none
        "
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">
            {titulo}
          </h2>
          <button
            onClick={aoFechar}
            className="
              p-1.5 rounded-lg text-text-muted
              hover:text-text-primary hover:bg-surface-elevated
              transition-colors duration-150 cursor-pointer
            "
            aria-label="Fechar painel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
