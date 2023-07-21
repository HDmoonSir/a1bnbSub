from rest_framework import serializers
from .models import mainpage 

class mainpageSerializer(serializers.ModelSerializer):
    class Meta:
        model= mainpage 
        fields= '__all__'