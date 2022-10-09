from pymongo import MongoClient

conn = MongoClient("mongodb+srv://nyae:nyae@cluster0.y2oshk2.mongodb.net/?retryWrites=true&w=majority")
db = conn.crud
