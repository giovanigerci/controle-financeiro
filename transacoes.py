from database import conectar
from mysql.connector import Error


def adicionar_transacao(tipo, categoria, valor, descricao, data):
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                            INSERT INTO transacoes (tipo, categoria, valor, descricao, data)
                            VALUES (%s , %s , %s , %s , %s)
                            ''', (tipo, categoria, valor, descricao, data))
                conn.commit()
    except Error as e:
        print(f'Erro ao acessar o banco: {e}')


def buscar_transacao_por_id(id_transacao):
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''SELECT * FROM transacoes WHERE id = %s''', (id_transacao,))
                return cursor.fetchone()
    except Error as e:
        print(f'Erro ao acessar o banco: {e}')


def listar_transacoes():
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''SELECT * FROM transacoes''')
                return cursor.fetchall()
    except Error as e:
        print(f'Erro ao acessar o banco: {e}')


def atualizar_transacao(id_transacao, nome_campo, novo_valor):
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
                cursor.execute(f'''
                               UPDATE transacoes SET {nome_campo} = %s WHERE id = %s
                               ''', (novo_valor, id_transacao))
                conn.commit()
                if cursor.rowcount == 0:
                    return False
                else:
                    return True
    except Error as e:
        print(f'Erro ao acessar o banco: {e}')


def deletar_transacao(id_transacao):
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                               DELETE FROM transacoes WHERE id = %s
                               ''', (id_transacao,))
                conn.commit()
                if cursor.rowcount == 0:
                    return False
                else:
                    return True
    except Error as e:
        print(f'Erro ao acessar o banco: {e}')

def resumo_financeiro():
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
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
    except Error as e:
        print(f'Erro ao acessar o banco: {e}')