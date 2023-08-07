from django.urls import path
from .views import get_homepage, upload_images, get_room, get_mypage, set_result, upload_post

urlpatterns =[
    path('', get_homepage), 
    path('user', get_mypage),
    path('user/regist', upload_images),
    path('user/regist/result', set_result),
    # path('user/regist/result', upload_post),
    path('user/regist/uploaded', upload_post),
    path('room', get_room),
]