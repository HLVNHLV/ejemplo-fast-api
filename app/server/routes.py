from server.models import Cliente
from fastapi import APIRouter
from server.dbconfig import db

# Arregla la compatibilidad entre el ObjectId de MongoDB y el tipo str
from pydantic import json
from bson.objectid import ObjectId

json.ENCODERS_BY_TYPE[ObjectId]=str
######################################################################

servicio_router = APIRouter()

@servicio_router.get("/servicio")
async def get_servicio():
  return list(db.servicio.find())

@servicio_router.get("/servicio/{id}")
async def get_servicio(id: str):
  return db.servicio.find_one({"_id": ObjectId(id)})

@servicio_router.post("/servicio")
async def post_servicio(servicio: Cliente):
  nuevo_servicio = dict(servicio)
  id = db.servicio.insert_one(nuevo_servicio).inserted_id
  return str(id)

@servicio_router.put("/servicio/{id}")
async def put_servicio(id: str, servicio: Cliente):
  db.servicio.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(servicio)})

@servicio_router.delete("/servicio/{id}")
async def delete_servicio(id: str):
  db.servicio.find_one_and_delete({"_id": ObjectId(id)})
