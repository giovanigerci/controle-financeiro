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


def listar_transacoes():
    try:
        with conectar() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''SELECT * FROM transacoes''')
                return cursor.fetchall()

    except Error as e:
        print(f'Erro ao acessar o banco: {e}')