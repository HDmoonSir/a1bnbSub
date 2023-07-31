from django.urls import path, include
from . import views

urlpatterns = [
    # 회원가입 api
    path('signup/', views.SignupView.as_view(), name='login'),
]

