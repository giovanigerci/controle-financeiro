import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  aberto: boolean
  aoConfirmar: () => void
  aoCancelar: () => void
  titulo: string
  mensagem: string
  carregando?: boolean
}

export function ConfirmDialog({
  aberto,
  aoConfirmar,
  aoCancelar,
  titulo,
  mensagem,
  carregando = false,
}: ConfirmDialogProps) {
  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={titulo}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-overlay animate-fade-in"
        onClick={aoCancelar}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="
        relative z-10 w-full max-w-sm mx-4
        bg-surface border border-border rounded-xl
        shadow-2xl shadow-black/50
        animate-fade-in
        p-6
      ">
        <div className="flex items-start gap-4">
          <div className="shrink-0 p-2 rounded-lg bg-negative/10">
            <AlertTriangle size={20} className="text-negative" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold font-[family-name:var(--font-display)] text-text-primary">
              {titulo}
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              {mensagem}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variante="secundario"
            tamanho="sm"
            onClick={aoCancelar}
            disabled={carregando}
          >
            Cancelar
          </Button>
          <Button
            variante="perigo"
            tamanho="sm"
            onClick={aoConfirmar}
            carregando={carregando}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}
