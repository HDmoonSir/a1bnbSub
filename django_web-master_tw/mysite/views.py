from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password
from .models import User

# Create your views here.
def user_list(request):
    qs = User.objects.all()
    return render(request, 'index.html', {'user_list': qs,})

def register(request):   #회원가입 페이지를 보여주기 위한 함수
    if request.method == "GET":
        return render(request, 'signup.html')

    elif request.method == "POST":
        username = request.POST.get['username',None]
        password = request.POST.get['password',None]
        re_password = request.POST.get['re_password',None]
        res_data = {}
        if not (username and password and re_password) :
            res_data['error'] = "모든 값을 입력해야 합니다."
        if password != re_password :
            res_data['error'] = '비밀번호가 다릅니다.'
        else :
            user = User(username=username, password=make_password(password))
            user.save()
        return render(request, 'signup.html', res_data)

def login(request):
    if request.method == "GET":
        return render(request, 'login.html')

def check():
    return render('check.html')

# # 이미지 업로드 test
# def upload(request):
#     if request.method =="POST":
#         return {"Hello World"}
#         # return JsonResponse("success")
#     elif request.method =="GET":
#         return {"Hello World"}