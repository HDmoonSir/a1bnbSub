from .models import Post, Image
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, ImageSerializer

from django_web.server_urls import *
import copy

# 더미 데이터 만들때 사용한 코드입니다
#from accounts.models import User
#import json
#@api_view(['GET'])
#def home_view(request):

    #user = User.objects.first()

    #room = '{"roomInfo": [ {"livingroom01": [["http://18.132.187.120/images/livingroom120230801.jpg", "http://18.132.187.120/images/liningroom120230801.jpg"], {"desk": 1, "chair": 2}]}, {"bathroom01": [["http://18.132.187.120/images/bathroom120230801.jpg", "http://18.132.187.120/images/liningroom120230801.jpg"], {"desk": 1, "chair": 2}]}]}'
    #room2 = json.loads(room)

    #paths1 =  '{"paths": {"0": "http://18.132.187.120/images/exterior120230801.jpg", "1": "http://18.132.187.120/images/bathroom120230801.jpg", "2": "http://18.132.187.120/images/bathroom120230801.jpg", "3": "http://18.132.187.120/images/exterior120230801.jpg", "4": "http://18.132.187.120/images/bathroom120230801.jpg", "5": "http://18.132.187.120/images/bathroom120230801.jpg", "6": "http://18.132.187.120/images/bathroom120230801.jpg", "7": "http://18.132.187.120/images/bathroom120230801.jpg", "8": "http://18.132.187.120/images/bathroom120230801.jpg", "9": "http://18.132.187.120/images/livingroom120230801.jpg"}}'
    #paths2 = json.loads(paths1)

    # 포스트 모델 생성
    #post_model = Post.objects.create(
    #    user = user,
    #    title = "oo호텔",
    #    caption = "소개글입니다.",
    #    imagePaths = paths2,
    #    roomInfo = room2
    #)

    # 이미지 모델 생성
    #image_model = Image.objects.create(
    #    imagePath = "http://18.132.187.120/images/bathroom120230801.jpg"
    #)



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

        return JsonResponse({"detect_result": result_detection.json(), "classi_result": result_classification.json(), "text_result":result_generation.json()})
    return JsonResponse({'result': "fail"}, status=400)

@api_view(['get'])
def get_homepage(request):
    return JsonResponse({'result': "get_homepage success"}, status=200)

@api_view(['get'])
def get_mypage(request):
    return JsonResponse({'result': "get_mypage success"}, status=200)

@api_view(['get'])
def get_result(request):
    # 태원 추가
    # 게시물 모델 생성
    # post_model = Post.objects.create(
    #    userId = user_id,
    #    title = "미구현",
    #    caption = result_generation.json(),
    #    photos = photo_paths,
    #    classifications = result_classification.json(),
    #    detections = result_detection.json(),
    #    ammenities = "미구현",
    # )
    # print('게시물 모델 생성:', post_model)
    return JsonResponse({'result': "get_result success"}, status=200)

@api_view(['get'])
def get_uploaded_page(request):
    return JsonResponse({'result': "get_uploaded_page success"}, status=200)

@api_view(['get'])
def get_rooms(request):
    post_id = request.json()
    return JsonResponse({'result': "get_rooms success"}, status=200)

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # FIXME: 인증 적용

class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]  # FIXME: 인증 적용

