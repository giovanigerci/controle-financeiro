from database import com_conexao


@com_conexao
def adicionar_transacao(cursor, tipo, categoria, valor, descricao, data):
    cursor.execute('''
                INSERT INTO transacoes (tipo, categoria, valor, descricao, data)
                VALUES (%s , %s , %s , %s , %s)
                ''', (tipo, categoria, valor, descricao, data))


@com_conexao
def buscar_transacao_por_id(cursor, id_transacao):
    cursor.execute('''SELECT * FROM transacoes WHERE id = %s''', (id_transacao,))
    return cursor.fetchone()


@com_conexao
def listar_transacoes(cursor):
    cursor.execute('''SELECT * FROM transacoes''')
    return cursor.fetchall()


@com_conexao
def atualizar_transacao(cursor, id_transacao, nome_campo, novo_valor):
    cursor.execute(f'''
                    UPDATE transacoes SET {nome_campo} = %s WHERE id = %s
                    ''', (novo_valor, id_transacao))
    if cursor.rowcount == 0:
        return False
    else:
        return True


@com_conexao
def deletar_transacao(cursor, id_transacao):
    cursor.execute('''
                    DELETE FROM transacoes WHERE id = %s
                    ''', (id_transacao,))
    if cursor.rowcount == 0:
        return False
    else:
        return True


@com_conexao
def resumo_financeiro(cursor):
    cursor.execute('''
                    SELECT SUM(valor) FROM transacoes WHERE tipo = %s
                    ''', ('Receita',))
    total_receita = cursor.fetchone()[0] or 0

    cursor.execute('''
                    SELECT SUM(valor) FROM transacoes WHERE tipo = %s
                    ''', ('Despesa',))
    total_despesa = cursor.fetchone()[0] or 0
    saldo = total_receita - total_despesa
    return total_receita, total_despesa, saldo
