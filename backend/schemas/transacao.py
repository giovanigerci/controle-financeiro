from pydantic import BaseModel
from typing import Optional

class TransacaoSchema(BaseModel):
    tipo: str
    categoria: str
    valor: float
    descricao: str
    data: str

class TransacaoUpdateSchema(BaseModel):
    campo: str
    novo_valor: str