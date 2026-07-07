# Controle Financeiro (Razão)

Sistema full-stack de controle de finanças pessoais com interface moderna inspirada em um Livro-Razão digital.

## Tecnologias

**Backend**
- Python 3.13 + FastAPI
- MySQL (mysql-connector-python)

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Query (TanStack)

## Estrutura do Projeto
- `/backend`: API RESTful conectada ao banco de dados MySQL.
- `/frontend`: Aplicação Web SPA (Single Page Application).

## Como rodar localmente

### 1. Configurando o Backend
1. Clone o repositório e acesse a pasta `backend/`.
2. Crie e ative o ambiente virtual:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Instale as dependências: `pip install -r requirements.txt`
4. Configure o arquivo `.env` com suas credenciais do MySQL.
5. Inicie a API: `uvicorn main:app --reload` (rodará na porta 8000).

### 2. Configurando o Frontend
1. Em outro terminal, acesse a pasta `frontend/`.
2. Instale as dependências Node:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação no navegador através de `http://localhost:5173`. (O Vite possui um proxy automático configurado para se comunicar com o backend na porta 8000).