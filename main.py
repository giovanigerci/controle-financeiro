from database import inicializar_banco
from transacoes import adicionar_transacao, listar_transacoes
from datetime import datetime

inicializar_banco()

def pedir_valor(mensagem):
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print('Adicione apenas números. Ex: 15.99')

def pedir_tipo(mensagem):
    while True:
        tipo = input(mensagem)
        if tipo in ('1', '2'):
            if tipo == '1':
                return 'Receita'
            else:
                return 'Despesa'
        else:
            print('Escolha apenas os números das opções sugeridas.')

def pedir_data(mensagem):
    while True:
        try:
            data = input(mensagem)
            data_formatada = datetime.strptime(data, '%d/%m/%Y')
            return data_formatada.strftime('%Y-%m-%d')
        except ValueError:
            print('Data inválida. Use o formato DD/MM/AAAA. Ex: 25/12/2024')

while True:
    print('=========================================')
    print('           CONTROLE FINANCEIRO           ')
    print('=========================================')
    
    input_usuario = input('1 - Adicionar transação \n2 - Listar transações \n0 - Sair \n')

    if input_usuario == '0':
        print('Saindo...')
        break
    elif input_usuario not in ('1', '2'):
        print('Por favor, escolha apenas os números das opções sugeridas.')
    elif input_usuario == '1':
        tipo = pedir_tipo('Informe o tipo da transação: \n 1 - Receita ou  2 - Despesa \n')
        categoria = input('Informe a categoria: ')
        valor = pedir_valor('Informe o Valor: ')
        descricao = input('Informe a descrição(Opcional): ')
        data = pedir_data('Informe a data (DD/MM/AAAA): ')

        adicionar_transacao(tipo, categoria, valor, descricao, data)
        print('=========================================')
        print('Transação adicionada com sucesso\n')
    elif input_usuario == '2':
        transacoes = listar_transacoes()
        if not transacoes:
            print('Nenhuma transação encontrada.')
        else:
            for transacao in transacoes:
                id_transacao = transacao[0]
                tipo = transacao[1]
                categoria = transacao[2]
                valor = f'{transacao[3]:.2f}'
                descricao = transacao[4]
                data = transacao[5].strftime('%d/%m/%Y')
                print('----------------------------------------')
                print(f'ID: {id_transacao} | Tipo: {tipo} | Categoria: {categoria}')
                print(f'Valor: R$ {valor} | Data: {data}')
                print(f'Descrição: {descricao}')
                print('----------------------------------------')





