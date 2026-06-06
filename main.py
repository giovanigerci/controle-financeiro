from database import inicializar_banco
from fastapi import FastAPI
from contextlib import asynccontextmanager
from routers import transacoes

@asynccontextmanager
async def lifespan(app: FastAPI):
    inicializar_banco()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(transacoes.router)