from typing import Union

from fastapi import FastAPI

# from pymongo import MongoClient
# client =MongoClient('localhost', 27017)
# db= client.kdt

# # db.users.insert_one({'name': 'admin'}) # insert
# db.users.delete_one({'name':'admin'})

# all_users= list(db.users.find({}))
# print(all_users)

app =FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# 로그인 # 현재 서버 CORS 이슈 발생..
@app.get("/account/signin")
def signin(user_info):
    return {"name": user_info['username'], "password": user_info['password']}