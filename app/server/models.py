from typing import Optional
from pydantic import BaseModel

class Cliente(BaseModel):
  _id: Optional[str]
  servicio: str
  usuario: str
  contrasena: str
  url: str
  icon: str