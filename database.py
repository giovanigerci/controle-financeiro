import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def conectar():
    return mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_DATABASE'))

def inicializar_banco():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute('''
                    CREATE TABLE IF NOT EXISTS transacoes (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        tipo VARCHAR(50) NOT NULL,
                        categoria VARCHAR(50) NOT NULL,
                        valor DECIMAL(10,2) NOT NULL,
                        descricao VARCHAR(150),
                        data DATETIME NOT NULL
                   )
                ''')
    conn.commit()
    conn.close()

def com_conexao(func):
    def wrapper(*args, **kwargs):
        try:
            with conectar() as conn:
                with conn.cursor() as cursor:
                    resultado = func(cursor, *args, **kwargs)
                    conn.commit()
                    return resultado
        except Error as e:
            print(f'Erro ao acessar o banco: {e}')
    return wrapper
    