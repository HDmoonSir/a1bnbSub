from django.shortcuts import render
from rest_framework import viewsets
from .serializers import mainpageSerializer
from .models import mainpage

# Create your views here.
class mainpageView(viewsets.ModelViewSet):
    serializer_class= mainpageSerializer
    queryset= mainpage.objects.all()