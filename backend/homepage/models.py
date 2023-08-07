from djongo import models
from accounts.models import User


class Post(models.Model):
    # 포스트 id pk
    postId = models.AutoField(db_column='_id', primary_key=True)

    # 생성 일자
    created_at = models.DateTimeField(auto_now_add=True)

    # 작성자
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # 작성자 이름
    userName = models.CharField(max_length=100)

    # 포스트 제목
    title = models.CharField(max_length=100)

    #  썸네일 소개글
    caption = models.TextField(max_length=500)

    # 사진 url
    thumnail = models.URLField()

    # 방 정보
    roomInfo = models.JSONField(max_length=500)
    #{ {부엌:1 : 사진url, {디텍션 결과}, ...... }

    class Meta:
        db_table = 'posts' # MongoDB에서 사용될 컬렉션 이름

class Image(models.Model):
    # 얘가 제대로 생성이 안되는 현상이 있습니다. 왜그런지 모르겠네요
    # 이미지 id pk
    #imageId = models.AutoField(db_column='_id', primary_key=True)

    # 이미지 src
    imagePath = models.URLField()

    class Meta:
        db_table = 'images' # MongoDB에서 사용될 컬렉션 이름