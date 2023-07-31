from django.conf import settings
from django.db import models
from django.urls import reverse

# Create your models here.
class mainpage(models.Model):
    text= models.TextField() # image data name 
    
    images= models.ImageField(blank=True, upload_to= "images", null=True) # image url
    
    def __str__(self):
        return self.text

#####################################################################

class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# 게시물 모델
class Post(TimestampedModel):
    # 작성자
    author = models.ForeignKey( settings.AUTH_USER_MODEL, related_name="my_post_set", on_delete=models.CASCADE)

    # 포스트 제목
    title = models.CharField(max_length = 100)

    # 사진 1~10
    photo01 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    photo02 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo03 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo04 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo05 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo06 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo07 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo08 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo09 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")
    #photo10 = models.ImageField(upload_to="homepage/post/%Y/%m/%d")

    # 위치
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("homepage:post_detail", args=[self.pk])

    class Meta:
        ordering = ["-id"]

# 사진 모델
class Photo(TimestampedModel):
    # 포스트 참조
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    # 사진
    photo = models.ImageField(upload_to="homepage/photo/%Y/%m/%d")

    # 분류 결과
    classification = models.CharField(max_length=500)

    # 객체 인식 결과
    detection = models.CharField(max_length=500)

    # 캡션 생성 결과
    caption = models.CharField(max_length=500)
