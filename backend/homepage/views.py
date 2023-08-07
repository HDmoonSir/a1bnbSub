from .models import Post, Image
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from accounts.models import User
import json
from collections import Counter
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer

from django_web.server_urls import *
import copy

from PIL import Image, ImageDraw, ImageFont

import io
import json
import pylab
import os

import base64

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

# (detection) bbox 그려주는 함수. return : PIL.Image.Image 객체
def draw_bbox(detect_json, image_files_bbox):
    file_data = [image.file.read() for _, image in image_files_bbox]
    infer_images = [Image.open(io.BytesIO(data)) for data in file_data]
    file_names = [image.name for _, image in image_files_bbox]

    bbox_images = []

    for img_file, bbox in detect_json["result"].items():
        img_idx = file_names.index(img_file)
        image = infer_images[img_idx]
        draw = ImageDraw.Draw(image)

        for label, bbox in bbox.items():
            x1, y1, x2, y2, _ = bbox
            color = get_color(label)
            color = (int(color[0] * 255), int(color[1] * 255), int(color[2] * 255))
            font = ImageFont.truetype('arial.ttf', 20)
            label_text = f"{label}"

            # bbox draw
            draw.rectangle([x1, y1, x2, y2], outline = color, width = 4)

            # text background draw
            draw.rectangle([x1, y1-20, x1+font.getsize(label)[0], y1], outline = color,  fill = color,  width = 0)
            draw.text((x1, y1-20), label_text, font=font, fill=(255,255,255))
        bbox_images.append(image)
    return bbox_images

def get_image_data(bbox_images):
    result_images = []

    for bbox_image in bbox_images:  
        image_io = io.BytesIO()
        bbox_image.save(image_io, format='PNG')
        image_io.seek(0)

        image_base64 = base64.b64encode(image_io.read()).decode('utf-8')

        result_images.append(image_base64)
    return result_images
 
# /upload POST 요청 시 호출
# 이미지를 fast-api 로 post
@api_view(['post'])
def upload_images(request):
    if request.FILES.getlist("images"):
        # fast-api post 요청 부분
        fast_api_images = request.FILES.getlist("images")
        image_files_detection = [('images', img) for img in fast_api_images]
        image_files_classification = copy.deepcopy(image_files_detection)
        image_files_generation = copy.deepcopy(image_files_detection)
        image_files_bbox = copy.deepcopy(image_files_detection)
        
        # fast api 각각 3번 호출
        # print 부분 logging으로 변경 고려
        # detection fast api 호출
        result_detection = requests.post(fast_api_ip_detection, files = image_files_detection)
        print(result_detection.json())
        print("detection complete")

        # # classification fast api 호출
        result_classification= requests.post(fast_api_ip_classification, files = image_files_classification)
        print(result_classification.json())
        print("classification complete")

        # # text generation fast api 호출
        # result_generation= requests.post(fast_api_ip_generation, files = image_files_generation)
        # print(result_generation.json())
        # print("textgeneration complete")

        # bbox image draw & 보내기
        bbox_images = draw_bbox(result_detection.json(), image_files_bbox)
        result_images = get_image_data(bbox_images)

        return JsonResponse({"detect_result": result_detection.json(), 
                             "classi_result": result_classification.json(), 
                            #  "text_result": result_generation.json(),
                             "text_result": {"result": "generation_result"},
                             "bbox_result" : result_images})
    return JsonResponse({'result': "fail"}, status=400)

@api_view(['get'])
def get_homepage(request):
    #post ID로 필터링해서 최신순으로 8개 가져오기

    user = User.objects.first()

    data =  {
        "livingroom01": {
            "img_path": [
                "http://hostip/images/livingroomimage1.jpg",
                "http://hostip/images/livingroomimage2.jpg"
            ],
            "detected": {
                "Desk": 2,
                "Table": 1,
                "Lamp": 1
            }
        },
        "kitchen01": {
            "img_path": [
                "http://hostip/images/kitchenimage1.jpg",
                "http://hostip/images/kitchenimage2.jpg"
            ],
            "detected": {
                "Oven": 2,
                "Microwave": 1,
                "Ref": 1
            }
        }
    }

    # 포스트 모델 생성
    #post_model = Post.objects.create(
    #    user = user,
    #    userName = user.fullname,
    #    title = "oo호텔",
    #    caption = "소개글입니다.",
    #    thumbnail = "http://18.132.187.120/images/livingroom120230801.jpg",
    #    roomInfo = data
    #)

    if request.method == 'GET':
        queryset = Post.objects.all()
        post_serializer = PostSerializer(queryset, many=True)
        return JsonResponse(post_serializer.data, safe=False, status=200)
    else:
        return JsonResponse({'error': 'Bad request'}, status=400)

