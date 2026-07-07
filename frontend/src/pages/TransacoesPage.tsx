import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { SlideOver } from '../components/ui/SlideOver'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { TransacaoTable } from '../features/transacoes/components/TransacaoTable'
import { TransacaoForm } from '../features/transacoes/components/TransacaoForm'
import { useDeletarTransacao } from '../features/transacoes/hooks/useDeletarTransacao'
import type { Transacao } from '../types/transacao'

export function TransacoesPage() {
  const [painelAberto, setPainelAberto] = useState(false)
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null)
  const [transacaoExcluindo, setTransacaoExcluindo] = useState<Transacao | null>(null)
  const [busca, setBusca] = useState('')

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary">
            Transações
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Gerencie todas as suas movimentações financeiras
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

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por descrição, categoria..."
          className="
            w-full pl-9 pr-4 py-2.5 rounded-lg text-sm
            bg-surface text-text-primary
            border border-border
            placeholder:text-text-muted/50
            transition-colors duration-150
            hover:border-text-muted/50
            focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30
            font-[family-name:var(--font-body)]
          "
        />
      </div>

      <TransacaoTable
        aoEditar={abrirEditar}
        aoExcluir={setTransacaoExcluindo}
        filtroBusca={busca}
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
