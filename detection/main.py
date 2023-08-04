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
import pylab

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

object_list = ['Bathtub', 
                'Bed',
                'Chest of drawers',
                'Closet',
                'Computer monitor',
                'Couch',
                'Frying pan',
                'Hair dryer',
                'Home appliance',
                'Jacuzzi',
                'Kitchen appliance',
                'Microwave oven',
                'Oven',
                'Pressure cooker',
                'Printer',
                'Refrigerator',
                'Sink',
                'Sofa bed',
                'Swimming pool',
                'Table',
                'Wardrobe',
                'Washing machine',
                'Television',
                'toaster']
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
            image = infer_images[img_idx]
            draw = ImageDraw.Draw(image)

            for label, bbox in bbox.items():
                x1, y1, x2, y2, _ = bbox
                color = get_color(label)
                color = (int(color[0] * 255), int(color[1] * 255), int(color[2] * 255))
                draw.rectangle([x1, y1, x2, y2], outline = color, width = 4)

            output_path = os.path.join(img_dir, img_file)
            image.save(output_path)
    draw_bbox(custom_jsonify(result, file_names))
    torch.cuda.empty_cache()
    return {"result": custom_jsonify(result, file_names)}