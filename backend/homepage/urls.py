from django.urls import path
from .views import get_homepage, upload_images, get_room, get_mypage, get_result, upload_post, get_uploaded_page

urlpatterns =[
    path('', get_homepage), 
    path('user', get_mypage),
    path('user/regist', upload_images),
    path('user/regist/result', get_result),
    path('user/regist/result', upload_post),
    path('user/regist/uploaded', get_uploaded_page),
    path('room', get_room),
]