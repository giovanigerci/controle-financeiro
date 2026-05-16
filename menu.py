from transacoes import (
    adicionar_transacao, listar_transacoes, deletar_transacao, 
    buscar_transacao_por_id, atualizar_transacao, resumo_financeiro)
from validacoes import validar_data, validar_tipo, validar_valor

def exibir_menu():
    while True:
        print('=========================================')
        print('           CONTROLE FINANCEIRO           ')
        print('=========================================')
        
        input_usuario = input('1 - Adicionar transação \n2 - Listar transações \n3 - Atualizar transação \n4 - Deletar transação\n5 - Resumo Financeiro \n0 - Sair \n')
        if input_usuario == '0':
            print('Saindo...')
            break
        elif input_usuario not in ('1', '2', '3', '4', '5'):
            print('Por favor, escolha apenas os números das opções sugeridas.')
        elif input_usuario == '1':
            menu_adicionar()
        elif input_usuario == '2':
            menu_listar()
        elif input_usuario == '3':
            menu_atualizar()
        elif input_usuario == '4':
            menu_deletar()
        elif input_usuario == '5':
            menu_resumo()
        

def menu_listar():
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


def menu_adicionar():
    tipo = validar_tipo('Informe o tipo da transação: \n 1 - Receita ou  2 - Despesa \n')
    categoria = input('Informe a categoria: ')
    valor = validar_valor('Informe o Valor: ')
    descricao = input('Informe a descrição(Opcional): ')
    data = validar_data('Informe a data (DD/MM/AAAA): ')

    adicionar_transacao(tipo, categoria, valor, descricao, data)
    print('=========================================')
    print('Transação adicionada com sucesso.\n')


def menu_deletar():
    try:
        input_id_transacao = int(input('Informe o ID da transação que deseja deletar: '))
    except ValueError:
        print('Digite apenas números.')
        return
    if deletar_transacao(input_id_transacao):
        print('=========================================')
        print('Transação deletada com sucesso.\n')
    else:
        print('ID não encontrado.')


def menu_atualizar():
        campos = {
        '1': 'tipo',
        '2': 'categoria',
        '3': 'valor',
        '4': 'descricao',
        '5': 'data'
        }
        try:
            input_id_transacao = int(input('Informe o ID da transação que deseja atualizar: '))
        except ValueError:
            print('Digite apenas números.')
            return
        if buscar_transacao_por_id(input_id_transacao) is None:
            print('Id não encontrado.')
            return
        print('Qual campo deseja alterar?\n')
        input_campo_transacao = input(('1 - Tipo \n2 - Categoria \n3 - Valor \n4 - Descrição \n5 - Data\n'))
        if input_campo_transacao not in ('1', '2', '3', '4', '5'):
            print('Por favor, escolha apenas os números das opções sugeridas.')
        campo_alterado = ''
        print('=========================================')
        if input_campo_transacao == '1':
            campo_alterado = validar_tipo('Informe o tipo da transação: \n 1 - Receita ou  2 - Despesa \n')
        elif input_campo_transacao == '2':
            campo_alterado = input('Informe a categoria: ')
        elif input_campo_transacao == '3':
            campo_alterado = validar_valor('Informe o Valor: ')
        elif input_campo_transacao == '4':
            campo_alterado = input('Informe a descrição(Opcional): ')
        else:
            campo_alterado = validar_data('Informe a data (DD/MM/AAAA): ')
        nome_campo = campos[input_campo_transacao]
        if atualizar_transacao(input_id_transacao, nome_campo, campo_alterado):
            print('=========================================')
            print('Transação atualizada com sucesso.\n')
        else:
            print('ID não encontrado.')

def menu_resumo():
    receita, despesa, saldo = resumo_financeiro()
    print('=========================================')
    print('           RESUMO FINANCEIRO             ')
    print('=========================================')
    print(f'  Total Receitas:  R$ {receita:.2f}')
    print(f'  Total Despesas:  R$ {despesa:.2f}')
    print('-----------------------------------------')
    print(f'  Saldo Atual:     R$ {saldo:.2f}')
    print('=========================================')
    