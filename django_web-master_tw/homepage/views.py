from django.shortcuts import render, redirect
from rest_framework import viewsets
from .serializers import mainpageSerializer
from .models import mainpage

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.decorators import api_view

from django.core.files.storage import FileSystemStorage
import os
import requests
from django.http import JsonResponse

from PIL import Image, ImageDraw


# Create your views here.
class mainpageView(viewsets.ModelViewSet):
    serializer_class= mainpageSerializer
    queryset= mainpage.objects.all()
    
# upload image view # /admin/
class uploadImageList(APIView):
    def get(self, request): # GET 
       images= mainpage.objects.all()
       
       serializer= mainpageSerializer(images, many= True)
       return Response(serializer.data)
   
    def post(self, request): # POST
       serializer= mainpageSerializer(
           data= request.data)
       
       if serializer.is_valid():
           serializer.save() 
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 이미지 저장 함수 
def save_image(image):
    upload_dir = 'images'
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    filename, ext = os.path.splitext(image.name)

    saved_path = os.path.join(upload_dir, f"{filename}{ext}")

    fs = FileSystemStorage()
    fs.save(saved_path, image)

    return saved_path

# bbox 그려주는 함수
# def draw_bbox(response, image_nums):
#     for i in range(image_nums):

    
# /upload POST 요청 시 호출 
# 이미지를 fast-api 로 post 한다
@api_view(['post'])
def upload_images(request): 
    serverUrl="http://127.0.0.1:9596/upload" 
    
    if request.FILES.getlist("images"):
        # reqeust(사용자 첨부 파일)을 전처리하여 모델(fastapi)로 쏘기
        fast_api_images = request.FILES.getlist("images")
        file = [('images', img) for img in fast_api_images]
        # response <- detection된 결과를 json(dict)형식
        response = requests.post(serverUrl, files=file)
        print(response.json())

        # 이미지를 media/images에 저장
        saved_image_paths = []
        for image in fast_api_images:
            saved_path = save_image(image)
            saved_image_paths.append(saved_path)

        # media/images에 저장된 이미지 위에 bbox그려서 다시 저장




        return JsonResponse({'result': "success", 'saved_paths': saved_image_paths}, status=200)
    
    return JsonResponse({'result': "fail"}, status=400)

# get/ammenities/ GET 요청 시 호출 
@api_view(['get'])
def get_ammenities(request):
    return JsonResponse({'image_file': 'image.jpg', "text": "ammenities des"})

