from datetime import datetime

def validar_valor(mensagem):
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print('Adicione apenas números. Ex: 15.99')

def validar_tipo(mensagem):
    while True:
        tipo = input(mensagem)
        if tipo in ('1', '2'):
            if tipo == '1':
                return 'Receita'
            else:
                return 'Despesa'
        else:
            print('Escolha apenas os números das opções sugeridas.')

def validar_data(mensagem):
    while True:
        try:
            data = input(mensagem)
            data_formatada = datetime.strptime(data, '%d/%m/%Y')
            return data_formatada.strftime('%Y-%m-%d')
        except ValueError:
            print('Data inválida. Use o formato DD/MM/AAAA. Ex: 25/12/2024')