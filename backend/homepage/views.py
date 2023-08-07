from .models import Post, Image
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from accounts.models import User
import json
from collections import Counter

from django_web.server_urls import *
import copy

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

        # text generation fast api 호출
        result_generation= requests.post(fast_api_ip_generation, files = image_files_generation)
        print(result_generation.json())
        print("textgeneration complete")

        return JsonResponse({"detect_result": result_detection.json(), 
                             "classi_result": result_classification.json(), 
                             "text_result":result_generation.json()})
    return JsonResponse({'result': "fail"}, status=400)

@api_view(['get'])
def get_homepage(request):
    #post ID로 필터링해서 최신순으로 8개 가져오기
    posts = Post.objects.all().order_by('-postID')[:8]
    data = {
        'homepageInfo': list(posts.values())
    }
    return JsonResponse(data, status=200)

@api_view(['get'])
def get_mypage(request):
    #user로 필터링해서 가져오기
    posts = Post.objects.all().filter(user = request.user)
    data = {
        'mypageInfo': list(posts.values())
    }
    return JsonResponse(data, status=200)

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

@api_view(['post'])
def upload_post(request):
    if request.user.is_authenticated:
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
    return JsonResponse({'result': "User is not authenticated"}, status=400)

@api_view(['get'])
def get_uploaded_page(request):
    return JsonResponse({'result': "get_uploaded_page success"}, status=200)

@api_view(['get'])
def get_room(request):
    #post ID로 필터링해서 가져오기
    posts = Post.objects.all().filter(post_id = request.GET.get('post_id'))
    data = {
        'postInfo': list(posts.values())
    }
    
    data = {
        'postInfo': {
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