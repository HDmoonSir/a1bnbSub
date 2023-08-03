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

        # fast api 각각 3번 호출
        # detection fast api 호출     
        result_detect = requests.post(detect_Url, files=file)
        print(result_detect.json())

        # # classification fast api 호출
        result_classification= requests.post(classification_Url, files=file2)
        print(result_classification.json())

        # text generation fast api 호출
        # result_textgen= requests.post(textgen_Url, files=files)

        return JsonResponse({"detect_result": result_detect.json(), "classi_result": result_classification.json()})
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