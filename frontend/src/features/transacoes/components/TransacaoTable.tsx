import { BookOpen } from 'lucide-react'
import { TransacaoRow } from './TransacaoRow'
import { useTransacoes } from '../hooks/useTransacoes'
import type { Transacao } from '../../../types/transacao'

interface TransacaoTableProps {
  aoEditar: (transacao: Transacao) => void
  aoExcluir: (transacao: Transacao) => void
  filtroBusca?: string
}

type TipoFiltro = 'todas' | 'Receita' | 'Despesa'

function SkeletonRow() {
  return (
    <tr className="border-b border-border/50">
      <td className="px-4 py-3"><div className="h-4 w-20 bg-surface-elevated rounded animate-pulse-subtle" /></td>
      <td className="px-4 py-3"><div className="h-4 w-32 bg-surface-elevated rounded animate-pulse-subtle" /></td>
      <td className="px-4 py-3 hidden sm:table-cell"><div className="h-5 w-16 bg-surface-elevated rounded animate-pulse-subtle" /></td>
      <td className="px-4 py-3"><div className="h-4 w-24 bg-surface-elevated rounded ml-auto animate-pulse-subtle" /></td>
      <td className="px-4 py-3"><div className="h-4 w-12 bg-surface-elevated rounded ml-auto animate-pulse-subtle" /></td>
    </tr>
  )
}

import { useState } from 'react'

export function TransacaoTable({ aoEditar, aoExcluir, filtroBusca = '' }: TransacaoTableProps) {
  const { data: transacoes, isLoading, isError } = useTransacoes()
  const [filtroTipo, setFiltroTipo] = useState<TipoFiltro>('todas')

  const transacoesFiltradas = transacoes?.filter((t) => {
    if (filtroTipo !== 'todas' && t.tipo !== filtroTipo) return false
    
    if (!filtroBusca) return true
    const termo = filtroBusca.toLowerCase()
    return (
      t.descricao.toLowerCase().includes(termo) ||
      t.categoria.toLowerCase().includes(termo)
    )
  })

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-base font-semibold font-[family-name:var(--font-display)] text-text-primary">
          Extrato
        </h2>
        
        <div className="flex bg-surface-elevated p-1 rounded-lg">
          {(['todas', 'Receita', 'Despesa'] as const).map(tipo => {
            const contagem = tipo === 'todas' 
              ? (transacoes?.length || 0)
              : (transacoes?.filter(t => t.tipo === tipo).length || 0)
              
            return (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer
                  ${filtroTipo === tipo 
                    ? 'bg-accent/10 text-accent shadow-sm ring-1 ring-accent/30' 
                    : 'text-text-muted hover:text-text-primary bg-transparent'}
                `}
              >
                {tipo === 'todas' ? 'Todas' : tipo === 'Receita' ? 'Receitas' : 'Despesas'} ({contagem})
              </button>
            )
          })}
        </div>
      </div>

      {isError && (
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-negative">Erro ao carregar transações. Verifique se o servidor está ativo.</p>
        </div>
      )}

      {isLoading && (
        <table className="w-full">
          <tbody>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </tbody>
        </table>
      )}

      {!isLoading && !isError && transacoesFiltradas && transacoesFiltradas.length === 0 && (
        <div className="px-5 py-16 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-surface-elevated mb-4">
            <BookOpen size={32} className="text-text-muted/50" />
          </div>
          <h3 className="text-base font-semibold font-[family-name:var(--font-display)] text-text-primary mb-1">
            {filtroTipo === 'Receita' 
              ? 'Nenhuma receita encontrada' 
              : filtroTipo === 'Despesa' 
                ? 'Nenhuma despesa encontrada' 
                : 'Seu razão está em branco'}
          </h3>
          <p className="text-sm text-text-muted max-w-xs mx-auto">
            {filtroTipo !== 'todas' || filtroBusca
              ? 'Tente remover os filtros para ver suas transações.'
              : 'Comece registrando sua primeira transação. Cada lançamento constrói a história financeira do seu mês.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && transacoesFiltradas && transacoesFiltradas.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Data
                </th>
                <th className="px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Descrição
                </th>
                <th className="px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider font-[family-name:var(--font-body)] hidden sm:table-cell">
                  Categoria
                </th>
                <th className="px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider font-[family-name:var(--font-body)] text-right">
                  Valor
                </th>
                <th className="px-4 py-3 w-20">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {transacoesFiltradas.map((transacao) => (
                <TransacaoRow
                  key={transacao.id}
                  transacao={transacao}
                  aoEditar={aoEditar}
                  aoExcluir={aoExcluir}
                />
              ))}
            </tbody>
          </table>
          
          <div className="px-5 py-3 border-t-2 border-border bg-surface-elevated/30 flex justify-end">
            <span className="text-xs text-text-muted font-[family-name:var(--font-mono)]">
              {transacoesFiltradas.length} {transacoesFiltradas.length === 1 ? 'transação exibida' : 'transações exibidas'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
