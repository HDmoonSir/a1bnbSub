from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from .views import get_homepage, upload_images, get_room, get_mypage, get_result, upload_post, get_uploaded_page

router = DefaultRouter()
router.register('posts', views.PostViewSet)
router.register('images', views.ImageViewSet)

urlpatterns =[
    path('home/', get_homepage), 
    path('user/', get_mypage),
    path('user/regist', upload_images),
    path('user/regist/result/', get_result),
    path('user/regist/result/', upload_post),
    path('user/regist/uploaded/', get_uploaded_page),
    path('room/', get_room),

    # 게시물 api
    path('api/', include(router.urls)),
]

# 오류 발생 시 확인!
#urlpatterns = format_suffix_patterns(urlpatterns)