@api_view(['get'])
def get_mypage(request):
    try:
        #user로 필터링해서 가져오기
        posts = Post.objects.all().filter(user = request.user)
        data = {
            'mypageInfo': list(posts.values())
        }
        return JsonResponse(data, status=200)
    except:
        return JsonResponse({"result": "Fail to load posts from DB"}, status=400)

def count_objects_by_room(img_paths, result_detection):
    def extract_labels(result):
        detect_list = []
        for lst in result:
            for item in lst:
                ite = json.loads(item.tojson())
                name = ite[0]["name"]
                detect_list.append(name)
        result = dict(Counter(detect_list))
        return result
    
    def max_option(lst):
        result = {}
        for i in lst:
            for key, value in i.items():
                if key in result:
                    if value > result[key]:
                        result[key] = value
                else:
                    result[key] = value
        return result
    
    # room_types_to_label = ["bathroom", "bedroom", "living_room", "dining_room", "kitchen"]
    lst = []

    for img_path in img_paths:
        lst.append(extract_labels(result_detection[img_path]))
    return max_option(lst)

@api_view(['get'])
def get_result(request):
    try:
        rooms = set(request.result_classification.values())
        
        data = {'dlInfo': {}}
        for room in rooms:
            img_paths = [img_path for img_path in request.result_detection.keys() \
                        if request.result_classification[img_path] == room]
            data['dlInfo'][room]['img_paths'] = img_paths
            data['dlInfo'][room]['list_amenities'] = count_objects_by_room(img_paths,
                                                                        request.result_detection, 
                                                                        request.result_classification,
                                                                        room)
            data['dlInfo'][room]['result_thumb_text'] = request.result_generation
        return JsonResponse(data, status=200)
    except:
        return JsonResponse({"result": "Fail to get result"}, status=400)

@api_view(['post'])
def upload_post(request):
    try:
        user = request.user
        rooms = set(request.confirm_list_room_class.values())
    
        data = {'room_info': {}}
        for room in rooms:
            data['room_info'] = {
                f"{room}": {
                    {"img_path": request.img_paths},
                    {"detected": request.confirm_list_amenities},
                }
            }

        Post.objects.create(
            user = user,
            username = user.username,
            title = request.post_title,
            caption = request.post_content,
            thumb_image = request.thumbnail_path,
            roomInfo = data['room_info']
        )
        
        # save_detection = False

        # if count_objects_by_room(request.result_detection.json(), room) == request.confirm_list_amenities:
        #     result_detection = request.confirm_list_amenities
        # else:
        #     result_detection = {}

        # Image.objects.create(
        #     imagePath = "http://18.132.187.120/images/bathroom120230801.jpg",
        #     resultDetection = result_detection,
        #     resultClassification = request.result_classification.json()
        # )

        return JsonResponse({'result': "upload_post success"}, status=201)
    except:
        return JsonResponse({'result': "Fail to upload"}, status=400)

@api_view(['get'])
def get_uploaded_page(request):
    return JsonResponse({'result': "get_uploaded_page success"}, status=200)

@api_view(['get'])
def get_room(request):
    #post ID로 필터링해서 가져오기
    try:
        posts = Post.objects.all().filter(post_id = request.GET.get('post_id'))
        data = {
            'postInfo': list(posts.values())
        }
        print("Success to load room")
    except:
        print("Fail to load room, get dummy data")
        data = {
            'postInfo': 
                {
                    "userName": "망망망",
                    "title": "좋은 방입니다",
                    "post_id": 3,
                    "thumb_image": "http://hostip/images/thumbimage1.jpg",
                    "caption": "너무 좋아서 평생 살고싶네요",
                    "roomInfo": {
                        "livingroom01": {
                            "img_path": [
                                "http://hostip/images/livingroomimage1.jpg",
                                "http://hostip/images/livingroomimage2.jpg"
                            ],
                            "detected": {
                                "Desk": 2,
                                "Table": 1,
                                "Lamp": 1
                            }
                        },
                        "kitchen01": {
                            "img_path": [
                                "http://hostip/images/kitchenimage1.jpg",
                                "http://hostip/images/kitchenimage2.jpg"
                            ],
                            "detected": {
                                "Oven": 2,
                                "Microwave": 1,
                                "Ref": 1
                            }
                        }
                    }
                }
            }
    return JsonResponse(data, status=200)

