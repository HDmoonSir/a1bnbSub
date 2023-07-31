from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from .views import upload_images, get_ammenities

router = DefaultRouter()
router.register('posts', views.PostViewSet)
router.register('photos', views.PhotoViewSet)

urlpatterns =[
    path('upload/', upload_images), # /become-host 에서 post 요청 올 때 호출 
    path('get/ammenities/', get_ammenities), # /become-host/ammenities에서 get 요청 올 때 호출

    # 게시물 api
    path('api/', include(router.urls)),
]

# 오류 발생 시 확인!
#urlpatterns = format_suffix_patterns(urlpatterns)