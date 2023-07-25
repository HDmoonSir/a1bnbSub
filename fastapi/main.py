from typing import Union
from PIL import Image
import io

from fastapi import FastAPI, UploadFile, File
import uvicorn
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware
from typing import List

app =FastAPI()

origins= ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# from pymongo import MongoClient
# client =MongoClient('localhost', 27017)
# db= client.kdt

# # db.users.insert_one({'name': 'admin'}) # insert
# db.users.delete_one({'name':'admin'})

# all_users= list(db.users.find({}))
# print(all_users)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# django '/upload' post 요청시 호출
# 모델로 이미지를 넘겨주는 부분 
@app.post("/upload")
async def upload_images(images: List[UploadFile] = File(...)):
    # 여기에서 이미지를 처리하는 로직을 구현합니다.
    # 예를 들면 이미지를 저장하거나 분석하는 작업 등이 가능합니다.
    file_data = images[0].file.read()
    pil_image = Image.open(io.BytesIO(file_data))
    pil_image = pil_image.resize((224, 224))
    return {}