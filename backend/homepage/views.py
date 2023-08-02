from rest_framework import viewsets
from .models import Post, Photo, mainpage
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage
import os
import requests
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, PhotoSerializer, mainpageSerializer

from PIL import Image, ImageDraw
from django_web.server_urls import *
import copy

# Create your views here.
class mainpageView(viewsets.ModelViewSet):
    serializer_class = mainpageSerializer
    queryset = mainpage.objects.all()


# upload image view # /admin/
class uploadImageList(APIView):
    def get(self, request):  # GET
        images = mainpage.objects.all()

        serializer = mainpageSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request):  # POST
        serializer = mainpageSerializer(
            data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        x


# 이미지 저장 함수 ./media/images
def save_image(image):
    upload_dir = 'images'
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    filename, ext = os.path.splitext(image.name)

    saved_path = os.path.join(upload_dir, f"{filename}{ext}")

    fs = FileSystemStorage()
    fs.save(saved_path, image)

    return saved_path


# (detection) bbox 그려주는 함수
def draw_bbox(detect_json, image_nums):
    img_dir = "./media/images"
    count = 0
    for img_file, bbox in detect_json.items():
        img_path = os.path.join(img_dir, img_file)

        image = Image.open(img_path)
        draw = ImageDraw.Draw(image)

        for bbox_label, bbox_values in bbox.items():
            x1, y1, x2, y2, _ = bbox_values
            draw.rectangle([x1, y1, x2, y2], outline='red', width=4)

        output_path = os.path.join(img_dir, "bbox_" + str(count) + img_file)
        image.save(output_path)

        count += 1


# /upload POST 요청 시 호출
# 이미지를 fast-api 로 post
@api_view(['post'])
def upload_images(request):
    if request.FILES.getlist("images"):
        # fast-api post 요청 부분
        fast_api_images = request.FILES.getlist("images")
        file = [('images', img) for img in fast_api_images]
        file2 = copy.deepcopy(file)
        # upload_dir = 'images'
        # if os.path.exists(upload_dir): # 항상 새로 시작 (이전 데이터 삭제)
        #     shutil.rmtree(upload_dir

        # fast api 각각 3번 호출
        # detection fast api 호출
        print('detect response start!!!!!!!!')
        
        result_detect = requests.post(detect_Url, files=file)
        # 이미지 박스 쳐서 그림
        # # classification fast api 호출
        result_classification= requests.post(classification_Url, files=file2)
        print(result_classification.json())

        # text generation fast api 호출
        # result_textgen= requests.post(textgen_Url, files=files)

        # 이미지 저장
        saved_image_paths = []
        for image in fast_api_images:
            saved_path = save_image(image)
            saved_image_paths.append(saved_path)

        # media/images에 저장된 이미지 위에 bbox그려서 다시 저장
        # detect_json = result_detect.json()
        # print(detect_json)
        # draw_bbox(detect_json["result"], len(file))
        # print("draw 끝")

        # return JsonResponse({"detect_result": result_detect.json(), "classi_result": result_classification.json()})
        return JsonResponse({"detect_result": result_detect.json(), "classi_result": result_classification.json()})

        # return JsonResponse({'result': "success", 'saved_paths': saved_image_paths}, status=200)
        # return JsonResponse({'result': "success", 'result_detect': result_detect, 'result_classi': result_classi, 'result_text': result_text}, status=200)

    return JsonResponse({'result': "fail"}, status=400)


# # django 에서 get/ammenities/ GET 요청 시 호출
# @api_view(['get'])
# def get_ammenities(request):
#     upload_dir = 'images'
#     return JsonResponse({'image_file': 'image.jpg', "text": "ammenities des"})


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