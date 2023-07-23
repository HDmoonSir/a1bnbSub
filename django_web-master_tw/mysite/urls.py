from django.urls import path
from . import views

urlpatterns=[
    path('', views.user_list, name='user_list'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('check/', views.check, name='check'),
    # path('upload/', views.upload, name='upload') # 이미지 업로드 test
]
