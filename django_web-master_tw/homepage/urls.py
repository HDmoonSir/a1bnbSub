from django.urls import path 
from rest_framework.urlpatterns import format_suffix_patterns
from .views import uploadImageList, upload_images, get_ammenities

urlpatterns =[
    # path('upload/', uploadImageList.as_view()), # /admin 에서 확인할 때 
    path('upload/', upload_images), # /become-host 에서 post 요청 올 때 호출 
    path('get/ammenities/', get_ammenities) # /become-host/ammenities에서 get 요청 올 때 호출 
]

urlpatterns= format_suffix_patterns(urlpatterns)