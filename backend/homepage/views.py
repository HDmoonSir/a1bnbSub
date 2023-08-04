from .models import Post, Photo
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, PhotoSerializer

from django_web.server_urls import *
import copy

# /upload POST 요청 시 호출
# 이미지를 fast-api 로 post
@api_view(['post'])
def upload_images(request):
    if request.FILES.getlist("images"):
        # fast-api post 요청 부분
        fast_api_images = request.FILES.getlist("images")
        file = [('images', img) for img in fast_api_images]
        file2 = copy.deepcopy(file)
        file3 = copy.deepcopy(file)

        # fast api 각각 3번 호출
        # print 부분 logging으로 변경 고려
        # detection fast api 호출
        result_detect = requests.post(fast_api_ip_detection, files=file)
        print(result_detect.json())
        print("detection complete")

        # # classification fast api 호출
        result_classification= requests.post(fast_api_ip_classification, files=file2)
        print(result_classification.json())
        print("classification complete")

        # text generation fast api 호출
        result_textgen= requests.post(fast_api_ip_generation, files=file3)
        print(result_textgen.json())
        print("textgeneration complete")

        return JsonResponse({"detect_result": result_detect.json(), "classi_result": result_classification.json(), "text_result":result_generation.json()})
    return JsonResponse({'result': "fail"}, status=400)


#####################################################################################################333

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # FIXME: 인증 적용


class PhotoViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PhotoSerializer


class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]  # FIXME: 인증 적용
