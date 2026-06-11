from fastapi import APIRouter, HTTPException
from transacoes import (
    adicionar_transacao, listar_transacoes, deletar_transacao, 
    buscar_transacao_por_id, atualizar_transacao, resumo_financeiro)
from schemas.transacao import TransacaoSchema, TransacaoUpdateSchema

router = APIRouter()

@router.get('/transacoes')
def get_transacoes():
    return listar_transacoes()


@router.get('/transacoes/resumo')
def get_resumo():
    receita, despesa, saldo = resumo_financeiro()
    return {'receita': receita, 'despesas': despesa, 'saldo': saldo}


@router.get('/transacoes/{id}')
def get_transacao_por_id(id: int):
    transacao = buscar_transacao_por_id(id)
    if transacao is None:
        raise HTTPException(status_code=404, detail='Transação não encontrada')
    return transacao


@router.post('/transacoes', status_code=201)
def post_transacao(transacao: TransacaoSchema):
    adicionar_transacao(transacao.tipo, transacao.categoria, transacao.valor, transacao.descricao, transacao.data)
    return {'mensagem': 'Transação adicionada com sucesso'}


@router.delete('/transacoes/{id}')
def delete_transacao(id: int):
    if deletar_transacao(id):
        return {'mensagem': 'Transação deletada com sucesso'}
    raise HTTPException(status_code=404, detail='Transação não encontrada')


@router.put('/transacoes/{id}')
def put_transacao(id: int, transacao: TransacaoUpdateSchema):
    if atualizar_transacao(id, transacao.campo, transacao.novo_valor):
        return {'mensagem': 'Transação atualizada com sucesso'}
    raise HTTPException(status_code=404, detail='Transação não encontrada')
