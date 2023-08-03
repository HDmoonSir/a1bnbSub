from typing import Union

from fastapi import FastAPI, UploadFile, File
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from typing import List

from PIL import Image, ImageDraw
import io
import pylab
import shutil
import os
from pathlib import Path

import json

# fast-api 실행: uvicorn main:app --port 9596 --reload

# related detection module
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
import ultralytics
from ultralytics import YOLO

app =FastAPI(debug=True)

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

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# detection용 json형식 변환 함수
def custom_jsonify(result, file_names):
    output = {}

    for idx, lst in enumerate(result):
        n = file_names[idx]
        output[n] = {}
        for item in lst:
            ite = json.loads(item.tojson())
            name = ite[0]["name"]
            bbox = [ite[0]["box"]["x1"], ite[0]["box"]["y1"], ite[0]["box"]["x2"], ite[0]["box"]["y2"], ite[0]["confidence"]]
            output[n][name] = bbox
    return output

object_list = []
NUM_COLORS = len(object_list)

def get_color(label):
    cm = pylab.get_cmap('gist_rainbow')
    color = cm(1.*object_list.index(label)/NUM_COLORS) 
    return color


@app.post("/dl/detection")
async def detection(images: List[UploadFile] = File(...)):
    file_data = [image.file.read() for image in images]
    infer_images = [Image.open(io.BytesIO(data)) for data in file_data]

    file_names = [image.filename for image in images]

    model = YOLO('detection.pt')
    result = model(infer_images)
    
    # (detection) bbox 그려주는 함수
    def draw_bbox(detect_json):
        img_dir = "../backend/media/images"
        if not os.path.exists(img_dir):
            os.makedirs(img_dir)

        for img_file, bbox in detect_json.items():
            img_idx = file_names.index(img_file)
            image = Image.open(infer_images[img_idx])
            draw = ImageDraw.Draw(image)

            for label, bbox in bbox.items():
                x1, y1, x2, y2, _ = bbox
                color = get_color(label)
                color = (int(color[0] * 255), int(color[1] * 255), int(color[2] * 255))
                draw.rectangle([x1, y1, x2, y2], outline = color, width = 4)

            output_path = os.path.join(img_dir, img_file)
            image.save(output_path)
    draw_bbox(result)
    return {"result": custom_jsonify(result, file_names)}

# @app.post("/dl/classification")
# async def classification(images: List[UploadFile] = File(...)):
#     # test 용 return 값
#     test_result= {
#          "post_1" : {
#                 "test1" : ["Room 1", 0.5],
# 				"test2" : ["Bathroom 1", 0.3],
# 				"test3" : ["Room 1", 0.8],
# 				"test4" : ["Balcony", 0.6],
# 				"test5" : ["Living room", 0.7],
# 				"test6" : ["Room 2", 0.9],
# 				"test7" : ["Bathroom 2", 0.8],
# 				"test8" : ["Others", 0.2],
#          }
#     }
#     # return {"result": "classification success!"}
#     return {"result": test_result}

# @app.post("/dl/generation")
# async def generation(images: List[UploadFile] = File(...)):
#      # test 용 return 값
#     test_result= {
#          "post_1" : {
#                  "test1" : "편안한 분위기의 방입니다."
#          }
#     }
#     # return {"result": "generation success!"}
#     return {"result": test_result}