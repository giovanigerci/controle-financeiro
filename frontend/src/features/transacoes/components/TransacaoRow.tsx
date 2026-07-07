import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../../../components/ui/Badge'
import { formatarMoeda, formatarData } from '../../../utils/format'
import type { Transacao } from '../../../types/transacao'

interface TransacaoRowProps {
  transacao: Transacao
  aoEditar: (transacao: Transacao) => void
  aoExcluir: (transacao: Transacao) => void
}

export function TransacaoRow({ transacao, aoEditar, aoExcluir }: TransacaoRowProps) {
  const ehReceita = transacao.tipo === 'Receita'
  const sinal = ehReceita ? '+' : '−'
  const corValor = ehReceita ? 'text-positive' : 'text-negative'

  return (
    <tr className="group border-b border-border/50 last:border-b-0 hover:bg-surface-elevated/50 transition-colors duration-100">
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm valor-mono text-text-muted">
          {formatarData(transacao.data)}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-text-primary font-[family-name:var(--font-body)]">
          {transacao.descricao}
        </span>
      </td>

      <td className="px-4 py-3 hidden sm:table-cell">
        <Badge variante={ehReceita ? 'receita' : 'despesa'}>
          {transacao.categoria}
        </Badge>
      </td>

      <td className="px-4 py-3 text-right whitespace-nowrap">
        <span className={`text-sm font-medium valor-mono ${corValor}`}>
          {sinal}&nbsp;{formatarMoeda(transacao.valor)}
        </span>
      </td>

      <td className="px-4 py-3 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => aoEditar(transacao)}
            className="p-1.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors duration-150 cursor-pointer"
            aria-label={`Editar transação: ${transacao.descricao}`}
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => aoExcluir(transacao)}
            className="p-1.5 rounded-lg text-text-muted hover:text-negative hover:bg-negative/10 transition-colors duration-150 cursor-pointer"
            aria-label={`Excluir transação: ${transacao.descricao}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}
