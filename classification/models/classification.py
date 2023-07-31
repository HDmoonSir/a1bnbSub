from torch.utils.data import Dataset, DataLoader
import matplotlib.pyplot as plt
import torch
import torchvision.transforms as transforms
import torch.nn as nn
import numpy as np
import os

args = {"resize": (224, 224),
        "mean": [0.485, 0.456, 0.406], 
        "std": [0.229, 0.224, 0.225], 
        "batch_size": 32, # 
        "weight_path": '/Users/mc/Desktop/a1bnbSub/classification/models/weights',
        "model": "efficientnet_v2_s",
        "weight_name": "efficientnet_v2_s_cutmix_6.pt", # {모델 이름}_{augmentation}_{epoch}.pt
        "num_classes": 9,
        "load_weight": True,
        "DEVICE" : torch.device("cuda: 0" if torch.cuda.is_available() else 'cpu')}

def get_classes():
    classes = ['exterior',
                'balcony-interior',
                'bathroom',
                'bedroom',
                'dining_room',
                'kitchen',
                'living_room',
                'recreation_room',
                'swimming_pool-outdoor']
    return classes

def get_classification_model():
    model = torch.hub.load('hankyul2/EfficientNetV2-pytorch', args["model"])
    model.head.classifier = nn.Linear(model.head.classifier.in_features, args["num_classes"])
    model = model.to(args["DEVICE"])
   
    if args["weight_name"] != None and args["load_weight"]:
        checkpoint = torch.load(os.path.join(args["weight_path"], args["weight_name"]), map_location=args["DEVICE"])
        model.load_state_dict(checkpoint['model_state_dict'])

    model.eval()
    return model

# 데이터셋 클래스 정의
class TestDataset(Dataset):
    def __init__(self, images):
        self.images = images
        self.transform = transforms.Compose([
                            transforms.Resize(args["resize"]),
                            transforms.ToTensor(),
                            transforms.Normalize(args["mean"], args["std"])
                        ])

    def __len__(self):
        return len(self.images)

    def __getitem__(self, index):
        image = self.images[index]
        image = self.transform(image)
        return image

