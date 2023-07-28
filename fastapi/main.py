from typing import Union
from PIL import Image
import io

from fastapi import FastAPI, UploadFile, File
import uvicorn
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware
from typing import List

import os
import json



# related detection module
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
import ultralytics
from ultralytics import YOLO

app =FastAPI()

origins= ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# @app.post('/upload')
# async def upload_images(images: List[UploadFile] = File(...)):
#     print("come!!!!!!!!!!!!!!!!!")
    
#     # file_data = images[0].file.read()
#     file_data = images[0].file.read()
#     image = Image.open(io.BytesIO(file_data))

#     model = YOLO('detection.pt')
#     result = model(image)
#     print(result[0].tojson())
#     # print(result.tojson())
#     return {}

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





@app.post('/upload')
async def upload_images(images: List[UploadFile] = File(...)):
    file_data = [image.file.read() for image in images]
    infer_images = [Image.open(io.BytesIO(data)) for data in file_data]

    file_names = [image.filename for image in images]

    model = YOLO('detection.pt')
    result = model(infer_images)
    
    print(custom_jsonify(result, file_names))
    return {}


