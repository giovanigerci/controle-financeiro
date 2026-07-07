import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { SlideOver } from '../components/ui/SlideOver'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { ResumoCards } from '../features/transacoes/components/ResumoCards'
import { TransacaoTable } from '../features/transacoes/components/TransacaoTable'
import { TransacaoForm } from '../features/transacoes/components/TransacaoForm'
import { useDeletarTransacao } from '../features/transacoes/hooks/useDeletarTransacao'
import type { Transacao } from '../types/transacao'

export function DashboardPage() {
  const [painelAberto, setPainelAberto] = useState(false)
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null)
  const [transacaoExcluindo, setTransacaoExcluindo] = useState<Transacao | null>(null)

  const deletar = useDeletarTransacao()

  function abrirCriar() {
    setTransacaoEditando(null)
    setPainelAberto(true)
  }

  function abrirEditar(transacao: Transacao) {
    setTransacaoEditando(transacao)
    setPainelAberto(true)
  }

  function fecharPainel() {
    setPainelAberto(false)
    setTransacaoEditando(null)
  }

  function confirmarExclusao() {
    if (!transacaoExcluindo) return

    deletar.mutate(transacaoExcluindo.id, {
      onSuccess: () => setTransacaoExcluindo(null),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary">
            Visão Geral
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Acompanhe suas finanças com clareza
          </p>
        </div>
        <Button
          variante="primario"
          onClick={abrirCriar}
          icone={<Plus size={18} />}
        >
          <span className="hidden sm:inline">Nova Transação</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      <ResumoCards />

      <TransacaoTable
        aoEditar={abrirEditar}
        aoExcluir={setTransacaoExcluindo}
      />

      <SlideOver
        aberto={painelAberto}
        aoFechar={fecharPainel}
        titulo={transacaoEditando ? 'Editar Transação' : 'Nova Transação'}
      >
        <TransacaoForm
          transacaoEditando={transacaoEditando}
          aoSucesso={fecharPainel}
        />
      </SlideOver>

      <ConfirmDialog
        aberto={!!transacaoExcluindo}
        titulo="Excluir transação"
        mensagem={`Tem certeza que deseja excluir "${transacaoExcluindo?.descricao}"? Esta ação não pode ser desfeita.`}
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setTransacaoExcluindo(null)}
        carregando={deletar.isPending}
      />
    </div>
  )
}
