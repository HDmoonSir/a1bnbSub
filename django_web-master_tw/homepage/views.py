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
    # 이미지 파일을 저장할 디렉토리를 지정합니다.
    upload_dir = 'images'
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    # 이미지 파일의 확장자를 추출합니다.
    filename, ext = os.path.splitext(image.name)

    # 저장될 파일의 경로를 생성합니다.
    saved_path = os.path.join(upload_dir, f"{filename}{ext}")

    # 파일을 저장합니다.
    fs = FileSystemStorage()
    fs.save(saved_path, image)

    return saved_path
    
# /upload POST 요청 시 호출 
# 이미지를 fast-api 로 post 한다
@api_view(['post'])
def upload_images(request):
    # image data 를 media/images 폴더 안에 저장 
    # image 한 장에 대해 
    # serializer= mainpageSerializer(
    #             data= request.data, many= True)
    # if serializer.is_valid():
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # image_file= request.FILES['images']
    # test= request.POST['text']
    
    serverUrl="http://127.0.0.1:9596/upload" # fast-api 테스트용 임시 url # fast-api 실행: uvicorn main:app --port 9596 --reload
    
    if request.FILES.getlist("images"):
        # fast-api post 요청 부분
        fast_api_images = request.FILES.get('images')
        files = {"image": fast_api_images}
        response = requests.post(serverUrl, files=files)
        
        images = request.FILES.getlist("images")
        saved_image_paths = []
    
        for image in images:
            # 이미지를 저장하고 저장된 파일 경로를 리스트에 추가
            saved_path = save_image(image)
            saved_image_paths.append(saved_path)
        
        # fast-api post 요청 부분
        # response= requests.post(
        #     url=serverUrl, 
        #     data=request.FILES,
        #     headers= {"content-type": "multipart/form-data"})
        # print(type(request.FILES))

        return JsonResponse({'result': "success", 'saved_paths': saved_image_paths}, status=200)
    
    return JsonResponse({'result': "fail"}, status=400)

# get/ammenities/ GET 요청 시 호출 
@api_view(['get'])
def get_ammenities(request):
    return JsonResponse({'image_file': 'image.jpg', "text": "ammenities des"})

