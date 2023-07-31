from rest_framework import serializers
from .models import mainpage, Post, Photo

class mainpageSerializer(serializers.ModelSerializer):
    class Meta:
        model= mainpage 
        fields= '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"

