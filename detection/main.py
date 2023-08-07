from typing import Union

from fastapi import FastAPI, UploadFile, File
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from typing import List

from PIL import Image, ImageDraw
import io
import shutil
import os
from pathlib import Path

import torch
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

@app.post("/dl/detection")
async def detection(images: List[UploadFile] = File(...)):
    file_data = [image.file.read() for image in images]
    infer_images = [Image.open(io.BytesIO(data)) for data in file_data]

    file_names = [image.filename for image in images]

    model = YOLO('detection.pt')
    result = model(infer_images)

    torch.cuda.empty_cache()
    return {"result": custom_jsonify(result, file_names)}