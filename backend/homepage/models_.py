from djongo import models


class Post(models.Model):
    # 포스트 id pk
    postId = models.AutoField(primary_key=True)

    # 작성자 id
    userId = models.CharField(max_length=10)

    # 포스트 제목
    title = models.CharField(max_length=100)

    # 방 정보
    roomInfo = models.JSONField()
    #{ {부엌:1 : 사진url, {디텍션 결과}, ...... }

    class Meta:
        db_table = 'posts' # MongoDB에서 사용될 컬렉션 이름

class Image(models.Model):
    # 이미지 id pk
    imageId = models.AutoField(primary_key=True)

    # detection 결과
    resultD = models.CharField(max_length=100)

    # classification 결과
    resultD = models.CharField(max_length=100)

    # 이미지 src
    ImageUrl = models.URLField()
    
    class Meta:
        db_table = 'images' # MongoDB에서 사용될 컬렉션 이름