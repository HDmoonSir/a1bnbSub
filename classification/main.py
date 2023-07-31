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
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

from models.classification import get_classification_model, get_classes, TestDataset
from models.matching import *

import torch 
from torch.utils.data import DataLoader

app =FastAPI()

origins= ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    
    test_dataset = TestDataset(infer_images)
    testloader = DataLoader(test_dataset, batch_size = 32, shuffle=False)

    predictions = []
    label_dict = {}

    classes = get_classes()
    model = get_classification_model()

    with torch.no_grad():
        for images in testloader:
            outputs = model(images)
            _, predicted = outputs.max(1)
            predictions.extend([classes[i] for i in predicted.cpu()])

    room_types_to_label = ["bathroom", "bedroom", "living_room", "dining_room", "kitchen"]
    room_types_others = []
    for room_type in room_types_to_label:
        room_images = [infer_images[i] for i in range(len(predictions)) if predictions[i] == room_type]
        print(label_rooms(room_images))
    
    # print(custom_jsonify(result, file_names))
    return {"predictions": label_dict}
