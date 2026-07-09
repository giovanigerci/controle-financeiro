from pydantic import BaseModel
from typing import Literal

class TransacaoSchema(BaseModel):
    tipo: str
    categoria: str
    valor: float
    descricao: str
    data: str

CampoAtualizavel = Literal['tipo', 'categoria', 'valor', 'descricao', 'data']
class TransacaoUpdateSchema(BaseModel):
    campo: CampoAtualizavel
    novo_valor: str