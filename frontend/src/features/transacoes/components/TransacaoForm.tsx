import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Button } from '../../../components/ui/Button'
import { useAdicionarTransacao } from '../hooks/useAdicionarTransacao'
import { useAtualizarTransacao } from '../hooks/useAtualizarTransacao'
import type { Transacao } from '../../../types/transacao'

interface FormDados {
  tipo: string
  categoria: string
  valor: string
  descricao: string
  data: string
}

interface TransacaoFormProps {
  transacaoEditando?: Transacao | null
  aoSucesso: () => void
}

const categoriasPorTipo: Record<string, { valor: string; texto: string }[]> = {
  Receita: [
    { valor: 'Salário', texto: 'Salário' },
    { valor: 'Freelance', texto: 'Freelance' },
    { valor: 'Investimentos', texto: 'Investimentos' },
    { valor: 'Outros', texto: 'Outros' },
  ],
  Despesa: [
    { valor: 'Alimentação', texto: 'Alimentação' },
    { valor: 'Transporte', texto: 'Transporte' },
    { valor: 'Moradia', texto: 'Moradia' },
    { valor: 'Saúde', texto: 'Saúde' },
    { valor: 'Educação', texto: 'Educação' },
    { valor: 'Lazer', texto: 'Lazer' },
    { valor: 'Outros', texto: 'Outros' },
  ],
}

const opcoesTipo = [
  { valor: 'Receita', texto: 'Receita' },
  { valor: 'Despesa', texto: 'Despesa' },
]

export function TransacaoForm({ transacaoEditando, aoSucesso }: TransacaoFormProps) {
  const editando = !!transacaoEditando

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormDados>({
    defaultValues: {
      tipo: 'Despesa',
      categoria: '',
      valor: '',
      descricao: '',
      data: new Date().toISOString().split('T')[0],
    },
  })

  const adicionar = useAdicionarTransacao()
  const atualizar = useAtualizarTransacao()

  const tipoSelecionado = watch('tipo')
  const categoriasDisponiveis = categoriasPorTipo[tipoSelecionado] || []

  useEffect(() => {
    if (transacaoEditando) {
      reset({
        tipo: transacaoEditando.tipo,
        categoria: transacaoEditando.categoria,
        valor: String(transacaoEditando.valor),
        descricao: transacaoEditando.descricao,
        data: transacaoEditando.data,
      })
    } else {
      reset({
        tipo: 'Despesa',
        categoria: '',
        valor: '',
        descricao: '',
        data: new Date().toISOString().split('T')[0],
      })
    }
  }, [transacaoEditando, reset])

  async function onSubmit(dados: FormDados) {
    const valorNumerico = parseFloat(dados.valor)

    if (editando && transacaoEditando) {
      const campos: { campo: string; novo_valor: string | number }[] = []

      if (dados.tipo !== transacaoEditando.tipo) campos.push({ campo: 'tipo', novo_valor: dados.tipo })
      if (dados.categoria !== transacaoEditando.categoria) campos.push({ campo: 'categoria', novo_valor: dados.categoria })
      if (valorNumerico !== transacaoEditando.valor) campos.push({ campo: 'valor', novo_valor: valorNumerico })
      if (dados.descricao !== transacaoEditando.descricao) campos.push({ campo: 'descricao', novo_valor: dados.descricao })
      if (dados.data !== transacaoEditando.data) campos.push({ campo: 'data', novo_valor: dados.data })

      for (const { campo, novo_valor } of campos) {
        await atualizar.mutateAsync({ id: transacaoEditando.id, campo, novo_valor })
      }

      aoSucesso()
    } else {
      adicionar.mutate(
        {
          tipo: dados.tipo,
          categoria: dados.categoria,
          valor: valorNumerico,
          descricao: dados.descricao,
          data: dados.data,
        },
        { onSuccess: aoSucesso }
      )
    }
  }

  const carregando = adicionar.isPending || atualizar.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Select
        rotulo="Tipo"
        opcoes={opcoesTipo}
        {...register('tipo', { required: 'Selecione o tipo' })}
        erro={errors.tipo?.message}
      />

      <Select
        rotulo="Categoria"
        opcoes={categoriasDisponiveis}
        placeholder="Selecione a categoria"
        {...register('categoria', { required: 'Selecione a categoria' })}
        erro={errors.categoria?.message}
      />

      <Input
        rotulo="Valor (R$)"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="0,00"
        {...register('valor', {
          required: 'Informe o valor',
          validate: (v) => parseFloat(v) > 0 || 'O valor deve ser maior que zero',
        })}
        erro={errors.valor?.message}
      />

      <Input
        rotulo="Descrição"
        type="text"
        placeholder="Ex: Salário de julho"
        {...register('descricao', { required: 'Informe a descrição' })}
        erro={errors.descricao?.message}
      />

      <Input
        rotulo="Data"
        type="date"
        {...register('data', { required: 'Informe a data' })}
        erro={errors.data?.message}
      />

      {(adicionar.isError || atualizar.isError) && (
        <div className="p-3 rounded-lg bg-negative/10 border border-negative/20">
          <p className="text-sm text-negative">
            Ocorreu um erro ao salvar. Tente novamente.
          </p>
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variante="primario"
          carregando={carregando}
          className="w-full"
        >
          {editando ? 'Salvar Alterações' : 'Adicionar Transação'}
        </Button>
      </div>
    </form>
  )
}
