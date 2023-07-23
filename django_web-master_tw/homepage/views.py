from django.shortcuts import render, redirect
from rest_framework import viewsets
from .serializers import mainpageSerializer
from .models import mainpage

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.decorators import api_view


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

# /upload POST 요청 시 호출 
@api_view(['post'])
def upload_images(request):
    # image data 를 media/images 폴더 안에 저장 
    # image 한 장에 대해 
    serializer= mainpageSerializer(
                data= request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





